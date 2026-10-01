# Criar uma direção nova (modo `-t`)

Este arquivo é o método de **criar template**, não o de aplicar. A skill em modo normal
recebe copy e devolve PNG usando uma das direções existentes. Em `-t`, o produto é a
**direção** — um `template-<nome>.html` novo, seus temas, e a entrada dele no `render.py`.

Origem: sessão de 26–27/07/2026, em que nasceram o `template-revista` (engenharia reversa
de um carrossel de referência), o trio de temas petróleo e as capas autorais dos Florais.
Sete fases foram exercidas uma ou duas vezes cada — é método observado, não lei.

---

## Fase −1 — A escolha da tese (fica a montante, mas define o teto)

Não é design, e mesmo assim entra aqui: **a pauta escolhida determina o que o design pode
fazer depois**. A cadeia é rígida:

> a tese escolhida → determina o gancho possível → determina o nível de imagem possível

Se a tese for lista de proibições, o gancho vira enumeração; enumeração não nega nenhuma
palavra; e sem palavra negada **a imagem não passa do nível 2** da escala da Fase 4.5 —
não existe cena contraintuitiva para encenar. Quem escolhe a pauta está escolhendo, sem
saber, o teto visual da peça.

Cinco regras, quando houver escolha de tese:

1. **Escolher pela cena, não pelo tema.** Se você não descreve a cena em uma frase
   visual, não é pauta ainda. "Cheiro de salgadinho na pata" passa; "cuidados com a
   saúde do pet" não.
2. **Declarar o eixo antes de produzir.** Proibição/risco entrega alcance e não entrega
   conversa. Demonstração + pergunta de hábito entrega comentário. Misturar os dois faz o
   alcance subir enquanto a conversa cai.
3. **Contrariar a autoridade concorrente, não o senso comum.** Mais caro de sustentar, e é
   onde está o volume de comentário.
4. **O nome técnico é a entrega, não o enfeite.** É a disciplina de fonte vista pelo lado
   do valor, e não pelo lado do risco.
5. **Tese boa é ativo de 18–24 meses.** O dossiê é patrimônio, não insumo consumido — o
   custo da pesquisa se amortiza em mais de uma publicação. Marque o reuso.

---

## Fase 0 — Nomear o defeito antes de desenhar

Nada começa em "quero um template novo". Começa num incômodo vago — *"tá com cara de
IA"*, *"esse slide tá estranho"*. A primeira tarefa é **converter o incômodo em lista de
defeitos nomeáveis**: uma família tipográfica só · fundo chapado · tarja de acento em toda
peça · hierarquia idêntica · zero foto.

Enquanto o problema for "tá feio", qualquer mudança parece resposta e nenhuma resolve.
Nomeado, cada item vira teste que a direção nova tem de passar.

**O contra-exemplo que vale guardar:** um slide de cor chapada com muito vazio. O
diagnóstico intuitivo era "falta coisa" — e estava errado. O vazio não era o defeito; o
vazio **acidental** era. O conserto não foi encher, foi **declarar o campo** (marca d'água
tipográfica + régua de acento). Nomear errado leva a decorar.

---

## Fase 1 — Engenharia reversa da referência, em elementos nomeados

Dada uma referência ("quero algo assim"), decompor em **N elementos discretos e
nomeados** — nunca em adjetivos. Da referência que gerou a direção revista saíram seis:

1. serifa display gigante × grotesca pequena (contraste de **letra**, não de peso)
2. numeral por extenso, vertical, na canaleta
3. subtítulo em serifa itálica
4. textura no fundo — nunca chapado
5. header de três colunas
6. mockup inclinado com anotação

**Teste da decomposição:** cada item é implementável isolado e verificável no pixel. "Tem
um ar editorial" reprova. "Serifa display contra grotesca" aprova.

**O que só aparece decompondo:** o motor daquela direção era o contraste entre **duas
letras**, não o peso de uma. Isso não se enxerga olhando a referência inteira.

---

## Fase 2 — Declarar o que não dá, antes de prometer

Separar o reproduzível do que tem pedra no caminho, e dizer na primeira resposta. No caso
da revista: os seis elementos eram reproduzíveis, mas a fonte era paga (substituto em
espírito: Instrument Serif) e a foto do autor em cena **não se fabrica** — depende de foto
real do operador.

Entregar cinco de seis e revelar o sexto no fim é retrabalho. Dizer "isto eu não faço, e é
justamente o que mais carrega o estilo" na abertura é o que permite decidir cedo.

---

## Fase 3 — Provar em três peças, nunca na série inteira

Direção nova se valida com **capa + um interno + CTA**. As três cobrem os três regimes:
abertura (foto + display), miolo (grade, número, dado) e fechamento (tipografia pura). Se
as três passam, a série passa. Se quebra, quebrou em 3 renders e não em 8.

---

## Fase 4 — O loop do pixel

`renderizar → abrir o PNG → achar o defeito → corrigir → renderizar`.

**Regra central: o validador não substitui o olho, e o olho não substitui o validador.**
Pegam classes diferentes de erro, e ambos aprovam peça quebrada dentro do que não medem.

Só o pixel pega: palavra-herói **cortada** pela borda (o Chrome corta, não reduz) ·
quebra de linha deixando "5." órfão · véu apagando o assunto da foto · título colidindo
com o header · numeral marcando a posição errada na série · mockup exibindo peça de uma
paleta antiga.

Só o validador pega: frase que não existe na copy, formada por blocos que **colam sem
separador** (`<b>`, `<span>`, `<i>` somem sem espaço; `<div>` e `<small>` deixam) · número
fora da copy · peça com dado e sem fonte no rodapé.

**Corolário duro:** o defeito que passa nos dois é o mais perigoso. Texto invisível
continua sendo o texto certo; palavra cortada continua sendo a palavra certa.

---

## Fase 4.5 — A escala de relação entre imagem e headline

A imagem tem **seis níveis** de relação com o texto, e subir de nível muda a peça mais do
que qualquer ajuste de layout.

| Nível | O que a imagem faz | Exemplo |
|---|---|---|
| 1. Atmosfera | ambienta, não argumenta | mesa noturna, bancada de oficina |
| 2. Eco da tese | ilustra o conceito | pessoa sentada no deserto com mesa vazia atrás = "trabalho que ninguém vê" |
| 3. Retrato técnico | obedece à técnica editorial | fundo liso, altura do olho, olhar direto, rim light, catchlights |
| 4. Encenação contraintuitiva | **desmente a palavra** | "seu cão não é ~~estressado~~" + cão de óculos escuros com água de coco |
| 5. Ocupação física | o sujeito **ocupa** a palavra | o animal deitado sobre a palavra, o risco sumindo atrás do corpo |
| 6. Interrupção | o sujeito **impede** a palavra | o animal entra na frente e a palavra não termina |

**O gatilho está na copy, não no design.** Os níveis 4–6 só existem se a headline **negar
alguma coisa**. Headline afirmativa não tem o que desmentir e a imagem cai no nível 2.

**O default conservador — "se a peça funciona sem fundo, vá sem fundo" — vale no nível 1 e
trava nos demais.** Ele protege contra o modo de falha mais comum (imagem como enfeite
tapando vazio de layout), mas nos níveis 4–6 a imagem **não é fundo**: é um dos dois lados
de uma contradição. Chamar de "fundo" já é o erro de enquadramento.

**Custo de subir:** níveis 1–2, uma geração. Nível 3, prompt carregado de técnica. Nível
4, cena dirigida com trade-off real (óculos escuros dão humor mas matam olhar e
catchlights — resolvido pedindo os óculos **baixos no focinho**). Níveis 5–6 exigem
**recorte com alpha de verdade** e a tipografia **atrás** do recorte: decisão de camada,
não de estilo.

**Sobre o recorte:** ferramenta que falhou uma vez pode ser a certa na próxima. O modelo de
segmentação vazou um objeto na primeira imagem (é treinado em silhueta humana) e acertou
de primeira na segunda, que só tinha o animal; o preenchimento por borda fez o inverso, e
com tolerância alta **invade o corpo do sujeito** quando o pelo claro se aproxima do cinza
do fundo. Cada imagem pede um método — insistir no que falhou custa rodadas.

---

## Fase 5 — Precipitar no código, sempre aditivo

O que a Fase 4 descobriu vira capacidade permanente do template — **por adição, nunca por
reescrita**. Precipitaram-se assim: os temas petróleo/revista/cliente, o
`template-revista.html`, a curva de escala do `hero` (e o `hero` entrando na **regex** que
só conhecia `fig|h|body`), o `{{ORDINAL}}` com `.comord`, a âncora `topo` com **véu
invertido**, e os componentes `.marca` e `.regua`.

**A regra que torna isso seguro: nenhuma série anterior pode mudar de aparência.** Por isso
tema novo é entrada nova no dicionário, e não ajuste no tema existente.

**A armadilha do seletor:** uma regra escrita como `.ph ~ .wrap .head` casa **mesmo sem
foto** — `display:none` não impede seletor de irmão. Ela clareava o header de toda peça de
fundo claro. Filete e contraste devem derivar do próprio `--fg` (`color-mix`), não de um
rgba fixo "de foto".

---

## Fase 6 — O contrato de fidelidade

**Nenhum texto entra na arte sem existir na etapa anterior.** Quando um selo de capa é
escrito direto no `pecas.json`, o caminho não é afrouxar o validador — é **voltar à copy e
registrar lá**, marcado como formulação editorial. A arte é a última etapa onde a invenção
pode entrar, e a mais perigosa: **imagem parece evidência**.

Consequências: forma curta de número decide-se na copy · ressalva que sobreviveu à copy
trava o pixel (atribuição não vira manchete seca) · o que a pesquisa não confirmou não
entra, mesmo sendo o número mais atraente da pauta.

---

## O teste final: isto é template novo mesmo?

**Reaproveitar template não é criar template.** Se a peça nova pode ser descrita como "o
template X com outra cor", não é direção nova — é tema novo, e o lugar dela é o dicionário
de temas.

Direção nova tem **mecânica própria**: uma relação entre elementos que as outras não
conseguem expressar. A revista tem o contraste de duas letras e o numeral na canaleta. A
capa autoral dos Florais tem a palavra-objeto **atrás** do recorte, com o sujeito deitado
sobre ela. Sem mecânica, é reciclagem — e o operador percebe.
