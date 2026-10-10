// Gerado por scripts/build_dados.py. Não edite à mão: edite conteudo/publicado/.
window.AW_DADOS = window.AW_DADOS || {};
window.AW_DADOS.assinatura = "Apurado e escrito por agentes AgenticWay · editor responsável: Domiciano Rossi";
window.AW_DADOS.analise = [
 {
  "id": "agente-que-voce-nao-comprou",
  "publicado_em": "2026-10-09T07:00:00-03:00",
  "tema": "OPERAÇÃO",
  "titulo": "O primeiro agente a governar é o que você não comprou",
  "linhaFina": "38% dos trabalhadores brasileiros já usam agentes pessoais no trabalho, e 81% dos CIOs dizem não ter visão completa dos agentes criados fora dos canais aprovados. Na mesma semana, Meta e Sierra anunciaram um padrão para os agentes dos clientes entrarem pela porta da empresa.",
  "frase": "A lista de agentes que a empresa precisa governar já inclui os que ela não contratou.",
  "leitura": 5,
  "tese": [
   "A empresa média costuma começar a governança pelos agentes que compra. Os que já operam nela, trazidos por funcionários, não passaram por compra nenhuma.",
   "Do outro lado, os agentes dos clientes vão chegar à empresa com credenciais próprias. Deixar o acesso para depois é decidir pelo padrão do fornecedor.",
   "Antes de qualquer plataforma de governança, a empresa precisa de um inventário simples: quais agentes agem em nome de quem, com que acesso e com que registro."
  ],
  "p1": "Segundo o estudo Work: In Progress, do Google Cloud com a IDC e a Provokers, 38% dos trabalhadores brasileiros recorrem a agentes de IA pessoais para tarefas de trabalho, e 59% deles consideram a prática de baixo ou nenhum risco. Em outra pesquisa, da Dataiku com a Harris Poll, 81% dos CIOs ouvidos dizem não ter visão completa dos agentes criados inteiramente fora dos sistemas ou canais aprovados.",
  "p2": "Os dois números descrevem a mesma situação por lados diferentes: o funcionário acha que o risco é pequeno, e a TI admite que não enxerga. Na mesma semana, Meta e Sierra anunciaram um padrão aberto para os agentes pessoais dos clientes interagirem com empresas. O que me interessa é a ordem das tarefas: a maioria das empresas médias está desenhando a governança dos agentes que vai comprar, enquanto os agentes que já entraram ficam sem dono.",
  "h1": "O agente do funcionário já está dentro",
  "p3": "O estudo do Google Cloud registra os motivos do uso não oficial: facilidade de acesso (39%), maior percepção de segurança e privacidade (39%) e problemas de compatibilidade com as ferramentas homologadas, apontados por 29% como o maior gargalo. Não é rebeldia. É o funcionário resolvendo uma tarefa com o que está à mão.",
  "p4": "Na Dataiku, 84% dos CIOs concordam que funcionários criam agentes e aplicações mais rápido do que a TI consegue governar. O mesmo levantamento diz que 83% não têm gestão padronizada do ciclo de vida dos agentes e que 60% não têm uma camada central de governança. A pesquisa ouviu CIOs globais, e a empresa média costuma ter menos gente na TI para fechar a mesma lacuna. A consequência prática é que o agente de um funcionário pode ter acesso a e-mail, planilhas e sistemas da empresa sem que ninguém tenha decidido isso.",
  "destaque": "Um agente sem dono é uma credencial sem dono.",
  "h2": "O agente do cliente vai bater na porta",
  "p5": "Em 6 de outubro, a Sierra anunciou, com a Meta, o Personal Agent Protocol, um padrão aberto em desenvolvimento com Genesys, Instinct, Rocket, Shopify, Stripe e Walmart. Segundo a Sierra, a sessão é construída sobre OAuth, o cliente decide se o agente tem acesso só de leitura ou também de escrita, e a empresa decide o que disponibilizar: site, APIs ou um agente próprio. A especificação v0.1 está prevista para este mês, e a própria Sierra lista permissões mais detalhadas e pagamentos como extensões futuras.",
  "p6": "Quem escreve o padrão são plataformas e grandes marcas, e o desenho reflete o que elas precisam. Uma empresa média que não definir o que seu site e suas APIs permitem a um agente de cliente vai receber esse tráfego do mesmo jeito, só que sem regra. A OpenAI também aponta nessa direção do lado de dentro: ao lançar os dots, agentes que trabalham de forma contínua, falou em dots especialistas com identidade própria para o gerenciamento de acesso, hoje apresentados como prévia. Cada um desses agentes é mais uma identidade para alguém registrar.",
  "h3": "O inventário vem antes da plataforma",
  "p7": "A SailPoint, que vende segurança de identidade, publicou em 6 de outubro que 79% das organizações ouvidas já têm agentes em produção e apenas 2% usam ferramentas de identidade criadas para eles. Agentes já são 22% das contas não humanas, e só 15% conseguem liberar acesso a contas não humanas em tempo real. A empresa vende a solução, então vale ler o dado com desconto. Ainda assim, o que ela descreve como primeiro obstáculo não depende de produto: descoberta de agentes, dono de cada um e monitoramento. Uma planilha com agente, dono, acesso e registro de ações resolve boa parte disso, e vale para os agentes comprados, para os trazidos por funcionários e para os que o cliente mandar.",
  "contra": "Os números de risco vêm de quem vende a cura: a SailPoint vende segurança de identidade, a Dataiku vende plataforma de governança e o Google Cloud vende os agentes que muitos funcionários usam. A pesquisa do Google, aliás, apresenta o uso não oficial como \"adoção orgânica\" a ser convertida em transformação de negócio, não como falha de controle. Também é possível que o risco seja menor do que parece: 59% dos usuários o consideram baixo, e nada nas fontes mostra incidentes causados por esses agentes em empresas médias. A Dataiku ainda registra que 91% dos CIOs preferem deixar as áreas construírem dentro de um ambiente governado a centralizar tudo, o que sugere que bloquear é a resposta errada. E o Personal Agent Protocol é uma especificação v0.1 que ainda nem foi publicada; pode mudar bastante ou não pegar. Se o volume de agentes de clientes demorar a crescer, a prioridade de olhar para fora será menor do que defendo aqui.",
  "fechamento": "Eu começaria por uma lista de uma página, em duas semanas: quais agentes agem na empresa, quem os trouxe, a quais sistemas têm acesso e onde fica o registro do que fizeram. Depois, definiria o que um agente de cliente pode e não pode fazer no site e nas APIs antes que o padrão decida isso por mim. Só então avaliaria plataforma de governança, já sabendo o que ela precisa cobrir.",
  "pontos": [
   {
    "rotulo": "01 · INVENTÁRIO",
    "titulo": "Liste os agentes que já existem",
    "texto": "Pergunte às áreas quais agentes usam, inclusive os pessoais, e anote dono, sistemas acessados e onde está o registro. O objetivo é enxergar, não proibir."
   },
   {
    "rotulo": "02 · ACESSO",
    "titulo": "Separe leitura de escrita",
    "texto": "Para cada agente, decida se ele só lê ou também altera dados e envia mensagens. É a mesma distinção que o padrão da Sierra põe nas mãos do cliente."
   },
   {
    "rotulo": "03 · PORTA DE ENTRADA",
    "titulo": "Defina o que o agente do cliente pode fazer",
    "texto": "Escolha o que o site, as APIs e o atendimento aceitam de um agente que age em nome de um cliente, e o que exige confirmação humana."
   }
  ],
  "fontes": [
   {
    "titulo": "Brasil lidera uso de agentes de IA na América Latina em meio ao desafio da capacitação empresarial",
    "origem": "Jornal do Commercio · estudo Google Cloud/IDC/Provokers · 25 set 2026",
    "url": "https://jc.uol.com.br/tecnologia/2026/09/25/brasil-lidera-uso-de-agentes-de-ia-na-america-latina-em-meio-ao-desafio-da-capacitacao-empresarial.html"
   },
   {
    "titulo": "Global AI Confessions Report: CIO Edition 2026",
    "origem": "Dataiku / Harris Poll, n=685 · 24 set 2026",
    "url": "https://www.dataiku.com/company/news/global-ai-confessions-report-cio-edition-2026"
   },
   {
    "titulo": "Introducing Personal Agent Protocol",
    "origem": "Sierra · blog · 6 out 2026",
    "url": "https://sierra.ai/blog/introducing-personal-agent-protocol"
   },
   {
    "titulo": "SailPoint Report Finds 79% of Enterprises Run AI Agents in Production, Yet Only 2% Have Deployed Purpose-built Security",
    "origem": "SailPoint · comunicado via GlobeNewswire · 6 out 2026",
    "url": "https://www.globenewswire.com/news-release/2026/10/06/3375448/0/en/sailpoint-report-finds-79-of-enterprises-run-ai-agents-in-production-yet-only-2-have-deployed-purpose-built-security.html"
   },
   {
    "titulo": "Introducing dots",
    "origem": "OpenAI · comunicado · 29 set 2026",
    "url": "https://openai.com/index/introducing-dots/"
   }
  ],
  "baseadoEm": [
   "google-idc-brasil-agentes-pessoais",
   "dataiku-cios-desativaram-agentes",
   "sierra-meta-personal-agent-protocol",
   "sailpoint-79-agentes-producao-2-seguranca-especifica",
   "openai-dots-agentes-sempre-ativos"
  ]
 },
 {
  "id": "whatsapp-cobra-mensagem-agente-conversa-curta",
  "publicado_em": "2026-10-02T07:00:00-03:00",
  "tema": "CUSTO",
  "titulo": "No WhatsApp, o agente bom agora é o que fala menos",
  "linhaFina": "Desde 1º de outubro, a Meta cobra cada resposta de atendimento no WhatsApp Business, inclusive as de agentes de IA. A tarifa de entrega é pequena; o que muda é a unidade da conta, que passa a ser a mensagem.",
  "frase": "Uma taxa de resolução sem o número de mensagens ao lado não diz quanto o atendimento custa.",
  "leitura": 5,
  "tese": [
   "A nova cobrança da Meta não encarece muito a mensagem de serviço. Ela transforma cada resposta do agente em uma linha da fatura.",
   "Com isso, a métrica que as empresas e os fornecedores divulgam, a porcentagem de atendimentos resolvidos pela IA, deixa de bastar. O que importa é quantas mensagens o agente gasta para resolver.",
   "A escolha entre o agente da própria Meta e o de um fornecedor deveria ser feita por custo por atendimento resolvido, não pela tabela que a Meta publicou."
  ],
  "p1": "Desde 1º de outubro de 2026, a Meta cobra por mensagem entregue todas as mensagens de serviço na API do WhatsApp Business, as respostas que a empresa envia dentro da janela de 24 horas aberta pelo cliente. Elas não eram cobradas desde 1º de novembro de 2024. Vale para resposta digitada por atendente e para resposta gerada por agente de IA de terceiros. Cada número de telefone tem 1.000 mensagens de serviço gratuitas por mês; a cobrança começa na mensagem 1.001.",
  "p2": "A reação mais comum foi tratar a mudança como aumento de custo, e ela é. Mas, olhando os números da própria Meta, o que me interessa é outra coisa. A tarifa de entrega que a Meta usa como referência para o Brasil é de 0,68 centavo de dólar por mensagem. O custo do modelo de IA, nas estimativas da mesma documentação, vai de cerca de 2 a cerca de 9 centavos por mensagem. A taxa nova é a parte pequena da conta. A mudança grande é que a conta inteira, da Meta e do fornecedor, passa a ser contada em mensagens.",
  "h1": "A unidade da conta virou a mensagem",
  "p3": "Até setembro, a Meta não cobrava nada por uma resposta de serviço no WhatsApp. Um agente que precisava de oito mensagens para resolver uma troca de produto custava, na plataforma, o mesmo que um que resolvia em duas. A partir de outubro, não. E o Meta Business Agent, o agente de IA da própria Meta, é cobrado desde 1º de agosto por tokens consumidos, a US$ 2 por milhão. Segundo a Meta, uma mensagem consome em geral de 20 mil a 25 mil tokens, o que dá de 4 a 5 centavos de dólar.",
  "p4": "A própria Meta dá o exemplo de como isso escala: uma pergunta simples, como o horário de funcionamento, leva quatro mensagens ao usuário e custa cerca de 16 a 20 centavos; uma interação complexa leva dez mensagens e custa cerca de 40 a 50 centavos. Seja qual for o agente, a fatura cresce com o número de respostas. Um agente prolixo, que confirma, repete e pergunta o que já sabia, agora tem preço.",
  "destaque": "Uma taxa de resolução sem o número de mensagens ao lado não diz quanto o atendimento custa.",
  "h2": "A métrica que todo mundo divulga ficou incompleta",
  "p5": "Os resultados de agentes de atendimento publicados nesta semana usam quase sempre a mesma régua: quanto a IA resolveu sem passar para uma pessoa. A LG Brasil diz que seu agente de voz resolveu 51,7% das solicitações sem transferência em mais de 13.200 atendimentos em setembro. A NeoAssist diz que a Vick, agente da Vivara, filtra 75% dos atendimentos feitos pela ferramenta. São números de quem implantou ou vendeu o agente, e nenhum deles informa quantas mensagens ou quanto tempo de conversa cada resolução levou.",
  "p6": "Até setembro, para o atendimento no WhatsApp, essa omissão custava pouco. Agora, duas operações com a mesma taxa de resolução podem ter faturas muito diferentes. Um agente que resolve 70% em média de três respostas e outro que resolve 75% em média de nove não são comparáveis pela porcentagem. Não estou dizendo que os casos da semana tenham esse problema; o caso da LG nem é de WhatsApp. Estou dizendo que, do jeito que são divulgados, não dá para saber.",
  "h3": "A comparação da Meta é um argumento de venda",
  "p7": "Na documentação de preços, a Meta compara 10.000 mensagens de IA em resposta a usuários no Brasil: cerca de US$ 968 com um modelo de terceiros de alta complexidade, somando entrega e custo estimado do modelo, contra US$ 400 a US$ 500 com o Meta Business Agent. Em outra página da mesma documentação, a Meta mostra que um modelo de terceiros de menor complexidade sairia por cerca de 2 a 3 centavos por mensagem, abaixo do agente dela. E a própria Meta escreve que a comparação entre mensagem de serviço e Meta Business Agent não é de igual para igual. A tabela mede custo por mensagem. Quem decide fornecedor por ela está comparando o preço do litro sem saber quantos litros cada carro gasta para fazer o mesmo caminho.",
  "contra": "O primeiro argumento contra é de escala: para muita empresa média, a franquia de 1.000 mensagens gratuitas por número cobre boa parte do volume, e a 0,68 centavo de dólar por mensagem o impacto na margem é pequeno; otimizar o tamanho da conversa pode ser esforço demais para pouco dinheiro. O segundo é de qualidade: conversa curta não é sinônimo de cliente atendido, e um agente pressionado a responder menos pode empurrar o cliente para o telefone ou para o atendente humano, que custa mais. Há também o interesse de quem publicou os dados: os preços e as comparações vêm da Meta, que vende o próprio agente, e os resultados de atendimento vêm das empresas e dos fornecedores que os implantaram. Por fim, a Meta pode rever tarifas a cada trimestre, como a própria documentação prevê, e o quadro desta semana pode mudar antes de qualquer contrato novo vencer.",
  "fechamento": "Antes de renovar ou trocar o agente de WhatsApp, eu pediria ao fornecedor três números do último mês: atendimentos resolvidos, mensagens enviadas por atendimento resolvido e custo total por atendimento resolvido, somando modelo, plataforma e a fatura da Meta. Com esses números na mesa, a comparação com o Meta Business Agent, ou com qualquer outro fornecedor, passa a ser possível. Sem eles, a escolha fica com a tabela de quem vende.",
  "pontos": [
   {
    "rotulo": "01 · VOLUME",
    "titulo": "Saiba quantas respostas cada número envia",
    "texto": "Levante o volume mensal de mensagens de serviço por número de telefone e compare com a franquia de 1.000. Abaixo dela, a cobrança nova não pesa; acima, cada resposta vira custo."
   },
   {
    "rotulo": "02 · EFICIÊNCIA",
    "titulo": "Meça mensagens por atendimento resolvido",
    "texto": "Taxa de resolução sozinha não basta. Peça a média de mensagens que o agente envia até resolver, e acompanhe o recontato para não trocar conversa curta por cliente que volta."
   },
   {
    "rotulo": "03 · COMPARAÇÃO",
    "titulo": "Compare custo por resolução, não por mensagem",
    "texto": "Antes de migrar para o agente da Meta ou de outro fornecedor, rode as duas opções no mesmo fluxo e compare o custo total por atendimento resolvido."
   }
  ],
  "fontes": [
   {
    "titulo": "Pricing on the WhatsApp Business Platform",
    "origem": "Meta for Developers · documentação · atualizada em 30 set 2026",
    "url": "https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing"
   },
   {
    "titulo": "Upcoming pricing updates for Meta Business Agent, service and utility messages",
    "origem": "Meta for Developers · documentação · atualizada em 28 set 2026",
    "url": "https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing/non-template-messages"
   },
   {
    "titulo": "LG Brasil expande atendimento com inteligência artificial para o canal de voz e lidera projeto global da marca",
    "origem": "LG Electronics Brasil · comunicado via PR Newswire · 30 set 2026",
    "url": "https://www.prnewswire.com/br/comunicados-para-a-imprensa/lg-brasil-expande-atendimento-com-inteligencia-artificial-para-o-canal-de-voz-e-lidera-projeto-global-da-marca-302894847.html"
   },
   {
    "titulo": "Vivara e Koin comemoram resultados do uso de agentes de IA",
    "origem": "ClienteSA · 1 out 2026",
    "url": "https://portal.clientesa.com.br/vivara-e-koin-comemoram-resultados-do-uso-de-agentes-de-ia/"
   }
  ],
  "baseadoEm": [
   "meta-whatsapp-cobranca-mensagens-servico",
   "neoassist-agentes-vivara-koin",
   "lg-brasil-atendimento-agente-voz"
  ]
 },
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
];
