#!/usr/bin/env python3
"""
Confere o que é mecânico numa série renderizada, antes de você olhar.

Existe porque "abra o PNG e olhe" é julgamento, e julgamento erra calado.
O que dá para medir, mede-se aqui; o resto continua com o olho.

Uso:
    python3 .claude/skills/design-conteudo/scripts/validar.py <pasta> [copy] [--formato=4:5] [--sem-copy]

O texto da peça precisa ser trecho literal da copy — encurtar ou reescrever no card
reprova. Se a frase da peça é melhor, mude a copy e rode a etapa 2 de novo.

O segundo argumento é opcional: sem ele, o script procura copy-<tema>.md dentro da pasta.

Checa:
  1. cada slide-NN.html tem um slide-NN.png correspondente
  2. os PNG têm a dimensão declarada (1080x1350 por padrão)
  3. todo número e toda frase do miolo aparecem na copy
  4. peça com número tem rodapé de fonte preenchido
  5. nenhuma peça repete o layout da anterior sem variação
  6. a ficha design-<tema>.md existe e toda peça nela tem origem declarada

Sai com código 1 se algo reprovar. Nada aqui julga se ficou bonito.
"""

import re
import struct
import sys
import unicodedata
from pathlib import Path

FORMATOS = {"4:5": (1080, 1350), "1:1": (1080, 1080), "9:16": (1080, 1920)}
W, H = FORMATOS["4:5"]


def png_size(path: Path):
    with open(path, "rb") as f:
        head = f.read(26)
    if head[:8] != b"\x89PNG\r\n\x1a\n":
        return None
    return struct.unpack(">II", head[16:24])


def _limpa(trecho: str) -> str:
    t = re.sub(r"<style.*?</style>", " ", trecho, flags=re.S | re.I)
    t = re.sub(r"<!--.*?-->", " ", t, flags=re.S)
    # rótulos de eixo são a régua do gráfico, não afirmação — cobrá-los contra a
    # copy exigiria escrever "0 50 100" no texto do autor
    t = re.sub(r'<div class="eixo".*?</div>', " ", t, flags=re.S)
    # régua de progresso e contador são cromo de navegação, não afirmação
    t = re.sub(r'<div class="idx".*?</div>\s*', " ", t, flags=re.S)
    t = re.sub(r'<b style="left[^"]*"><span>.*?</span></b>', " ", t, flags=re.S)
    t = re.sub(r"<br\s*/?>", " ", t, flags=re.I)
    # tags inline não separam palavra: <div class="fig">82<i>%</i></div> é "82%",
    # e trocar por espaço faria toda peça correta reprovar
    t = re.sub(r"</?(i|em|b|u|span|sup|sub|strong)\b[^>]*>", "", t, flags=re.I)
    t = re.sub(r"<[^>]+>", " ", t)
    t = t.replace("\u2011", "-").replace("\u2010", "-")   # hífen não-quebrável
    t = re.sub(r"&[a-z]+;|&#\d+;", " ", t)                # setas e sinais do markup
    return re.sub(r"\s+", " ", t).strip()


def texto_visivel(html: str) -> str:
    """Tudo que aparece na peça, para achar número e medir estrutura."""
    return _limpa(html)


def texto_do_miolo(html: str) -> str:
    """Só o conteúdo — sem etiqueta e sem rodapé.

    A etiqueta e a fonte são do desenho da peça, não da copy: cobrá-las contra
    o texto do autor acusaria toda peça correta.
    """
    # a classe pode vir com modificador (mid centro) — casar só com "mid"
    # exato faria o extrator devolver a peça inteira e acusar etiqueta e rodapé
    m = re.search(r'<div class="mid[^"]*">(.*?)</div>\s*<div class="foot"', html, re.S)
    corpo = m.group(1) if m else html
    # linhas de tabela saem da checagem de frase: elas reorganizam o texto da copy
    # em colunas, e cobrar ordem contígua ali reprovaria toda tabela correta.
    # Os números delas continuam sendo checados por `numeros()`, e os rótulos por
    # palavra em `rotulos_fora()` — nada entra sem estar na copy.
    # aqui vale o mesmo cuidado do `mid`: a classe aceita modificador (linha ficha,
    # linha solo). Casar só com `class="linha"` exato deixa a linha modificada inteira
    # dentro do corpo, e a checagem de frase reprova uma tabela correta
    corpo = re.sub(r'<div class="linha[^"]*".*?</div>\s*(?=<div class="linha[^"]*"|$)',
                   " ", corpo, flags=re.S)
    corpo = re.sub(r'<div class="escala".*?<!--/escala-->', " ", corpo, flags=re.S)
    # cada bloco (.fig, .h, .body) é uma frase à parte: título sem ponto final
    # colava na primeira frase do corpo e virava um trecho que não existe na copy
    corpo = re.sub(r"</div>", " . ", corpo)
    return _limpa(corpo)


def rotulos_fora(html: str, copy_txt: str) -> list:
    """Palavras dos rótulos de tabela que não existem na copy.

    A tabela pode reordenar, não pode inventar: cada palavra com 4+ letras
    precisa aparecer no texto do autor.
    """
    fora = []
    for r in re.findall(r'<span class="r">(.*?)</span>', html, re.S):
        for palavra in re.findall(r"[A-Za-zÀ-ú]{4,}", _limpa(r)):
            if normaliza(palavra) not in copy_txt:
                fora.append(palavra)
    return fora


def numeros(s: str) -> set:
    """Números como tokens inteiros, com a unidade colada.

    Comparar número por substring é o erro que deixa "7%" passar por "17%".

    Dígito colado a uma letra à esquerda não é afirmação, é identificador — w34836
    (working paper), PL2338, ISO27001. Cobrá-lo contra a copy reprovaria toda peça que
    credita a fonte pelo código dela. O lookbehind vale para os dois lados da
    comparação, então a regra é simétrica: nenhum número real escapa por aqui.
    """
    # o lookbehind barra dígito e separador também: senão "w34836" bloqueia só o "3"
    # e o match recomeça no "4", devolvendo "4836" — um número que ninguém escreveu
    # moeda vem ANTES do número em pt-BR ("R$ 8.034"); aceitá-la como sufixo colava o
    # "1" da etiqueta "Prova 1" ao "R$" do número gigante logo abaixo → falso "1R$"
    achados = re.findall(r"(?<![A-Za-zÀ-ú\d.,])\d[\d.,]*\s*(?:%|mil|bi|milh[õo]es?|pp)?", s)
    return {re.sub(r"\s+", "", a).strip(".,") for a in achados if any(c.isdigit() for c in a)}


def normaliza(s: str) -> str:
    s = s.replace("\u2011", "-").replace("\u2010", "-")
    s = unicodedata.normalize("NFKD", s.lower())
    s = "".join(c for c in s if not unicodedata.combining(c))
    return re.sub(r"[^a-z0-9%$.,/ -]", " ", s)


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)

    global W, H
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    for a in sys.argv[1:]:
        if a.startswith("--formato="):
            f = a.split("=", 1)[1]
            if f not in FORMATOS:
                raise SystemExit(f"ERRO: formato '{f}'. Use: {', '.join(FORMATOS)}")
            W, H = FORMATOS[f]

    # resolve(): com ".", Path(".").parent é "." e a busca na pasta de cima nunca acontecia
    pasta = Path(args[0]).resolve()
    if not pasta.is_dir():
        raise SystemExit(f"ERRO: '{pasta}' não é uma pasta. A ordem é: "
                         "validar.py <pasta> [copy]")
    if len(args) > 1:
        copy_path = Path(args[1])
    else:
        # a copy fica em pesquisas/, um nível acima da pasta de design;
        # em rodada-2/ dentro dela, dois níveis acima
        achados = (sorted(pasta.glob("copy-*.md")) or sorted(pasta.parent.glob("copy-*.md"))
                   or sorted(pasta.parent.parent.glob("copy-*.md")))
        copy_path = achados[0] if achados else pasta / "copy-.md"
        if len(achados) > 1:
            print(f"aviso    {len(achados)} arquivos copy-*.md na pasta; usei {copy_path.name}")

    # Sem copy não há como conferir se a peça inventou texto — e a ausência dela
    # costuma significar que a etapa 2 foi pulada. Reprovar aqui é o ponto:
    # passar em silêncio faria a série parecer aprovada sem nunca ter sido checada.
    sem_copy = "--sem-copy" in sys.argv
    if not copy_path.exists():
        if not sem_copy:
            print(f"REPROVA  a copy não foi encontrada em {copy_path}")
            print("         Sem ela nada garante que o texto das peças veio de algum lugar.")
            print("         Se a etapa de copy não rodou, volte a ela antes de renderizar;")
            print("         se o arquivo está noutro caminho, passe-o como segundo argumento.")
            print("         Se o operador autorizou a série sem copy, rode com --sem-copy:")
            print("         as outras checagens rodam, e esta fica registrada como não feita.")
            sys.exit(1)
        copy_txt, copy_raw = None, None
    else:
        copy_raw = copy_path.read_text(encoding="utf-8")
        copy_txt = normaliza(copy_raw)

    htmls = sorted(pasta.glob("slide-*.html"))
    if not htmls:
        print(f"ERRO: nenhum slide-*.html em {pasta}", file=sys.stderr)
        sys.exit(1)

    falhas, avisos, anterior = [], [], None
    com_heroi = []  # peças com número herói (.fig) — ver checagem de série abaixo

    for h in htmls:
        nome = h.stem
        html = h.read_text(encoding="utf-8")
        png = h.with_suffix(".png")

        if not png.exists():
            falhas.append(f"{nome}: PNG não existe — a peça não foi renderizada")
            continue

        dim = png_size(png)
        if dim and dim != (W, H):
            achado = next((k for k, v in FORMATOS.items() if v == dim), None)
            dica = f" — a série parece ser {achado}; rode com --formato={achado}" if achado else ""
            falhas.append(f"{nome}: PNG é {dim[0]}x{dim[1]}, esperado {W}x{H}{dica}")

        visivel = texto_visivel(html)

        miolo = texto_do_miolo(html) if copy_txt is not None else ""

        if copy_txt is not None:
            for palavra in rotulos_fora(html, copy_txt):
                falhas.append(f'{nome}: rótulo fora da copy → "{palavra}"')

        # Números: comparação por TOKEN, nunca por substring. "7%" é substring de
        # "17%" e "202" de "2025" — checar com `in` deixaria passar exatamente a
        # peça que troca o dado, que é o pior erro possível numa peça de dado.
        alvo_num = texto_visivel(html) if copy_txt is not None else ""
        for num in numeros(alvo_num) - numeros(copy_raw or ""):
            falhas.append(f'{nome}: número fora da copy → "{num}"')

        # Texto: todo segmento entra na checagem, sem limiar de tamanho. Card de
        # número tem título curto por construção; qualquer piso deixaria passar
        # justamente o formato que mais parece prova.
        for frase in [f.strip() for f in re.split(r"[.!?;:]", miolo) if f.strip()]:
            n = normaliza(frase)
            if len(n) < 3:
                continue
            if n not in copy_txt:
                falhas.append(f'{nome}: texto fora da copy → "{frase[:60]}"')

        tem_numero = re.search(r"\d[\d.,]*\s*(%|mil|bi|milh|R\$|\$)", visivel, re.I)
        rodape = re.search(r'class="foot".*?<span>(.*?)</span>', html, re.S)
        if tem_numero and not (rodape and rodape.group(1).strip()):
            falhas.append(f"{nome}: carrega número e está sem fonte no rodapé")

        if re.search(r'class="fig[ "]', html):
            com_heroi.append(nome)

        estrutura = tuple(sorted(re.findall(r'class="(fig|h|body|linha|escala|regua)[ "]', html)))
        if anterior and estrutura == anterior[1] and estrutura:
            avisos.append(f"{nome}: mesma estrutura de {anterior[0]} — série sem ritmo?")
        anterior = (nome, estrutura)

    # Número herói é o ponto focal da SÉRIE, não de cada prova. Em 30/08 a copy
    # trouxe quatro provas que abriam com número, cada uma virou .fig de 300-450px,
    # e o carrossel saiu com quatro números gigantes seguidos — validador verde,
    # porque cada peça sozinha estava certa. O defeito só existe na soma.
    if len(com_heroi) > 1:
        falhas.append(f"série com {len(com_heroi)} números heróis (.fig): {', '.join(com_heroi)} — "
                      "o máximo é 1. Mantenha o .fig na prova mais forte e passe as outras "
                      "para manchete (.h + .body), com o número dentro da frase")

    # a ficha é o que torna a série auditável depois: sem ela ninguém sabe
    # qual peça carrega qual fato, e foi assim que uma rodada antiga acabou
    # com três peças de texto sem origem nenhuma
    fichas = sorted(pasta.glob("design-*.md"))
    ficha = fichas[0] if fichas else pasta / "design-.md"
    # em rodada-N/ a ficha do pai é de OUTRA rodada: validar contra ela aprovaria
    # a série nova comparando com a descrição da antiga
    if not ficha.exists() and not re.match(r"rodada-\d+$", pasta.name):
        acima = sorted(pasta.parent.glob("design-*.md"))
        if acima:
            ficha = acima[0]
    if not ficha.exists():
        falhas.append("ficha design-*.md não encontrada — sem ficha, nenhuma peça tem origem "
                      "declarada e a série não é auditável depois")
    else:
        linhas = [l for l in ficha.read_text(encoding="utf-8").splitlines()
                  if l.strip().startswith("|") and "---" not in l]
        pecas_na_ficha = linhas[1:]
        def origem_ok(linha):
            o = linha.rstrip().rstrip("|").rsplit("|", 1)[-1].strip()
            # ou aponta para um fato/opinião da pesquisa, ou se declara argumento;
            # qualquer outra palavra ali é origem que ninguém consegue rastrear
            # a copy-conteudo credita a fonte por número entre colchetes ([1], [3]);
            # slide de tese não tem fonte e se declara editorial — as duas formas valem,
            # qualquer outra palavra ali é origem que ninguém consegue rastrear depois
            o = o.replace("[", "").replace("]", "")
            return bool(re.fullmatch(r"(?:F?\d+(?:\s*,\s*F?\d+)*|argumento|editorial|síntese|conclusão)", o, re.I))

        sem_origem = [l for l in pecas_na_ficha if not origem_ok(l)]
        if sem_origem:
            falhas.append(f"{ficha.name}: {len(sem_origem)} peça(s) sem origem declarada na ficha")
        if len(pecas_na_ficha) != len(htmls):
            falhas.append(f"{ficha.name}: a ficha descreve {len(pecas_na_ficha)} peça(s) "
                          f"e a pasta tem {len(htmls)} — toda peça precisa estar na ficha")

    for f in falhas:
        print(f"REPROVA  {f}")
    for a in avisos:
        print(f"aviso    {a}")

    if sem_copy:
        print("aviso    rodado com --sem-copy: NADA foi conferido contra a copy.")
        print("         Nenhum texto ou número desta série tem origem verificada.")

    if not falhas:
        print(f"OK: {len(htmls)} peças passaram nas checagens mecânicas.")
        print("Falta o que só o olho pega: hierarquia, quebra de linha feia, contraste.")

    sys.exit(1 if falhas else 0)


if __name__ == "__main__":
    main()
