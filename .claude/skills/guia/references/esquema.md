# Esquema do guia

O validador é `scripts/build_dados.py` (função `valida_guia`). Em caso de divergência, vale o script.

| Campo | Tipo | Obrigatório | Regra |
|---|---|---|---|
| `id` | texto | sim | igual ao nome do arquivo, kebab-case sem acento |
| `publicado_em` | texto | sim | ISO 8601 com fuso; data da versão 1.0, não muda nas revisões |
| `atualizado_em` | texto | sim | ISO 8601 com fuso; data da versão atual |
| `versao` | texto | sim | `1.0`, `1.1`, `2.0` |
| `emRevisao` | booleano | não | só o editor marca; mostra "EM REVISÃO" na listagem |
| `assunto` | texto | sim | CONTRATAÇÃO, CUSTO, MEDIÇÃO, RISCO E LGPD, INTEGRAÇÃO, VOCABULÁRIO |
| `formato` | texto | sim | PERGUNTAS, CHECKLIST, INDICADORES, PASSO A PASSO, GLOSSÁRIO |
| `titulo`, `linhaFina` | texto | sim | título diz o que o guia entrega ("Sete perguntas para…") |
| `resumo` | texto | sim | 1 a 2 frases para a listagem |
| `leitura` | inteiro | sim | minutos |
| `paraQuem` | texto | sim | quem usa e o que precisa saber antes |
| `comoUsar` | texto | sim | como usar na prática (imprimir, levar à reunião, conferir) |
| `abertura` | texto | sim | por que este guia existe agora |
| `itens` | lista | sim | 3 a 12 `{curta, pergunta, porque, boa, ruim, anote}` |
| `fechamento` | texto | sim | o que fazer com as respostas |
| `historico` | lista | sim | `{data, versao, texto}`, mais recente primeiro; a primeira entrada tem a versão atual |
| `fontes` | lista | sim | 1 a 15 `{titulo, origem, url}`, url `https://` |

Exemplo de histórico depois de uma revisão:

```json
"versao": "1.1",
"historico": [
  {"data": "out/2026", "versao": "1.1", "texto": "item 04 atualizado: a Meta passou a cobrar por resposta de atendimento no WhatsApp Business desde 1º de outubro."},
  {"data": "out/2026", "versao": "1.0", "texto": "Publicação. Parte da nota do Radar \"<título da nota>\"."}
]
```

Nenhum outro campo é aceito.
