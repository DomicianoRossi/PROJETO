---
name: ferramentas
description: Produz a rodada de Ferramentas da AgenticWay — a cada duas semanas, um comparativo (ou avaliação de uma ferramenta) de ferramentas de agentes de IA para empresa média, lido pelos seis critérios fixos de integração (autenticação, log por ação, conector, humano no fluxo, dados, custo por tarefa) a partir da documentação oficial, da tabela de preços e de relatos públicos, com cada marca (documentado, com ressalva, não documentado) apontando para a fonte. Valida com scripts/build_dados.py e abre um pull request para o editor aprovar. Use quando pedirem "roda ferramentas", "comparativo de ferramentas", "avalia a ferramenta X", ou quando a rotina de terça disparar. Não use para notícia (/radar), caso (/na-operacao), opinião (/analise) ou guia (/guia).
---

# Ferramentas AgenticWay

Ferramentas responde a uma pergunta só: **isso integra com o que a empresa já tem?** O leitor é um decisor de empresa média escolhendo entre duas a seis opções. Ele não quer nota de estrelas; quer saber, critério por critério, o que cada fornecedor documenta publicamente e onde isso está escrito.

**Ferramentas é relato documentado, não teste.** Nenhum agente instala, configura ou usa as ferramentas. A avaliação lê a documentação oficial, a página de preços, a central de segurança e relatos públicos de usuários (fóruns oficiais, avaliações com autor). Nunca escreva "testamos", "instalamos", "na nossa bancada", "em nossos testes" — o validador barra parte disso, e o resto é responsabilidade sua. *Por quê:* a primeira versão desta editoria prometia testes que um agente não faz; a credibilidade do site depende de dizer exatamente o que foi feito.

## Saída

- `conteudo/publicado/ferramentas/<id>.json` (esquema em `references/esquema.md`)
- `site/dados/ferramentas.js` regenerado
- branch `ferramentas/AAAA-MM-DD`, um commit, push e pull request
- no log: o que foi avaliado, por que essas ferramentas, e as células em que você hesitou

Se o script disser que não é semana de avaliação, ou se você não encontrar documentação suficiente para uma avaliação honesta, diga isso e não abra PR.

## Passo 1 — Situação

1. Na raiz do repositório, atualize o `main`; se houver alteração pendente, pare e avise.
2. Rode:
   ```bash
   python .claude/skills/ferramentas/scripts/situacao.py
   ```
   Ele diz se é **semana de avaliação** (13 dias ou mais desde a última, ou nenhuma ainda), lista as avaliações publicadas (ferramentas e categorias já cobertas) e o que Radar, Na Operação e Análise publicaram nas últimas quatro semanas.
3. Leia `references/esquema.md`.

## Passo 2 — Escolher o recorte

- Parta do que o site publicou e do que um decisor estaria comparando agora. Prefira uma categoria ainda não coberta ou ferramentas que apareceram em notas e casos recentes.
- **COMPARATIVO**: 2 a 6 ferramentas da mesma categoria, que resolvem o mesmo problema. **AVALIAÇÃO**: uma ferramenta, quando ela sozinha virou assunto.
- Prefira ferramentas que uma empresa média brasileira de fato considera (disponíveis no Brasil, com preço público ou tabela publicada). Diga no `metodo` por que estas e não outras.
- Não repita um recorte já publicado. Se uma ferramenta já avaliada mudou muito, proponha no PR uma entrada em `correcoes` daquela avaliação em vez de refazê-la.

## Passo 3 — Ler as fontes, critério por critério

Para cada ferramenta e cada um dos seis critérios, procure na documentação oficial (docs, central de segurança, página de preços, termos de processamento de dados) e, como complemento, em relatos públicos com autor.

Marca de cada célula:
- `documentado`: a documentação oficial descreve o recurso de forma que responde à pergunta do critério.
- `ressalva`: descreve em parte — só em plano superior, com custo extra, em beta, com limite relevante, ou só por relato de usuário e não pela documentação.
- `nao-documentado`: não encontrou. Isso **não** quer dizer que a ferramenta não faz; a nota diz onde procurou.

Regras, e por quê:
- **Toda marca documentado ou ressalva aponta para uma fonte** (`fonte`: número na lista `fontes`, começando em 1). Abra e leia a página; não marque pelo resumo da busca.
- **A nota é curta e concreta** (até ~140 caracteres): o que está documentado e o limite. "SSO SAML só no plano Enterprise" serve; "boa autenticação" não.
- **Preço igual à fonte**, com moeda e unidade. Não converta moeda nem calcule custo por tarefa que a fonte não dá; se só existe "fale com vendas", diga isso.
- **Preço com período e moeda.** Diga se é cobrança mensal ou anual ("US$ 69/mês na cobrança anual"). Preço por faixa: dê a faixa de entrada e diga que sobe com o volume. Se a página mostra moeda diferente conforme a região, diga isso em vez de escolher uma.
- **Uma fonte por célula: a principal.** Se a resposta junta duas páginas, cite a que sustenta a marca e ponha a outra em `fontes` também (fonte listada sem célula é permitida quando o texto a usa).
- **O que cada critério exige.** *Log por ação*: `documentado` só se há registro por execução do que cada passo fez, consultável pela empresa; só histórico com retenção curta ou só trilha de mudanças na conta é `ressalva`. *Dados*: trata dos dados do cliente que passam pelo fluxo (onde ficam, DPA, se o fornecedor treina modelo com eles); política só do assistente de IA do próprio fornecedor não basta e a nota deve dizer de qual se trata.
- **Sem superlativo sem fonte**: "a mais usada", "líder", "a mais barata" só com fonte que meça isso.
- **Categoria:** PLATAFORMAS DE AGENTES é produto cujo centro é o agente (montar, orquestrar); AUTOMAÇÃO é plataforma de fluxos que ganhou agentes.
- **Número do fornecedor é do fornecedor.** "Reduz 70% do tempo" no site da empresa não entra como fato; no máximo, atribuído.
- **Nada de leitores ou especialistas inventados.** Sem "pedido de leitores", "segundo especialistas".
- **Conflito de interesse:** a AgenticWay vende serviço de integração e não revende nenhuma ferramenta. Se isso mudar, o texto precisa dizer.
- **Tom:** analítico, direto, sem hype, sem exclamação, sem emoji. A conclusão diz para quem cada opção faz sentido, não qual é "a melhor".

## Passo 4 — Escrever

Campos e tamanhos em `references/esquema.md`. `abertura` situa o problema do leitor. `metodo` diz o que foi lido, por que estas ferramentas e o que não foi feito ("Lemos ... Nenhuma ferramenta foi instalada ou usada."). `conclusao1` e `conclusao2` respondem "o que isso significa para quem vai comprar".

## Passo 5 — Validar

```bash
python scripts/build_dados.py
```

Corrija até passar. Releia cada célula contra a fonte que ela cita.

## Passo 6 — Pull request

```bash
git checkout -b ferramentas/$(date +%Y-%m-%d)
git add conteudo/publicado/ferramentas/ site/dados/ferramentas.js
git commit -m "Ferramentas: <título>"
git push -u origin HEAD
```

Abra o PR para o `main`. Na descrição: o recorte e por quê, a tabela resumida, as células em que você hesitou entre duas marcas e por quê, e o que não encontrou. Nunca faça merge nem push no `main`.
