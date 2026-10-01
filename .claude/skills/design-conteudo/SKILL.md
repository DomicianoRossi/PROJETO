---
name: design-conteudo
description: Renderiza os slides do carrossel a partir da copy já aprovada — recebe o copy-{tema}-{data}.md da /copy-conteudo e devolve os PNG prontos para publicar. É a terceira e última etapa da esteira pesquisa → copy → design. Use SEMPRE que o usuário disser "renderiza os slides", "gera as peças", "faz o visual do carrossel", "transforma a copy em imagem", "monta os cards", apontar um arquivo copy-*.md, ou invocar /design-conteudo — inclusive logo depois de rodar a /copy-conteudo, quando a copy acabou de sair. NÃO use para escrever ou reescrever o texto (isso é /copy-conteudo), nem quando a copy ainda não existe.
---

# Design de conteúdo — carrossel

Você recebe texto aprovado e devolve imagens. Nada novo é dito no visual: todo número, nome e frase que aparece na peça já existe na copy.

O visual é o último lugar onde a invenção pode entrar, e o mais perigoso — **imagem parece evidência**. Um número errado num parágrafo é um erro; o mesmo número dentro de um card circula sozinho, sem contexto e sem o autor por perto para corrigir.

## Entrada e saída

- **Lê:** `conteudo/pesquisas/copy-{tema}-{data}.md`, produzido pela `/copy-conteudo` (pasta `conteudo/pesquisas/` do repositório)
- **Escreve:** na pasta de saída `conteudo/pesquisas/design-{tema}-{data}/` (crie-a se não existir): `pecas.json`, um HTML e um PNG por slide, e a ficha `design-{tema}-{data}.md`
- **Mostra:** os PNG ao operador, de verdade, sem ele precisar pedir

A esteira tem três arquivos: `pesquisa-*.md` → `copy-*.md` → `design-*.md`. Você é a terceira.

**Entregar o caminho não é entregar a peça.** No fim de toda rodada envie os PNG com `SendUserFile`, `display: "render"`, a série inteira numa chamada só, com uma legenda curta. Lista de caminhos obriga o operador a abrir arquivo por arquivo para ver o que pediu — é o defeito mais irritante desta etapa.

### O que a copy te entrega, campo por campo

```markdown
## Slide 4 — Prova 1
**Título:** A vítima pediu ajuda. O modelo travou.
**Corpo:** A Hugging Face foi investigar o ataque com...
**Fonte:** [3]
```

| Campo da copy | Para onde vai na peça |
| --- | --- |
| o papel no cabeçalho (`— Prova 1`) | decide o tipo de peça. Ver a tabela de mapeamento abaixo |
| **Título** | `.h`, ou `.fig` quando a linha é um número |
| **Corpo** | `.body`. Se a copy trouxe Corpo, ele entra — em qualquer tipo de slide. Só some quando a copy não tem Corpo |
| **Fonte:** `[3]` | o rodapé recebe o **nome** da fonte 3, não o colchete. Puxe da seção `## Fontes` |
| `## Nota de fidelidade` | preenche a coluna origem da ficha, e diz quais slides são editoriais |

O rodapé leva veículo e data porque a peça circula sozinha: `[3]` dentro de uma imagem não aponta para nada.

### Se não existir copy, pare

Parar é perguntar e esperar, não abortar: diga o que falta, ofereça rodar `/copy-conteudo` a partir do dossiê, e siga quando ele escolher.

Por que isso importa: a copy é onde a regra de fidelidade roda — onde se decidiu o que é afirmável, o que é atribuído e o que ficou de fora. Pulando ela, o material não verificado chega intacto no pixel, e aí ele parece prova.

Sinal de que a etapa foi pulada: você está lendo `pesquisa-*.md` em vez de `copy-*.md`.

Se ele insistir em pular, o custo é dele e a decisão também: diga em uma linha o que a série perde, e se ele confirmar, siga — registrando na ficha que foi feita sem copy e rodando o validador com `--sem-copy`. O que não se faz é pular calado, nem escrever você mesmo o texto das peças a partir da pesquisa.

### Rodada anterior na mesma pasta

Se já há PNG, HTML ou ficha, **não sobrescreva e não apague** — aquilo é trabalho de alguém. Liste o que achou, diga o que parece ter acontecido, pergunte o que fazer. Se for refazer preservando, escreva em `rodada-2/` dentro da mesma pasta: duas rodadas geram `slide-01.png` duas vezes, e "não sobrescreva" perde o sentido quando o nome é o mesmo.

## Do papel do slide para o componente visual

A `/copy-conteudo` já entrega o arco montado. Cada papel pede uma forma diferente — e é aqui que a série ganha ritmo em vez de virar oito cards iguais:

| Papel na copy | Tipo de peça | Componentes |
| --- | --- | --- |
| Gancho | capa tipográfica | `.h` grande; se a copy trouxe Corpo, ele entra como `.body` curto logo abaixo. Sem número |
| Tensão | manchete com apoio | `.h` + `.body` |
| Virada (tese) | capa tipográfica ou citação | `.h` com `<span>` rebaixando o nível secundário; Corpo da copy entra como `.body` |
| Prova | card de número, ou tabela | `.fig` em **uma** prova só, a mais forte; as outras são manchete (`.h` + `.body`) ou `.linha.ficha` |
| Contraditório | card de citação | `.h` curto + `.body` com a atribuição |
| Aplicação | checklist ou manchete | `.h` + `.body` |
| CTA | capa tipográfica | `.h` + o Corpo da copy como `.body` (é onde mora a pergunta/ação — nunca descartar), e nunca número |

A tabela é ponto de partida, não gaiola. Se a Prova 2 não tem número, ela não é card de número — é manchete, e forçar um `.fig` ali inventa destaque para um dado que não existe.

**No máximo um número herói (`.fig`) por série.** Na aula de 30/08 quatro provas numéricas viraram quatro números de 300–450px seguidos, e a série ficou gritando. O validador reprova a partir do segundo `.fig`.

**Uma ideia visual por peça.** Slide que tenta carregar título, número, comparação e punchline não carrega nada.

### Composição: decida antes de abrir o HTML

Para cada peça, responda três coisas. Se não consegue responder, o layout ainda não existe — está só bonito.

- **Ponto focal** — o que o olho pega primeiro. Um por peça; se dois elementos disputam, nenhum vence.
- **Parada de scroll** — o que faz passar para o slide seguinte.
- **Leitura na miniatura** — o que precisa ser legível sem abrir a imagem. Número e título entram; corpo de apoio, não.

### A capa não é mais uma peça

Ela decide se as outras vão ser vistas. Numa série de oito, sete dependem de uma.

Isso muda o que se otimiza: contraste de escala e um dado que o leitor reconheça como dele vêm antes de qualquer refinamento. Duas consequências práticas:

- **Se a peça mais forte da série não é a primeira, diga ao operador.** A ordem é decisão dele, mas ele precisa saber que está enterrando o gancho — e ordem se troca sem redesenhar nada.
- **A melhor frase da copy não pode sair em corpo pequeno na capa.**

## Direções visuais

O template padrão não é o único. `--template=<nome>` troca a direção inteira:

| Direção | Comando | Serve à pauta em que |
| --- | --- | --- |
| editorial-brutalista | (padrão) | o número é a manchete |
| dossiê | `--template=dossie` | a procedência do dado É o assunto — quem contou, com que método |
| terminal | `--template=terminal` | o dado é leitura de instrumento, e o tom precisa ser frio |
| alerta | `--template=alerta` | há crime, perda ou risco, e o volume da voz tem lastro no número |
| revista | `--template=revista` | a série precisa parecer EDIÇÃO, não post — assunto com partes, cada uma merecendo uma página |
| tabloide | `--template=tabloide` | o assunto **está na foto**: street style, produto em uso, antes/depois. Única direção que NÃO funciona em fundo chapado — o motor é a caixa justa invadindo a imagem. Temas próprios: `tabloide` e `tabloide-claro` |

**Quando nenhuma das cinco serve: o modo `-t`.** `/design-conteudo -t` inverte o produto da skill — em vez de receber copy e devolver PNG, ela produz **a direção**: um `template-<nome>.html` novo, seus temas e a entrada no `render.py`. **Leia `references/criar-template.md` antes de escrever qualquer linha de template.** O que não se negocia: nomeie o defeito antes de desenhar; decomponha a referência em elementos nomeados, nunca em adjetivos; declare o que não dá antes de prometer; prove em três peças; precipite no código por adição, sem mudar a aparência de série anterior. E o teste final: se a peça nova pode ser descrita como "o template X com outra cor", não é direção nova — é tema, e o lugar dela é o dicionário de temas.

**A direção se escolhe pela pauta, nunca por gosto.** O alerta é o mais perigoso: o amarelo de sinalização dá urgência de graça, então peça com dado morno mente pelo tom sem mentir pelo texto. Se o número não justifica o volume, use outra.

Os quatro não compartilham a grade, só o contrato de classes. Trocar paleta mantendo a grade produz três temas de CSS, não três identidades — por isso o índice está no topo no padrão, no pé no dossiê e numa régua vertical na lateral no alerta.

**Se nenhuma das quatro servir, PARE e pergunte.** Não improvise template no meio da rodada: direção nova que quebre o contrato de classes faz o validador **aprovar peça destruída** — ele confere texto, não geometria.

### O momento de perguntar, e é um só

Depois de ler a copy e **antes** de montar o `pecas.json`, num bloco de duas ou três linhas:

> Direção: **dossiê**, porque a pauta é procedência de dado. As outras que serviriam: editorial-brutalista e terminal. A capa: **fundo chapado** ou **imagem gerada** (custa uma geração)? Sigo no chapado se você não disser nada.

Três coisas fazem isso funcionar: uma vez por rodada e não uma por peça; **com padrão declarado**, para a pergunta não bloquear — renderize o padrão na mesma resposta; e só pergunte sobre fundo se a pauta tiver ambiente concreto. Norma, processo e número não têm cena, e perguntar ali é ruído que ensina o operador a ignorar o bloco inteiro.

## Escala e temas

Os tamanhos são calculados pelo `render.py` em função do comprimento do texto — mesma copy, mesma peça, sempre. `font-size` inline no `pecas.json` continua ganhando, e é o escape para o caso que a fórmula não cobre.

Os temas vêm em famílias. A base é `claro`, `escuro` e `fogo` — este último é o acento tomando o quadro, para a peça de virada. As outras famílias são **aditivas**: existem porque uma série precisou delas, e nenhuma altera a aparência de série anterior.

| Família | Temas | Serve a |
| --- | --- | --- |
| base | `claro` · `escuro` · `fogo` | o padrão da casa, temperatura quente |
| petróleo | `petroleo` · `petroleo-claro` · `ambar` | peso editorial sem a temperatura quente do padrão |
| revista | `papel` · `noite` · `laranja` | a direção revista (papel de linho, noite ripada, laranja de capa) |
| cliente | `teal` | identidade de terceiro — tema é da série, não do template |

A regra que mantém isso seguro: **tema novo é entrada nova no dicionário, nunca ajuste no tema existente.** Foi o que permitiu trocar a paleta inteira de uma série sem tocar em nenhuma peça antiga.

**`claro` não clareia coisa nenhuma: ele é a ausência de override.** O que ele faz é deixar o template com a paleta do próprio `:root`, e ela muda de template para template:

| Template | Paleta base | O que `tema: claro` entrega |
| --- | --- | --- |
| padrão | `#efece4` | claro de verdade |
| dossiê | `#e8e1d1` | claro de verdade (é papel) |
| **terminal** | `#0b0d0c` | **escuro**, com acento âmbar |
| **alerta** | `#121110` | **escuro**, com acento amarelo |

Isso já enganou nesta esteira: numa série em terminal, o slide do contraditório foi pedido em `claro` para mudar de canal e saiu escuro igual aos outros — só trocou o acento. Nada avisa, e o validador passa verde, porque tema não é texto. Se você quer que uma peça clareie de verdade dentro de uma série escura, o caminho não é o tema: é trocar o template daquela peça, e aí a série muda de identidade no meio — o que quase nunca é o que se quer.

Numa série de oito, a cor faz o arco: um padrão que funciona é escuro nos slides de tensão e prova, claro nos de contexto, e `fogo` na virada ou no CTA. O último slide muda de canal, não só de texto.

Numa série, use **a mesma âncora em todas as peças** — misturar muda a altura do bloco de peça para peça, e no swipe isso lê como descuido. `base` é o padrão e centraliza; `centro` empurra para o rodapé e só compensa em peça densa.

## Peça com foto ou fundo gerado

Ponha a imagem na pasta de saída e aponte pelo campo `foto`. O template cobre o quadro, aplica véu e joga o texto por cima.

**O véu não é sempre escuro, e errar aqui apaga o texto:** nos templates padrão, terminal e alerta o véu escurece (use `tema: escuro`); no **dossiê** ele clareia, porque é papel (use `tema: claro`). Usar `escuro` no dossiê põe texto claro sobre véu claro — o número principal ainda aparece e a linha secundária **desaparece**. O validador passa, porque texto invisível continua sendo o texto certo. Depois de aplicar foto, abra o PNG e leia a linha mais fraca, não a manchete.

Para fundo gerado por modelo há `scripts/gerar_fundo.py` (precisa de `google-genai` e `GEMINI_API_KEY` no `.env`; sem eles a rodada segue sem fundo):

```bash
echo '{"prompt":"<a cena, em ingles, sem nenhum texto>"}' | \
  python3 .claude/skills/design-conteudo/scripts/gerar_fundo.py \
    --model flash --aspect-ratio 4:5 --no-open
```

Quatro regras, nenhuma negociável:

1. **Texto e número continuam em HTML por cima**, nunca dentro da geração. Modelo de imagem escreve algo que *parece* texto, e parecer basta para enganar. Peça a cena com "no text, no lettering, no signage" e confira no PNG.
2. **A ficha declara que a imagem é gerada**, com modelo e prompt. Cena sintética atrás de um dado real lê como registro fotográfico do fato.
3. **Cena genérica, nunca situação identificável.** Ambiente, mesa, textura servem. Um prédio de órgão público, uma tela de sistema, um rosto reconhecível — não: a imagem passaria a afirmar que aquele é o lugar do dado.
4. **Se a peça funciona sem fundo, vá sem fundo.** Vazio de layout se resolve com escala, não com imagem por baixo.

Cada geração custa dinheiro do operador: **ofereça e espere**, não gere por conta própria. Foto real do operador é melhor que imagem gerada sempre que existir.

## Como renderizar

```bash
python3 .claude/skills/design-conteudo/scripts/render.py \
  <pasta>/pecas.json <pasta>/ [--template=dossie] [--formato=4:5]
```

`pecas.json` é uma lista. Obrigatórios: `etiqueta`, `fonte`, `conteudo`. Opcionais: `tema`, `ancora`, `foto`. Valor fora da lista derruba o render — o código é a fonte, este texto é a cópia.

No `conteudo` vai só o **miolo**: os `<div class="fig">`, `<div class="h">`, `<div class="body">`. O template cuida de fundo, zonas, rodapé e numeração. Nunca cole uma página inteira ali.

Componentes do miolo:

| Classe | Papel |
| --- | --- |
| `.fig` | número herói. `<i>` marca a unidade |
| `.fig.longo` | número com mais de 4 dígitos. Sem isso o Chrome **corta o dado sem avisar** |
| `.linha.ficha` | valor + rótulo em duas colunas, para número longo ou sem par antes→depois |
| `.h` | título. `<span>` dentro dele rebaixa o nível secundário por peso e cor |
| `.body` | punchline, com tarja de acento à esquerda |
| `.linha` | comparação `de → para` |
| `.escala` | barras comparando duas medições. Feche com `<!--/escala-->` |

**O gráfico precisa argumentar a favor do texto.** Uma régua 0–100 com marcador em 73 diz "falta chegar a 100"; se a tese é "não mudou em cinco anos", o desenho contradiz a frase ao lado. Rótulo de gráfico também é texto: se a barra diz "2026" e a copy só fala em "hoje", você inventou um dado — e o validador pega.

**Número na peça é o número da copy, escrito igual.** A checagem compara token inteiro: se a copy diz `17 mil linhas`, a peça não pode virar `17k`. Quer a forma curta? Volte à etapa 2 e escreva-a assim lá.

### Como o validador lê o seu HTML

Três comportamentos que não se adivinham e custam meia rodada cada:

- **`<i>`, `<em>` e `<span>` somem sem deixar espaço**; `<div>` e `<small>` deixam. Então `<div class="fig">930<i>mil</i></div>` vira o token `930mil` — passa na checagem de número e **reprova na de frase**. Ponha o espaço literal: `930 <i>mil</i>`.
- **Etiqueta e rodapé entram na checagem de número.** Número que só aparece ali também precisa existir na copy.
- **Código de documento não é número.** `PL 2338`, `GB300`: dígito colado a letra é ignorado, para o rodapé poder creditar a fonte pelo código.

Antes de chamar o Chrome, dá para pré-checar importando as funções do `validar.py` contra os `conteudo` do `pecas.json`. Pega o erro em segundos em vez de um ciclo de render.

**Ressalva que sobreviveu à copy trava o pixel.** A `## Nota de fidelidade` da copy lista o que ficou de fora e o que é atribuído. Se um fato entrou na copy como atribuído e você o transformar em afirmação seca no card, a peça afirma mais do que a apuração sustenta — e o validador **não pega isso**, porque ele compara peça com copy, nunca copy com fonte. Card de citação leva o nome de quem disse, dentro do card.

## Verificar no artefato final

Duas camadas, nesta ordem. A primeira é mecânica:

```bash
python3 .claude/skills/design-conteudo/scripts/validar.py <pasta> [--formato=4:5]
```

Ele acha o `copy-*.md` e a ficha `design-*.md` sozinho. Reprova o que não depende de gosto: PNG que não existe, dimensão errada, **número ou frase fora da copy**, peça com número e sem fonte no rodapé, ficha ausente, peça fora da ficha, peça sem origem. Avisa quando duas peças seguidas repetem a estrutura — numa série de oito esse aviso importa mais do que numa de quatro.

A segunda camada é o olho, e não tem substituto: **abra cada PNG**. HTML não denuncia linha órfã, quebra feia, contraste fraco nem hierarquia confusa. No pixel, confira:

1. O ponto focal é um só, e é o que você decidiu?
2. O que precisa ser lido na miniatura continua legível quando a imagem encolhe?
3. Alguma linha ficou órfã, cortada ou apertada contra a borda?
4. O fundo cobre o quadro inteiro, sem faixa sobrando?
5. A peça respira, ou tem bloco morto de espaço?

Nunca diga que gerou ou conferiu imagem sem o arquivo existir.

## A ficha

```markdown
# Design — <tema>
Direção: [a tese visual em uma frase] · formato: [dimensões] · copy: [arquivo]

## Peças

| # | papel | texto na imagem | origem |
|---|---|---|---|
| 01 | capa tipográfica | "..." | editorial |
| 04 | card de número | "17 mil linhas" | 3 |

## Arquivos
slide-01.png, slide-02.png ...

## Ressalvas
- [ex.: slide 03 é formulação editorial, marcada assim na Nota de fidelidade da copy]
```

A coluna `origem` nunca fica vazia: ou traz o número da fonte, ou diz `editorial` — que é como a `/copy-conteudo` marca a frase que é formulação do autor e não citação. Peça sem nada ali é peça cuja procedência ninguém reconstrói depois, e o validador reprova.

## Como fechar a rodada

Nesta ordem, e nenhum passo é opcional:

0. antes do `pecas.json`: o bloco único de direção + fundo, com padrão declarado, **sem esperar resposta**
1. `validar.py` verde
2. **abra cada PNG** e confira o que o script não alcança
3. **envie os PNG** ao operador, série inteira, inline
4. diga a direção usada e que dá para trocar
5. reporte o que você mesmo achou de errado no pixel — não espere ele apontar

O passo 5 separa entregar de despachar. Se você viu uma quebra feia e entregou sem dizer, o operador vai encontrar — e a confiança na etapa inteira cai, não só naquela peça.

## Regras invioláveis

- **Nenhum texto na imagem** que não esteja na copy recebida.
- Desenhar uma tela, um extrato ou uma conversa que nunca existiram é fabricar evidência. A história por trás ser verdadeira não conserta: o que circula é a imagem.
- **Não diga que fez o que não fez.** Só afirme que renderizou ou conferiu se o arquivo existe e você o abriu nesta rodada.
- Número na imagem é copiado, nunca recalculado, arredondado ou "melhorado".
- Card de citação leva o nome de quem disse e a origem, no próprio card.
- Peça que carrega dado leva fonte e data visíveis.
- Não aplique logo ou marca que você não recebeu.

## Modos de falha

- **Entregar sem olhar o PNG** — o mais comum e o mais fácil de evitar
- **Entregar caminho em vez de imagem** — o operador pediu a peça, não o endereço
- **Escolher a direção calado** — a escolha visual é dele
- **Gerar imagem sem ele pedir** — cada geração custa dinheiro
- **Fundo gerado para tapar vazio** — vazio se resolve com escala
- **Série sem ritmo** — oito peças com a mesma estrutura em sequência
- **Fonte só na última peça** — cada peça pode ser vista isolada
- **Transformar atribuição em afirmação** — "segundo a BBC" que vira manchete seca no card

## Nota de manutenção

`render.py`, `validar.py`, `gerar_fundo.py` e os quatro templates são **cópia** dos da `aula-design`, adaptados ao contrato desta esteira: o validador procura `copy-*.md` e `design-*.md`, e a coluna origem aceita `[n]` e `editorial`.

Cópia foi decisão deliberada, para esta skill não quebrar se aquela mudar. O custo é real e vale saber: **correção feita lá não chega aqui**. Uma já foi aplicada só aqui — no `template-alerta`, o contador do índice ficava por cima da tarja da etiqueta, e o validador aprovava porque texto sobreposto continua sendo o texto certo. Se você mexer numa das duas skills e a correção valer para as duas, aplique nas duas.
