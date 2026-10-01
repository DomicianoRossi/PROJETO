# Esquema da nota do Radar

O validador é `scripts/build_dados.py` (função `valida_radar`). Em caso de divergência entre este arquivo e o script, vale o script.

| Campo | Tipo | Obrigatório | Regra |
|---|---|---|---|
| `id` | texto | sim | igual ao nome do arquivo, kebab-case sem acento |
| `publicado_em` | texto | sim | ISO 8601 com fuso, hora da rodada: `2026-10-02T09:15:00-03:00` |
| `tema` | texto | sim | REGULAÇÃO, LANÇAMENTOS, CASOS, PESQUISA ou MERCADO |
| `titulo` | texto | sim | o fato, atribuído quando for afirmação de alguém |
| `linha` | texto | sim | 1 a 2 frases para a listagem |
| `linhaFina` | texto | sim | subtítulo da página da nota |
| `fontePrimaria` | texto | sim | quem originou o fato: "Dataiku / The Harris Poll", "BCB" |
| `leitura` | inteiro | sim | minutos de leitura, normalmente 2 a 4 |
| `resumo` | lista de textos | sim | 2 a 4 frases, os fatos centrais |
| `corpo` | lista de textos | sim | 2 a 5 parágrafos: contexto, dados, quem disse |
| `consequencias` | lista | sim | 2 a 3 objetos `{rotulo, titulo, texto}`; rótulo no formato `01 · PALAVRA` |
| `oQueFazer` | lista de textos | não | 0 a 3 parágrafos práticos; sem ele, a seção some da página |
| `fontes` | lista | sim | ao menos 1 objeto `{titulo, origem, url}`, url começando por `https://` |
| `ficha` | lista | não | objetos `{rotulo, valor}`: Quem mediu, Amostra, Divulgação, Confirmação… |
| `datas` | lista | não | objetos `{quando, evento}` para prazos futuros (consulta pública, vigência) |

Nenhum outro campo é aceito.

## Exemplo completo

```json
{
  "id": "dataiku-cios-desativaram-agentes",
  "publicado_em": "2026-10-01T17:20:00-03:00",
  "tema": "PESQUISA",
  "titulo": "Quase metade dos CIOs já desativou mais de 20 agentes de IA neste ano",
  "linha": "Pesquisa da Dataiku com 685 CIOs: 47% desligaram mais de 20 agentes, e 72% não conseguem confirmar se os agentes entregam o resultado pretendido.",
  "linhaFina": "Pesquisa da Dataiku com a Harris Poll ouviu 685 CIOs em oito países. 84% dizem que funcionários criam agentes mais rápido do que a TI consegue governar.",
  "fontePrimaria": "Dataiku / The Harris Poll",
  "leitura": 3,
  "resumo": [
    "47% dos CIOs ouvidos desativaram mais de 20 agentes neste ano.",
    "72% não conseguem confirmar de forma consistente se os agentes entregam o resultado de negócio pretendido.",
    "81% não têm visibilidade completa sobre agentes criados fora dos sistemas aprovados, e 84% dizem que funcionários criam agentes mais rápido do que a TI consegue governar."
  ],
  "corpo": [
    "A Dataiku, empresa de plataforma de IA, divulgou em 24 de setembro a edição para CIOs do seu Global AI Confessions Report. A pesquisa foi feita pela The Harris Poll entre 9 e 29 de julho com 685 CIOs nos Estados Unidos, Reino Unido, França, Alemanha, Emirados Árabes, Japão, Coreia do Sul e Singapura.",
    "O dado que mais chama atenção é o de desligamento: 47% dos CIOs desativaram mais de 20 agentes neste ano. Ao mesmo tempo, 67% estimam ter mais de 51 agentes rodando em produção, e 83% não têm gestão padronizada do ciclo de vida desses agentes.",
    "A pesquisa também mede pressão por resultado: 72% dizem que o orçamento de IA pode ser cortado se as metas não forem atingidas até o fim de 2026."
  ],
  "consequencias": [
    {
      "rotulo": "01 · INVENTÁRIO",
      "titulo": "Saber quantos agentes existem vem antes de criar o próximo",
      "texto": "Se a TI não enxerga os agentes criados fora dos sistemas aprovados, não consegue medir nem desligar o que não funciona."
    },
    {
      "rotulo": "02 · MEDIDA",
      "titulo": "Agente sem métrica de resultado vira candidato a desligamento",
      "texto": "A dificuldade de confirmar resultado aparece na mesma pesquisa que o volume de agentes desativados."
    },
    {
      "rotulo": "03 · FONTE",
      "titulo": "Quem publica vende governança",
      "texto": "A Dataiku vende plataforma de gestão de IA. Os números podem estar certos e ainda assim favorecer quem os divulgou."
    }
  ],
  "oQueFazer": [
    "Para quem já tem agentes em uso, o primeiro passo indicado pelos próprios números é o inventário: quantos existem, quem criou, que sistemas acessam e qual resultado cada um deveria entregar."
  ],
  "fontes": [
    {
      "titulo": "Global AI Confessions Report: CIO Edition 2026",
      "origem": "Dataiku · comunicado · 24 set 2026",
      "url": "https://www.dataiku.com/company/news/global-ai-confessions-report-cio-edition-2026"
    }
  ],
  "ficha": [
    {
      "rotulo": "Quem mediu",
      "valor": "Dataiku, com The Harris Poll"
    },
    {
      "rotulo": "Amostra",
      "valor": "685 CIOs em 8 países"
    },
    {
      "rotulo": "Campo",
      "valor": "9 a 29 de julho de 2026"
    },
    {
      "rotulo": "Divulgação",
      "valor": "24 set 2026"
    }
  ]
}
```
