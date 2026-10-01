#!/usr/bin/env python3
"""Lista as notas do Radar já publicadas, para a rodada não repetir pauta.

    python .claude/skills/radar/scripts/existentes.py

Imprime, da mais recente para a mais antiga: data, id, tema, título e as URLs
de fonte. No fim, a data da nota mais recente (início da janela de busca).
"""
import json
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[4]
PASTA = RAIZ / "conteudo" / "publicado" / "radar"

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

notas = []
for caminho in PASTA.glob("*.json"):
    try:
        notas.append(json.loads(caminho.read_text(encoding="utf-8")))
    except json.JSONDecodeError:
        print(f"aviso: {caminho.name} não é JSON válido", file=sys.stderr)

notas.sort(key=lambda n: n.get("publicado_em", ""), reverse=True)
print(f"{len(notas)} notas publicadas em {PASTA.relative_to(RAIZ)}\n")
for n in notas:
    print(f"{n.get('publicado_em', '?')[:16]}  {n.get('id')}  [{n.get('tema')}]")
    print(f"    {n.get('titulo')}")
    for f in n.get("fontes", []):
        print(f"    - {f.get('url')}")
print()
print("mais recente:", notas[0]["publicado_em"] if notas else "nenhuma (janela: últimos 7 dias)")
