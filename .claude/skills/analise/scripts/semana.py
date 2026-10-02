#!/usr/bin/env python3
"""Imprime o material publicado nos últimos N dias (padrão 7) no Radar e na Na Operação,
para a análise da semana partir do que o site já apurou.

    python .claude/skills/analise/scripts/semana.py [dias]
"""
import json
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[4]
PUB = RAIZ / "conteudo" / "publicado"
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

dias = int(sys.argv[1]) if len(sys.argv) > 1 else 7
limite = datetime.now(timezone.utc) - timedelta(days=dias)


def recentes(editoria):
    itens = []
    for p in (PUB / editoria).glob("*.json"):
        d = json.loads(p.read_text(encoding="utf-8"))
        if datetime.fromisoformat(d["publicado_em"]) >= limite:
            itens.append(d)
    return sorted(itens, key=lambda d: d["publicado_em"], reverse=True)


radar = recentes("radar")
print(f"== RADAR: {len(radar)} notas nos últimos {dias} dias\n")
for n in radar:
    print(f"[{n['id']}] {n['publicado_em'][:10]} · {n['tema']} · {n['titulo']}")
    for r in n["resumo"]:
        print(f"   - {r}")
    for f in n["fontes"]:
        print(f"   fonte: {f['origem']} — {f['url']}")
    print()

casos = recentes("na-operacao")
print(f"== NA OPERAÇÃO: {len(casos)} casos nos últimos {dias} dias\n")
for c in casos:
    print(f"[{c['id']}] {c['publicado_em'][:10]} · {c['empresa']} · {c['titulo']}")
    for n in c["numeros"]:
        print(f"   - {n['valor']} {n['legenda']} (medido por: {n['quemMediu']})")
    for n in c["naoConta"]:
        print(f"   não conta: {n['valor']}: {n['texto']}")
    for f in c["fontes"]:
        print(f"   fonte: {f['origem']} — {f['url']}")
    print()
