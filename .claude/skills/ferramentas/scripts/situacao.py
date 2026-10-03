#!/usr/bin/env python3
"""Diz se a rodada de Ferramentas deve produzir uma avaliação e mostra o material.

    python .claude/skills/ferramentas/scripts/situacao.py

1. Semana de avaliação se a última saiu há 13 dias ou mais (ou se não há nenhuma).
2. Avaliações publicadas: id, data, tipo, categoria e ferramentas.
3. Títulos do Radar, Na Operação e Análise das últimas 4 semanas (de onde partir).
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
    pasta = PUB / editoria
    return [json.loads(p.read_text(encoding="utf-8")) for p in pasta.glob("*.json")] if pasta.exists() else []


itens = sorted(ler("ferramentas"), key=lambda a: a["publicado_em"], reverse=True)
if itens:
    dias = (agora - datetime.fromisoformat(itens[0]["publicado_em"])).days
    modo = "SEMANA DE AVALIAÇÃO" if dias >= 13 else "SEM AVALIAÇÃO NESTA SEMANA (não abrir PR)"
    print(f"== {modo} (última há {dias} dias: {itens[0]['id']})\n")
else:
    print("== SEMANA DE AVALIAÇÃO (nenhuma publicada ainda)\n")

print(f"== AVALIAÇÕES PUBLICADAS: {len(itens)}\n")
for a in itens:
    nomes = ", ".join(f["nome"] for f in a["ferramentas"])
    print(f"[{a['id']}] {a['publicado_em'][:10]} · {a['tipo']} · {a['categoria']}\n   {a['titulo']}\n   {nomes}\n")

desde = agora - timedelta(days=28)
pub = [("RADAR", n["publicado_em"], n["titulo"]) for n in ler("radar")] + \
      [("NA OPERAÇÃO", c["publicado_em"], c["titulo"]) for c in ler("na-operacao")] + \
      [("ANÁLISE", a["publicado_em"], a["titulo"]) for a in ler("analise")]
pub = sorted((x for x in pub if datetime.fromisoformat(x[1]) > desde), key=lambda x: x[1], reverse=True)
print(f"== PUBLICADO NAS ÚLTIMAS 4 SEMANAS: {len(pub)}\n")
for ed, quando, titulo in pub:
    print(f"{quando[:10]} · {ed} · {titulo}")
