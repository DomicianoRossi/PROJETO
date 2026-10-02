---
name: analise
description: Produz a análise semanal da AgenticWay — lê o que o Radar e a Na Operação publicaram na semana, escolhe uma tese que os dados sustentam, complementa com pesquisa, escreve a opinião no formato JSON do site (tese em três pontos, corpo em três seções, "Onde posso estar errado", "O que eu faria"), valida com scripts/build_dados.py e abre um pull request para o editor aprovar. Use sempre que pedirem "análise da semana", "roda a análise", "escreve a opinião da semana", ou quando a rotina semanal de quinta disparar. Não use para notas do dia (/radar) nem para casos de empresa (/na-operacao).
---

# Análise AgenticWay

Análise é onde a AgenticWay toma posição. As outras editorias relatam; esta opina, uma vez por semana, saindo na sexta junto com a newsletter. A peça é assinada "Apurado e escrito por agentes AgenticWay · editor responsável: Domiciano Rossi": o editor aprova a tese no PR, então a tese precisa ser defensável por ele.

O que torna uma análise boa: uma afirmação clara, que nem todo mundo faria, sustentada por fatos com fonte, e que admite onde pode estar errada. O que a torna ruim: resumo da semana disfarçado de opinião, tese genérica ("a IA veio para ficar"), ou opinião sem dado.

## Saída

- 1 arquivo `conteudo/publicado/analise/<id>.json`
- `site/dados/analise.js` regenerado
- branch `analise/AAAA-MM-DD`, um commit, push e pull request
- no chat ou no log: a tese escolhida, as duas alternativas que você considerou e por que ficou com esta

## Passo 1 — Preparar e ler a semana

1. Na raiz do repositório, atualize o `main`. Se houver alteração pendente, pare e avise.
2. Veja o material da semana e as análises já publicadas:
   ```bash
   python .claude/skills/analise/scripts/semana.py
   ```
   O script imprime as notas do Radar e os casos de Na Operação dos últimos 7 dias (título, fatos e fontes), as análises já publicadas (título, tema e tese, para não repetir) e a **data de publicação**: a sexta-feira seguinte, ou hoje se hoje for sexta. Use essa data em `publicado_em` (às 07:00, `-03:00`) e no nome do branch.
3. Leia `references/esquema.md` e uma análise publicada como exemplo de formato e tom.

## Passo 2 — Escolher a tese

Leia o material da semana procurando uma tensão: dois fatos que, juntos, dizem algo que nenhum diz sozinho; um número que contradiz o discurso do mercado; uma decisão que a empresa média vai ter de tomar.

Escreva três teses candidatas em uma frase cada e escolha a que passar nestes testes:
- **É uma afirmação, não um tema.** "Agentes no setor jurídico" é tema; "o escritório médio vai contratar agente pelo preço por documento, não pela precisão" é tese. (O exemplo é ilustrativo: não o use como ponto de partida.)
- **Alguém sério discordaria.** Se ninguém discorda, não é opinião.
- **Os fatos da semana sustentam**, com pesquisa complementar se precisar (Firecrawl ou WebSearch; fonte aberta e lida, como no Radar).
- **Importa para a empresa média brasileira**, com consequência prática.
- **Não repete** tese de análise anterior.

Se a semana for fraca, a tese pode partir de um único fato forte da semana, desde que traga dado novo de pesquisa complementar.

## Passo 3 — Escrever

O formato é fixo porque a página tem lugar para cada parte (veja `references/esquema.md`):

- **titulo**: a tese, curta e afirmativa.
- **linhaFina**: o dado que sustenta e o que está em jogo.
- **tese**: três frases que resumem o argumento.
- **p1–p2**: abertura com o fato que dispara a tese, e por que ele importa.
- **h1/p3/p4, h2/p5/p6, h3/p7**: três seções desenvolvendo o argumento, cada uma com um subtítulo afirmativo.
- **destaque**: uma frase forte. Se for fala de alguém, está publicada na fonte e leva o nome; se for formulação da redação, não tem aspas nem atribuição.
- **pontos**: três ações ou critérios práticos (`rotulo` no formato `01 · PALAVRA`).
- **contra** ("Onde posso estar errado"): o melhor argumento contra a tese, de verdade, incluindo o interesse de quem publicou os dados. Mínimo de 200 caracteres; o validador cobra.
- **fechamento** ("O que eu faria"): a recomendação concreta.
- **frase**: uma frase do próprio texto para a listagem.
- **fontes**: todas as fontes usadas, no mínimo duas, com URL; inclua as fontes das notas e casos em que a tese se apoia.
- **baseadoEm**: ids das notas do Radar e dos casos de Na Operação usados.

Regras, e por quê:
- **Todo número e fato tem fonte em `fontes`.** Opinião é livre; fato não.
- **Números que vêm de notas e casos já publicados:** os que sustentam a tese, confira de novo na fonte original (eles vão ganhar peso de argumento); os periféricos podem ser usados como estão nas notas, com a mesma atribuição.
- **Fonte complementar que contradiz a primária:** fique com a primária (o documento de quem decide o preço, a regra, o resultado), não use a que diverge e mencione a divergência no PR.
- **Número igual à fonte**, sem arredondar nem calcular o que a fonte não afirmou.
- **Atribua o que é de alguém.** Se só o fornecedor afirma, a frase diz isso.
- **Voz:** primeira pessoa do singular é a voz da redação ("o que me interessa", "eu faria"), porque os títulos fixos da página são "Onde posso estar errado" e "O que eu faria". Não finja experiência pessoal: nada de "visitei", "conversei com clientes", "na minha consultoria".
- **Tom:** analítico, direto, sem hype, sem exclamação, sem emoji, anglicismo só quando necessário.
- **Leitura:** 4 a 6 minutos.

## Passo 4 — Validar

```bash
python scripts/build_dados.py
```

Corrija até passar. Releia o texto contra as fontes procurando número, nome e data.

## Passo 5 — Abrir o pull request

```bash
git checkout -b analise/<data de publicação AAAA-MM-DD, a do semana.py>
git add conteudo/publicado/analise/ site/dados/analise.js
git commit -m "Análise: <título>"
git push -u origin HEAD
```

Abra o PR para o `main`. Na descrição: a tese em uma linha, as duas alternativas descartadas e por quê, as fontes principais, e qualquer afirmação que o editor deva conferir com atenção. Nunca faça merge nem push no `main`: o merge é a aprovação do editor, que assina a tese.
