#!/usr/bin/env python3
"""Lista o que a AgenticWay publicou nos últimos 7 dias, para montar a newsletter de sexta.

    python .claude/skills/newsletter/scripts/semana.py

Mostra, por editoria, id, data, título e os campos que a edição usa. Itens com data
futura (agendados) não entram.
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
desde = agora - timedelta(days=7)

EDITORIAS = [("radar", "RADAR"), ("na-operacao", "NA OPERAÇÃO"), ("analise", "ANÁLISE"),
             ("guia", "GUIA"), ("ferramentas", "FERRAMENTAS")]

print(f"== SEMANA: {desde:%d/%m %H:%M} a {agora:%d/%m %H:%M} (UTC)\n")
total = 0
for pasta, nome in EDITORIAS:
    itens = []
    for p in (PUB / pasta).glob("*.json"):
        d = json.loads(p.read_text(encoding="utf-8"))
        quando = datetime.fromisoformat(d.get("atualizado_em") if pasta == "guia" else d["publicado_em"])
        if desde < quando <= agora:
            itens.append((quando, d))
    itens.sort(key=lambda x: x[0], reverse=True)
    print(f"== {nome}: {len(itens)}")
    for quando, d in itens:
        total += 1
        print(f"[{d['id']}] {quando:%d/%m} · {d['titulo']}")
        for campo in ("linhaFina", "linha", "resumo", "fontePrimaria", "frase", "versao"):
            v = d.get(campo)
            if v:
                print(f"   {campo}: {v if isinstance(v, str) else ' '.join(v)}")
    print()
print(f"== TOTAL: {total} itens")
