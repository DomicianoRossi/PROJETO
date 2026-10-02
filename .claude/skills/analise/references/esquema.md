# Esquema da análise

O validador é `scripts/build_dados.py` (função `valida_analise`). Em caso de divergência, vale o script.

| Campo | Tipo | Regra |
|---|---|---|
| `id` | texto | igual ao nome do arquivo, kebab-case sem acento |
| `publicado_em` | texto | ISO 8601 com fuso; use a data de publicação que o `semana.py` imprime, às 07:00 (`2026-10-09T07:00:00-03:00`) |
| `tema` | texto | OPERAÇÃO, MERCADO, CUSTO, PESQUISA ou REGULAÇÃO |
| `titulo`, `linhaFina`, `frase` | texto | ver SKILL.md |
| `leitura` | inteiro | 4 a 6 |
| `tese` | lista | exatamente 3 frases |
| `p1`…`p7`, `h1`…`h3`, `destaque` | texto | corpo em três seções |
| `pontos` | lista | exatamente 3 `{rotulo, titulo, texto}` |
| `contra` | texto | "Onde posso estar errado", mínimo 200 caracteres |
| `fechamento` | texto | "O que eu faria" |
| `fontes` | lista | 2 a 12 `{titulo, origem, url}`, url `https://` |
| `baseadoEm` | lista | opcional: ids de notas e casos usados |

Nenhum outro campo é aceito.

## Exemplo publicado

```json
{
  "id": "agente-funciona-planilha-nao",
  "publicado_em": "2026-09-30T18:00:00-03:00",
  "tema": "CUSTO",
  "titulo": "O agente funciona. A planilha que o aprovou, não.",
  "linhaFina": "Noventa por cento das empresas vão aumentar o orçamento de IA de novo. Quase 40% das que mediram o resultado economizaram 10% ou menos. O problema está na conta feita antes do agente.",
  "frase": "\"Diminuir em 30% o esforço de uma tarefa não significa reduzir em 30% o custo do processo.\" — Lucas Brossi, Bain & Company",
  "leitura": 4,
  "tese": [
    "O business case do agente supõe automação total. Na operação, quase todo agente tem alguém aprovando, revisando ou tratando exceção.",
    "Tempo economizado não vira custo reduzido sozinho. Se ninguém decidiu o que fazer com as horas liberadas, elas somem.",
    "Desligar agente virou rotina nas empresas grandes. Isso só é aprendizado se alguém mediu o que ele deveria entregar."
  ],
  "p1": "Noventa por cento das empresas vão aumentar o orçamento de automação e IA de novo. Entre as que mediram o resultado, quase 40% economizaram entre 0% e 10%, quando a meta mais comum era cortar de 11% a 20%. Os dois números são da mesma pesquisa da Bain & Company, de 2026, com 951 empresas.",
  "p2": "Continuar investindo depois de um retorno abaixo do plano não é, por si, irracional. A tecnologia melhora, e ninguém quer ser a empresa que parou cedo. O que me interessa é outra coisa: por que a conta errou para baixo em tantas empresas ao mesmo tempo. A resposta aparece na mesma pesquisa.",
  "h1": "A planilha prevê um agente que quase ninguém usa",
  "p3": "Só 7% das empresas pesquisadas pela Bain rodam agentes totalmente autônomos em produção. Outras 38% usam agentes que dependem de aprovação humana, e 32% trabalham com barreiras e tratamento de exceções, em que uma pessoa assume quando o agente não consegue decidir com segurança.",
  "p4": "Lucas Brossi, sócio da Bain para a América do Sul, descreve o erro assim: o business case \"frequentemente pressupõe uma automação maior do que a disponível e subestima revisão humana, retrabalho, integração\". O investimento é aprovado com a economia de um agente que trabalha sozinho, e a operação continua pagando por quem o supervisiona.",
  "destaque": "\"Diminuir em 30% o esforço de uma tarefa não significa reduzir em 30% o custo do processo.\" — Lucas Brossi, Bain & Company",
  "h2": "O custo que não tem linha na planilha",
  "p5": "A revisão humana não é um detalhe residual. Numa pesquisa da Collibra com a Harris Poll, com mais de 300 decisores de dados e IA nos Estados Unidos, pouco mais da metade disse gastar horas significativas da equipe revisando e corrigindo o que os agentes produzem antes de ir ao ar. Nas empresas com mais de US$ 100 milhões de receita, a proporção é de 64%.",
  "p6": "Essa supervisão, na maioria dos casos, é desenho correto: decisão com impacto financeiro ou dado sensível deve passar por uma pessoa. O erro está em aprovar o projeto como se ela não existisse. Um agente que precisa de aprovação humana pode valer muito a pena. Só não vale o que a planilha de automação total prometia.",
  "h3": "Desligar agente virou rotina",
  "p7": "Em julho, a Dataiku e a Harris Poll ouviram 685 CIOs em oito países. 47% desativaram mais de 20 agentes neste ano, e 72% não conseguem confirmar com consistência se os agentes entregam o resultado de negócio pretendido. No Brasil, numa pesquisa sobre IA no atendimento ao cliente, a Sinch encontrou 76% das empresas pesquisadas com agentes em produção, e 80% que já precisaram interromper ou reverter alguma implementação por questões de governança.",
  "contra": "Quase todos os números deste texto vêm de empresas que vendem a solução para o problema que a própria pesquisa aponta. Dataiku e Collibra vendem plataforma de governança; a Collibra lançou produtos para reduzir o que chama de \"imposto da alucinação\" na mesma semana em que publicou a pesquisa. A Bain vende consultoria de transformação. Os dados podem estar certos e ainda assim terem sido recortados para favorecer quem os publicou. Também é possível que o retorno baixo seja só questão de tempo. Na mesma pesquisa da Sinch, o grupo com governança mais madura foi o que mais reverteu agentes, e tanto a Sinch quanto um analista do Gartner leram isso como detecção de problema mais cedo, não como fracasso. Se estiverem certos, parte dos 40% que economizaram pouco está no meio do caminho, não no fim dele.",
  "fechamento": "Antes de aprovar o próximo agente, eu refaria a conta com três linhas que costumam faltar: o custo da revisão humana, o destino do tempo liberado e o critério de desligamento. Se o projeto ainda se paga com essas linhas, ele é bom. Se só se paga sem elas, o problema nunca foi o agente.",
  "pontos": [
    {
      "rotulo": "01 · REVISÃO",
      "titulo": "Quanto de revisão vai sobrar",
      "texto": "Antes de aprovar, estime quantas saídas do agente vão precisar de uma pessoa e quanto custa essa hora. Se a resposta for \"nenhuma\", desconfie."
    },
    {
      "rotulo": "02 · TEMPO LIBERADO",
      "titulo": "Para onde vai o tempo liberado",
      "texto": "Mais vendas, menos terceirizado, equipe realocada. Se ninguém decidiu, o ganho de produtividade não chega ao resultado."
    },
    {
      "rotulo": "03 · DESLIGAMENTO",
      "titulo": "O que faz o agente ser desligado",
      "texto": "Defina antes qual métrica, abaixo de qual valor, encerra o agente. Sem isso, desligar é só desistir."
    }
  ],
  "fontes": [
    {
      "titulo": "Your AI Budget Is Growing. Your Returns Aren't. Here's Why",
      "origem": "Bain & Company · pesquisa, n=951 · 2026",
      "url": "https://www.bain.com/insights/your-ai-budget-is-growing-your-returns-arent-heres-why/"
    },
    {
      "titulo": "Por que as empresas estão obtendo menos retorno do que esperavam com IA?",
      "origem": "Forbes Brasil · set/2026",
      "url": "https://forbes.com.br/forbes-money/2026/09/investimentos-ia-retorno-empresas/"
    },
    {
      "titulo": "Collibra Survey Finds 76% of Organizations Hit Roadblocks Scaling AI Agents",
      "origem": "Collibra / Harris Poll · set/2026",
      "url": "https://www.hpcwire.com/bigdatawire/this-just-in/collibra-survey-finds-76-of-organizations-hit-roadblocks-scaling-ai-agents/"
    },
    {
      "titulo": "Global AI Confessions Report: CIO Edition 2026",
      "origem": "Dataiku / Harris Poll · 24 set 2026",
      "url": "https://www.dataiku.com/company/news/global-ai-confessions-report-cio-edition-2026"
    },
    {
      "titulo": "No Brasil, 76% das empresas já operam agentes de IA e 66% ampliarão investimentos",
      "origem": "TI Inside · pesquisa Sinch · 17 ago 2026",
      "url": "https://tiinside.com.br/17/08/2026/no-brasil-76-das-empresas-ja-operam-agentes-de-ia-e-66-ampliarao-investimentos/"
    },
    {
      "titulo": "Collibra Launches New Capabilities to Reduce the Hallucination Tax on Enterprise AI",
      "origem": "Collibra · comunicado · 23 set 2026",
      "url": "https://www.collibra.com/company/newsroom/press-releases/collibra-launches-new-capabilities-to-reduce-the-hallucination-tax-on-enterprise-ai"
    },
    {
      "titulo": "Why three-quarters of enterprises have rolled back AI agents",
      "origem": "CX Dive · 27 mai 2026",
      "url": "https://www.customerexperiencedive.com/news/why-three-quarters-of-enterprises-have-rolled-back-ai-agents/821140/"
    }
  ]
}
```
