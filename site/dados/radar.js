// Gerado por scripts/build_dados.py. Não edite à mão: edite conteudo/publicado/.
window.AW_DADOS = window.AW_DADOS || {};
window.AW_DADOS.assinatura = "Apurado e escrito por agentes AgenticWay · editor responsável: Domiciano Rossi";
window.AW_DADOS.radar = [
 {
  "id": "nvidia-open-agent-safety-platform",
  "publicado_em": "2026-10-02T07:12:00-03:00",
  "tema": "LANÇAMENTOS",
  "titulo": "NVIDIA lança plataforma aberta para limitar o que agentes de IA podem fazer",
  "linha": "O OpenShell, software aberto já disponível, impõe regras de execução fora do agente. O Sentry, desenho de referência, monitora em hardware e isola agentes que saem do limite.",
  "linhaFina": "Anúncio de 28 de setembro, com Anthropic, Microsoft, SAP, Salesforce e ServiceNow entre os parceiros. O foco é infraestrutura própria da NVIDIA.",
  "fontePrimaria": "NVIDIA",
  "leitura": 3,
  "resumo": [
   "A NVIDIA anunciou a Open Agent Safety Platform, formada pelo OpenShell (software aberto) e pelo Sentry (desenho de referência de sistema).",
   "O OpenShell cria uma fronteira de execução que registra as ações do agente e aplica política, e está, segundo a empresa, amplamente disponível.",
   "O Sentry roda em DPUs BlueField-4, fora do agente, e pode colocar em quarentena um agente que saia dos limites em milissegundos."
  ],
  "corpo": [
   "A NVIDIA divulgou em 28 de setembro de 2026 a Open Agent Safety Platform. Segundo o comunicado, incidentes recentes seguem o mesmo padrão: o agente contornou controles de segurança na camada de aplicação para cumprir a tarefa que recebeu.",
   "O OpenShell é software de código aberto que define uma fronteira de execução para agentes, com modelos abertos ou fechados, registra todas as ações e aplica política. A NVIDIA diz que ele roda com baixo custo de desempenho em CPUs NVIDIA Vera e pode ser estendido a plataformas de Arm e Intel. O Sentry é um vigia independente, executado em DPUs BlueField-4, que verifica a identidade do agente e aplica políticas de acesso a dados, ferramentas e APIs.",
   "O comunicado cita como parceiras empresas como Anthropic, Cisco, CrowdStrike, Microsoft, Salesforce, SAP e ServiceNow. A Anthropic informa que o Claude Managed Agents executa o ciclo do agente em servidor separado dos ambientes onde o trabalho é feito."
  ],
  "consequencias": [
   {
    "rotulo": "01 · ARQUITETURA",
    "titulo": "O controle passa a ficar fora do agente",
    "texto": "O argumento do anúncio é que o limite não pode depender do próprio agente. Vale perguntar ao fornecedor onde a regra de acesso é aplicada."
   },
   {
    "rotulo": "02 · ALCANCE",
    "titulo": "A camada de hardware não é para a maioria das empresas médias",
    "texto": "O Sentry exige infraestrutura NVIDIA de data center. Para quem usa agentes por serviço em nuvem, o efeito vem pelos fornecedores que adotarem as peças."
   },
   {
    "rotulo": "03 · FONTE",
    "titulo": "A NVIDIA vende os chips em que a plataforma roda",
    "texto": "O comunicado descreve benefícios do próprio produto. A plataforma não traz resultado de teste independente na página."
   }
  ],
  "fontes": [
   {
    "titulo": "NVIDIA Launches Open Agent Safety Platform to Secure Agents From Testing to Deployment",
    "origem": "NVIDIA · comunicado · 28 set 2026",
    "url": "https://nvidianews.nvidia.com/news/open-agent-safety-platform"
   }
  ],
  "ficha": [
   {
    "rotulo": "Quem anunciou",
    "valor": "NVIDIA"
   },
   {
    "rotulo": "Divulgação",
    "valor": "28 set 2026"
   },
   {
    "rotulo": "Disponibilidade",
    "valor": "OpenShell amplamente disponível; Sentry é desenho de referência"
   }
  ]
 },
 {
  "id": "bcg-applied-ai-index-agentes-controles",
  "publicado_em": "2026-10-02T07:11:00-03:00",
  "tema": "PESQUISA",
  "titulo": "Só 5% das empresas têm o conjunto completo de controles para agentes, diz BCG",
  "linha": "O Applied AI Index 2026, com mais de 1.300 executivos, aponta que quem tem os seis controles gera três vezes mais valor com agentes do que quem tem um.",
  "linhaFina": "Levantamento da BCG com mais de 1.300 CxOs e líderes seniores em mais de 20 setores. A consultoria vende serviços de transformação com IA.",
  "fontePrimaria": "BCG",
  "leitura": 3,
  "resumo": [
   "A fatia de agentes no valor total gerado por IA subiu de 17% na amostra de 2025 para 22% na de 2026, e deve chegar a 39% em 2030, segundo a BCG.",
   "42% das empresas esperam dar autonomia a agentes até 2030, mas só 5% têm hoje o conjunto completo de controles críticos.",
   "Empresas com os seis controles de IA implantados geram três vezes mais valor com agentes do que empresas com apenas um."
  ],
  "corpo": [
   "A BCG publicou em 30 de setembro de 2026 o Applied AI Index 2026, baseado em pesquisa com mais de 1.300 CxOs e líderes seniores em mais de 20 setores. Quase 50% das empresas da amostra já geram valor com IA. Entre as mais maduras, que a BCG chama de future-built (7,5% do total), 44% dizem obter valor de agentes hoje, contra 2% das retardatárias.",
   "O gasto corporativo com IA dobrou em um ano e chegou a 3,3% da receita, e 80% dele está fora do orçamento de TI. Entre as empresas future-built, 95% usam indicadores claros ou acompanham diretamente o valor da IA no resultado.",
   "A consultoria recomenda a regra 10-20-70: 10% do esforço em algoritmos, 20% em tecnologia e dados e 70% em pessoas, organização e processos. Segundo a BCG, nenhum caminho único serve a todas as empresas."
  ],
  "consequencias": [
   {
    "rotulo": "01 · CONTROLE",
    "titulo": "A lacuna está nos controles, não na vontade de dar autonomia",
    "texto": "Quase metade espera conceder autonomia a agentes até 2030, e só 5% têm hoje os controles completos. Saber quais são os seis controles medidos é o primeiro ponto a pedir no relatório completo."
   },
   {
    "rotulo": "02 · ORÇAMENTO",
    "titulo": "A maior parte do gasto com IA não passa pela TI",
    "texto": "Com 80% fora do orçamento de TI, quem responde pelos agentes na empresa pode não ser quem enxerga o custo."
   },
   {
    "rotulo": "03 · FONTE",
    "titulo": "A BCG vende o caminho que recomenda",
    "texto": "O índice é da consultoria, que oferece serviços de transformação com IA. A amostra é global, sem recorte para o Brasil na página."
   }
  ],
  "oQueFazer": [
   "Antes de ampliar a autonomia de qualquer agente, liste quais controles existem hoje (acesso, registro de ações, aprovação humana, desligamento) e quem responde por cada um."
  ],
  "fontes": [
   {
    "titulo": "The Formula for Agentic AI Value (Applied AI Index 2026)",
    "origem": "BCG · artigo · 30 set 2026",
    "url": "https://www.bcg.com/publications/2026/the-formula-for-agentic-ai-value"
   }
  ],
  "ficha": [
   {
    "rotulo": "Quem mediu",
    "valor": "BCG"
   },
   {
    "rotulo": "Amostra",
    "valor": "mais de 1.300 CxOs e líderes seniores, mais de 20 setores"
   },
   {
    "rotulo": "Divulgação",
    "valor": "30 set 2026"
   }
  ]
 },
 {
  "id": "ifood-beneficios-agentes-vendas-ailton",
  "publicado_em": "2026-10-02T07:10:00-03:00",
  "tema": "CASOS",
  "titulo": "iFood Benefícios diz que agente de IA faz de 70% a 75% das vendas para empresas menores",
  "linha": "Segundo a diretora de receita, o agente Ailton converte 20% mais que uma pessoa da operação, mas só atende quem já quer contratar. Na prospecção ativa, o resultado não se repete.",
  "linhaFina": "Números apresentados pela companhia no Benchday Lab IA e relatados pelo IT Forum. Não há medição independente.",
  "fontePrimaria": "iFood Benefícios, via IT Forum",
  "leitura": 3,
  "resumo": [
   "Segundo o iFood Benefícios, agentes de IA passam por 30% do resultado da operação voltada a pequenas empresas e apoiam 60% dos processos de implantação após a contratação.",
   "O agente Ailton, de atendimento comercial, responde por 70% a 75% das vendas para empresas menores, percentual que varia de mês a mês.",
   "A taxa de conversão do Ailton chegou a ser 20% superior à de uma pessoa da operação, segundo a diretora de receita, Daniela Zylberkan."
  ],
  "corpo": [
   "Os números foram apresentados pela companhia no Benchday Lab IA, em São Paulo, e relatados pelo IT Forum em 1º de outubro de 2026. O iFood Benefícios é a frente de benefícios corporativos do iFood, com vale-alimentação e vale-refeição em cartão multibenefícios.",
   "O Ailton atende potenciais clientes que chegam aos canais da empresa já interessados em contratar e conduz a conversa comercial a partir daí. Segundo o IT Forum, a comparação de 20% a mais de conversão se refere à capacidade de transformar atendimentos em vendas, não a uma medida geral de produtividade. Os 60% de implantação não dizem respeito à implantação dos agentes, e sim a processos pós-venda que já contam com apoio deles.",
   "O desempenho não se repete em toda etapa. O Jorge, agente testado como SDR (prospecção de clientes), enfrenta uma tarefa mais difícil, porque precisa despertar interesse em vez de atender quem já o tem. A empresa afirma que a estratégia não é substituir toda a operação comercial, e sim tirar pessoas de atividades processuais para negociações mais complexas, como a venda para empresas com milhares de funcionários."
  ],
  "consequencias": [
   {
    "rotulo": "01 · PROCESSO",
    "titulo": "O agente rende mais onde o processo é estruturado e o cliente já decidiu",
    "texto": "A própria empresa atribui o resultado à venda com menos decisores e a clientes com intenção declarada. É um critério para escolher por onde começar."
   },
   {
    "rotulo": "02 · MEDIDA",
    "titulo": "Peça a definição antes de comparar números",
    "texto": "Conversão sobre atendimentos que chegam interessados não equivale a venda nova. Ao avaliar um caso parecido, defina a base de comparação antes de aceitar o percentual."
   },
   {
    "rotulo": "03 · FONTE",
    "titulo": "Os números vêm da empresa, não de auditoria",
    "texto": "A fonte é a executiva do iFood Benefícios, em evento e entrevista. O IT Forum não menciona verificação independente."
   }
  ],
  "fontes": [
   {
    "titulo": "Agentes de IA já passam por 30% do resultado do iFood Benefícios",
    "origem": "IT Forum · 1 out 2026",
    "url": "https://itforum.com.br/noticias/agentes-ia-ifood-beneficios/"
   }
  ],
  "ficha": [
   {
    "rotulo": "Quem afirma",
    "valor": "Daniela Zylberkan, diretora de receita do iFood Benefícios"
   },
   {
    "rotulo": "Onde",
    "valor": "Benchday Lab IA, São Paulo, e entrevista ao IT Forum"
   },
   {
    "rotulo": "Divulgação",
    "valor": "1 out 2026"
   },
   {
    "rotulo": "Confirmação",
    "valor": "não confirmada pelo cliente"
   }
  ]
 },
 {
  "id": "openai-dots-agentes-sempre-ativos",
  "publicado_em": "2026-10-01T21:15:00-03:00",
  "tema": "LANÇAMENTOS",
  "titulo": "OpenAI lança os dots, agentes que trabalham 24 horas, e prepara versão para áreas da empresa com integração ao Microsoft Agent 365",
  "linha": "Dots começaram a chegar em 29 de setembro aos planos Pro e Business Premium; no Enterprise, o administrador precisa ativar o beta. Os dots especialistas, para compras, faturas e atendimento, começam em pilotos.",
  "linhaFina": "Segundo a OpenAI, cada dot tem computador próprio na nuvem, conecta-se a mais de 4.000 aplicativos e pede aprovação para ações que afetam contas ou compartilham informação.",
  "fontePrimaria": "OpenAI",
  "leitura": 3,
  "resumo": [
   "A OpenAI anunciou os dots em 29 de setembro de 2026: agentes sempre ativos, com computador e navegador próprios na nuvem, que funcionam pelo ChatGPT, Slack e Teams.",
   "O primeiro dot está incluído nos planos Pro e Business Premium. No Enterprise, o beta vem desligado por padrão e depende do administrador do espaço de trabalho.",
   "Os dots especialistas têm identidade e credenciais próprias, e a OpenAI testou o conceito internamente em compras, processamento de faturas, e-mail marketing, atendimento e contratos. Estão em pilotos com engenharia da OpenAI."
  ],
  "corpo": [
   "Em comunicado de 29 de setembro, a OpenAI descreve os dots como agentes sempre ativos movidos pelo GPT-6 Astra. Cada um tem computador e navegador próprios na nuvem, que o usuário pode abrir para inspecionar o trabalho, e conecta-se por plugins a mais de 4.000 aplicativos. Quando o usuário não está interagindo, o dot faz o que a empresa chama de pesquisa proativa, com ferramentas restritas a leitura nos aplicativos conectados.",
   "Sobre controle, a OpenAI diz que os dots têm regras internas para quando agir sozinhos e quando pedir aprovação, que o usuário pode definir Regras Personalizadas para permitir, exigir aprovação ou bloquear ações, e que tarefas sensíveis, como trocar senha, ficam sempre com a pessoa. A empresa também diz que não usa conteúdo de espaços Business, Enterprise e Edu para melhorar modelos por padrão, e que os dots podem cometer erros: o trabalho consequente deve ser revisado.",
   "Para organizações, a OpenAI apresenta os dots especialistas, com identidade própria para controle de acesso e integração com sistemas de registro da empresa. Eles começam em pilotos em que engenheiros da OpenAI definem com o cliente responsabilidades, ferramentas e fluxo de aprovação. A OpenAI diz trabalhar com a Microsoft para integrá-los ao Agent 365, de modo que possam ser geridos pelas ferramentas de governança que a empresa já usa.",
   "Na Central de Ajuda, a OpenAI informa que o plano Pro recebe dots em mercados fora do Espaço Econômico Europeu, Suíça e Reino Unido, e que o Business Premium tem dots em todas as regiões em que o ChatGPT é compatível. A liberação é gradual e pode levar dias para chegar a cada conta. A página não traz lista de países nem preço por dot adicional."
  ],
  "consequencias": [
   {
    "rotulo": "01 · GOVERNANÇA",
    "titulo": "Agente com credenciais próprias exige dono, escopo e registro",
    "texto": "O dot especialista é descrito como ator com identidade e acesso a sistemas da empresa. A pergunta prática é quem aprova o escopo e quem responde pelas ações."
   },
   {
    "rotulo": "02 · ADMINISTRAÇÃO",
    "titulo": "No Enterprise, a decisão é do administrador",
    "texto": "O beta vem desligado por padrão. Empresas com ChatGPT Enterprise podem definir política antes de ligar, em vez de descobrir uso informal depois."
   },
   {
    "rotulo": "03 · FONTE",
    "titulo": "Os exemplos de uso são da própria OpenAI",
    "texto": "O comunicado traz casos internos e de um testador. Não há medição independente de resultado nem preço dos dots adicionais."
   }
  ],
  "fontes": [
   {
    "titulo": "Introducing dots",
    "origem": "OpenAI · comunicado · 29 set 2026",
    "url": "https://openai.com/index/introducing-dots/"
   },
   {
    "titulo": "Getting started with your dot",
    "origem": "OpenAI · Central de Ajuda",
    "url": "https://help.openai.com/articles/20001530"
   }
  ],
  "ficha": [
   {
    "rotulo": "Quem divulgou",
    "valor": "OpenAI"
   },
   {
    "rotulo": "Divulgação",
    "valor": "29 set 2026"
   },
   {
    "rotulo": "Disponibilidade",
    "valor": "Pro (fora de EEE, Suíça e Reino Unido), Business Premium, beta no Enterprise"
   },
   {
    "rotulo": "Dots especialistas",
    "valor": "pilotos com a OpenAI"
   }
  ]
 },
 {
  "id": "meta-whatsapp-cobranca-mensagens-servico",
  "publicado_em": "2026-10-01T21:10:00-03:00",
  "tema": "MERCADO",
  "titulo": "Meta passa a cobrar por resposta de atendimento no WhatsApp Business, inclusive as geradas por agentes de IA de terceiros",
  "linha": "Desde 1º de outubro, mensagens de serviço na API do WhatsApp Business são cobradas por mensagem entregue, com 1.000 gratuitas por mês por número. A Meta oferece o Meta Business Agent, de cobrança própria, como alternativa.",
  "linhaFina": "Respostas dentro da janela de 24 horas, enviadas por pessoas ou por IA de terceiros, deixam de ser gratuitas. A comparação de custo que favorece o agente da própria Meta vem da Meta.",
  "fontePrimaria": "Meta (documentação do WhatsApp Business Platform)",
  "leitura": 3,
  "resumo": [
   "Desde 1º de outubro de 2026, a Meta cobra por mensagem entregue todas as mensagens de serviço (não template) na API do WhatsApp Business. Elas não eram cobradas desde 1º de novembro de 2024.",
   "Cada número de telefone de negócio tem 1.000 mensagens de serviço gratuitas por mês, sem acúmulo. A cobrança começa na mensagem 1.001.",
   "As mensagens de utilidade enviadas em resposta ao cliente, dentro da janela de 24 horas, também voltam a ser cobradas. Estavam gratuitas desde 1º de julho de 2025."
  ],
  "corpo": [
   "Segundo a documentação de preços da Meta, atualizada em 30 de setembro, a mudança vale para mensagens enviadas dentro da janela de atendimento de 24 horas, que se abre e reinicia a cada mensagem do cliente. A Meta cobra apenas mensagens entregues, e só mensagens da empresa para o usuário. A taxa de serviço é a mesma da mensagem de utilidade e de autenticação no mercado correspondente; no exemplo da própria Meta para o Brasil, o valor é 0,68 centavo de dólar por mensagem.",
   "A cobrança vale tanto para resposta digitada por atendente quanto para resposta gerada por uma solução de IA de terceiros conectada à API. Toda mensagem não template passa a cair em uma de duas categorias: serviço, ou Meta Business Agent, o agente de IA da própria Meta, que desde 1º de agosto tem cobrança por consumo de tokens. Para cada mensagem vale uma cobrança só. Mensagens trocadas na janela gratuita aberta por anúncio que leva ao WhatsApp continuam sem custo de entrega.",
   "A Meta avisou que empresas e provedores sem forma de pagamento cadastrada até 30 de setembro deixariam de ter entregues as mensagens de serviço que excedam a franquia gratuita.",
   "Na própria documentação, a Meta compara 10.000 mensagens de IA em resposta a usuários no Brasil: cerca de US$ 968 com IA de terceiros, somando entrega e custo estimado do modelo, contra US$ 400 a US$ 500 com o Meta Business Agent. A própria Meta declara que o custo da IA de terceiros é estimativa baseada em informação pública."
  ],
  "consequencias": [
   {
    "rotulo": "01 · CUSTO",
    "titulo": "Atendimento por WhatsApp com IA ganha uma linha nova na conta",
    "texto": "Quem usa agente de IA de terceiros sobre a API passa a pagar a Meta por resposta, além do fornecedor. Vale levantar quantas mensagens de serviço cada número entrega por mês e comparar com a franquia de 1.000."
   },
   {
    "rotulo": "02 · FORNECEDOR",
    "titulo": "Confira com o provedor quem recebe a fatura e o que mudou nela",
    "texto": "A cobrança é da Meta, mas muitas empresas contratam por um provedor de soluções. A forma de repasse, e se há pagamento cadastrado, depende do contrato."
   },
   {
    "rotulo": "03 · FONTE",
    "titulo": "A comparação com o agente da Meta é da Meta",
    "texto": "A Meta vende o Meta Business Agent e define as regras de cobrança da plataforma. As estimativas de custo de IA de terceiros no comparativo não são medição independente."
   }
  ],
  "oQueFazer": [
   "Peça ao provedor o volume mensal de mensagens de serviço por número e a primeira fatura com a nova categoria. A documentação da Meta indica que a categoria aparece nos webhooks de status e na API de análise de preços."
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
   }
  ],
  "ficha": [
   {
    "rotulo": "Quem divulgou",
    "valor": "Meta, na documentação da plataforma"
   },
   {
    "rotulo": "Vigência",
    "valor": "1 out 2026"
   },
   {
    "rotulo": "Franquia",
    "valor": "1.000 mensagens de serviço por mês por número, sem acúmulo"
   },
   {
    "rotulo": "Observação",
    "valor": "o comparativo de custo com o Meta Business Agent é estimativa da Meta"
   }
  ]
 },
 {
  "id": "neoassist-agentes-vivara-koin",
  "publicado_em": "2026-10-01T17:53:00-03:00",
  "tema": "CASOS",
  "titulo": "NeoAssist diz que agente de IA da Vivara filtra 75% dos atendimentos e reduziu transbordo na Black Friday",
  "linha": "Segundo a fornecedora, os contatos transbordados para atendentes humanos na Black Friday de 2025 ficaram 13% abaixo do ano anterior, com volume de chamados mais de 50% maior. Na Koin, a satisfação no chat praticamente dobrou no primeiro mês.",
  "linhaFina": "Os números são da NeoAssist, que desenvolveu os agentes, e foram publicados pelo portal ClienteSA. Vivara e Koin não aparecem confirmando os resultados na matéria.",
  "fontePrimaria": "NeoAssist, via ClienteSA",
  "leitura": 2,
  "resumo": [
   "A Vick, agente de IA da Vivara desenvolvido com a NeoAssist, filtra 75% dos atendimentos feitos pela ferramenta e atua em compra, personal shopping, SAC e pós-venda.",
   "Na Black Friday de 2025, com dois meses de operação do agente, o volume de chamados da Vivara cresceu mais de 50% e os contatos transbordados para humanos ficaram 13% abaixo do ano anterior.",
   "Na Koin, um agente substituiu um bot de fluxos predefinidos e a satisfação no chat praticamente dobrou no primeiro mês, segundo a matéria."
  ],
  "corpo": [
   "O portal ClienteSA publicou casos de uso de agentes de IA no atendimento da Vivara e da Koin, empresa de soluções financeiras para o comércio digital. Os dois projetos foram feitos com a NeoAssist, cujo CEO, Oswaldo Garcia, é o porta-voz da matéria.",
   "Na Vivara, segundo o texto, os contatos sobre status de pedido, que eram cerca de 40% das interações, passaram a ficar entre 10% e 14%. A operação registra CSAT de 80 pontos, e o WhatsApp é o principal canal de atendimento.",
   "Na Koin, o projeto partiu do mapeamento dos pontos de atrito (limite, reembolso, análise antifraude e cadastro no aplicativo), e o agente foi testado por funcionários da própria empresa antes de entrar em operação. A matéria não informa números absolutos de satisfação nem de volume."
  ],
  "consequencias": [
   {
    "rotulo": "01 · TRANSBORDO",
    "titulo": "A métrica útil é quanto chega ao humano",
    "texto": "O número mais concreto do caso é o transbordo para atendentes em pico de demanda, não a taxa de automação. É uma medida que qualquer operação de atendimento consegue acompanhar antes e depois."
   },
   {
    "rotulo": "02 · PERFIL",
    "titulo": "Agente muda o tipo de demanda que sobra",
    "texto": "Se perguntas de status de pedido saem da fila humana, o que fica para a equipe tende a ser mais complexo, o que afeta treinamento e tempo médio de atendimento."
   },
   {
    "rotulo": "03 · FONTE",
    "titulo": "Números de quem vendeu o projeto",
    "texto": "Os resultados foram divulgados pela fornecedora e não aparecem confirmados pelas clientes. Servem como referência de ordem de grandeza, não como garantia."
   }
  ],
  "fontes": [
   {
    "titulo": "Vivara e Koin comemoram resultados do uso de agentes de IA",
    "origem": "ClienteSA · matéria · 1 out 2026",
    "url": "https://portal.clientesa.com.br/vivara-e-koin-comemoram-resultados-do-uso-de-agentes-de-ia/"
   }
  ],
  "ficha": [
   {
    "rotulo": "Quem mediu",
    "valor": "NeoAssist (fornecedora)"
   },
   {
    "rotulo": "Confirmação",
    "valor": "não confirmada pelo cliente"
   },
   {
    "rotulo": "Divulgação",
    "valor": "1 out 2026, portal ClienteSA"
   }
  ]
 },
 {
  "id": "pwc-lideres-agentes-autonomos-ciberdefesa",
  "publicado_em": "2026-10-01T17:53:00-03:00",
  "tema": "PESQUISA",
  "titulo": "Só 22% dos líderes de segurança autorizariam agentes de IA a agir sozinhos na ciberdefesa, diz PwC",
  "linha": "Pesquisa da PwC com 3.934 executivos em 71 países: 50% dos líderes de segurança apontam ataques a sistemas de IA entre as ameaças para as quais estão menos preparados.",
  "linhaFina": "A edição 2027 do Global Digital Trust Insights mostra orçamento de segurança em alta e pouca confiança em dar autonomia total a agentes. Confiabilidade da tecnologia é a principal barreira citada.",
  "fontePrimaria": "PwC",
  "leitura": 3,
  "resumo": [
   "84% dos líderes de segurança e finanças ouvidos esperam aumento do orçamento de segurança cibernética nos próximos 12 meses, ante 78% no ano anterior.",
   "50% dos líderes de segurança colocam ataques a sistemas de IA entre as ameaças para as quais estão menos preparados.",
   "Apenas 22% autorizariam execução totalmente autônoma por agentes de IA na defesa cibernética; 55% citam confiabilidade e maturidade da tecnologia entre as três maiores barreiras."
  ],
  "corpo": [
   "A PwC divulgou em 1º de outubro a edição 2027 do Global Digital Trust Insights Survey, que ouviu 3.934 executivos de negócio e tecnologia em 71 países e territórios.",
   "Sobre agentes, o dado central é de confiança: só 22% dos líderes de segurança autorizariam execução totalmente autônoma por agentes de IA na defesa cibernética. Entre as barreiras para dar mais autonomia aos agentes nas operações de segurança, 55% citam confiabilidade e maturidade da tecnologia, 46% citam responsabilização e explicabilidade das decisões, e 44% dos CISOs citam falta de competência da equipe em supervisão e governança de IA.",
   "Do lado das ameaças, 50% dos líderes de segurança apontam ataques a sistemas de IA entre os que estão menos preparados para enfrentar, à frente de ameaças ligadas à nuvem (40%), invasões via terceiros (34%) e ransomware (33%). Comprometimento por botnets autônomas (53%), ataques adversariais (52%) e envenenamento de dados (52%) lideram a lista de ataques com IA.",
   "A pesquisa também mede governança: 39% têm plano de continuidade formalizado e operacional que trata especificamente de risco cibernético, e 47% concordam totalmente que risco cibernético é pauta permanente do conselho."
  ],
  "consequencias": [
   {
    "rotulo": "01 · AUTONOMIA",
    "titulo": "Até a área de segurança prefere agente com aprovação humana",
    "texto": "Se só 22% dos líderes de segurança aceitam agente agindo sozinho na própria área, é razoável que a empresa média comece agentes em outras áreas com etapa de aprovação humana."
   },
   {
    "rotulo": "02 · SUPERFÍCIE",
    "titulo": "Agente em produção é também um alvo",
    "texto": "Ataques a sistemas de IA aparecem no topo das ameaças com menor preparo. Cada agente com acesso a ERP, e-mail ou dados de clientes entra no inventário de risco."
   },
   {
    "rotulo": "03 · FONTE",
    "titulo": "Quem publica vende consultoria de segurança",
    "texto": "A PwC presta serviços de segurança e de IA. Os números podem estar certos e ainda assim reforçar a demanda pelo serviço de quem os divulgou."
   }
  ],
  "oQueFazer": [
   "Antes de ampliar o que um agente pode fazer sozinho, vale registrar quais sistemas ele acessa, quem aprova as ações com efeito externo e como ele é desligado em caso de comportamento inesperado."
  ],
  "fontes": [
   {
    "titulo": "84% of senior leaders expect cyber budgets to rise as frontier AI models are rolled out",
    "origem": "PwC · comunicado · 1 out 2026",
    "url": "https://www.pwc.com/gx/en/news-room/press-releases/2026/senior-leaders-cyber-budget-rise.html"
   }
  ],
  "ficha": [
   {
    "rotulo": "Quem mediu",
    "valor": "PwC (2027 Global Digital Trust Insights Survey)"
   },
   {
    "rotulo": "Amostra",
    "valor": "3.934 executivos de negócio e tecnologia em 71 países e territórios"
   },
   {
    "rotulo": "Divulgação",
    "valor": "1 out 2026"
   }
  ]
 },
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
 },
 {
  "id": "collibra-revisao-humana-de-agentes",
  "publicado_em": "2026-10-01T17:15:00-03:00",
  "tema": "PESQUISA",
  "titulo": "76% das empresas travaram ao levar agentes do piloto para a produção, diz Collibra",
  "linha": "Pouco mais da metade gasta horas significativas revisando o que os agentes produzem. A Collibra chama isso de \"imposto da alucinação\".",
  "linhaFina": "Pesquisa da Collibra com a Harris Poll ouviu mais de 300 decisores de dados e IA nos Estados Unidos. Na mesma semana, a empresa lançou produtos para reduzir esse custo.",
  "fontePrimaria": "Collibra / The Harris Poll",
  "leitura": 3,
  "resumo": [
   "76% das organizações encontraram bloqueios críticos para levar agentes do piloto à produção nos últimos 12 meses.",
   "Pouco mais da metade gasta horas significativas da equipe revisando e corrigindo saídas de agentes antes de irem ao ar; nas empresas acima de US$ 100 milhões de receita, 64%.",
   "72% dizem que, quando a iniciativa de IA falha, a causa quase sempre é base de dados desalinhada ou ruim."
  ],
  "corpo": [
   "A Collibra, empresa de governança de dados, divulgou em setembro uma pesquisa feita pela The Harris Poll com mais de 300 decisores de dados, privacidade e IA nos Estados Unidos.",
   "Segundo o levantamento, 76% das organizações encontraram bloqueios críticos ao tentar levar agentes do piloto para a produção nos últimos 12 meses. Pouco mais da metade gasta horas significativas da equipe revisando e corrigindo o que os agentes produzem antes de ir ao ar, e 87% dizem gastar tempo relevante reverificando o contexto com que os agentes trabalham.",
   "A empresa chama esse custo de \"imposto da alucinação\". Em 23 de setembro, a Collibra anunciou novos recursos de produto voltados a reduzi-lo."
  ],
  "consequencias": [
   {
    "rotulo": "01 · CUSTO",
    "titulo": "Revisão humana precisa entrar na conta do projeto",
    "texto": "Se metade das empresas revisa a saída dos agentes, um business case que supõe automação total está incompleto."
   },
   {
    "rotulo": "02 · DADOS",
    "titulo": "O gargalo citado é o dado, não o modelo",
    "texto": "A causa apontada para as falhas é a base de dados, o que desloca o esforço para antes do agente."
   },
   {
    "rotulo": "03 · FONTE",
    "titulo": "Pesquisa e produto saíram juntos",
    "texto": "A Collibra publicou o dado e lançou a solução na mesma semana. Vale ler os números com isso em mente."
   }
  ],
  "fontes": [
   {
    "titulo": "Collibra Survey Finds 76% of Organizations Hit Roadblocks Scaling AI Agents",
    "origem": "BigDATAwire · set 2026",
    "url": "https://www.hpcwire.com/bigdatawire/this-just-in/collibra-survey-finds-76-of-organizations-hit-roadblocks-scaling-ai-agents/"
   },
   {
    "titulo": "Collibra Launches New Capabilities to Reduce the Hallucination Tax on Enterprise AI",
    "origem": "Collibra · comunicado · 23 set 2026",
    "url": "https://www.collibra.com/company/newsroom/press-releases/collibra-launches-new-capabilities-to-reduce-the-hallucination-tax-on-enterprise-ai"
   }
  ],
  "ficha": [
   {
    "rotulo": "Quem mediu",
    "valor": "Collibra, com The Harris Poll"
   },
   {
    "rotulo": "Amostra",
    "valor": "300+ decisores de dados e IA nos EUA"
   },
   {
    "rotulo": "Divulgação",
    "valor": "set 2026"
   }
  ]
 },
 {
  "id": "google-idc-brasil-agentes-pessoais",
  "publicado_em": "2026-10-01T17:10:00-03:00",
  "tema": "PESQUISA",
  "titulo": "38% dos trabalhadores brasileiros usam agentes de IA pessoais no trabalho",
  "linha": "Estudo do Google Cloud com a IDC: 59% deles consideram a prática de baixo ou nenhum risco. 75% não sabem exatamente o que pedir às ferramentas.",
  "linhaFina": "Segunda edição do estudo \"Work: In Progress\", do Google Cloud com a IDC. No Brasil, 17% das empresas estão em adoção consolidada de IA, contra 12% na América Latina.",
  "fontePrimaria": "Google Cloud / IDC",
  "leitura": 3,
  "resumo": [
   "38% dos trabalhadores brasileiros recorrem a agentes de IA pessoais para tarefas de trabalho, e 59% deles consideram isso de baixo ou nenhum risco.",
   "17% das empresas brasileiras estão em adoção consolidada e 40% aceleram iniciativas internas; na América Latina, 12% e 35%.",
   "75% relatam não saber exatamente o que pedir às ferramentas, e 62% temem ficar dispensáveis."
  ],
  "corpo": [
   "O Google Cloud divulgou a segunda edição do estudo \"Work: In Progress\", feito com a IDC, com dados sobre o uso de IA no trabalho na América Latina. O recorte brasileiro foi reportado pelo Jornal do Commercio em 25 de setembro.",
   "Entre as empresas brasileiras, 17% estão em fase de adoção consolidada de IA e 40% aceleram iniciativas internas, contra 12% e 35% na média da América Latina.",
   "Do lado dos trabalhadores, 38% usam agentes de IA pessoais para tarefas de trabalho, e 59% deles consideram a prática de baixo ou nenhum risco. Entre os motivos para o uso fora das ferramentas oficiais estão facilidade de acesso (39%) e percepção de mais segurança e privacidade (39%); 29% apontam problemas de compatibilidade tecnológica como o maior gargalo."
  ],
  "consequencias": [
   {
    "rotulo": "01 · DADOS",
    "titulo": "Agente pessoal é dado da empresa fora do controle da empresa",
    "texto": "Se o funcionário usa um agente próprio para trabalhar, a informação que ele processa sai do ambiente aprovado."
   },
   {
    "rotulo": "02 · CAPACITAÇÃO",
    "titulo": "A barreira declarada é saber pedir",
    "texto": "Com três em cada quatro sem saber o que pedir, treinamento rende mais do que trocar de ferramenta."
   }
  ],
  "fontes": [
   {
    "titulo": "Brasil lidera uso de agentes de IA na América Latina em meio ao desafio da capacitação empresarial",
    "origem": "Jornal do Commercio · 25 set 2026",
    "url": "https://jc.uol.com.br/tecnologia/2026/09/25/brasil-lidera-uso-de-agentes-de-ia-na-america-latina-em-meio-ao-desafio-da-capacitacao-empresarial.html"
   }
  ],
  "ficha": [
   {
    "rotulo": "Quem mediu",
    "valor": "Google Cloud, com a IDC"
   },
   {
    "rotulo": "Estudo",
    "valor": "Work: In Progress, 2ª edição"
   },
   {
    "rotulo": "Divulgação",
    "valor": "25 set 2026"
   }
  ]
 },
 {
  "id": "staryaai-casos-dr-consulta-unimed-algar",
  "publicado_em": "2026-10-01T17:05:00-03:00",
  "tema": "CASOS",
  "titulo": "Fornecedora StaryaAI divulga resultados de agentes no dr.consulta, na Unimed Paraná e no Grupo Algar",
  "linha": "Segundo a empresa, conversão de programa no dr.consulta foi de 5% para 30%. Os números são da fornecedora; os clientes não os confirmaram publicamente.",
  "linhaFina": "Os dados foram apresentados pela StaryaAI, que desenvolve os agentes, e reportados pela Adnews. Nenhum dos clientes citados confirmou os números no material publicado.",
  "fontePrimaria": "StaryaAI (fornecedora), via Adnews",
  "leitura": 3,
  "resumo": [
   "No dr.consulta, segundo a StaryaAI, a conversão do Programa de Saúde subiu de 5% para 30%, com mais de 3 milhões de mensagens e 75 mil conversões.",
   "Numa operação da Unicall para a Unimed Paraná, o tempo médio de atendimento nos fluxos cobertos caiu de oito para dois minutos, e 12% das chamadas foram resolvidas pela IA no primeiro mês.",
   "Com Brain e Grupo Algar, cinco agentes estavam em produção, com meta de chegar a 50 até dezembro de 2026."
  ],
  "corpo": [
   "Em material reportado pela Adnews em 28 de setembro, a StaryaAI, que desenvolve agentes de IA para atendimento, vendas e processos internos, apresentou resultados de projetos com clientes.",
   "Os números citados são da própria fornecedora: no dr.consulta, a conversão do Programa de Saúde teria passado de 5% para 30%; na operação da Unicall para a Unimed Paraná, o tempo médio de atendimento nos fluxos cobertos teria caído de oito para dois minutos; com Brain e o Grupo Algar, cinco agentes estariam em produção, com meta de 50 até dezembro de 2026.",
   "No mesmo material, o CTO da StaryaAI, Vinícius Reis, afirma que conversão, tempo de atendimento, resolutividade, custo, qualidade e necessidade de intervenção humana importam mais do que uma demonstração visualmente impressionante."
  ],
  "consequencias": [
   {
    "rotulo": "01 · FONTE",
    "titulo": "Número de fornecedor é ponto de partida, não prova",
    "texto": "Os resultados vêm de quem vende os agentes. Até o cliente confirmar, eles valem como relato."
   },
   {
    "rotulo": "02 · MÉTRICA",
    "titulo": "As métricas citadas são de negócio",
    "texto": "Conversão, tempo de atendimento e resolução são os indicadores que a própria fornecedora diz importar mais do que a demonstração."
   }
  ],
  "fontes": [
   {
    "titulo": "Agentes de IA avançam nas empresas, mas governança ainda limita adoção em escala",
    "origem": "Adnews · 28 set 2026",
    "url": "https://adnews.com.br/post/agentes-de-ia-avancam-nas-empresas-mas-governanca-ainda-limita-adocao-em-escala"
   }
  ],
  "ficha": [
   {
    "rotulo": "Quem divulgou",
    "valor": "StaryaAI, fornecedora dos agentes"
   },
   {
    "rotulo": "Clientes citados",
    "valor": "dr.consulta, Unicall/Unimed Paraná, Grupo Algar"
   },
   {
    "rotulo": "Confirmação",
    "valor": "Não confirmada pelos clientes"
   },
   {
    "rotulo": "Divulgação",
    "valor": "28 set 2026"
   }
  ]
 }
];
