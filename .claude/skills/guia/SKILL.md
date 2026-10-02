---
name: guia
description: Produz a rodada do Guia da AgenticWay — escreve um guia prático novo a cada duas semanas (perguntas, checklist, indicadores, passo a passo ou glossário, cada item com o porquê, a resposta que tranquiliza, a que preocupa e o que anotar) e revisa os guias já publicados quando algo que o site publicou os torna desatualizados, subindo a versão com histórico. Valida com scripts/build_dados.py e abre um pull request para o editor aprovar. Use sempre que pedirem "roda o guia", "guia novo", "revisa os guias", "atualiza o guia de X", ou quando a rotina semanal de quarta disparar. Não use para notícia (/radar), caso (/na-operacao) ou opinião (/analise).
---

# Guia AgenticWay

O Guia é a biblioteca prática da AgenticWay: o que um decisor de empresa média leva para a reunião com o fornecedor, para o jurídico, para a planilha de custo. Cada guia é versionado: quando o mundo muda (uma regra nova, um preço novo, um caso que mostra outro risco), o guia sobe de versão e o histórico diz o quê e quando. É isso que diferencia guia de artigo: ele continua certo.

O público não é técnico. Um guia bom pode ser usado por um diretor que nunca configurou um agente: diz o que perguntar, por que importa e como reconhecer uma resposta boa e uma ruim.

## Saída

- guia novo (nas rodadas de guia novo): `conteudo/publicado/guia/<id>.json`, versão 1.0
- revisões: os JSON alterados, com `versao`, `atualizado_em` e uma entrada nova no começo de `historico`
- `site/dados/guia.js` regenerado
- branch `guia/AAAA-MM-DD`, um commit, push e pull request
- no chat ou no log: o que foi escrito, o que foi revisado e por quê, e o que foi considerado e não mudou

Se for rodada de só revisão e nada mudou, diga isso e não abra PR.

## Passo 1 — Situação

1. Na raiz do repositório, atualize o `main`; se houver alteração pendente, pare e avise.
2. Rode:
   ```bash
   python .claude/skills/guia/scripts/situacao.py
   ```
   Ele diz o **modo da rodada** (GUIA NOVO + REVISÃO a cada duas semanas, SÓ REVISÃO nas outras), lista os guias com versão, itens e fontes, e o que o site publicou desde a última atualização de cada um.
3. Leia `references/esquema.md`.

## Passo 2 — Revisar os guias existentes

Para cada guia, compare os itens com o que saiu desde a última atualização. Um guia precisa de revisão quando:
- um fato citado mudou (preço, regra, prazo, norma);
- uma nota ou um caso mostra um risco ou um critério que o guia não cobre e deveria;
- uma fonte do guia saiu do ar ou foi corrigida.

Não revise por estilo. Revisão é mudança de conteúdo, e cada uma vira linha no histórico que o leitor vê.

Ao revisar:
- **data do histórico**: mês e ano no formato `out/2026`, pela hora de São Paulo.
- **versão**: correção pequena ou acréscimo pontual sobe o decimal (1.0 → 1.1); mudança de item, item novo ou removido sobe o decimal também; reescrita do guia sobe o inteiro (1.x → 2.0);
- `atualizado_em` = agora;
- nova entrada **no começo** de `historico`: `{"data": "out/2026", "versao": "1.1", "texto": "o que mudou e por quê, citando o fato novo"}`;
- inclua a fonte nova em `fontes`.

## Passo 3 — Escrever o guia novo (só nas rodadas de guia novo)

**Escolher o assunto.** Parta do que o site publicou e das perguntas que ele deixa para quem opera. Bons guias respondem a "e agora, o que eu faço?" depois de uma notícia ou de um caso. Evite assunto já coberto por outro guia: prefira revisar o existente.

**Escolher o formato** pelo uso:
- PERGUNTAS: para levar a uma reunião com fornecedor
- CHECKLIST: para conferir antes de assinar ou ligar algo
- INDICADORES: para medir depois que está rodando
- PASSO A PASSO: para fazer algo em ordem
- GLOSSÁRIO: para entender termos de proposta

**Cada item tem seis campos**, e todos precisam trabalhar:
- `curta`: rótulo curto do item (aparece no índice lateral)
- `pergunta`: a pergunta, o item ou o passo, em uma frase
- `porque`: por que isso importa para a empresa, concretamente
- `boa`: a resposta, o estado ou o resultado que tranquiliza
- `ruim`: o que preocupa ou deve acender alerta
- `anote`: o que a pessoa escreve para comparar depois

**Regras, e por quê:**
- **Releia a fonte original de todo fato que entrar no guia**, mesmo que ele já esteja numa nota ou análise do site. O guia fica no ar por meses e é revisado; ele precisa apontar para a origem, não para a nota.
- **Fontes que mostram o mesmo dado em escalas diferentes** (por exemplo, 1.000 e 10.000 mensagens): use uma só, a mesma que o site já publicou, e diga a escala no texto.
- **Fato tem fonte.** Número, regra, preço e nome de norma vêm de fonte aberta e lida, listada em `fontes`. O guia não pode dizer "60% dos pilotos param na integração" sem dizer quem mediu; se não houver fonte, escreva sem o número.
- **Orientação é editorial, e pode ser.** "Peça o log de uma semana" é recomendação da redação, não fato; não precisa de fonte, mas também não pode se apresentar como regra de mercado.
- **Nada inventado sobre leitores ou especialistas.** Sem "a pedido de leitores", "revisado por advogado" ou "segundo especialistas" sem nome. O histórico da versão 1.0 diz "Publicação." e, se for o caso, de qual nota ou caso o guia partiu.
- **Não é aconselhamento jurídico.** Guia sobre contrato ou LGPD diz o que perguntar e verificar, e recomenda levar ao jurídico; não afirma o que é legal ou ilegal no caso do leitor.
- **Tom:** direto, sem hype, sem exclamação, sem emoji. Frases curtas. Português de reunião, não de manual técnico.
- **Tamanho:** de 5 a 9 itens na maioria dos formatos; glossário pode ter até 12 termos por guia.

## Passo 4 — Validar

```bash
python scripts/build_dados.py
```

Corrija até passar. Releia o que é fato contra as fontes.

## Passo 5 — Abrir o pull request

```bash
git checkout -b guia/$(date +%Y-%m-%d)
git add conteudo/publicado/guia/ site/dados/guia.js
git commit -m "Guia: novo — <título>"            # rodada só com guia novo
# ou "Guia: revisões — <id> v1.1, <id> v2.0"   # rodada só com revisões
# ou "Guia: novo — <título>; revisões — <id> v1.1"
git push -u origin HEAD
```

Abra o PR para o `main`. Na descrição: o guia novo (assunto, formato, de qual publicação partiu), cada revisão com a versão nova e o motivo, e os guias que você considerou revisar e deixou como estavam, com o motivo. Nunca faça merge nem push no `main`.
