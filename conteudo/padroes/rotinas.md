# Como a AgenticWay funciona: as rotinas, uma a uma

Documento de referência do editor. Atualizado em 4/out/2026. Explica, para cada rotina, quando roda, o que faz, de onde tira a informação, o que entrega, que regras segue e o que o editor faz. As decisões e o porquê de cada uma estão em `decisoes.md`; o passo a passo técnico que os agentes seguem está em `.claude/skills/<rotina>/SKILL.md`.

---

## Visão geral

A AgenticWay é um site de notícias sobre agentes de IA nas empresas, **apurado e escrito por agentes de IA, com um editor humano responsável** (Domiciano Rossi). Os agentes trabalham sozinhos, em horários fixos, na nuvem. Nada vai ao ar sem a aprovação do editor.

| Rotina | Quando roda (horário de Brasília) | O que entrega | Como o editor aprova |
|---|---|---|---|
| Radar | todo dia, 7h | até 5 notas curtas | merge do PR no GitHub |
| Na Operação | segunda, 8h | 1 caso de empresa | merge do PR |
| Ferramentas | terça, 8h, a cada 2 semanas | 1 comparativo de ferramentas | merge do PR |
| Guia | quarta, 8h | guia novo a cada 2 semanas e revisão dos existentes | merge do PR |
| Análise | quinta, 17h (sai na sexta, 7h) | 1 artigo de opinião | merge do PR |
| Newsletter | sexta, 7h | rascunho do e-mail da semana | clique em **Publish** no Buttondown |

**O ciclo de cada rotina, em quatro passos:**

1. **Pesquisa.** O agente busca na web (com a ferramenta Firecrawl, que lê as páginas inteiras) e abre cada fonte que vai citar.
2. **Escrita.** Escreve o conteúdo num formato fixo, um arquivo por item.
3. **Conferência automática.** Um programa (o validador) recusa o item se faltar campo, se a fonte não tiver link, se a data não tiver fuso ou se aparecerem palavras proibidas, como "testamos" ou "visitamos".
4. **Pedido de aprovação.** O agente abre um pedido no GitHub (o "PR"), com o que escreveu, o que descartou e por quê. O editor lê e, se aprovar, faz o merge. O site se atualiza sozinho em cerca de um minuto.

**Quando não há material bom, a rotina não publica.** Ela registra o que encontrou e por que descartou. Melhor nenhum conteúdo do que um fraco.

**Regras que valem para todas:**

- **Fato tem fonte aberta, lida e com link.** Número igual ao da fonte, sem arredondar e sem calcular o que a fonte não disse.
- **Quem afirma, assina.** Se o número é só do fornecedor ou da própria empresa, o texto diz isso ("segundo a empresa", "não confirmada pelo cliente").
- **Nunca fingir o que um agente não faz:** nada de "visitamos", "entrevistamos", "testamos", "segundo especialistas" sem nome ou "a pedido de leitores".
- **Acusação contra empresa ou pessoa** só com fonte oficial ou dois veículos independentes. Na dúvida, fica para o editor decidir.
- **Tom:** analítico, direto, sem hype, sem exclamação, sem emoji.
- **Assinatura de todo conteúdo:** "Apurado e escrito por agentes AgenticWay · editor responsável: Domiciano Rossi".

---

## 1. Radar: o que aconteceu

**Quando:** todo dia às 7h.

**Para quê:** notas curtas sobre o que aconteceu com agentes de IA e o que isso muda para uma empresa média brasileira. É a editoria de notícia do dia.

**O que o agente faz:**

1. Lista as notas já publicadas, para não repetir assunto.
2. Faz de 4 a 6 buscas na web, cada uma por um ângulo:
   - empresas brasileiras usando agentes;
   - lançamentos de agentes e conectores para os sistemas que a empresa média usa (ERP como TOTVS, SAP, Senior, Sankhya e Omie; CRM; WhatsApp; planilhas);
   - regras e normas no Brasil (Banco Central, ANPD, Receita, CVM);
   - pesquisas com dado novo sobre adoção, custo ou falha;
   - casos de empresas com nome e número;
   - o contraditório: críticas, projetos cancelados, incidentes.
3. Abre cada candidata e responde a seis perguntas:
   - É novo?
   - Tem fonte primária (o comunicado, o relatório, a norma)?
   - Muda algo para a empresa brasileira?
   - Vale para o Brasil?
   - A pesquisa diz como mediu?
   - Quem afirma o número?
4. Fica com no máximo 5 notícias, priorizando o Brasil. Só entram as divulgadas nos últimos 3 dias.
5. Escreve cada nota com título, linha fina, resumo, contexto, consequências ("o que muda"), o que fazer, fontes e ficha (quem divulgou, quando, como mediu).

**Fontes:** comunicados de empresas, relatórios de pesquisa, documentos de órgãos públicos e reportagens que citam a origem. Agregadores, redes sociais e blogs anônimos não servem como fonte única.

**O que entrega:** de 0 a 5 notas, em temas fixos: Regulação, Lançamentos, Casos, Pesquisa e Mercado.

**O editor:** lê o PR, em que as notas com número só do fornecedor aparecem destacadas, e faz o merge. Em dia sem notícia boa, como domingos, não vem PR.

---

## 2. Na Operação: um caso real

**Quando:** toda segunda às 8h.

**Para quê:** mostrar uma empresa com nome que pôs um agente de IA num processo de negócio: o que mudou, como foi medido e o que a história não conta.

**O que o agente faz:**

1. Confere os casos já publicados, para não repetir empresa.
2. Busca casos dos últimos 30 dias, priorizando o Brasil, em vários lugares: comunicados de empresas, estudos de caso de fornecedores e casos que pararam ou deram errado (que são os mais úteis).
3. Só aceita o caso que tenha:
   - empresa nomeada;
   - processo concreto (o que o agente faz, em que sistema);
   - ao menos um número com quem mediu;
   - fonte aberta e lida.

   Fala de executivo em evento não basta.
4. Escreve o caso com:
   - abertura, problema, solução e resultado;
   - números (cada um com quem mediu);
   - o fluxo do processo e os indicadores de antes e depois (só se a fonte der os dois);
   - "o que a história não conta": custo, prazo, o que ainda passa por pessoa;
   - lições;
   - "como apuramos": as fontes, dizendo que não houve visita nem entrevista.
5. Gera uma imagem ilustrativa com IA (Gemini): cena genérica, sem rosto identificável, sem logotipo, com a legenda "Imagem ilustrativa gerada por IA (Gemini). Não retrata a empresa do caso."

**O que entrega:** 1 caso por semana, classificado por setor (o da empresa) e processo (o do agente). Casos que pararam ganham a marca "parou".

**O editor:** confere no PR os números e quem mediu cada um, e faz o merge.

---

## 3. Ferramentas: integra com o que a empresa já tem?

**Quando:** terça às 8h, a cada 2 semanas. Nas outras terças, a rotina vê que não é a sua semana e não faz nada.

**Para quê:** ajudar quem vai escolher entre ferramentas de agentes, olhando uma só pergunta: integra com os sistemas que a empresa já usa?

**O que o agente faz:**

1. Escolhe de 2 a 6 ferramentas da mesma categoria que uma empresa média brasileira consideraria (comparativo), ou uma só (avaliação). As categorias são: plataformas de agentes, conectores ERP, leitura de documentos, WhatsApp, planilhas, atendimento e automação.
2. Lê a documentação oficial, a página de preços, a central de segurança e relatos públicos de usuários.
3. Para cada ferramenta, marca os mesmos seis critérios:
   - **Autenticação:** usa o login e as permissões da empresa?
   - **Log por ação:** registra o que o agente consultou e fez?
   - **Conector:** liga ao ERP, CRM ou WhatsApp sem código?
   - **Humano no fluxo:** passa a exceção para uma pessoa antes de agir?
   - **Dados:** onde ficam, se treinam modelo, se há contrato de proteção de dados?
   - **Custo por tarefa:** o preço é público e previsível?
4. Cada marca é **documentado**, **com ressalva** ou **não documentado**, e aponta para a fonte numerada. "Não documentado" quer dizer "não encontramos", não "não faz".

**O que não faz:** não testa nem instala nenhuma ferramenta. A página diz isso com todas as letras. Também não dá nota de estrelas nem diz "a melhor": diz para quem cada opção faz sentido.

**O que entrega:** 1 comparativo a cada 2 semanas. Fornecedores podem mandar correção para ferramentas@agenticway.com.br; correções aceitas entram com data.

**O editor:** confere as marcas de que o agente teve menos certeza (ele as lista no PR) e faz o merge.

---

## 4. Guia: o que levar para a reunião

**Quando:** toda quarta às 8h. A cada 2 semanas há guia novo; nas outras quartas, só revisão.

**Para quê:** a biblioteca prática do site. O que o decisor leva para a reunião com o fornecedor, para o jurídico ou para a planilha de custo. Diferente de um artigo, o guia é atualizado quando o mundo muda.

**O que o agente faz:**

1. **Revisão (toda semana).** Compara cada guia publicado com o que o site publicou desde a última atualização. Se um preço, uma regra ou um prazo mudou, ou se um caso novo mostrou um risco que o guia não cobre, atualiza o guia, sobe a versão (1.0 → 1.1) e registra no histórico o que mudou e por quê.
2. **Guia novo (a cada 2 semanas).** Parte do que o site publicou ("e agora, o que eu faço?") e escolhe um formato:
   - perguntas, para a reunião;
   - checklist, antes de assinar;
   - indicadores, depois que está rodando;
   - passo a passo;
   - glossário.
3. Cada item do guia tem seis partes:
   - o rótulo curto;
   - a pergunta;
   - por que importa;
   - a resposta que tranquiliza;
   - a que preocupa;
   - o que anotar.

**Regras próprias:** não é aconselhamento jurídico (diz o que perguntar e recomenda levar ao jurídico). Orientação da redação é editorial; fato tem fonte.

**O que entrega:** um guia novo a cada 2 semanas, com versão, histórico e checklist para imprimir; e revisões quando necessárias. Semana sem revisão necessária não gera PR.

**O editor:** lê o guia novo e cada revisão (versão e motivo) e faz o merge.

---

## 5. Análise: onde a AgenticWay toma posição

**Quando:** toda quinta às 17h, com publicação marcada para sexta às 7h.

**Para quê:** as outras editorias relatam; esta opina. Uma afirmação clara, que nem todo mundo faria, sustentada por fatos com fonte, e que admite onde pode estar errada.

**O que o agente faz:**

1. Lê tudo o que o Radar e a Na Operação publicaram na semana.
2. Procura uma tensão: dois fatos que juntos dizem algo novo, ou um número que contradiz o discurso do mercado.
3. Escreve três teses possíveis e escolhe a que passa nos testes:
   - é uma afirmação, e não só um tema;
   - alguém sério discordaria;
   - os fatos sustentam;
   - importa para a empresa média;
   - não repete análise anterior.
4. Complementa com pesquisa, se preciso.
5. Escreve no formato fixo:
   - a tese em três pontos e o corpo em três seções;
   - três ações práticas;
   - **"Onde posso estar errado"**: o melhor argumento contra, incluindo o interesse de quem publicou os dados;
   - **"O que eu faria"**: a recomendação concreta.

**Voz:** primeira pessoa ("eu faria"), que é a voz da redação, sem fingir experiência pessoal ("visitei", "na minha consultoria").

**O que entrega:** 1 análise por semana. Entre as editorias do site, é a única com o bloco discreto do serviço ("Para empresas") ao fim; a newsletter também tem um, no rodapé.

**O editor:** assina a tese. No PR, o agente mostra as duas teses descartadas e as afirmações que o editor deve conferir com atenção.

---

## 6. Newsletter: o resumo da semana

**Quando:** toda sexta às 7h.

**Para quê:** levar o melhor da semana a quem não entrou no site. Sete minutos de leitura, cada item com link para o texto completo.

**O que o agente faz:**

1. Lista o que o site publicou nos últimos 7 dias.
2. Escolhe:
   - de 3 a 5 fatos do Radar;
   - o caso de Na Operação da semana;
   - a análise;
   - até 4 itens em "também no site" (guias, Ferramentas, outras notas).
3. Escreve só o assunto, a frase de abertura do e-mail e resumos curtos. Títulos, links e fontes vêm direto do que já foi publicado.
4. Um programa confere se todo número escrito está no item original; se não estiver, a edição é recusada.
5. Cria o e-mail como **rascunho** no Buttondown, o serviço que guarda a lista de assinantes e envia o e-mail.

**Por que não passa por PR:** a newsletter não traz fato novo. Tudo nela já foi aprovado pelo editor no site durante a semana.

**O que não faz:** não envia. A chave que o agente usa não tem permissão de envio. Se já houver um rascunho esperando, ele não cria outro. Com menos de 3 notas do Radar na semana, não há edição.

**O editor:** na sexta, abre buttondown.com/emails, lê o rascunho (pela metade direita da tela, que mostra o e-mail como o assinante vê) e clica em **Publish** para enviar. Pode corrigir uma frase antes ou apagar o rascunho.

**Assinatura:** o botão "Assinar" do site inscreve no Buttondown. A pessoa recebe um e-mail para confirmar. Dá para sair da lista a qualquer momento pelo link no rodapé de cada edição.

---

## Onde ficam as coisas

| O quê | Onde |
|---|---|
| Site no ar | www.agenticway.com.br (Vercel, atualiza a cada merge) |
| Pedidos de aprovação (PRs) | github.com/agentic-way/site |
| Newsletter: rascunhos e assinantes | buttondown.com (Emails, Subscribers) |
| Rotinas agendadas | claude.ai/code → Routines (conta Max) |
| Decisões e o porquê | `conteudo/padroes/decisoes.md` |
| Passo a passo dos agentes | `.claude/skills/<rotina>/SKILL.md` |
| Chaves (Firecrawl, Gemini, Buttondown) | ambiente "Radar AgenticWay" na nuvem e `~/api_keys.env`; nunca em print |
