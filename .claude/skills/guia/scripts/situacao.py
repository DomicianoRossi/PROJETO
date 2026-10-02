#!/usr/bin/env python3
"""Diz o que a rodada do Guia deve fazer e mostra o material para isso.

    python .claude/skills/guia/scripts/situacao.py

1. Modo da rodada: GUIA NOVO + REVISÃO se o último guia novo saiu há 13 dias ou mais
   (ou se não há nenhum), senão SÓ REVISÃO.
2. Guias publicados: id, versão, data, assunto, itens (curtas) e fontes.
3. O que o Radar e a Na Operação publicaram desde a última atualização de cada guia:
   é o que pode exigir revisão.
"""
import json
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[4]
PUB = RAIZ / "conteudo" / "publicado"
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

agora = datetime.now(timezone.utc)


def ler(editoria):
    return [json.loads(p.read_text(encoding="utf-8")) for p in (PUB / editoria).glob("*.json")]


guias = sorted(ler("guia"), key=lambda g: g["publicado_em"], reverse=True)
if guias:
    dias = (agora - datetime.fromisoformat(guias[0]["publicado_em"])).days
    modo = "GUIA NOVO + REVISÃO" if dias >= 13 else "SÓ REVISÃO"
    print(f"== MODO DA RODADA: {modo} (último guia novo há {dias} dias: {guias[0]['id']})\n")
else:
    print("== MODO DA RODADA: GUIA NOVO + REVISÃO (nenhum guia publicado ainda)\n")

print(f"== GUIAS PUBLICADOS: {len(guias)}\n")
for g in guias:
    print(f"[{g['id']}] v{g['versao']} · atualizado {g['atualizado_em'][:10]} · {g['assunto']} · {g['formato']}")
    print(f"   {g['titulo']}")
    for i in g["itens"]:
        print(f"   - {i['curta']}")
    for f in g["fontes"]:
        print(f"   fonte: {f['origem']} — {f['url']}")
    print()

desde = min((datetime.fromisoformat(g["atualizado_em"]) for g in guias), default=agora - timedelta(days=14))
novos = [("RADAR", n["publicado_em"], n["titulo"], n["id"]) for n in ler("radar")] + \
        [("NA OPERAÇÃO", c["publicado_em"], c["titulo"], c["id"]) for c in ler("na-operacao")] + \
        [("ANÁLISE", a["publicado_em"], a["titulo"], a["id"]) for a in ler("analise")]
novos = sorted((x for x in novos if datetime.fromisoformat(x[1]) > desde), key=lambda x: x[1], reverse=True)
print(f"== PUBLICADO DESDE {desde.date()} (pode exigir revisão de guia): {len(novos)}\n")
for ed, quando, titulo, id_ in novos:
    print(f"{quando[:10]} · {ed} · {titulo}  [{id_}]")
