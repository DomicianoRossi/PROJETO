#!/usr/bin/env python3
"""
Valida o conteúdo publicado e gera os arquivos de dados que as páginas leem.

    python scripts/build_dados.py            # valida e gera site/dados/*.js
    python scripts/build_dados.py --checar   # só valida, não escreve nada

Fonte:  conteudo/publicado/<editoria>/*.json   (um arquivo por item)
Saída:  site/dados/<editoria>.js               (window.AW_DADOS.<editoria> = [...])

As páginas carregam site/dados/<editoria>.js antes do support.js e leem os dados
de forma síncrona. Publicar = criar um JSON novo e rodar este script; nenhum HTML
é editado. A aprovação humana é o merge do pull request que traz o JSON. Item que não passa na validação derruba o build inteiro: é melhor o
site não atualizar do que publicar nota sem fonte.
"""
import json
import re
import sys
from datetime import datetime
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
FONTE = RAIZ / "conteudo" / "publicado"
SAIDA = RAIZ / "site" / "dados"

ASSINATURA = "Apurado e escrito por agentes AgenticWay · editor responsável: Domiciano Rossi"

TEMAS_RADAR = ["REGULAÇÃO", "LANÇAMENTOS", "CASOS", "PESQUISA", "MERCADO"]

# campo: (tipo, obrigatório)
ESQUEMA_RADAR = {
    "id": (str, True),
    "publicado_em": (str, True),        # ISO 8601 com fuso, ex. 2026-09-24T14:20:00-03:00
    "tema": (str, True),                # um de TEMAS_RADAR
    "titulo": (str, True),
    "linha": (str, True),               # 1 frase para a listagem
    "linhaFina": (str, True),
    "fontePrimaria": (str, True),       # quem originou o fato, ex. "Dataiku / Harris Poll"
    "leitura": (int, True),
    "resumo": (list, True),             # 2 a 4 frases
    "corpo": (list, True),              # 2 a 5 parágrafos, antes dos cards
    "consequencias": (list, True),      # 2 a 3 {rotulo, titulo, texto}
    "oQueFazer": (list, False),         # 0 a 3 parágrafos, depois dos cards
    "fontes": (list, True),             # >= 1 {titulo, origem, url}
    "ficha": (list, False),             # [{rotulo, valor}]
    "datas": (list, False),             # [{quando, evento}]
}


def erro(caminho, msg):
    return f"{caminho.relative_to(RAIZ)}: {msg}"


def valida_radar(caminho, item):
    erros = []
    for campo, (tipo, obrig) in ESQUEMA_RADAR.items():
        if campo not in item:
            if obrig:
                erros.append(erro(caminho, f"falta o campo '{campo}'"))
            continue
        if not isinstance(item[campo], tipo):
            erros.append(erro(caminho, f"'{campo}' deveria ser {tipo.__name__}"))
    extras = set(item) - set(ESQUEMA_RADAR)
    if extras:
        erros.append(erro(caminho, f"campos desconhecidos: {', '.join(sorted(extras))}"))
    if erros:
        return erros

    if item["id"] != caminho.stem:
        erros.append(erro(caminho, f"id '{item['id']}' diferente do nome do arquivo"))
    if not re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", item["id"]):
        erros.append(erro(caminho, "id deve ser kebab-case sem acento"))
    try:
        quando = datetime.fromisoformat(item["publicado_em"])
        if quando.tzinfo is None:
            erros.append(erro(caminho, "publicado_em sem fuso horário"))
    except ValueError:
        erros.append(erro(caminho, "publicado_em não é ISO 8601"))
    if item["tema"] not in TEMAS_RADAR:
        erros.append(erro(caminho, f"tema '{item['tema']}' fora de {TEMAS_RADAR}"))
    if not 2 <= len(item["resumo"]) <= 4:
        erros.append(erro(caminho, "resumo precisa de 2 a 4 frases"))
    if not 2 <= len(item["corpo"]) <= 5:
        erros.append(erro(caminho, "corpo precisa de 2 a 5 parágrafos"))
    if not 2 <= len(item["consequencias"]) <= 3:
        erros.append(erro(caminho, "consequencias precisa de 2 a 3 itens"))
    for c in item["consequencias"]:
        if set(c) != {"rotulo", "titulo", "texto"}:
            erros.append(erro(caminho, "cada consequência tem rotulo, titulo e texto"))
    if not item["fontes"]:
        erros.append(erro(caminho, "nota sem fonte não é publicada"))
    for f in item["fontes"]:
        if set(f) != {"titulo", "origem", "url"}:
            erros.append(erro(caminho, "cada fonte tem titulo, origem e url"))
        elif not f["url"].startswith("https://"):
            erros.append(erro(caminho, f"fonte sem URL https: {f['url']}"))
    return erros


SETORES = ["DISTRIBUIÇÃO", "INDÚSTRIA", "LOGÍSTICA", "COMÉRCIO EXTERIOR", "VAREJO",
           "SERVIÇOS", "SAÚDE", "FINANÇAS", "AGRO", "TECNOLOGIA"]
PROCESSOS = ["FATURAMENTO", "COMERCIAL", "FISCAL", "ESTOQUE", "ATENDIMENTO",
             "FINANCEIRO", "COMPRAS", "RH", "JURÍDICO", "OPERAÇÃO"]
STATUS_CASO = ["em-operacao", "piloto", "parou"]

ESQUEMA_CASO = {
    "id": (str, True), "publicado_em": (str, True),
    "setor": (str, True), "processo": (str, True), "status": (str, True),
    "empresa": (str, True),             # nome da empresa do caso (caso público tem empresa nomeada)
    "titulo": (str, True), "linhaFina": (str, True),
    "resumo": (str, True),              # 1 a 2 frases para a listagem
    "leitura": (int, True),
    "abertura": (str, True), "problema": (str, True), "solucao": (str, True), "resultado": (str, True),
    "humano": (str, False),             # onde a pessoa continua no processo
    "citacao": (dict, False),           # {texto, quem} — fala publicada na fonte, com quem disse
    "numeros": (list, True),            # 1 a 5 {valor, legenda, quemMediu}
    "fluxo": (list, True),              # 2 a 6 {tipo, nome, faz}
    "indicadores": (list, False),       # {nome, antes, depois, medida}
    "naoConta": (list, True),           # 1 a 3 {valor, texto}: o que a fonte omite
    "licoes": (list, True),             # 2 a 3 {titulo, texto}
    "ficha": (list, True),              # {rotulo, valor}
    "comoApuramos": (str, True),        # fontes reais; diz que não houve visita nem entrevista
    "transparencia": (str, True),       # relação da fonte com o resultado, conflitos
    "fontes": (list, True),             # >= 1 {titulo, origem, url}
    "imagem": (dict, False),            # {arquivo, alt, modelo, prompt} — gerada por IA, ver conteudo/padroes/imagens.md
}


def _campos(caminho, item, esquema):
    erros = []
    for campo, (tipo, obrig) in esquema.items():
        if campo not in item:
            if obrig:
                erros.append(erro(caminho, f"falta o campo '{campo}'"))
            continue
        if not isinstance(item[campo], tipo):
            erros.append(erro(caminho, f"'{campo}' deveria ser {tipo.__name__}"))
    extras = set(item) - set(esquema)
    if extras:
        erros.append(erro(caminho, f"campos desconhecidos: {', '.join(sorted(extras))}"))
    return erros


def _lista(caminho, item, campo, chaves, minimo, maximo):
    v = item.get(campo, [])
    erros = []
    if not minimo <= len(v) <= maximo:
        erros.append(erro(caminho, f"{campo} precisa de {minimo} a {maximo} itens"))
    for x in v:
        if not isinstance(x, dict) or set(x) != set(chaves):
            erros.append(erro(caminho, f"cada item de {campo} tem exatamente: {', '.join(chaves)}"))
            break
    return erros


def valida_caso(caminho, item):
    erros = _campos(caminho, item, ESQUEMA_CASO)
    if erros:
        return erros
    if item["id"] != caminho.stem or not re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", item["id"]):
        erros.append(erro(caminho, "id deve ser kebab-case sem acento e igual ao nome do arquivo"))
    try:
        if datetime.fromisoformat(item["publicado_em"]).tzinfo is None:
            erros.append(erro(caminho, "publicado_em sem fuso horário"))
    except ValueError:
        erros.append(erro(caminho, "publicado_em não é ISO 8601"))
    for campo, lista in (("setor", SETORES), ("processo", PROCESSOS), ("status", STATUS_CASO)):
        if item[campo] not in lista:
            erros.append(erro(caminho, f"{campo} '{item[campo]}' fora de {lista}"))
    erros += _lista(caminho, item, "numeros", ["valor", "legenda", "quemMediu"], 1, 5)
    erros += _lista(caminho, item, "fluxo", ["tipo", "nome", "faz"], 2, 6)
    erros += _lista(caminho, item, "indicadores", ["nome", "antes", "depois", "medida"], 0, 6)
    erros += _lista(caminho, item, "naoConta", ["valor", "texto"], 1, 3)
    erros += _lista(caminho, item, "licoes", ["titulo", "texto"], 2, 3)
    erros += _lista(caminho, item, "ficha", ["rotulo", "valor"], 3, 10)
    erros += _lista(caminho, item, "fontes", ["titulo", "origem", "url"], 1, 8)
    for f in item["fontes"]:
        if isinstance(f, dict) and not str(f.get("url", "")).startswith("https://"):
            erros.append(erro(caminho, f"fonte sem URL https: {f.get('url')}"))
    if "citacao" in item and set(item["citacao"]) != {"texto", "quem"}:
        erros.append(erro(caminho, "citacao tem exatamente: texto, quem"))
    if "imagem" in item:
        im = item["imagem"]
        if set(im) != {"arquivo", "alt", "modelo", "prompt"}:
            erros.append(erro(caminho, "imagem tem exatamente: arquivo, alt, modelo, prompt"))
        elif not (RAIZ / "site" / im["arquivo"]).exists():
            erros.append(erro(caminho, f"imagem não encontrada em site/{im['arquivo']}"))
    if re.search(r"\b(visitamos|entrevistamos|conversamos com)\b", item["comoApuramos"], re.I):
        erros.append(erro(caminho, "comoApuramos promete visita ou entrevista; casos de fontes públicas não podem"))
    return erros


TEMAS_ANALISE = ["OPERAÇÃO", "MERCADO", "CUSTO", "PESQUISA", "REGULAÇÃO"]

ESQUEMA_ANALISE = {
    "id": (str, True), "publicado_em": (str, True), "tema": (str, True),
    "titulo": (str, True), "linhaFina": (str, True),
    "frase": (str, True),               # frase de destaque para a listagem, presente no texto
    "leitura": (int, True),
    "tese": (list, True),               # exatamente 3 frases
    "p1": (str, True), "p2": (str, True), "h1": (str, True), "p3": (str, True), "p4": (str, True),
    "destaque": (str, True),            # citação em bloco; se for fala de alguém, com o nome
    "h2": (str, True), "p5": (str, True), "p6": (str, True), "h3": (str, True), "p7": (str, True),
    "pontos": (list, True),             # 3 {rotulo, titulo, texto}
    "contra": (str, True),              # "Onde posso estar errado"
    "fechamento": (str, True),          # "O que eu faria"
    "fontes": (list, True),             # >= 2 {titulo, origem, url}
    "baseadoEm": (list, False),         # ids de notas do Radar e casos de Na Operação usados
}


def valida_analise(caminho, item):
    erros = _campos(caminho, item, ESQUEMA_ANALISE)
    if erros:
        return erros
    if item["id"] != caminho.stem or not re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", item["id"]):
        erros.append(erro(caminho, "id deve ser kebab-case sem acento e igual ao nome do arquivo"))
    try:
        if datetime.fromisoformat(item["publicado_em"]).tzinfo is None:
            erros.append(erro(caminho, "publicado_em sem fuso horário"))
    except ValueError:
        erros.append(erro(caminho, "publicado_em não é ISO 8601"))
    if item["tema"] not in TEMAS_ANALISE:
        erros.append(erro(caminho, f"tema '{item['tema']}' fora de {TEMAS_ANALISE}"))
    if len(item["tese"]) != 3:
        erros.append(erro(caminho, "tese precisa de exatamente 3 frases"))
    erros += _lista(caminho, item, "pontos", ["rotulo", "titulo", "texto"], 3, 3)
    erros += _lista(caminho, item, "fontes", ["titulo", "origem", "url"], 2, 12)
    for f in item["fontes"]:
        if isinstance(f, dict) and not str(f.get("url", "")).startswith("https://"):
            erros.append(erro(caminho, f"fonte sem URL https: {f.get('url')}"))
    if len(item["contra"]) < 200:
        erros.append(erro(caminho, "'contra' (Onde posso estar errado) precisa argumentar de verdade: mínimo 200 caracteres"))
    return erros


ASSUNTOS_GUIA = ["CONTRATAÇÃO", "CUSTO", "MEDIÇÃO", "RISCO E LGPD", "INTEGRAÇÃO", "VOCABULÁRIO"]
FORMATOS_GUIA = ["PERGUNTAS", "CHECKLIST", "INDICADORES", "PASSO A PASSO", "GLOSSÁRIO"]

ESQUEMA_GUIA = {
    "id": (str, True), "publicado_em": (str, True), "atualizado_em": (str, True),
    "versao": (str, True),              # "1.0", "1.1" ... sobe a cada revisão publicada
    "emRevisao": (bool, False),         # true quando o editor marcou o guia para revisão
    "assunto": (str, True), "formato": (str, True),
    "titulo": (str, True), "linhaFina": (str, True),
    "resumo": (str, True),              # 1 a 2 frases para a listagem
    "leitura": (int, True),
    "paraQuem": (str, True), "comoUsar": (str, True), "abertura": (str, True),
    "itens": (list, True),              # 3 a 12 {curta, pergunta, porque, boa, ruim, anote}
    "fechamento": (str, True),
    "historico": (list, True),          # >= 1 {data, versao, texto}, mais recente primeiro
    "fontes": (list, True),             # >= 1 {titulo, origem, url}
}


def valida_guia(caminho, item):
    erros = _campos(caminho, item, ESQUEMA_GUIA)
    if erros:
        return erros
    if item["id"] != caminho.stem or not re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", item["id"]):
        erros.append(erro(caminho, "id deve ser kebab-case sem acento e igual ao nome do arquivo"))
    for campo in ("publicado_em", "atualizado_em"):
        try:
            if datetime.fromisoformat(item[campo]).tzinfo is None:
                erros.append(erro(caminho, f"{campo} sem fuso horário"))
        except ValueError:
            erros.append(erro(caminho, f"{campo} não é ISO 8601"))
    if not re.fullmatch(r"\d+\.\d+", item["versao"]):
        erros.append(erro(caminho, "versao no formato 1.0, 1.1, 2.0"))
    if item["assunto"] not in ASSUNTOS_GUIA:
        erros.append(erro(caminho, f"assunto '{item['assunto']}' fora de {ASSUNTOS_GUIA}"))
    if item["formato"] not in FORMATOS_GUIA:
        erros.append(erro(caminho, f"formato '{item['formato']}' fora de {FORMATOS_GUIA}"))
    erros += _lista(caminho, item, "itens", ["curta", "pergunta", "porque", "boa", "ruim", "anote"], 3, 12)
    erros += _lista(caminho, item, "historico", ["data", "versao", "texto"], 1, 50)
    erros += _lista(caminho, item, "fontes", ["titulo", "origem", "url"], 1, 15)
    for f in item["fontes"]:
        if isinstance(f, dict) and not str(f.get("url", "")).startswith("https://"):
            erros.append(erro(caminho, f"fonte sem URL https: {f.get('url')}"))
    if item["historico"] and isinstance(item["historico"][0], dict) and item["historico"][0].get("versao") != item["versao"]:
        erros.append(erro(caminho, "a primeira entrada do historico deve ser a versão atual"))
    return erros


def carrega(editoria, validador):
    pasta = FONTE / editoria
    pasta.mkdir(parents=True, exist_ok=True)
    itens, erros = [], []
    for caminho in sorted(pasta.glob("*.json")):
        try:
            item = json.loads(caminho.read_text(encoding="utf-8"))
        except json.JSONDecodeError as e:
            erros.append(erro(caminho, f"JSON inválido: {e}"))
            continue
        erros += validador(caminho, item)
        itens.append(item)
    ids = [i.get("id") for i in itens]
    for repetido in {i for i in ids if ids.count(i) > 1}:
        erros.append(f"{editoria}: id repetido '{repetido}'")
    itens.sort(key=lambda i: i.get("publicado_em", ""), reverse=True)
    return itens, erros


EDITORIAS = [("radar", "valida_radar", "notas"), ("na-operacao", "valida_caso", "casos"),
             ("analise", "valida_analise", "análises"),
             ("guia", "valida_guia", "guias")]


def main():
    so_checar = "--checar" in sys.argv
    resultados, erros = {}, []
    for editoria, validador, nome in EDITORIAS:
        itens, e = carrega(editoria, globals()[validador])
        resultados[editoria] = itens
        erros += e
    if erros:
        print("REPROVADO", file=sys.stderr)
        for e in erros:
            print("  " + e, file=sys.stderr)
        sys.exit(1)
    for editoria, _, nome in EDITORIAS:
        print(f"ok: {editoria} com {len(resultados[editoria])} {nome}")
    if so_checar:
        return
    SAIDA.mkdir(parents=True, exist_ok=True)
    for editoria, _, _ in EDITORIAS:
        chave = editoria.replace("-", "_")
        corpo = (
            "// Gerado por scripts/build_dados.py. Não edite à mão: edite conteudo/publicado/.\n"
            "window.AW_DADOS = window.AW_DADOS || {};\n"
            f"window.AW_DADOS.assinatura = {json.dumps(ASSINATURA, ensure_ascii=False)};\n"
            f"window.AW_DADOS.{chave} = {json.dumps(resultados[editoria], ensure_ascii=False, indent=1)};\n"
        )
        destino = SAIDA / f"{editoria}.js"
        destino.write_text(corpo, encoding="utf-8")
        print(f"gerado: {destino.relative_to(RAIZ)}")


if __name__ == "__main__":
    main()
