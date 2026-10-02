# Esquema do caso de Na Operação

O validador é `scripts/build_dados.py` (função `valida_caso`). Em caso de divergência, vale o script.

| Campo | Tipo | Obrigatório | Regra |
|---|---|---|---|
| `id` | texto | sim | igual ao nome do arquivo, kebab-case sem acento |
| `publicado_em` | texto | sim | ISO 8601 com fuso, hora da rodada: `2026-10-05T08:30:00-03:00` |
| `setor` | texto | sim | DISTRIBUIÇÃO, INDÚSTRIA, LOGÍSTICA, COMÉRCIO EXTERIOR, VAREJO, SERVIÇOS, SAÚDE, FINANÇAS, AGRO, TECNOLOGIA |
| `processo` | texto | sim | FATURAMENTO, COMERCIAL, FISCAL, ESTOQUE, ATENDIMENTO, FINANCEIRO, COMPRAS, RH, JURÍDICO, OPERAÇÃO |
| `status` | texto | sim | `em-operacao`, `piloto` ou `parou` |
| `empresa` | texto | sim | nome da empresa do caso |
| `titulo` | texto | sim | o fato; atribui quando o número é só do fornecedor |
| `linhaFina` | texto | sim | subtítulo, inclui o que a história não conta |
| `resumo` | texto | sim | 1 a 2 frases para a listagem |
| `leitura` | inteiro | sim | minutos, normalmente 4 a 7 |
| `abertura` | texto | sim | quem é a empresa e qual era a situação |
| `problema` | texto | sim | o gargalo antes do agente |
| `solucao` | texto | sim | o que o agente faz, em que sistema, com que entrada e saída |
| `resultado` | texto | sim | o que mudou, com números e quem mediu |
| `humano` | texto | não | o que continua com pessoas; sem ele, a seção some |
| `citacao` | objeto | não | `{texto, quem}`, fala publicada na fonte |
| `numeros` | lista | sim | 1 a 5 `{valor, legenda, quemMediu}`; o primeiro vai para a capa e a listagem |
| `fluxo` | lista | sim | 2 a 6 `{tipo, nome, faz}`; tipo em ENTRADA, AGENTE, SISTEMA, SAÍDA, EXCEÇÃO |
| `indicadores` | lista | não | `{nome, antes, depois, medida}`; só com os dois valores na fonte |
| `naoConta` | lista | sim | 1 a 3 `{valor, texto}`: o que a fonte omite (ex.: `{"valor": "Custo", "texto": "não divulgado pela empresa nem pelo fornecedor."}`) |
| `licoes` | lista | sim | 2 a 3 `{titulo, texto}` |
| `ficha` | lista | sim | 3 a 10 `{rotulo, valor}`: Empresa, Setor, Processo, Sistema, Quem fez, Status, Divulgação |
| `comoApuramos` | texto | sim | fontes reais com datas; termina dizendo que não houve visita nem entrevista; não pode conter "visitamos", "entrevistamos", "conversamos com" |
| `transparencia` | texto | sim | relação de quem publicou com o resultado |
| `fontes` | lista | sim | 1 a 8 `{titulo, origem, url}`, url `https://` |
| `imagem` | objeto | não | `{arquivo, alt, modelo, prompt}`; arquivo relativo a `site/`, precisa existir |

Nenhum outro campo é aceito.
