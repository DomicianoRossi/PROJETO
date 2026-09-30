# Pesquisa: Agentes de IA em operações
Data: 2026-09-30 · Destino: artigo do site (AgenticWay — Análise / Na Operação) · 9 fontes consultadas · Recorte: últimos 3 meses (jul–set/2026), com contexto anterior marcado

## O que dá pra afirmar

- 76% das empresas brasileiras pesquisadas já operam agentes de IA em produção; 80% precisaram interromper ou reverter implementações por questões de governança; 39% tiveram rollback por vazamento de dados pessoais. (Sinch, "The AI Production Paradox", 2.527 executivos em 10 países, foco em comunicação com clientes — via TI Inside, 17/08/2026 [1])
- No mesmo estudo, 66% das empresas no Brasil planejam ampliar o investimento em mais de 25%. [1]
- 81% dos CIOs não têm visibilidade completa sobre agentes criados fora dos sistemas aprovados; 84% dizem que funcionários criam agentes mais rápido do que a TI consegue governar. (Dataiku / The Harris Poll, 685 CIOs, 8 países, campo 9–29/07/2026, publicado em 24/09/2026 [2])
- 47% dos CIOs já desativaram mais de 20 agentes neste ano; 72% não conseguem confirmar de forma consistente se os agentes entregam o resultado de negócio pretendido. [2]
- 76% das organizações encontraram bloqueios críticos para levar agentes do piloto à produção nos últimos 12 meses; pouco mais da metade gasta horas significativas revisando e corrigindo saídas de agentes antes de irem ao ar (64% nas empresas acima de US$ 100 milhões de receita). (Collibra / The Harris Poll, 300+ decisores de dados e IA nos EUA, set/2026 [3])
- 72% dos decisores dizem que, quando a iniciativa de IA falha, a causa quase sempre é base de dados desalinhada ou ruim. [3]
- 118 de 150 implementações corporativas de agentes analisadas (78,7%) incorporam supervisão humana explícita. Ressalva do próprio estudo: é amostra de implementações maduras, não pesquisa aleatória de mercado. (The Brief Script, 22/09/2026, via Forkast [4])

## O ângulo

**A adoção já aconteceu; o que está em aberto é quem responde pelo agente.** Os números de "quantas empresas usam" são altos em todas as fontes (76% no Brasil, 67% dos CIOs com 51+ agentes em produção). Mas as mesmas pesquisas mostram o outro lado com a mesma força: 80% das brasileiras já reverteram implementação, 47% dos CIOs desligaram mais de 20 agentes, 72% não sabem se o agente entrega o que prometia.

Ou seja: o gargalo da empresa média não é "começar a usar agentes". É operar — saber quantos existem, o que cada um faz, quem revisa e quando desligar. Isso casa diretamente com a frase de serviço da marca ("conectar IA aos processos que a empresa já utiliza") e com a oferta de Diagnóstico.

Um segundo ângulo, mais provocativo: o custo oculto não é o modelo, é a revisão humana. A Collibra chama de "hallucination tax"; o BCG Henderson Institute (via [4]) aponta que 47% dos funcionários gastam mais tempo gerenciando IA do que fazendo o trabalho em si. Caso bom de Na Operação precisa mostrar quanto tempo de revisão sobrou, não só quanto tempo o agente economizou.

## Contraditório

- **Os números otimistas vêm de quem vende.** Sinch (comunicação), Dataiku e Collibra (plataformas de governança) e Kore.ai são fornecedores; a própria pesquisa de cada um aponta um problema que o produto dela resolve. Dataiku e Collibra lançaram produtos de governança na mesma semana em que publicaram os dados [3][5]. Vale citar, sempre atribuindo, e dizer isso ao leitor (coerente com a página "Sobre" e critérios editoriais).
- **"Supervisão humana" pode ser fraqueza, não virtude.** O caso Deel (via [4]) é de um agente autônomo de Customer Success encerrado por limites de processamento de contexto. Há quem leia os 78,7% com supervisão como sinal de que o agente autônomo não funciona; a leitura oposta é que é desenho correto de governança. O artigo deve apresentar as duas.
- **Previsão de fracasso é antiga e sem dado novo.** O "40% dos projetos cancelados até 2027" do Gartner é de junho/2025 e continua sendo recirculado em 2026 como se fosse novo [6]. Não é dado do período.

## Material bruto usável

- "Hallucination tax" — imposto da alucinação: custo de revisão, retrabalho e risco que cresce a cada agente novo (termo da Collibra [3]).
- Contraste pronto: 76% operam agentes / 80% já reverteram algum (Brasil, mesma pesquisa [1]).
- "Funcionários criam agentes mais rápido do que a TI consegue governar" — 84% dos CIOs [2]. Bom gancho para gerente de TI/processos (público secundário).
- Caso Allianz Project Nemo (Austrália): sete agentes para sinistros de alimentos estragados após queda de energia, sinistros até AUD 500, tempo de processamento e pagamento 80% menor, humano mantido como decisor final do pagamento [7]. **Atenção: lançado em jul/2025, fora do recorte de 3 meses** — usar como exemplo de desenho, não como notícia.
- C.H. Robinson: agente de cotação de frete — cobertura de cotações de 60–65% para 100%, resposta de 17–20 min para cerca de 32 s (via [4]; fonte primária não aberta — tratar como reportado).

## Não verificado

- Casos de "empresa média anônima" (financeira de 1.200 funcionários, rede de saúde regional, "RetailMax") que circulam em blogs de consultorias de agentes. Sem nome, sem fonte primária — não publicar.
- "401 mil empresas brasileiras já investem em agentes" — aparece em matérias de set/2026 sem metodologia acessível.
- "87% das organizações no Brasil não têm política de governança de IA" — citado em matéria da ABES/Rimini Street; não localizei o estudo original.
- Página do IHL Group sobre varejo (jun/2026) retornou 403; não li o conteúdo próprio deles.

## Fontes

1. No Brasil, 76% das empresas já operam agentes de IA e 66% ampliarão investimentos — TI Inside (pesquisa Sinch "The AI Production Paradox") — 17/08/2026 — https://tiinside.com.br/17/08/2026/no-brasil-76-das-empresas-ja-operam-agentes-de-ia-e-66-ampliarao-investimentos/
2. Global AI Confessions Report: CIO Edition 2026 — Dataiku / The Harris Poll — 24/09/2026 — https://www.dataiku.com/company/news/global-ai-confessions-report-cio-edition-2026
3. Collibra Survey Finds 76% of Organizations Hit Roadblocks Scaling AI Agents — BigDATAwire / Collibra — set/2026 — https://www.hpcwire.com/bigdatawire/this-just-in/collibra-survey-finds-76-of-organizations-hit-roadblocks-scaling-ai-agents/
4. The Supervisor Agent Shift: How Enterprises Actually Staff AI Agent Oversight — Forkast — 27/09/2026 — https://forkast.news/the-supervisor-agent-shift-how-enterprises-actually-staff-ai-agent-oversight/
5. Collibra Launches New Capabilities to Reduce the Hallucination Tax on Enterprise AI — Collibra (press release) — 23/09/2026 — https://www.collibra.com/company/newsroom/press-releases/collibra-launches-new-capabilities-to-reduce-the-hallucination-tax-on-enterprise-ai
6. Gartner: 40% of agentic AI projects will fail — MarTech — 2025 — https://martech.org/gartner-40-of-agentic-ai-projects-will-fail-making-humans-indispensable/
7. When the storm clears, so should the claim queue — Allianz (media center) — 2025 — https://www.allianz.com/en/mediacenter/news/articles/251103-when-the-storm-clears-so-should-the-claim-queue.html
8. AI agents are going rogue. CIOs are racing to put guardrails around them — Fortune — 16/09/2026 — https://fortune.com/2026/09/16/ai-agents-are-going-rogue-cios-are-racing-to-put-guardrails-around-them/ (não lida na íntegra)
9. 2026: o ano em que as empresas deixam de construir agentes de IA e passam a operá-los — IT Forum — 2026 — https://itforum.com.br/colunas/2026-o-ano-em-que-as-empresas-deixam-de-construir-agentes-de-ia-e-passam-a-operalos/ (coluna de opinião)
