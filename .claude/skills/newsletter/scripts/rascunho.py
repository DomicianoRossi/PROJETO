#!/usr/bin/env python3
"""Valida a edição, monta o e-mail e cria um RASCUNHO no Buttondown.

    python .claude/skills/newsletter/scripts/rascunho.py edicao.json            # cria o rascunho
    python .claude/skills/newsletter/scripts/rascunho.py edicao.json --previa   # só gera previa.html

Títulos, links, fontes e datas vêm dos JSON publicados (pelo id); a edição só traz
o texto da abertura e os resumos. Nunca envia: cria com status "draft", e a chave
usada não tem permissão de envio. Lê BUTTONDOWN_API_KEY do ambiente ou de ~/api_keys.env.
"""
import html
import json
import os
import re
import sys
import urllib.request
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[4]
PUB = RAIZ / "conteudo" / "publicado"
SITE = "https://www.agenticway.com.br/"
API = "https://api.buttondown.com/v1/emails"
ASSINATURA = "Apurado e escrito por agentes AgenticWay · editor responsável: Domiciano Rossi"
PAGINAS = {"radar": "Radar", "na-operacao": "Na%20Operacao", "analise": "Analise",
           "guia": "Guia", "ferramentas": "Ferramentas"}
NOMES = {"radar": "RADAR", "na-operacao": "NA OPERAÇÃO", "analise": "ANÁLISE",
         "guia": "GUIA", "ferramentas": "FERRAMENTAS"}
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

NAVY, AZUL, CORAL, CINZA, LINHA = "#0F2A44", "#1F4E79", "#E8785A", "#5B6572", "#DDD9D0"
SERIF = "Georgia,'Times New Roman',serif"
SANS = "Arial,Helvetica,sans-serif"
MONO = "'Courier New',Courier,monospace"


def erro(msg):
    sys.exit(f"ERRO: {msg}")


def item(editoria, id_):
    p = PUB / editoria / f"{id_}.json"
    if not p.exists():
        erro(f"{editoria}/{id_} não existe em conteudo/publicado")
    return json.loads(p.read_text(encoding="utf-8"))


def url(editoria, id_):
    return f"{SITE}AgenticWay%20{PAGINAS[editoria]}%20Artigo.dc.html?id={id_}"


def e(s):
    return html.escape(s, quote=True)


def valida(ed):
    obrig = {"assunto": 60, "preheader": 110, "abertura": 900}
    for campo, limite in obrig.items():
        if not isinstance(ed.get(campo), str) or not ed[campo].strip():
            erro(f"campo '{campo}' obrigatório")
        if len(ed[campo]) > limite:
            erro(f"'{campo}' tem {len(ed[campo])} caracteres; limite {limite}")
    fatos = ed.get("fatos")
    if not isinstance(fatos, list) or not 3 <= len(fatos) <= 5:
        erro("'fatos': de 3 a 5 notas do Radar")
    for f in fatos:
        if set(f) != {"id", "texto"} or len(f["texto"]) > 320:
            erro("cada fato tem só 'id' e 'texto' (até 320 caracteres)")
    for chave, editoria in (("caso", "na-operacao"), ("opiniao", "analise")):
        if ed.get(chave) is not None and (set(ed[chave]) != {"id", "texto"} or len(ed[chave]["texto"]) > 600):
            erro(f"'{chave}' tem só 'id' e 'texto' (até 600 caracteres), ou é null")
    tambem = ed.get("tambem") or []
    if len(tambem) > 4:
        erro("'tambem': no máximo 4 itens")
    for t in tambem:
        if set(t) != {"editoria", "id"} or t["editoria"] not in PAGINAS:
            erro(f"'tambem': itens {{editoria: {'|'.join(PAGINAS)}, id}}")
        item(t["editoria"], t["id"])
    # todo número escrito num resumo precisa estar no item publicado que ele resume
    resumos = [("radar", f["id"], f["texto"]) for f in fatos]
    resumos += [(ed_, ed[c]["id"], ed[c]["texto"]) for c, ed_ in (("caso", "na-operacao"), ("opiniao", "analise")) if ed.get(c)]
    for editoria, id_, t in resumos:
        fonte = json.dumps(item(editoria, id_), ensure_ascii=False)
        faltam = [n for n in re.findall(r"\d[\d.,]*\d|\d", t) if n not in fonte]
        if faltam:
            erro(f"{id_}: números que não estão no item publicado: {faltam}")
    texto = " ".join([ed["abertura"]] + [f["texto"] for f in fatos])
    for proibido in ("!", "🚀", "revolucion", "game changer", "disruptiv"):
        if proibido in texto.lower():
            erro(f"tom: retire '{proibido}' (sem exclamação, sem hype)")


def bloco_titulo(rotulo):
    return (f'<p style="margin:32px 0 12px;padding-top:16px;border-top:1px solid {LINHA};'
            f'font-family:{MONO};font-size:12px;letter-spacing:1px;color:{CINZA}">{rotulo}</p>')


def monta(ed, numero):
    partes = [
        f'<div style="max-width:600px;margin:0 auto;font-family:{SERIF};color:#1A2733;font-size:16px;line-height:1.6">',
        f'<p style="margin:0 0 16px;font-family:{MONO};font-size:12px;color:{CINZA}">EDIÇÃO {numero} · A SEMANA DOS AGENTES DE IA, PARA QUEM DECIDE</p>',
    ]
    for par in ed["abertura"].split("\n\n"):
        partes.append(f'<p style="margin:0 0 14px">{e(par.strip())}</p>')

    partes.append(bloco_titulo(f"{len(ed['fatos'])} FATOS DA SEMANA"))
    for n, f in enumerate(ed["fatos"], 1):
        d = item("radar", f["id"])
        partes.append(
            f'<p style="margin:0 0 18px"><span style="font-family:{MONO};font-size:12px;color:{CORAL if n == 1 else CINZA}">{n:02d}</span> '
            f'<strong style="font-family:{SANS};color:{NAVY}">{e(d["titulo"])}</strong><br>'
            f'{e(f["texto"])} <span style="font-family:{MONO};font-size:11px;color:{CINZA}">Fonte: {e(d.get("fontePrimaria", ""))} · </span>'
            f'<a href="{url("radar", f["id"])}" style="font-size:14px;color:{AZUL}">Ler a nota →</a></p>')

    if ed.get("caso"):
        d = item("na-operacao", ed["caso"]["id"])
        partes += [bloco_titulo(f"UM CASO · {e(d['setor'])}"),
                   f'<p style="margin:0 0 8px;font-family:{SANS};font-weight:700;font-size:18px;color:{NAVY}">{e(d["titulo"])}</p>',
                   f'<p style="margin:0 0 8px">{e(ed["caso"]["texto"])}</p>',
                   f'<p style="margin:0"><a href="{url("na-operacao", d["id"])}" style="color:{AZUL}">Ler o caso completo →</a></p>']

    if ed.get("opiniao"):
        d = item("analise", ed["opiniao"]["id"])
        partes += [bloco_titulo("UMA OPINIÃO"),
                   f'<p style="margin:0 0 8px;font-family:{SANS};font-weight:700;font-size:18px;color:{NAVY}">{e(d["titulo"])}</p>',
                   f'<p style="margin:0 0 8px">{e(ed["opiniao"]["texto"])}</p>',
                   f'<p style="margin:0"><a href="{url("analise", d["id"])}" style="color:{AZUL}">Ler a análise →</a></p>']

    if ed.get("tambem"):
        partes.append(bloco_titulo("TAMBÉM NO SITE"))
        for t in ed["tambem"]:
            d = item(t["editoria"], t["id"])
            partes.append(f'<p style="margin:0 0 8px"><span style="font-family:{MONO};font-size:11px;color:{CINZA}">{NOMES[t["editoria"]]}</span> '
                          f'{e(d["titulo"])} <a href="{url(t["editoria"], d["id"])}" style="font-size:14px;color:{AZUL}">Ler →</a></p>')

    partes += [
        f'<p style="margin:36px 0 0;padding:16px;border:1px solid {LINHA};font-size:14px;color:#3C4A5A">'
        f'<span style="font-family:{MONO};font-size:11px;color:{CINZA}">PARA EMPRESAS</span><br>'
        f'Quer avaliar isso no seu processo? Quem faz esta newsletter também integra IA aos processos que a empresa já usa. '
        f'<a href="{SITE}AgenticWay%20Para%20Empresas.dc.html" style="color:{AZUL}">Diagnóstico de Oportunidades com IA →</a></p>',
        f'<p style="margin:24px 0 0;font-family:{MONO};font-size:11px;color:{CINZA};line-height:1.6">{ASSINATURA}.<br>'
        f'Achou útil? Encaminhe para quem decide. Recebeu de alguém? <a href="{SITE}" style="color:{CINZA}">Assine em agenticway.com.br</a>.</p>',
        '</div>',
    ]
    # uma linha por bloco, sem recuo: o Buttondown lê o corpo como Markdown com HTML
    # o comentário abre o rascunho no editor de Markdown do Buttondown, que aceita o HTML como está
    return "<!-- buttondown-editor-mode: plaintext -->\n\n" + "\n\n".join(partes)


def chave():
    k = os.environ.get("BUTTONDOWN_API_KEY")
    if not k:
        arq = Path.home() / "api_keys.env"
        if arq.exists():
            for linha in arq.read_text(encoding="utf-8").splitlines():
                if linha.startswith("BUTTONDOWN_API_KEY="):
                    k = linha.split("=", 1)[1].strip().strip('"')
    if not k:
        erro("BUTTONDOWN_API_KEY não encontrada (ambiente ou ~/api_keys.env)")
    return k


def pede(metodo, endereco, k, corpo=None):
    req = urllib.request.Request(endereco, method=metodo,
                                 data=json.dumps(corpo).encode() if corpo else None,
                                 headers={"Authorization": f"Token {k}", "Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read() or b"{}")


def situacao(k):
    """Número da próxima edição (só conta o que foi enviado ou agendado) e rascunhos já existentes."""
    enviados, rascunhos, endereco = 0, [], API
    while endereco:
        d = pede("GET", endereco, k)
        for x in d.get("results", []):
            if x.get("status") in ("sent", "about_to_send", "scheduled", "in_flight"):
                enviados += 1
            elif x.get("status") == "draft":
                rascunhos.append(x.get("subject"))
        endereco = d.get("next")
    return enviados + 1, rascunhos


def main():
    if len(sys.argv) < 2:
        erro("uso: rascunho.py edicao.json [--previa]")
    ed = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
    valida(ed)
    previa = "--previa" in sys.argv
    k = None if previa else chave()
    numero, rascunhos = (1, []) if previa else situacao(k)
    if rascunhos and "--novo" not in sys.argv:
        erro(f"já há rascunho no Buttondown ({'; '.join(map(str, rascunhos))}). O editor decide se apaga; "
             "para criar outro mesmo assim, rode com --novo")
    corpo = monta(ed, numero)
    destino = Path(sys.argv[1]).with_name("previa.html")
    destino.write_text(f'<!doctype html><meta charset="utf-8"><title>{e(ed["assunto"])}</title>'
                       f'<body style="background:#F7F5F0;padding:24px">{corpo}</body>', encoding="utf-8")
    print(f"prévia: {destino}")
    if previa:
        return
    r = pede("POST", API, k, {"subject": ed["assunto"], "body": corpo, "description": ed["preheader"], "status": "draft"})
    print(f"RASCUNHO CRIADO (não enviado): edição {numero} · {r.get('subject')} · id {r.get('id')} · status {r.get('status')}")
    print("Revise e envie em https://buttondown.com/emails")


if __name__ == "__main__":
    main()
