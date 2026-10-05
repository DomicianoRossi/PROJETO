// Gerado por scripts/build_dados.py. Não edite à mão: edite conteudo/publicado/.
window.AW_DADOS = window.AW_DADOS || {};
window.AW_DADOS.assinatura = "Apurado e escrito por agentes AgenticWay · editor responsável: Domiciano Rossi";
window.AW_DADOS.na_operacao = [
 {
  "id": "la-moda-inspecao-qualidade-agentes",
  "publicado_em": "2026-10-05T09:00:00-03:00",
  "setor": "VAREJO",
  "processo": "OPERAÇÃO",
  "status": "piloto",
  "empresa": "La Moda",
  "titulo": "La Moda diz, em evento do fornecedor, que dois agentes cortaram a inspeção de qualidade de 12–15 horas para cinco em uma prova de conceito",
  "linhaFina": "O número vem do relato de um painel organizado pela Rimini Street, que vende a solução. É uma prova de conceito, sem custo, sem escala e sem medição independente.",
  "resumo": "A La Moda, do setor de moda, testou com a Rimini Street e a ServiceNow uma solução com dois agentes de IA sobre o SAP para a inspeção de qualidade. Segundo o fornecedor, o ciclo caiu de 12–15 horas para cinco, redução de 67%.",
  "leitura": 5,
  "abertura": "A La Moda é uma empresa brasileira do setor de moda. Segundo o relato publicado pela Rimini Street, ela trata o SAP como sistema de registro e conformidade e prefere construir inovação ao redor dele, e não dentro dele. Rômulo Banhe, responsável de tecnologia da empresa, participou de um painel no evento Street Smart Brazil, em São Paulo, para falar de uma prova de conceito recém-concluída.",
  "problema": "O processo de inspeção de qualidade levava de 12 a 15 horas por ciclo e exigia muito esforço manual, segundo a fonte. A La Moda já tinha tentado o mesmo projeto internamente e, depois de seis meses, ele ainda não estava pronto, conforme o relato de Banhe.",
  "solucao": "A Rimini Street e a ServiceNow montaram em menos de 45 dias uma solução com dois agentes de IA, uma interface de baixo código e integração direta com os dados que a empresa já tinha. A solução usa a plataforma ServiceNow como camada de fluxo sobre o SAP, sem alterá-lo. O texto não detalha o que cada um dos dois agentes faz, quais dados lê nem o que entrega. A Rimini diz que simplificou antes as 12 etapas do processo e só depois aplicou IA onde havia ganho. A equipe pediu especificamente uma versão para celular.",
  "resultado": "Segundo a Rimini Street, o processo passou a levar cinco horas, redução de 67% frente às 12 a 15 horas anteriores. A fonte afirma ainda que a economia prevista só nesse caso de uso cobre a licença anual da ServiceNow necessária para uma implantação completa, sem dar o valor da economia nem o da licença.",
  "humano": "A fonte não diz quanto da inspeção continua com pessoas, nem quem aprova o resultado dos agentes. A versão para celular indica que a equipe segue operando o processo.",
  "numeros": [
   {
    "valor": "12–15 h → 5 h",
    "legenda": "duração de um ciclo de inspeção de qualidade, antes e depois, na prova de conceito",
    "quemMediu": "Rimini Street, em relato de painel publicado em 25/set/2026"
   },
   {
    "valor": "67%",
    "legenda": "de redução no tempo do processo",
    "quemMediu": "Rimini Street, em relato de painel publicado em 25/set/2026"
   },
   {
    "valor": "45 dias",
    "legenda": "(menos de) para entregar a solução com dois agentes de IA",
    "quemMediu": "Rimini Street, em relato de painel publicado em 25/set/2026"
   }
  ],
  "fluxo": [
   {
    "tipo": "ENTRADA",
    "nome": "Inspeção de qualidade",
    "faz": "O ciclo de inspeção começa com a equipe da La Moda, em processo que antes levava de 12 a 15 horas."
   },
   {
    "tipo": "AGENTE",
    "nome": "Dois agentes de IA",
    "faz": "A fonte informa que são dois agentes, sem descrever a função de cada um."
   },
   {
    "tipo": "SISTEMA",
    "nome": "ServiceNow sobre o SAP",
    "faz": "A ServiceNow serve de camada de fluxo e interface de baixo código, com integração direta aos dados existentes. O SAP continua como sistema de registro e conformidade."
   },
   {
    "tipo": "SAÍDA",
    "nome": "Ciclo de cinco horas",
    "faz": "Segundo a Rimini Street, o processo simplificado e com agentes leva cinco horas, com versão para celular."
   }
  ],
  "indicadores": [
   {
    "nome": "Duração do ciclo de inspeção",
    "antes": "12–15 h",
    "depois": "5 h",
    "medida": "Rimini Street, em relato de painel; prova de conceito"
   }
  ],
  "naoConta": [
   {
    "valor": "Medição",
    "texto": "o texto não diz quantos ciclos foram medidos, em que período, nem quem fez a medição. O número é narrado em painel pelo fornecedor, sem dado de apoio."
   },
   {
    "valor": "Custo",
    "texto": "não foram divulgados o custo do projeto, o valor da licença da ServiceNow nem a economia prevista que a cobriria."
   },
   {
    "valor": "Escala",
    "texto": "trata-se de uma prova de conceito. A fonte não diz se a solução foi para produção, em quantas unidades, nem o que cada agente faz e com que supervisão."
   }
  ],
  "licoes": [
   {
    "titulo": "Simplificar antes de automatizar",
    "texto": "A Rimini diz que reduziu as 12 etapas do processo antes de aplicar IA. Parte do ganho de 67% pode vir dessa simplificação, e a fonte não separa as duas coisas."
   },
   {
    "titulo": "Pedir a medição por trás do percentual",
    "texto": "Antes de comparar com o seu processo, pergunte ao fornecedor quantos ciclos foram medidos, em que período e por quem. Um percentual de painel não substitui isso."
   },
   {
    "titulo": "Camada sobre o ERP é decisão de arquitetura",
    "texto": "A La Moda manteve o SAP intacto e pôs o fluxo ao redor. Isso reduz risco no sistema de registro, mas cria dependência de outra plataforma e de outra licença."
   }
  ],
  "ficha": [
   {
    "rotulo": "Empresa",
    "valor": "La Moda"
   },
   {
    "rotulo": "Setor",
    "valor": "Moda (porte e atividade exata não informados pela fonte)"
   },
   {
    "rotulo": "Processo",
    "valor": "Inspeção de qualidade"
   },
   {
    "rotulo": "Sistema",
    "valor": "SAP (sistema de registro) com ServiceNow como camada de fluxo"
   },
   {
    "rotulo": "Quem fez",
    "valor": "Rimini Street e ServiceNow"
   },
   {
    "rotulo": "Status",
    "valor": "Prova de conceito concluída; produção não informada"
   },
   {
    "rotulo": "Divulgação",
    "valor": "Relato de painel no blog da Rimini Street, 25/set/2026"
   }
  ],
  "comoApuramos": "Lemos o texto publicado no blog da Rimini Street em 25 de setembro de 2026 sobre o evento Street Smart Brazil, em São Paulo. Todos os números vêm do relato do fornecedor, e não encontramos outra fonte com os mesmos dados. Não houve visita nem entrevista.",
  "transparencia": "A fonte é a Rimini Street, que vende a solução e organizou o evento. O número não foi publicado pela La Moda e não há medição independente.",
  "fontes": [
   {
    "titulo": "Street Smart Brazil 2026: Brazil's Pragmatic Path to Agentic AI ERP",
    "origem": "Rimini Street (blog), 25/set/2026",
    "url": "https://www.riministreet.com/blog/street-smart-brazil-2026-brazils-pragmatic-path-to-agentic-ai-erp/"
   }
  ],
  "imagem": {
   "arquivo": "img/na-operacao/la-moda-inspecao-qualidade-agentes-ia.png",
   "alt": "Mesa de madeira em oficina de confecção com tecidos dobrados, um tablet com a tela apagada e um caderno; ao fundo, fora de foco, pessoas de costas e araras de roupas.",
   "modelo": "gemini-3.1-flash-image",
   "prompt": "A quiet apparel quality inspection table in a garment workshop, folded fabric samples and a tablet lying flat, clothing racks softly blurred in the background, late afternoon light. Computer monitors turned away or out of focus with no readable content. No text, no lettering, no logos, no signage, no readable screens, no identifiable faces. Style: realistic editorial photo, shallow depth of field, calm, not staged, not stock-photo, muted navy and warm paper tones"
  }
 },
 {
  "id": "lg-brasil-atendimento-agente-voz",
  "publicado_em": "2026-10-01T21:13:32-03:00",
  "setor": "INDÚSTRIA",
  "processo": "ATENDIMENTO",
  "status": "em-operacao",
  "empresa": "LG Electronics Brasil",
  "titulo": "LG Brasil troca a URA por um agente de voz e diz que ele resolveu 51,7% das ligações no primeiro mês",
  "linhaFina": "O número é da própria empresa, cobre menos de um mês de operação e não vem com custo, satisfação do cliente nem comparação com a URA antiga.",
  "resumo": "A LG Brasil colocou no telefone um agente de voz feito por time interno com a API de áudio em tempo real da OpenAI. Segundo a empresa, foram mais de 13.200 atendimentos desde 1º de setembro, com 51,7% resolvidos sem transferência.",
  "leitura": 5,
  "abertura": "A LG Electronics opera no Brasil desde 1996, com fábrica em Manaus, cerca de três mil colaboradores e call center próprio, segundo o comunicado da empresa. O atendimento ao consumidor já tinha uma persona de IA, a LiGi.IA, no WhatsApp. O telefone seguia com a URA, os menus de opções.",
  "problema": "A empresa descreve o problema pelo que o agente substitui: menus de URA, tempo de espera e transferências entre áreas. O comunicado não traz números do canal de voz antes do agente, como tempo médio de espera, taxa de abandono ou volume de transferências.",
  "solucao": "O VoiceBot AI Agent atende as ligações em linguagem natural, no lugar dos menus. Foi desenvolvido pelo time interno de AI eXperience (AX) da LG Brasil com a API de áudio em tempo real da OpenAI. Segundo a empresa, entende o contexto da conversa, ajusta as respostas ao tom de voz do cliente e cobre a jornada da pré-compra ao agendamento de instalação e reparo. Funciona 24 horas por dia, sete dias por semana. O comunicado não diz a quais sistemas internos o agente se conecta para consultar pedidos ou agendar visitas.",
  "resultado": "Desde o lançamento, em 1º de setembro, até o comunicado de 30 de setembro, foram mais de 13.200 atendimentos, e em 51,7% deles a solicitação foi resolvida pela IA sem transferência para um atendente, segundo a LG. Os números são da empresa e não foram auditados por terceiros. Com esse resultado, a matriz na Coreia do Sul escolheu a LG Brasil para liderar a expansão da solução, primeiro para a América Latina e depois para outros mercados.",
  "humano": "O atendente humano continua disponível de segunda a sexta, das 8h às 20h, para quem preferir ou quando a demanda exige. Fora desse horário, quem liga fala só com o agente. A empresa não detalhou o que aconteceu com os atendimentos fora dos 51,7%: quantos foram transferidos e quantos terminaram sem solução.",
  "citacao": {
   "texto": "Nosso objetivo não é apenas automatizar o atendimento. Queremos usar a inteligência artificial para reduzir o esforço do cliente e tornar cada contato com a LG mais humano, ágil e resolutivo.",
   "quem": "Marconi Filho, diretor de Atendimento ao Cliente e AI eXperience da LG América Latina, no comunicado de 30/set/2026"
  },
  "numeros": [
   {
    "valor": "51,7%",
    "legenda": "das solicitações resolvidas pela IA sem transferência para atendente",
    "quemMediu": "LG Brasil, em comunicado"
   },
   {
    "valor": "13.200",
    "legenda": "atendimentos (mais de) entre 1º de setembro e 30 de setembro de 2026",
    "quemMediu": "LG Brasil, em comunicado"
   }
  ],
  "fluxo": [
   {
    "tipo": "ENTRADA",
    "nome": "Ligação do cliente",
    "faz": "O consumidor liga para a central de atendimento da LG e é atendido sem menu de URA."
   },
   {
    "tipo": "AGENTE",
    "nome": "VoiceBot AI Agent",
    "faz": "Conversa em linguagem natural, interpreta o contexto e o tom de voz e trata dúvidas de pré-compra e pedidos de instalação e reparo."
   },
   {
    "tipo": "SISTEMA",
    "nome": "API de áudio em tempo real da OpenAI",
    "faz": "Processa a voz durante a conversa. Os sistemas internos consultados pelo agente não foram informados."
   },
   {
    "tipo": "SAÍDA",
    "nome": "Solicitação resolvida",
    "faz": "Em 51,7% dos atendimentos, segundo a LG, o caso termina sem transferência."
   },
   {
    "tipo": "EXCEÇÃO",
    "nome": "Transferência para atendente",
    "faz": "Quando a demanda exige ou o cliente prefere, a ligação vai para uma pessoa, de segunda a sexta, das 8h às 20h."
   }
  ],
  "indicadores": [],
  "naoConta": [
   {
    "valor": "Comparação",
    "texto": "a empresa não divulgou os indicadores da URA anterior, então não dá para saber quanto os 51,7% representam de melhora."
   },
   {
    "valor": "Qualidade",
    "texto": "não há dado de satisfação do cliente, de recontato nem de como a resolução foi definida e medida."
   },
   {
    "valor": "Custo e prazo",
    "texto": "não foram informados o custo do projeto, o gasto com a API nem quanto tempo levou a implantação."
   }
  ],
  "licoes": [
   {
    "titulo": "Taxa de resolução sem base não é ganho",
    "texto": "Antes de ligar um agente de atendimento, guarde os números do canal antigo. Sem eles, 51,7% é uma foto, não uma comparação."
   },
   {
    "titulo": "Defina o que é resolver",
    "texto": "Ligação sem transferência pode ser problema resolvido ou cliente que desistiu. Medir recontato nos dias seguintes separa os dois."
   },
   {
    "titulo": "O horário do humano é decisão de produto",
    "texto": "Com o agente 24 horas e pessoas só em horário comercial, à noite e no fim de semana a IA é o único canal. Vale decidir isso de propósito e acompanhar o que acontece nesses horários."
   }
  ],
  "ficha": [
   {
    "rotulo": "Empresa",
    "valor": "LG Electronics Brasil"
   },
   {
    "rotulo": "Setor",
    "valor": "Indústria (eletroeletrônicos)"
   },
   {
    "rotulo": "Processo",
    "valor": "Atendimento ao consumidor por telefone"
   },
   {
    "rotulo": "Sistema",
    "valor": "API de áudio em tempo real da OpenAI; sistemas internos não informados"
   },
   {
    "rotulo": "Quem fez",
    "valor": "Time interno de AI eXperience (AX) da LG Brasil"
   },
   {
    "rotulo": "Status",
    "valor": "Em operação desde 1º de setembro de 2026"
   },
   {
    "rotulo": "Divulgação",
    "valor": "Comunicado da empresa (PR Newswire), 30/set/2026"
   }
  ],
  "comoApuramos": "Lemos o comunicado da LG Electronics Brasil distribuído pela PR Newswire em 30 de setembro de 2026 e a reportagem do IT Forum publicada em 1º de outubro de 2026, que reproduz os mesmos números atribuindo-os à companhia. Todos os números e falas deste caso estão nessas duas fontes. Não houve visita nem entrevista: o caso foi montado apenas com fontes públicas.",
  "transparencia": "A fonte primária é a própria LG, divulgando um projeto feito pelo seu time e o resultado do primeiro mês. A reportagem do IT Forum repete os dados da empresa, sem medição independente. A OpenAI, fornecedora da API, não aparece nas fontes comentando o caso.",
  "fontes": [
   {
    "titulo": "LG Brasil expande atendimento com inteligência artificial para o canal de voz e lidera projeto global da marca",
    "origem": "LG Electronics Brasil, via PR Newswire, 30/set/2026",
    "url": "https://www.prnewswire.com/br/comunicados-para-a-imprensa/lg-brasil-expande-atendimento-com-inteligencia-artificial-para-o-canal-de-voz-e-lidera-projeto-global-da-marca-302894847.html"
   },
   {
    "titulo": "LG Brasil resolve 51,7% dos atendimentos com agente de voz com IA",
    "origem": "IT Forum, 01/out/2026",
    "url": "https://itforum.com.br/noticias/lg-brasil-agente-voz-ia-atendimento/"
   }
  ],
  "imagem": {
   "arquivo": "img/na-operacao/lg-brasil-atendimento-agente-voz-ia.png",
   "alt": "Fone de ouvido com microfone sobre uma mesa de madeira em primeiro plano; ao fundo, fora de foco, atendentes em baias de um call center ao entardecer.",
   "modelo": "gemini-3.1-flash-image",
   "prompt": "A quiet customer service call center in Brazil at dusk, empty headset resting on a desk in the foreground, a few agents working softly in the blurred background. Computer monitors turned away or out of focus with no readable content. No text, no lettering, no logos, no signage, no readable screens, no identifiable faces. Style: realistic editorial photo, shallow depth of field, calm, not staged, not stock-photo, muted navy and warm paper tones"
  }
 }
];
