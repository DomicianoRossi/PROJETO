#!/usr/bin/env python3
"""
Renderiza uma série de peças a partir do template e de uma lista de dados.

Existe para que cada peça saia do mesmo esqueleto: peça montada à mão diverge
da irmã, e a série é o que o leitor vê.

Uso:
    python3 .claude/skills/design-conteudo/scripts/render.py \\
      outputs/AAAA-MM-DD-<slug>/pecas.json outputs/AAAA-MM-DD-<slug>/ [--formato=4:5]

Formatos: 4:5 (1080x1350, padrão) · 1:1 (1080x1080) · 9:16 (1080x1920).
Grave o pecas.json na pasta de trabalho, ao lado do copy-<tema>.md.

pecas.json — obrigatórios: etiqueta, fonte, conteudo.
             opcionais:   tema (claro|escuro|fogo), ancora (base|centro),
                          foto (arquivo na pasta de saída), assinatura (global).
             `ancora: centro` é para peça densa, que já preenche o quadro.

[
  {
    "etiqueta": "A escala",
    "fonte": "Cetic.br · TIC Empresas 2025",
    "tema": "escuro",
    "conteudo": "<div class=\\"fig\\">17<i>%</i></div><div class=\\"h\\">das empresas.</div>"
  }
]

Componentes do miolo: .fig (número herói), .h (título, com <span> para o nível
secundário), .body (punchline com tarja), .linha (comparação).

A régua de progresso e a numeração são preenchidas sozinhas. Depois de rodar,
ABRA os PNG e olhe — este script sabe se o arquivo existe, não se a peça ficou boa.
"""

import json
import re
import subprocess
import sys
from pathlib import Path

import os
# CHROME_PATH no ambiente vence; senão, o primeiro caminho que existir (macOS, Windows, Linux).
_CHROMES = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
    "/usr/bin/google-chrome",
]
CHROME = os.environ.get("CHROME_PATH") or next((c for c in _CHROMES if Path(c).exists()), _CHROMES[0])
ASSETS = Path(__file__).resolve().parent.parent / "assets"
TEMPLATE = ASSETS / "template.html"
FORMATOS = {"4:5": (1080, 1350), "1:1": (1080, 1080), "9:16": (1080, 1920)}
W, H = FORMATOS["4:5"]

TEMAS = {
    "claro":  {},  # o padrão do template
    "escuro": {"--bg": "#141210", "--fg": "#f2eee7", "--ac": "#f0562a",
               "--mut": "#b8b1a5", "--dim": "#5c554d", "--line": "#2f2a25",
               "--ft": "#cbc4b9", "--grao": ".34", "--blend": "normal"},
    # peça de virada: o acento vira o quadro inteiro. Marca a conclusão da série
    "fogo":   {"--bg": "#a8330d", "--fg": "#fff5ee", "--ac": "#ffd9c2", "--mut": "#f7cdb6", "--dim": "#8a2609", "--line": "#c9481b", "--ft": "#ffe8db", "--grao": ".3", "--blend": "multiply"},
    # trio petróleo/âmbar (paleta dark-premium da hyperframes-creative). Aditivo: a
    # série que não pedir estes temas continua saindo exatamente como saía antes.
    # Serve à pauta que precisa de peso editorial sem a temperatura quente do padrão.
    "petroleo":       {"--bg": "#0d1b2a", "--fg": "#e0e1dd", "--ac": "#fca311",
                       "--mut": "#9aa9ba", "--dim": "#415a77", "--line": "#22354a",
                       "--ft": "#a9b4c2", "--grao": ".30", "--blend": "normal"},
    "petroleo-claro": {"--bg": "#dfe3e4", "--fg": "#0d1b2a", "--ac": "#a86a00",
                       "--mut": "#3f5064", "--dim": "#9aa5b1", "--line": "#c2c9cd",
                       "--ft": "#4a5a6a", "--grao": ".26", "--blend": "multiply"},
    # peça de virada do trio petróleo: o âmbar toma o quadro (equivalente ao "fogo")
    # trio da direção "revista": papel de linho, noite ripada, laranja de capa.
    # `papel` é a base do template — está aqui explícito para a série poder alternar
    # sem depender da ausência de override (que é o que confunde no `claro`).
    "papel":  {"--bg": "#efede8", "--fg": "#14161a", "--ac": "#ff5a1f",
               "--mut": "#5b5f66", "--dim": "#b6b2a8", "--line": "#d5d1c6",
               "--ft": "#6c6f75", "--grao": ".5", "--blend": "multiply", "--tex": ".05"},
    "noite":  {"--bg": "#121a2b", "--fg": "#f4f2ed", "--ac": "#ff5a1f",
               "--mut": "#a8b0c0", "--dim": "#3d4759", "--line": "#26304a",
               "--ft": "#9aa3b5", "--grao": ".34", "--blend": "normal", "--tex": ".07"},
    # teal/terracota: derivado da identidade de uma cliente, não da paleta da casa.
    # Fica aqui porque tema é da série, não do template — trocar a cor não deve
    # obrigar a duplicar a direção inteira.
    "teal":   {"--bg": "#16302f", "--fg": "#f2ede1", "--ac": "#d98c66",
               "--mut": "#a9bdb8", "--dim": "#3d5b58", "--line": "#274745",
               "--ft": "#b9cac5", "--grao": ".32", "--blend": "normal", "--tex": ".06"},
    "laranja": {"--bg": "#ff5a1f", "--fg": "#14161a", "--ac": "#14161a",
                "--mut": "#5c1f04", "--dim": "#d1440f", "--line": "#e04d16",
                "--ft": "#5c1f04", "--grao": ".3", "--blend": "multiply", "--tex": ".06"},
    # família agenticway: navy, papel e coral da marca AgenticWay (um coral por tela)
    "agenticway":       {"--bg": "#0F2A44", "--fg": "#F7F5F0", "--ac": "#F08A6E",
                         "--mut": "#B9C3CE", "--dim": "#4A8FC7", "--line": "#1F4E79",
                         "--ft": "#C9D2DC", "--grao": ".28", "--blend": "normal"},
    "agenticway-claro": {"--bg": "#F7F5F0", "--fg": "#0F2A44", "--ac": "#E8785A",
                         "--mut": "#5B6572", "--dim": "#DDD9D0", "--line": "#DDD9D0",
                         "--ft": "#5B6572", "--grao": ".22", "--blend": "multiply"},
    "ambar":          {"--bg": "#f09000", "--fg": "#10202f", "--ac": "#3a2600",
                       "--mut": "#4a3200", "--dim": "#c47200", "--line": "#d38100",
                       "--ft": "#4a3200", "--grao": ".28", "--blend": "multiply"},
    # inversão do tabloide: a caixa fica branca e o texto preto. Serve à foto escura,
    # onde a caixa preta desaparece dentro da imagem em vez de recortar o texto.
    # o tabloide precisa do tema dele: os temas genéricos sobrescrevem --ac e o selo
    # perde o limão, que é metade da identidade. `tabloide` é a base escura da direção.
    "tabloide": {"--bg": "#111111", "--fg": "#ffffff", "--ac": "#d8f34a",
                 "--mut": "#d8d8d8", "--dim": "#6f6f6f", "--line": "#2a2a2a",
                 "--ft": "#cfcfcf", "--grao": ".18", "--blend": "normal",
                 "--cx": "#000000", "--cxf": "#ffffff"},
    "tabloide-claro": {"--bg": "#f2f2f0", "--fg": "#111111", "--ac": "#d8f34a",
                       "--mut": "#4a4a4a", "--dim": "#9a9a9a", "--line": "#dcdcda",
                       "--ft": "#3d3d3d", "--grao": ".14", "--blend": "multiply",
                       "--cx": "#ffffff", "--cxf": "#111111", "--sombra": "rgba(255,255,255,.85)"},
}


# ---------------------------------------------------------------- escala automática
#
# O que fazia a peça variar de rodada para rodada não era o template — era o
# `font-size` inline escolhido no olho. Numa sessão saíram 28 valores diferentes para
# título, com a tabela da SKILL.md pedindo 58–70px. Aqui a escala passa a ser função
# do comprimento do texto: mesma copy, mesma peça, sempre.
#
# Cada faixa é (até N caracteres visíveis, tamanho em px), avaliada em ordem. O último
# item é o teto e vale para qualquer coisa maior.
#
# Os valores diferem por template porque a letra difere: a serifa do dossiê ocupa menos
# que a grotesca pesada do padrão, e a condensada do alerta ocupa muito menos.
#
# `font-size` inline no `pecas.json` continua ganhando — é o escape para o caso que a
# fórmula não cobre, e é o que mantém as séries antigas idênticas.

# Os pontos são âncoras de (nº de caracteres, px) e o valor entre eles é INTERPOLADO.
# Faixas com degrau não servem: com `(3, 300), (5, 238)`, um caractere de diferença
# derruba 62px — "63%" sai gigante e "~90%" sai pequeno, o que é a mesma loteria de
# antes, só com cara de regra. A interpolação faz a curva ser contínua.

ESCALA = {
    "template": {                   # Archivo 900, grotesca larga
        "fig":     [(2, 452), (4, 372), (7, 236), (12, 152)],
        "h":       [(20, 100), (50, 82), (90, 68), (160, 56), (280, 46)],
        "h_apoio": [(20, 68), (50, 64), (90, 59), (160, 51), (280, 43)],
        "body":    [(40, 35), (110, 32), (220, 29)],
    },
    "template-dossie": {            # Newsreader 700, serifa: ocupa menos
        "fig":     [(2, 340), (4, 292), (7, 186), (12, 124)],
        "h":       [(20, 98), (50, 80), (90, 66), (160, 56), (280, 46)],
        "h_apoio": [(20, 70), (50, 65), (90, 59), (160, 51), (280, 44)],
        "body":    [(40, 28), (110, 27), (220, 25)],
    },
    "template-terminal": {          # IBM Plex Mono: largura fixa, o pior caso
        "fig":     [(2, 300), (4, 262), (7, 172), (12, 112)],
        "h":       [(20, 64), (50, 54), (90, 46), (160, 40), (280, 34)],
        "h_apoio": [(20, 50), (50, 47), (90, 43), (160, 38), (280, 33)],
        "body":    [(40, 29), (110, 27), (220, 25)],
    },
    "template-revista": {           # Inter 800 + Instrument Serif: duas letras
        # o herói em serifa display estoura a caixa antes de qualquer outro bloco:
        # ele é uma palavra só, gigante, e uma sílaba a mais empurra pra fora do
        # quadro sem aviso (o Chrome corta, não reduz). Curva própria, mais íngreme.
        "hero":    [(5, 272), (8, 236), (11, 174), (15, 130), (22, 92)],
        "fig":     [(2, 400), (4, 330), (7, 210), (12, 140)],
        "h":       [(20, 92), (50, 76), (90, 64), (160, 54), (280, 44)],
        "h_apoio": [(20, 66), (50, 62), (90, 57), (160, 49), (280, 42)],
        "body":    [(40, 33), (110, 30), (220, 28)],
    },
    "template-tabloide": {          # Inter 400/800 + caixa justa: o padding come largura
        # a caixa cola no contorno de cada linha, então cada quebra ganha .44em de
        # padding somado. O título aguenta menos caractere por linha que o padrão.
        "fig":     [(2, 240), (4, 200), (7, 140), (12, 96)],
        "h":       [(20, 78), (50, 66), (90, 58), (160, 50), (280, 42)],
        "h_apoio": [(20, 58), (50, 54), (90, 50), (160, 44), (280, 38)],
        "body":    [(40, 34), (110, 31), (220, 28)],
    },
    "template-eter": {              # Archivo condensada + Playfair: capa de revista
        "hero":    [(20, 104), (40, 92), (70, 78), (110, 64), (170, 54)],
        "sub":     [(40, 40), (90, 36), (160, 32)],
        "fig":     [(2, 300), (4, 262), (7, 180), (12, 122)],
        "h":       [(20, 84), (50, 70), (90, 60), (160, 50), (280, 42)],
        "h_apoio": [(20, 62), (50, 58), (90, 53), (160, 46), (280, 40)],
        "body":    [(40, 34), (110, 31), (220, 28)],
        "txt":     [(60, 40), (140, 35), (260, 31)],
        "enfase":  [(30, 64), (60, 56), (100, 48), (160, 40)],
    },
    "template-alerta": {            # Archivo wdth 64: condensada, cabe mais
        "fig":     [(2, 330), (4, 300), (7, 212), (12, 148)],
        "h":       [(20, 106), (50, 84), (90, 70), (160, 58), (280, 48)],
        "h_apoio": [(20, 72), (50, 67), (90, 61), (160, 53), (280, 45)],
        "body":    [(40, 28), (110, 27), (220, 25)],
    },
}

TAG = re.compile(r"<[^>]+>")


def _tamanho(pontos, n: int) -> int:
    """Interpola linearmente entre as âncoras. Fora delas, usa a ponta mais próxima."""
    if n <= pontos[0][0]:
        return pontos[0][1]
    if n >= pontos[-1][0]:
        return pontos[-1][1]
    for (n0, p0), (n1, p1) in zip(pontos, pontos[1:]):
        if n0 <= n <= n1:
            return round(p0 + (p1 - p0) * (n - n0) / (n1 - n0))
    return pontos[-1][1]


def escalar(conteudo: str, template: str) -> str:
    """Injeta font-size nos blocos que não trouxeram um.

    Só mexe em `.fig`, `.h` e `.body` de primeiro nível. Não toca em `.linha`, `.eixo`
    nem `.escala`: naqueles a escala é do grid, não do comprimento da frase.

    **Hierarquia é relativa, não absoluta.** O comprimento do texto sozinho não decide:
    um `.h` que é a peça inteira pode ser grande, e o mesmo `.h` ao lado de um número
    herói tem de ser menor, senão os dois disputam e nenhum vence. Foi o que aconteceu
    na primeira versão desta função — o título de uma capa cresceu 22px e passou a
    competir com a cifra. Por isso o `.h` encolhe quando existe `.fig` na mesma peça.
    """
    faixas = ESCALA.get(template, ESCALA["template"])
    tem_fig = re.search(r'<div\s+class="fig', conteudo) is not None

    def sub(m):
        abre, classe, resto, corpo = m.group(1), m.group(2), m.group(3), m.group(4)
        base = classe.split()[0]
        if base not in faixas:
            return m.group(0)
        if "font-size" in resto:            # o autor decidiu; a fórmula não discute
            return m.group(0)
        n = len(TAG.sub("", corpo).strip())
        # duas curvas para o título: protagonista quando é a peça, apoio quando há um
        # número herói ao lado. Um multiplicador sobre a curva única foi tentado e
        # derrubou o título a 47px — pequeno para o feed. Curvas separadas se controlam
        chave = "h_apoio" if (base == "h" and tem_fig) else base
        px = _tamanho(faixas[chave], n)
        quebra = ""
        if base == "fig":
            # o .fig tem line-height .8: se o número quebra em duas linhas ("US$" em
            # cima de "1.000") os glifos se atropelam. Então ele não quebra, e o
            # tamanho tem teto pela largura útil (~930px, ~0,68em por caractere na
            # grotesca pesada). Só reduz — heróis curtos seguem com o tamanho de antes.
            px = min(px, int(930 / (0.68 * max(n, 1))))
            quebra = "white-space:nowrap;"
        if 'style="' in resto:
            resto = resto.replace('style="', f'style="font-size:{px}px;{quebra}', 1)
        else:
            resto = f'{resto} style="font-size:{px}px;{quebra}"'
        return f'{abre}class="{classe}"{resto}>{corpo}</div>'

    # `hero` entra na lista porque é o bloco que mais estoura: uma palavra só, em
    # serifa display. Ficar de fora da regex significava font-size fixo do CSS, e o
    # Chrome corta o que não cabe em vez de reduzir — a peça sai com a palavra
    # decepada e o validador aprova, porque o texto continua sendo o texto certo.
    return re.sub(r'(<div\s+)class="(fig[^"]*|h|body|hero)"([^>]*)>(.*?)</div>',
                  sub, conteudo, flags=re.S)


def aplicar_tema(html: str, tema: str) -> str:
    """Injeta o tema como um :root extra no FIM do <style>.

    Precisa ser no fim: as variáveis têm a mesma especificidade, então quem vem
    por último vence. Um override logo após `:root {` é sobrescrito pelo padrão
    abaixo e o tema some sem erro nenhum — a peça sai clara achando que é escura.
    """
    if tema not in TEMAS:
        raise SystemExit(f"ERRO: tema '{tema}' não existe. Use: {', '.join(TEMAS)}")
    if not TEMAS[tema]:
        return html
    bloco = ":root{" + "".join(f"{k}:{v};" for k, v in TEMAS[tema].items()) + "}\n"
    if "</style>" not in html:
        raise SystemExit("ERRO: template sem </style> — não dá para aplicar tema.")
    return html.replace("</style>", bloco + "</style>", 1)


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)

    global W, H, TEMPLATE
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    for a in sys.argv[1:]:
        if a.startswith("--formato="):
            f = a.split("=", 1)[1]
            if f not in FORMATOS:
                raise SystemExit(f"ERRO: formato '{f}'. Use: {', '.join(FORMATOS)}")
            W, H = FORMATOS[f]
        if a.startswith("--template="):
            nome = a.split("=", 1)[1]
            TEMPLATE = ASSETS / f"template-{nome}.html"
            if not TEMPLATE.exists():
                disp = sorted(p.stem.removeprefix("template-")
                              for p in ASSETS.glob("template-*.html"))
                raise SystemExit(f"ERRO: template '{nome}' não existe em {ASSETS}.\n"
                                 f"Disponíveis: {', '.join(disp) or '(nenhum)'} — "
                                 "ou omita --template para o padrão.")

    if Path(args[0]).is_dir():
        raise SystemExit(f"ERRO: '{args[0]}' é uma pasta. A ordem é: "
                         "render.py <pecas.json> <pasta-de-saida>")
    if len(args) < 2:
        raise SystemExit("ERRO: informe a pasta de saída.\n"
                         "Sem ela os slides caem no diretório atual, que raramente "
                         "é a pasta de trabalho.")

    dados = json.loads(Path(args[0]).read_text(encoding="utf-8"))
    saida = Path(args[1])
    saida.mkdir(parents=True, exist_ok=True)

    if not Path(CHROME).exists():
        raise SystemExit(f"ERRO: Chrome não encontrado em {CHROME}.\n"
                         "Sem ele não há render.")

    for i, peca in enumerate(dados, 1):
        faltando = [c for c in ("etiqueta", "fonte", "conteudo") if not peca.get(c)]
        if faltando:
            raise SystemExit(f"ERRO: peça {i} sem {', '.join(faltando)}. "
                             "Peça sem fonte vira dado órfão quando a imagem "
                             "circula sozinha.")

    base = TEMPLATE.read_text(encoding="utf-8")
    total = len(dados)
    feitos = []

    for i, peca in enumerate(dados, 1):
        html = aplicar_tema(base, peca.get("tema", "claro"))

        if (W, H) != FORMATOS["4:5"]:
            alvo = "width:1080px; height:1350px"
            if alvo not in html:
                raise SystemExit("ERRO: não achei a dimensão no template para trocar. "
                                 "Se o CSS foi reformatado, o formato sairia errado "
                                 "em silêncio — corrija o template ou o script.")
            html = html.replace(alvo, f"width:{W}px; height:{H}px")

        anc = peca.get("ancora", "base")
        if anc not in ("base", "centro", "topo"):
            raise SystemExit(f"ERRO: ancora '{anc}' na peça {i}. Use base, centro ou topo. "
                             "Errar aqui mudaria o layout sem avisar.")

        foto = peca.get("foto")
        if foto:
            fp = (saida / foto) if not Path(foto).is_absolute() else Path(foto)
            if not fp.exists():
                raise SystemExit(f"ERRO: foto '{foto}' da peça {i} não existe em {fp}. "
                                 "Peça com foto quebrada sai como retângulo de cor e "
                                 "ninguém percebe até olhar o PNG.")
            html = html.replace("</style>",
                                f'.ph{{display:block;background-image:url("{fp.name}")}}'
                                '.veil{display:block}</style>', 1)

        indice = "".join('<i class="on"></i>' if n == i else "<i></i>"
                         for n in range(1, total + 1))
        indice += f"<b>{i:02d} / {total}</b>"

        assin = peca.get("assinatura", "")
        html = (html
                .replace("{{INDICE_DOTS}}", re.sub(r"<b>.*?</b>", "", indice))
                .replace("{{INDICE}}", indice)
                # numeral por extenso da direção "revista". Campo opcional: o
                # template que não tiver os marcadores simplesmente ignora, e a
                # peça sem `ordinal` renderiza sem a canaleta.
                .replace("{{ORDINAL}}", f"<b>{peca['ordinal']}</b>" if peca.get("ordinal") else "")
                .replace("{{ANCORA_ORD}}", "comord" if peca.get("ordinal") else "")
                .replace("{{ANCORA}}", {"centro": "alto", "topo": "topo"}.get(anc, ""))
                .replace("{{ETIQUETA}}", peca["etiqueta"])
                .replace("{{CONTEUDO}}", escalar(peca["conteudo"], TEMPLATE.stem))
                .replace("{{FONTE}}", peca["fonte"])
                .replace("{{ASSINATURA}}", f"<span>{assin}</span>" if assin else ""))

        nome = f"slide-{i:02d}"
        html_path = saida / f"{nome}.html"
        png_path = saida / f"{nome}.png"
        html_path.write_text(html, encoding="utf-8")

        r = subprocess.run(
            [CHROME, "--headless", "--disable-gpu", "--allow-file-access-from-files",
             "--hide-scrollbars", "--force-device-scale-factor=1",
             # o budget dá tempo da Google Font baixar; sem ele o PNG sai em fallback
             "--virtual-time-budget=6000",
             f"--screenshot={png_path.resolve()}", f"--window-size={W},{H}",
             # caminho relativo o Chrome do Windows trata como host; URI absoluta serve a todos
             html_path.resolve().as_uri()],
            capture_output=True, text=True,
        )

        if r.returncode != 0 or not png_path.exists():
            print(f"ERRO: {nome}.png não foi gerado (Chrome saiu com {r.returncode})",
                  file=sys.stderr)
            if r.stderr:
                print(r.stderr.strip()[-500:], file=sys.stderr)
            sys.exit(2)
        feitos.append(png_path.name)

    print(f"OK: {len(feitos)} peças em {saida}")
    print("  " + "  ".join(feitos))
    print("\nAgora abra cada PNG e confira. O script garante que o arquivo existe,")
    print("não que a peça ficou boa — quebra de linha e contraste só o pixel mostra.")


if __name__ == "__main__":
    main()
