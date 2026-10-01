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


def carrega(editoria, validador):
    pasta = FONTE / editoria
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


def main():
    so_checar = "--checar" in sys.argv
    radar, erros = carrega("radar", valida_radar)
    if erros:
        print("REPROVADO", file=sys.stderr)
        for e in erros:
            print("  " + e, file=sys.stderr)
        sys.exit(1)
    print(f"ok: radar com {len(radar)} notas")
    if so_checar:
        return
    SAIDA.mkdir(parents=True, exist_ok=True)
    corpo = (
        "// Gerado por scripts/build_dados.py. Não edite à mão: edite conteudo/publicado/.\n"
        "window.AW_DADOS = window.AW_DADOS || {};\n"
        f"window.AW_DADOS.assinatura = {json.dumps(ASSINATURA, ensure_ascii=False)};\n"
        f"window.AW_DADOS.radar = {json.dumps(radar, ensure_ascii=False, indent=1)};\n"
    )
    (SAIDA / "radar.js").write_text(corpo, encoding="utf-8")
    print(f"gerado: {(SAIDA / 'radar.js').relative_to(RAIZ)}")


if __name__ == "__main__":
    main()
