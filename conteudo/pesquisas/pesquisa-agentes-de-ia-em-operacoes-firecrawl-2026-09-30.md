# Pesquisa: Agentes de IA em operações (v2, com Firecrawl)
Data: 2026-09-30 · Destino: artigo do site (AgenticWay — Análise / Na Operação) · 17 fontes consultadas (6 buscas Firecrawl + leitura integral de 7 páginas, somadas às fontes da v1) · Recorte: últimos 3 meses (jul–set/2026), com contexto anterior marcado

> Substitui `pesquisa-agentes-de-ia-em-operacoes-2026-09-30.md` (v1, feita só com WebSearch). O que mudou está no fim do arquivo.

## O que dá pra afirmar

**Retorno financeiro fica abaixo do plano**
- 37% das empresas miraram redução de custo de 11% a 20% com automação e IA; entre as que mediram, quase 40% ficaram na faixa de 0% a 10%. Mesmo assim, 90% vão aumentar o orçamento de novo. (Bain & Company, Automation and AI Pathfinder Survey 2026, n=951 empresas [1]; repercutido no Brasil pela Forbes Brasil em set/2026 com Lucas Brossi, sócio da Bain para a América do Sul [2])
- Só 7% das empresas rodam agentes totalmente autônomos em produção; 38% usam agentes que exigem aprovação humana e 32% usam agentes com barreiras e tratamento de exceções. [1][2]
- Entre as empresas que bateram a meta, 50% têm agentes em níveis mais altos de autonomia; entre as que ficaram abaixo, 38%. [2]

**Desligar agente virou rotina**
- 47% dos CIOs desativaram mais de 20 agentes neste ano; 72% não conseguem confirmar de forma consistente se os agentes entregam o resultado de negócio pretendido; 84% dizem que funcionários criam agentes mais rápido do que a TI consegue governar. (Dataiku / The Harris Poll, 685 CIOs em 8 países, campo 9–29/07/2026, publicado em 24/09/2026 [3])
- No Brasil, 76% das empresas pesquisadas operam agentes de IA em produção e 80% já precisaram interromper ou reverter implementações por governança; 39% tiveram rollback por vazamento de dados pessoais. (Sinch, "The AI Production Paradox", 2.527 executivos em 10 países, recorte Brasil divulgado pela TI Inside em 17/08/2026 [4])
- No agregado global do mesmo estudo, três em cada quatro empresas já reverteram ou desligaram um agente voltado ao cliente; entre as que têm governança madura, 81%. (Sinch via CX Dive, 27/05/2026 [5] — anterior ao recorte, mas é o dado global de onde sai o recorte Brasil)

**O custo que não entra no business case é a revisão humana**
- 76% das organizações encontraram bloqueios críticos para levar agentes do piloto à produção nos últimos 12 meses; pouco mais da metade gasta horas significativas revisando e corrigindo saídas de agentes (64% nas empresas acima de US$ 100 milhões de receita). (Collibra / The Harris Poll, 300+ decisores de dados e IA nos EUA, set/2026 [6])
- 118 de 150 implementações corporativas de agentes analisadas (78,7%) têm supervisão humana explícita. É amostra de implementações maduras, não pesquisa aleatória. (The Brief Script, 22/09/2026, via Forkast [7])

**Brasil**
- 17% das empresas brasileiras estão em adoção consolidada de IA e 40% aceleram iniciativas internas (América Latina: 12% e 35%). 38% dos trabalhadores brasileiros usam agentes de IA pessoais para tarefas de trabalho, e 59% deles consideram isso de baixo ou nenhum risco. (Google Cloud + IDC, "Work: In Progress", 2ª edição, via Jornal do Commercio, 25/09/2026 [8])
- 75% dos trabalhadores brasileiros relatam não saber exatamente o que pedir às ferramentas de IA; 62% temem ficar dispensáveis. [8]

## O ângulo

**O agente funciona; o que não fecha é a conta que foi feita antes dele.** O dado mais útil do período é o da Bain: o business case supõe automação total, mas só 7% das empresas operam agentes totalmente autônomos. O resto mantém gente aprovando, revisando e tratando exceção — e esse custo não estava na planilha. Nas palavras de Brossi (Bain), reduzir 30% do esforço de uma tarefa não reduz 30% do custo do processo [2].

Isso muda a pergunta que um decisor de empresa média deve fazer. Não é "qual agente comprar", é "quanto de revisão humana vai sobrar, e o que eu faço com o tempo liberado". Encaixa na oferta de Diagnóstico e na frase de serviço da marca, sem forçar.

Segundo ângulo, para Na Operação: **desligar agente é sinal de maturidade, não de fracasso.** A Sinch encontrou mais rollback justamente nas empresas com governança madura (81%), e Gartner e Sinch leem isso como detecção mais cedo [5]. Um caso bom mostra quando e por que o agente foi desligado, não só o ganho.

## Contraditório

- **"Rollback alto é bom" é a leitura de quem vende governança.** Quem diz que rollback é sinal de maturidade é o CPO da Sinch; Dataiku e Collibra lançaram produtos de governança na mesma semana em que publicaram os números [3][6][9]. A leitura oposta, igualmente defensável: as empresas estão colocando em produção coisas que não deveriam ter saído do piloto.
- **A tecnologia não é o problema, dizem todos — inclusive quem vende a tecnologia.** O relatório KTSL/BMC Helix (Reino Unido) conclui que 25% dos projetos não pagam o investimento por falta de competência, dado e parceiro, "não pela tecnologia" [10]. É parceiro de implantação dizendo que falta parceiro de implantação. Vale citar com essa ressalva.
- **Adoção alta é medida de formas incompatíveis.** 76% (Sinch, Brasil), 42% (Mayfield, 266 executivos de TI [11]) e 31% (S&P Global/McKinsey, segundo compilação da Digital Applied [12]) medem coisas diferentes: agente em produção, agente em algum processo, agente em aplicação comprada. Artigo que compara esses números lado a lado engana o leitor.
- **Gartner "40% cancelados até 2027" não é dado novo.** A previsão é de junho/2025 e voltou a circular em julho/2026 (Forbes [13]). Não usar como notícia.

## Material bruto usável

- "Reduzir 30% do esforço de uma tarefa não significa reduzir 30% do custo do processo. Esse tempo pode ficar disperso ou ser realocado sem benefício mensurável." — Lucas Brossi, Bain [2]
- Contraste de manchete: 90% vão aumentar o orçamento / quase 40% dos que mediram economizaram 10% ou menos [1].
- 7% autônomos, 38% com aprovação humana, 32% com barreiras — bom para gráfico de barras simples [1].
- **Casos brasileiros com nome** (todos informados pela fornecedora StaryaAI, via Adnews, 28/09/2026 [14] — tratar como reportado, atribuir sempre):
  - dr.consulta: conversão do Programa de Saúde de 5% para 30%, mais de 3 milhões de mensagens, 75 mil conversões.
  - Unicall para Unimed Paraná: tempo médio de atendimento de 8 para 2 minutos nos fluxos cobertos; 12% das chamadas resolvidas integralmente pela IA no primeiro mês.
  - Grupo Algar (com Brain e StaryaAI): 5 agentes em produção, meta de 50 até dez/2026.
- "Autonomia não significa ausência de controle." — Vinícius Reis, CTO da StaryaAI [14]
- "Shadow AI" brasileiro: 38% usam agentes pessoais no trabalho, 59% acham que não tem risco [8]. Gancho para gerente de TI.
- Caso Allianz Project Nemo (sete agentes, sinistros até AUD 500, 80% menos tempo, humano decide o pagamento) — **de jul/2025, fora do recorte**; usar como exemplo de desenho [15].

## Não verificado

- "PMEs brasileiras que usam IA do Google Cloud cresceram 9 vezes" (Olhar Digital, 24/09/2026 [16]): dado de uso de produto do próprio Google, sem base absoluta. Não serve como medida de adoção de agentes no Brasil.
- "Apenas 5,2% das empresas brasileiras levaram projetos do piloto à produção em escala completa" (Times Brasil, abr/2026, pesquisa Jitterbit): fora do recorte e não abri o estudo.
- "80% das aplicações lançadas no 1º tri/2026 embutem agente, segundo o Gartner" e "88% dos pilotos não chegam à produção": aparecem numa compilação da Digital Applied [12]; não achei o comunicado original do Gartner.
- Casos anônimos de "empresa média" (financeira de 1.200 funcionários, "RetailMax" etc.) que circulam em blogs de consultorias: sem nome nem fonte primária. Não publicar.
- Números dos casos StaryaAI: vêm só da fornecedora; nenhum dos clientes citados confirmou publicamente no material lido.

## Fontes

1. Your AI Budget Is Growing. Your Returns Aren't. Here's Why — Bain & Company (Automation and AI Pathfinder Survey 2026, n=951) — 2026 — https://www.bain.com/insights/your-ai-budget-is-growing-your-returns-arent-heres-why/
2. Por que as empresas estão obtendo menos retorno do que esperavam com IA? — Forbes Brasil — set/2026 — https://forbes.com.br/forbes-money/2026/09/investimentos-ia-retorno-empresas/
3. Global AI Confessions Report: CIO Edition 2026 — Dataiku / The Harris Poll — 24/09/2026 — https://www.dataiku.com/company/news/global-ai-confessions-report-cio-edition-2026
4. No Brasil, 76% das empresas já operam agentes de IA e 66% ampliarão investimentos — TI Inside (pesquisa Sinch) — 17/08/2026 — https://tiinside.com.br/17/08/2026/no-brasil-76-das-empresas-ja-operam-agentes-de-ia-e-66-ampliarao-investimentos/
5. Why three-quarters of enterprises have rolled back AI agents — CX Dive — 27/05/2026 — https://www.customerexperiencedive.com/news/why-three-quarters-of-enterprises-have-rolled-back-ai-agents/821140/
6. Collibra Survey Finds 76% of Organizations Hit Roadblocks Scaling AI Agents — BigDATAwire / Collibra — set/2026 — https://www.hpcwire.com/bigdatawire/this-just-in/collibra-survey-finds-76-of-organizations-hit-roadblocks-scaling-ai-agents/
7. The Supervisor Agent Shift: How Enterprises Actually Staff AI Agent Oversight — Forkast — 27/09/2026 — https://forkast.news/the-supervisor-agent-shift-how-enterprises-actually-staff-ai-agent-oversight/
8. Brasil lidera uso de agentes de IA na América Latina em meio ao desafio da capacitação empresarial — Jornal do Commercio (estudo Google Cloud + IDC) — 25/09/2026 — https://jc.uol.com.br/tecnologia/2026/09/25/brasil-lidera-uso-de-agentes-de-ia-na-america-latina-em-meio-ao-desafio-da-capacitacao-empresarial.html
9. Collibra Launches New Capabilities to Reduce the Hallucination Tax on Enterprise AI — Collibra (press release) — 23/09/2026 — https://www.collibra.com/company/newsroom/press-releases/collibra-launches-new-capabilities-to-reduce-the-hallucination-tax-on-enterprise-ai
10. Why One in Four Enterprise AI Agent Deployments Aren't Paying Back — ITSM.tools (pesquisa KTSL + BMC Helix, 400 líderes de TI no Reino Unido) — 04/06/2026 — https://itsm.tools/ai-agent-deployment/
11. The Agentic Enterprise in 2026 — Mayfield (266 executivos de TI) — 2026 — https://www.mayfield.com/the-agentic-enterprise-in-2026/
12. AI Agent Adoption 2026: 120+ Enterprise Data Points — Digital Applied (compilação) — 2026 — https://www.digitalapplied.com/blog/ai-agent-adoption-2026-enterprise-data-points
13. Why 40% Of Agentic AI Projects May Be Canceled By 2027 — Forbes — 07/07/2026 — https://www.forbes.com/sites/robertszczerba/2026/07/07/why-40-of-agentic-ai-projects-may-be-canceled-by-2027/
14. Agentes de IA avançam nas empresas, mas governança ainda limita adoção em escala — Adnews — 28/09/2026 — https://adnews.com.br/post/agentes-de-ia-avancam-nas-empresas-mas-governanca-ainda-limita-adocao-em-escala
15. When the storm clears, so should the claim queue — Allianz — 2025 — https://www.allianz.com/en/mediacenter/news/articles/251103-when-the-storm-clears-so-should-the-claim-queue.html
16. Pequenas e médias empresas do Brasil lideram a implementação de agentes de IA na América Latina — Olhar Digital — 24/09/2026 — https://olhardigital.com.br/2026/09/24/pro/pequenas-e-medias-empresas-do-brasil-lideram-a-implementacao-de-agentes-de-ia-na-america-latina/
17. Gartner Says Applying Uniform Governance Across AI Agents Will Lead to Enterprise AI Agent Failure — Gartner — 26/05/2026 — https://www.gartner.com/en/newsroom/press-releases/2026-05-26-gartner-says-applying-uniform-governance-across-ai-agents-will-lead-to-enterprise-ai-agent-failure (só o trecho da busca; não lido na íntegra)

## O que mudou em relação à v1

- **Entrou:** Bain (n=951), que virou a espinha do ângulo; casos brasileiros com nome (dr.consulta, Unimed Paraná, Algar); estudo Google Cloud + IDC sobre Brasil; KTSL/BMC Helix; dado global da Sinch com os 81% de governança madura.
- **Mudou o ângulo:** da v1 ("quem responde pelo agente") para "a conta feita antes do agente não fecha". O primeiro continua válido como ângulo secundário.
- **Saiu do centro:** o caso Allianz (fora do recorte) e a C.H. Robinson (sem fonte primária).
