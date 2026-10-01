---
name: copy-conteudo
description: Transforma a pauta da /pesquisa-conteudo em texto pronto para publicar — carrossel, post de feed, roteiro de Reels e legenda — com cada frase amarrada a uma fonte do dossiê ou marcada como editorial. É a segunda etapa da esteira pesquisa → copy → design, e produz o `copy-{tema}-{data}.md` que a /design-conteudo renderiza. Use SEMPRE que o usuário disser "escreve o post", "escreve o carrossel", "transforma essa pauta em conteúdo", "faz a copy disso", "monta o roteiro do Reels", "escreve a legenda", apontar um arquivo `pesquisa-*.md`, ou invocar /copy-conteudo — inclusive logo depois de a /pesquisa-conteudo terminar, quando a pauta acabou de sair. Use também quando ele escolher uma das ideias da pauta ("quero a ideia 3", "vamos com aquela do gancho X"). NÃO use para pesquisar ou levantar fontes (isso é /pesquisa-conteudo), nem para gerar as imagens (isso é /design-conteudo).
---

# Copy de conteúdo

Pegar uma ideia da pauta e devolvê-la escrita, no formato certo, sem inventar nada.

A etapa anterior decidiu **o que dá para afirmar**. Esta decide **como dizer**. A
seguinte transforma em pixel. O perigo mora aqui no meio: é escrevendo que a
tentação de arredondar um número, endurecer uma frase ou inventar um exemplo
aparece — e a partir daqui ninguém mais confere, porque a etapa do design assume
que a copy já foi verificada.

## Entrada e saída

- **Lê:** `conteudo/pesquisas/pesquisa-{tema}-{data}.md` (pasta `conteudo/pesquisas/` do repositório), produzido pela `/pesquisa-conteudo`
- **Escreve:** `conteudo/pesquisas/copy-{tema}-{data}.md`, na mesma subpasta (crie-a se não existir)
- **Alimenta:** `/design-conteudo`, que lê esse arquivo campo a campo

Se o dossiê não existir, pare e pergunte — parar é perguntar e esperar, não
abortar. Ofereça rodar a `/pesquisa-conteudo` primeiro e siga quando ele escolher.

Sinal de que você pulou uma etapa: está inventando o dado em vez de procurá-lo no
dossiê. Se ele insistir em escrever sem pesquisa, diga em uma linha o que a peça
perde (nenhum número dela será citável) e, se confirmar, siga — registrando na
Nota de fidelidade que a peça inteira é editorial.

## Antes de escrever a primeira frase

Leia, nesta ordem, e não pule por pressa:

1. **O dossiê inteiro.** Não só a seção "Pauta de conteúdo". Os números citáveis,
   as dores e a tensão são o material bruto; a pauta é só o índice.
2. **`~/workspace/perfil/comunicacao.md`** — tom, público, linguagem. Voz vem de
   arquivo, nunca de improviso. Se existir uma skill de voz do autor
   (`write-like-me`, `extrair-identidade`), ela vence este arquivo.
3. **O que ele escolheu.** Se ele não disse qual ideia da pauta quer, pergunte —
   uma pergunta, com as ideias da pauta como opções. Escrever a ideia errada
   inteirinha custa mais do que uma pergunta.

Depois confirme o recorte em **uma linha** antes de produzir:
`Ideia: <n> · Formato: <carrossel|post|reels|legenda> · Fontes disponíveis: <n>.`

## Fase 1 — O gancho é escolha dele

O gancho define tudo que vem depois. Um gancho contrário compromete os próximos
dois blocos a defender a posição impopular; um gancho de cena compromete o
seguinte a resolver a cena. Por isso ele não é decisão sua.

Gere muitas internamente, mostre **três**, e que sejam de **naturezas diferentes**
— três variações de contrário não é escolha, é ilusão de escolha. As cinco
alavancas que fazem alguém querer a segunda frase:

| Alavanca | O que faz | Exemplo de forma |
|---|---|---|
| **Abrir lacuna** | deixa algo incompleto que a pessoa precisa fechar | "Três empresas brasileiras fizeram isso este ano. Nenhuma é de tecnologia." |
| **Quebrar previsão** | contraria o que ela já acredita | "Todo mundo te diz para postar todo dia. Os dados dizem o contrário." |
| **Cena** | joga dentro de um momento concreto, sem introdução | "14 de maio, 6h12. O e-mail chegou com o assunto em branco." |
| **Prometer entrega** | nomeia o resultado que ela quer, delimitado | "Em 3 minutos: por que sua taxa de resposta caiu pela metade." |
| **Emprestar peso** | apoia num nome, número ou citação que já carrega autoridade | "A Hugging Face investigou 17 mil linhas de log. Achou uma coisa só." |

Um gancho forte costuma puxar duas alavancas ao mesmo tempo. Três princípios que
valem mais que o catálogo:

- **Específico ganha de abstrato, sempre.** "Muitas empresas" vira nomes.
  "Recentemente" vira data. "Estudos mostram" vira o achado, ou sai.
- **A primeira frase tem que obrigar a segunda.** Leia cada candidato frio: se
  você não continuaria, reescreva.
- **O gancho não pode prometer o que a peça não paga.** Promessa maior que a
  entrega gera abandono no meio — e abandono no meio o algoritmo pune mais do que
  a pessoa nem ter parado.

Apresente assim, e espere:

```
## Ganchos para: <ideia>

**1. <nome da alavanca>**
   <candidato>

**2. <outra alavanca>**
   <candidato>

**3. <terceira alavanca>**
   <candidato>

Qual? Ou "outros" para três diferentes.
```

Depois que ele escolher, diga em uma linha a que aquele gancho compromete o resto.

## Fase 2 — Montar o arco

Um carrossel não é uma lista de cards. É um arco com papéis, e cada papel pede uma
forma diferente — é isso que impede a série de virar oito cards iguais. Os papéis
que a `/design-conteudo` sabe renderizar:

**Gancho → Tensão → Virada (tese) → Prova → Contraditório → Aplicação → CTA**

Nem toda peça usa todos. Um carrossel de 8 slides costuma ser gancho, tensão,
virada, duas ou três provas, aplicação, CTA. Uma peça sem contraditório é uma peça
que fingiu que ninguém discorda — se o dossiê trouxe tensão, ela merece um slide.

Cada slide carrega **uma ideia**. Slide que tenta título, número, comparação e
punchline não carrega nada.

**Só uma prova abre com número.** O design transforma título que começa por número em número gigante; quatro provas assim viram quatro números gigantes seguidos (aula de 30/08). Escolha a prova mais forte para abrir pelo número; nas outras, abra pelo que o número significa ou por quem mediu, e deixe o número no meio da frase ou no Corpo.

**Corpo com no máximo 30 palavras.** Se passou, o slide vira dois. Carrossel é
formato visual: slide entulhado é slide abandonado.

**Cada slide termina devendo alguma coisa.** A última palavra de um slide é o que
faz a pessoa deslizar para o próximo. Um número pela metade, uma promessa aberta,
uma contradição anunciada.

**Escreva a capa por último.** Só depois de saber o que a série entrega você
consegue escrever a capa que aquilo merece.

## Fase 3 — Fidelidade, que é o motivo desta etapa existir

Toda frase da peça é uma de duas coisas, e a peça diz qual:

- **Citação** — aponta para uma fonte do dossiê, marcada `**Fonte:** [3]`
- **Editorial** — formulação sua, opinião, conexão entre fatos, chamada

O que não é permitido é o meio-termo: frase que soa como dado e não tem fonte.

Regras que sustentam isso:

**Número entra com os quatro.** Dado, quem mediu, quando, link. Se o dossiê não
tem os quatro, o número não é citável — reformule sem ele ou corte a frase.

**Fato novo não entra.** Você não pesquisa nesta etapa. Se durante a escrita
faltar um dado, a saída é escrever sem ele ou avisar que falta — nunca preencher
de memória. Um número inventado que soa plausível é pior que um vago, porque parece
honesto sendo falso.

**Arredondar é inventar.** "17.412 linhas" não vira "quase 20 mil".

**Não invente prova social.** Depoimento, "usado por milhares", nome de cliente:
ou é real e está no dossiê, ou não existe.

## Fase 4 — Que não soe máquina

Texto de IA se denuncia por **agrupamento** de sinais, não por um sinal isolado.
Um travessão não prova nada; travessão junto com trio forçado, junto com "não é só
X, é Y", junto com fecho otimista genérico é confissão.

Os sinais que mais aparecem em português:

| Padrão | Como sai | Como fica |
|---|---|---|
| Vocabulário vazio | "desbloqueie o poder de", "eleve seu", "revolucionário", "mergulhe" | diga o que a coisa faz |
| Inflação de importância | "um marco na história de", "uma nova era" | corte a cerimônia |
| Abertura de aquecimento | "no mundo acelerado de hoje", "na era da IA", "vamos ao que interessa" | comece pelo fato |
| Trio forçado | tudo em grupos de três para soar completo | use o número de itens que o assunto tem |
| Paralelismo negativo | "não é só um X, é um Y" | afirme o que é |
| Fecho positivo genérico | "o futuro é promissor", "os próximos passos são animadores" | termine no último fato concreto |
| Atribuição fantasma | "especialistas afirmam", "pesquisas mostram" | nomeie ou corte |
| Passiva sem dono | "foi decidido que", "a página foi atualizada" | diga quem fez |
| Aforismo de efeito | "X é a linguagem de Y" | diga a coisa |

**O que NÃO é sinal** — e listar isto importa tanto quanto a tabela acima, porque
caçar IA sem critério produz texto estéril, que também denuncia máquina:
gramática correta, vocabulário formal, uma frase curta de ênfase, um "porém"
isolado, ausência de fonte. Texto sem voz nenhuma é tão artificial quanto texto
cheio de clichê.

**Preserve o que é humano:** detalhe específico e difícil de fabricar, opinião com
ressalva ("acho que funciona, mas me incomoda que..."), referência datada,
variação real de tamanho de frase, o aparte entre parênteses.

Antes de entregar, faça duas perguntas ao texto e responda curto:
*o que aqui parece feito por máquina?* e *isto afirma algum fato, nome, número ou
data que não está no dossiê?* Depois corrija as duas respostas.

## Fase 5 — Escrever o arquivo

Salve em `conteudo/pesquisas/copy-{tema}-{data}.md` (na raiz do repositório) e entregue o caminho como link
markdown **absoluto** (caminho completo do projeto, ex.: `C:/Projetos/<projeto>/pesquisas/...`) — dentro de crase não vira
link clicável.

O formato abaixo não é gosto: a `/design-conteudo` lê estes campos pelo nome. Título
vira a manchete do card, Corpo vira o texto de apoio, `**Fonte:** [3]` faz o rodapé
buscar o nome do veículo na seção `## Fontes`, e a Nota de fidelidade preenche a
coluna de origem da ficha.

```markdown
# <Tema> — <formato>

Ideia da pauta: <n> · Dossiê: <caminho do pesquisa-*.md> · Gancho escolhido: <alavanca>

## Slide 1 — Gancho
**Título:** <a frase de abertura>

## Slide 2 — Tensão
**Título:** <manchete>
**Corpo:** <até 30 palavras>

## Slide 3 — Virada
**Título:** <a tese>

## Slide 4 — Prova 1
**Título:** <o achado em frase; só UMA prova da série abre com o número>
**Corpo:** <o que ele significa>
**Fonte:** [3]

## Slide N — CTA
**Título:** <a chamada>

## Legenda
<o texto que vai embaixo da peça — gancho na primeira linha, porque o resto
some atrás do "mais">

## Fontes
[1] <veículo> — <título> — <data> — <link>
[3] <veículo> — <título> — <data> — <link>

## Nota de fidelidade
Slides com fonte: 4, 5, 6.
Slides editoriais: 1, 2, 3, 7 — formulação do autor, não citação.
O que ficou de fora: <o dado que você quis usar e não tinha os quatro campos>.
```

## Outros formatos

O arco e a fidelidade valem para todos. O que muda é a forma.

### Post de feed

Um bloco de texto, sem slides. A estrutura que funciona: gancho em uma ou duas
linhas curtas, quebra de linha, o desenvolvimento em parágrafos de no máximo duas
linhas, e um fecho com direção — pergunta, convite a salvar, ou o próximo passo.

Onde trunca importa mais que o tamanho total: no LinkedIn a pessoa vê ~210
caracteres antes do "ver mais"; no Instagram, ~125. O que estiver depois disso só
é lido por quem já decidiu ler. Escreva a primeira linha como se ela fosse o post
inteiro.

No arquivo, use `## Post` em vez dos blocos de slide, mantendo `## Fontes` e
`## Nota de fidelidade` iguais.

### Roteiro de Reels

Duas coisas mudam tudo:

**Escreva a versão muda primeiro.** A maior parte assiste sem som. Se o texto na
tela não conta a história sozinho, o roteiro falhou antes do áudio entrar.

**O fim volta ao começo.** Um fecho que emenda no primeiro segundo gera
rever — e rever é o sinal mais forte que existe.

Os três primeiros segundos concentram a maior parte da desistência. Comece pelo
quadro mais forte: nada de logo, nada de "fala, pessoal". Troque o que está na tela
a cada 2 a 4 segundos, senão a pessoa sai mesmo gostando.

Escreva em três trilhas paralelas, porque quem grava precisa das três:

```markdown
## Reels — <título de trabalho>

| t | O que aparece | Texto na tela | O que se fala |
|---|---|---|---|
| 0-3s | <plano> | <até 6 palavras> | <fala> |
| 3-8s | ... | ... | ... |

**Ganchos alternativos para testar:** <3 aberturas diferentes>
**Loop:** <como o fim emenda no início>
**CTA:** <uma linha, ~2s, ligada ao valor — nunca "curte e segue">
```

Duração boa: 15 a 35 segundos. Cerca de 75 palavras faladas dão 30 segundos.

### Legenda

Sai junto com carrossel e Reels, nunca sozinha e nunca repetindo o que já está na
peça. Os slides carregam o valor; a legenda prepara o deslize e fecha com a ação.
Primeira linha é o gancho, porque é a única garantida de ser lida.

## Como fechar a rodada

1. O arquivo salvo, com Fontes e Nota de fidelidade preenchidas
2. A peça mostrada **no chat**, inteira — caminho de arquivo não é entrega
3. O que você mesmo achou fraco, dito antes de ele perguntar
4. Uma pergunta clara: se ele quer ajustar alguma coisa, ou mandar para o design

O passo 3 separa entregar de despachar. Se você viu um slide fraco e entregou
calado, ele vai encontrar — e a confiança na etapa inteira cai, não só naquele
slide.

## No chat, fale de negócio

O rigor fica no arquivo. Na conversa: o que a peça diz, o que ficou de fora e por
quê, e a decisão que é dele. Nome de arquivo, contagem de fonte e nome de campo só
quando ele vai digitar aquilo.
