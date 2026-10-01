---
name: pesquisa-conteudo
description: Pesquisa fontes reais na web sobre QUALQUER tema e devolve um dossiê pronto pra virar conteúdo (post, carrossel, roteiro, aula, newsletter). Sempre pergunta o tema da vez antes de pesquisar — nunca assume assunto. Use SEMPRE que o usuário disser "pesquisa conteúdo sobre", "levanta material sobre", "preciso de dados pra falar de X", "me dá pauta sobre", "o que tem de novo em X", "busca referências sobre", ou invocar /pesquisa-conteudo — mesmo sem informar o tema. Use também antes de escrever qualquer peça que vá citar número, data, nome, estudo ou notícia. NÃO use para debug de código, operações de arquivo, nem pergunta factual de resposta única ("que ano nasceu X").
---

# Pesquisa de conteúdo

Levanta material verificado sobre um tema e entrega em formato de **insumo de criação**, não de relatório acadêmico. Quem usa isso vai escrever algo depois — post, carrossel, aula, vídeo. Então o que importa é: o que dá pra afirmar, com que fonte, e qual é o ângulo que ninguém está usando.

## Passo 1 — Descobrir o tema da vez

Esta skill é genérica de propósito. O tema muda a cada uso, então **nunca herde o assunto da conversa anterior nem invente um**.

Se o usuário já disse o tema na mensagem que disparou a skill, siga em frente — não pergunte de novo, isso irrita.

Se não disse, pergunte com `AskUserQuestion`, tudo numa tanacada (não faça três rodadas de perguntas):

- **Tema** — qual assunto pesquisar
- **Formato de destino** — pra onde vai esse material (carrossel / roteiro de vídeo / aula / newsletter / não sei ainda)
- **Recorte de tempo** — só coisa dos últimos meses, ou vale material atemporal também

O formato de destino muda o que você procura: carrossel pede número forte e frase curta; aula pede estrutura e exemplo; vídeo pede história concreta. Se a pessoa não souber, assuma "não sei ainda" e traga material versátil.

## Passo 2 — Buscar

Ordem de preferência das ferramentas, e o porquê:

1. **`firecrawl_search`** — primeira escolha. Devolve o conteúdo da página junto com o resultado, então você lê o material de verdade em vez de adivinhar pelo snippet. Aceita `sources` (web/news) e filtro de domínio.
2. **`firecrawl_scrape`** — quando um resultado é claramente o material central (estudo, matéria-mãe, documentação) e você precisa do texto inteiro.
3. **`WebSearch` / `WebFetch`** — fallback quando o Firecrawl não está disponível ou volta vazio. Não é motivo pra desistir: buscar de outro jeito é melhor que entregar sem fonte.

Faça **3 a 5 buscas com ângulos diferentes**, não uma só. Uma busca única te dá o consenso preguiçoso que todo mundo já publicou. Varie:

- o termo técnico e o termo popular do mesmo assunto
- português e inglês (o material bom muitas vezes só existe em inglês)
- o tema + "estudo" / "dados" / "pesquisa" pra achar a fonte primária
- o tema + "crítica" / "mito" / "não funciona" pra achar o contraditório

Esse último ângulo é o que salva o conteúdo de ser genérico. Se todo mundo diz A e existe gente séria dizendo não-A, isso é a pauta.

## Passo 3 — Separar o que é fato do que é opinião

Antes de escrever o dossiê, classifique cada coisa que você achou:

- **Verificado** — tem fonte primária nomeável (estudo, órgão oficial, dado da própria empresa). Pode ser afirmado com números.
- **Reportado** — uma matéria diz, mas a fonte original não foi encontrada. Pode ser citado, sempre atribuído a quem disse.
- **Circulando** — está em todo lugar, ninguém cita origem. Só use como "dizem que", ou descarte.

Essa separação existe porque quem vai escrever o conteúdo depois vai colocar o nome dele naquilo. Entregar um número bonito de origem desconhecida é passar uma bomba adiante.

Se um número aparece em várias matérias mas todas remetem a uma fonte que você não conseguiu abrir, diga isso. "Não verifiquei" é uma entrega honesta; número inventado não.

## Passo 4 — Entregar o dossiê

Salve em `conteudo/pesquisas/pesquisa-{tema-em-kebab}-{AAAA-MM-DD}.md`, onde `conteudo/pesquisas/` fica na raiz do repositório agentic-way/site. Se a pasta não existir, crie-a. Mostre o resumo no chat.

Use esta estrutura:

```markdown
# Pesquisa: {tema}
Data: {data} · Destino: {formato} · {N} fontes consultadas

## O que dá pra afirmar
Fatos verificados, um por linha, cada um com a fonte entre parênteses e link.
Números exatos, não arredondados por conta própria.

## O ângulo
Qual é a leitura que quase ninguém está fazendo sobre isso, e por quê.
Uma ou duas ideias, com o raciocínio explícito. Não é chute: aponte o que
nos dados sustenta esse ângulo.

## Contraditório
Quem discorda do consenso, e com que argumento. Se não achou ninguém
discordando, escreva "não encontrei contraditório relevante" — não invente.

## Material bruto usável
Frases citáveis, comparações, casos concretos, analogias que apareceram
nas fontes. É daqui que sai o gancho da peça.

## Não verificado
O que circula mas você não conseguiu confirmar. Marcado assim para
que ninguém publique por engano.

## Fontes
Lista numerada: título — veículo/autor — data — URL.
```

## O que faz essa entrega boa ou ruim

**Boa:** número exato com fonte clicável; um ângulo que o usuário não tinha pensado; o contraditório presente; separação clara entre o que é fato e o que é achismo.

**Ruim:** resumo da Wikipédia reescrito; "estudos mostram que" sem dizer qual estudo; cinco fontes que são todas a mesma matéria republicada; ângulo genérico do tipo "isso é tendência e vai crescer".

Se ao terminar o dossiê você olhar e pensar "isso eu escreveria sem pesquisar nada", a pesquisa falhou — volte e busque a fonte primária e o contraditório.
