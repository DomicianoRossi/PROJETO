// Gerado por scripts/build_dados.py. Não edite à mão: edite conteudo/publicado/.
window.AW_DADOS = window.AW_DADOS || {};
window.AW_DADOS.assinatura = "Apurado e escrito por agentes AgenticWay · editor responsável: Domiciano Rossi";
window.AW_DADOS.ferramentas = [
 {
  "id": "zapier-ou-n8n-agentes-integracao",
  "publicado_em": "2026-10-06T08:00:00-03:00",
  "consultadoEm": "out/2026",
  "tipo": "COMPARATIVO",
  "categoria": "AUTOMAÇÃO",
  "titulo": "Zapier ou n8n para pôr agentes nos processos: o que cada um documenta sobre integração",
  "linhaFina": "Os dois prometem ligar agentes de IA aos sistemas da empresa. Lemos preços, documentação e termos de dados de cada um, critério por critério.",
  "linha": "Zapier cobra por tarefa e hospeda nos EUA; n8n cobra por execução e pode rodar no servidor da empresa.",
  "leitura": 6,
  "abertura": "Quem quer pôr um agente de IA para mexer em CRM, planilha ou e-mail costuma chegar a duas plataformas de automação: Zapier e n8n. As duas já têm agentes, aprovação humana e milhares de integrações. A escolha raramente se decide pelo que o agente faz na demonstração, e sim por quatro perguntas de operação: quem entra com qual login, o que fica registrado, onde ficam os dados e quanto custa quando o volume cresce.",
  "metodo": "Lemos as páginas de preços, a central de ajuda e a documentação oficial de cada fornecedor, além das páginas de privacidade e de processamento de dados, em outubro de 2026. Escolhemos Zapier e n8n porque têm preço público, aceitam contratação direta do Brasil e as duas documentam agentes de IA ligados a aplicativos que a empresa já usa. Nenhuma ferramenta foi instalada ou usada; cada marca reflete o que a página citada descreve, não comportamento observado. Ausência de documentação não significa ausência do recurso.",
  "ferramentas": [
   {
    "nome": "Zapier",
    "fornecedor": "Zapier Inc.",
    "tipo": "SaaS (nuvem do fornecedor)",
    "preco": "Free US$ 0/mês (100 tarefas); Professional a partir de US$ 19,99/mês e Team a partir de US$ 69/mês, ambos com cobrança anual (mensal custa mais); Enterprise sob consulta",
    "resumo": "Catálogo amplo e aprovação humana nos planos pagos; dados só nos EUA",
    "texto": "O Zapier cobra por tarefa, e a página de preços diz que passos de IA, código e SDK seguem o mesmo modelo por tarefa. O catálogo passa de 9.000 aplicativos. A aprovação humana é um passo próprio (Human in the Loop), disponível a partir do plano Professional. SSO SAML aparece a partir do plano Team. Os dados ficam em servidores da AWS nos Estados Unidos, e o fornecedor diz não oferecer hospedagem só na União Europeia."
   },
   {
    "nome": "n8n",
    "fornecedor": "n8n GmbH",
    "tipo": "SaaS ou instalado no servidor da empresa",
    "preco": "Starter 20/mês (2,5 mil execuções); Pro 50/mês (10 mil); Business 667/mês (40 mil, só self-hosted), todos com cobrança anual, em dólar ou euro conforme a região; Enterprise sob consulta",
    "resumo": "Cobra por execução e roda no servidor da empresa; governança só nos planos altos",
    "texto": "O n8n cobra por execução completa de fluxo, independentemente do número de passos, e todos os planos incluem usuários e integrações ilimitados. Pode rodar na nuvem do fornecedor ou no servidor da empresa. A aprovação humana antes de o agente usar uma ferramenta está documentada, com canais como Slack, Teams, e-mail e WhatsApp. SSO, SAML e LDAP começam no plano Business, e o envio de logs para sistemas externos só no Enterprise."
   }
  ],
  "criterios": [
   {
    "criterio": "Autenticação",
    "pergunta": "Usa o usuário e a permissão do sistema da empresa (SSO, perfis)?",
    "celulas": [
     {
      "marca": "ressalva",
      "nota": "SAML SSO só a partir do plano Team (US$ 69/mês na cobrança anual)",
      "fonte": 1
     },
     {
      "marca": "ressalva",
      "nota": "SSO, SAML e LDAP só a partir do Business (667/mês, só self-hosted); Pro tem papéis de administrador",
      "fonte": 4
     }
    ]
   },
   {
    "criterio": "Log por ação",
    "pergunta": "Registra o que o agente consultou e o que fez, e por quanto tempo?",
    "celulas": [
     {
      "marca": "ressalva",
      "nota": "Histórico de execuções guardado de 29 a 69 dias; Company e Enterprise podem fixar de 7 a 30 dias",
      "fonte": 3
     },
     {
      "marca": "ressalva",
      "nota": "Envio de eventos de fluxo e de cada nó a ferramenta externa de log só no plano Enterprise",
      "fonte": 6
     }
    ]
   },
   {
    "criterio": "Conector",
    "pergunta": "Liga ao ERP, CRM ou WhatsApp sem código, com conector mantido pelo fornecedor?",
    "celulas": [
     {
      "marca": "documentado",
      "nota": "Mais de 9.000 apps no catálogo; apps premium ilimitados a partir do Professional",
      "fonte": 1
     },
     {
      "marca": "ressalva",
      "nota": "Catálogo lista 2.285 integrações, parte feita por parceiros; não achamos conector de ERP brasileiro",
      "fonte": 7
     }
    ]
   },
   {
    "criterio": "Humano no fluxo",
    "pergunta": "Escala exceção para uma pessoa, com motivo, antes de agir?",
    "celulas": [
     {
      "marca": "documentado",
      "nota": "Request Approval pausa o fluxo com mensagem; revisor aprova, recusa ou edita, com prazo. Planos pagos",
      "fonte": 2
     },
     {
      "marca": "documentado",
      "nota": "Aprovação humana antes de o agente usar a ferramenta escolhida, via Slack, Teams, e-mail ou WhatsApp",
      "fonte": 5
     }
    ]
   },
   {
    "criterio": "Dados",
    "pergunta": "Onde ficam, o que vai para o modelo, se é usado para treino, há DPA ou cláusula LGPD?",
    "celulas": [
     {
      "marca": "ressalva",
      "nota": "DPA padrão com SCCs; dados na AWS nos EUA, sem opção de região; treino de modelo não tratado ali",
      "fonte": 3
     },
     {
      "marca": "ressalva",
      "nota": "DPA com SCCs no Cloud; self-hosted fica com a empresa. Dados do assistente não treinam modelo",
      "fonte": 8
     }
    ]
   },
   {
    "criterio": "Custo por tarefa",
    "pergunta": "Preço público e previsível com o volume?",
    "celulas": [
     {
      "marca": "ressalva",
      "nota": "Preço por faixa de tarefas; passos de IA e código também consomem tarefas, com taxas em tabela à parte",
      "fonte": 1
     },
     {
      "marca": "documentado",
      "nota": "Cobra por execução completa, não por passo: 20/mês por 2,5 mil execuções no Starter, cobrança anual",
      "fonte": 4
     }
    ]
   }
  ],
  "conclusao1": "Para a empresa que não tem ninguém para manter servidor e quer o agente ligado a muitos aplicativos de prateleira, o Zapier documenta o caminho mais curto, com aprovação humana já no primeiro plano pago. A entrada é barata, mas a conta acompanha o número de tarefas, e passos de IA também entram nela; vale simular o volume real antes de assinar. Os dados ficam nos Estados Unidos, o que precisa passar pelo jurídico.",
  "conclusao2": "Para a empresa que precisa manter os dados no próprio ambiente ou prevê fluxos com muitos passos, o n8n documenta cobrança por execução e instalação no servidor da empresa. O preço de entrada é parecido, mas SSO e envio de logs só chegam nos planos Business e Enterprise; quem precisa de login corporativo e trilha de auditoria deve orçar a partir daí, não do Starter.",
  "ficha": [
   {
    "rotulo": "Ferramentas",
    "valor": "Zapier, n8n"
   },
   {
    "rotulo": "Categoria",
    "valor": "Automação"
   },
   {
    "rotulo": "Documentação consultada",
    "valor": "Páginas de preços, central de ajuda, documentação oficial, páginas de privacidade"
   },
   {
    "rotulo": "Fontes",
    "valor": "8 páginas oficiais dos fornecedores"
   },
   {
    "rotulo": "Método",
    "valor": "Relato documentado. Nenhuma ferramenta foi instalada ou usada."
   }
  ],
  "fontes": [
   {
    "titulo": "Pricing",
    "origem": "Zapier",
    "url": "https://zapier.com/pricing"
   },
   {
    "titulo": "Request approval to keep your workflow running with Human in the Loop",
    "origem": "Zapier Help Center",
    "url": "https://help.zapier.com/hc/en-us/articles/38731463206029-Request-approval-to-keep-your-workflow-running-with-Human-in-the-Loop"
   },
   {
    "titulo": "Data Privacy Overview",
    "origem": "Zapier",
    "url": "https://zapier.com/legal/data-privacy"
   },
   {
    "titulo": "Plans and Pricing",
    "origem": "n8n",
    "url": "https://n8n.io/pricing/"
   },
   {
    "titulo": "Human-in-the-loop for tools",
    "origem": "n8n Docs",
    "url": "https://docs.n8n.io/advanced-ai/human-in-the-loop-tools/"
   },
   {
    "titulo": "Stream logs to external systems",
    "origem": "n8n Docs",
    "url": "https://docs.n8n.io/log-streaming/"
   },
   {
    "titulo": "Integrations",
    "origem": "n8n",
    "url": "https://n8n.io/integrations/"
   },
   {
    "titulo": "Privacy",
    "origem": "n8n Docs",
    "url": "https://docs.n8n.io/privacy-security/privacy/"
   }
  ]
 }
];
