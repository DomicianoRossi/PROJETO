---
name: newsletter
description: Monta a newsletter semanal da AgenticWay (sexta) a partir do que o site publicou nos últimos 7 dias — 3 a 5 fatos do Radar, um caso de Na Operação, uma opinião de Análise e o que mais saiu (Guia, Ferramentas) — e cria um RASCUNHO no Buttondown para o editor revisar e enviar. Nunca envia. Use quando pedirem "monta a newsletter", "rascunho da newsletter", "edição de sexta", ou quando a rotina de sexta disparar. Não use para escrever conteúdo novo do site (/radar, /na-operacao, /analise, /guia, /ferramentas).
---

# Newsletter AgenticWay

A newsletter é o resumo da semana para quem não entrou no site: sete minutos de leitura, sem hype, cada item com link para o texto completo. Ela **não traz fato novo**: tudo o que diz já foi publicado e aprovado pelo editor no site. *Por quê:* a aprovação editorial acontece no merge de cada item; a newsletter só reorganiza, e assim não precisa de outra rodada de checagem.

**Quem envia é o editor.** A skill cria um rascunho no Buttondown (`status: draft`); Domiciano revisa e clica em enviar. A chave da API não tem permissão de envio.

## Passo 1 — O que saiu na semana

Na raiz do repositório, atualize o `main` e rode:

```bash
python .claude/skills/newsletter/scripts/semana.py
```

Se houver menos de 3 notas do Radar na semana, não monte a edição: responda "semana sem edição" com o que encontrou. Melhor nenhuma edição do que uma fraca.

## Passo 2 — Escrever a edição

Grave `edicao.json` na raiz do repositório (o arquivo não é commitado) com este formato:

```json
{
  "assunto": "até 60 caracteres: o fato ou a ideia que amarra a semana, sem clickbait (é o título do e-mail)",
  "preheader": "até 110 caracteres: complementa o assunto, não repete",
  "abertura": "1 ou 2 parágrafos (separados por linha em branco), até 900 caracteres no total",
  "fatos": [{"id": "<id de nota do Radar>", "texto": "1 ou 2 frases, até 320 caracteres"}],
  "caso": {"id": "<id de Na Operação>", "texto": "até 600 caracteres"},
  "opiniao": {"id": "<id de Análise>", "texto": "até 600 caracteres"},
  "tambem": [{"editoria": "guia", "id": "..."}, {"editoria": "ferramentas", "id": "..."}]
}
```

- `fatos`: de 3 a 5 notas do Radar, da mais relevante para a menos relevante para um decisor de empresa média brasileira.
- `caso` e `opiniao`: o mais recente da semana; se não houve, `null`. Se a semana teve dois, o outro vai em `tambem`.
- `tambem`: até 4 itens, nesta ordem de preferência: guias novos ou revisados, avaliações de Ferramentas, a segunda análise ou o segundo caso, e notas do Radar que ficaram fora dos fatos (as mais úteis para decisor). `editoria` pode ser radar, na-operacao, analise, guia ou ferramentas. Pode ser `[]`.

Título, link, fonte e setor de cada item o script pega do JSON publicado pelo `id`. Você só escreve os textos.

Regras, e por quê:
- **Só o que está no item publicado.** O `texto` de cada fato resume a nota; número que não está na nota não entra. A saída do `semana.py` basta para escolher; para escrever um resumo com número, abra o JSON em `conteudo/publicado/`. O script recusa número que não esteja no item. *Por quê:* a newsletter não passa por PR; o que a protege é não trazer nada novo.
- **Atribuição continua valendo.** Se a nota diz "segundo a empresa", o resumo diz também.
- **A abertura liga os pontos da semana**, não repete os títulos. Diga o que muda para quem opera. É escrita por agentes, como todo o site; não escreva como se fosse Domiciano em primeira pessoa.
- **Tom:** analítico, direto, sem exclamação, sem emoji, sem "revolucionário". Anglicismo só quando necessário.

## Passo 3 — Prévia e rascunho

```bash
python .claude/skills/newsletter/scripts/rascunho.py edicao.json --previa   # gera previa.html, sem rede
python .claude/skills/newsletter/scripts/rascunho.py edicao.json            # cria o rascunho no Buttondown
```

O script valida tamanhos (em caracteres, contando tudo), tom e números, numera a edição pelo que já foi **enviado** (rascunhos não contam) e cria o rascunho. Se já houver rascunho no Buttondown, ele para e avisa: na rotina, relate isso e não crie outro; quem apaga rascunho é o editor. A janela é de 7 dias até a hora em que o `semana.py` roda; a rotina roda sexta às 7h. Corrija os erros que ele apontar e rode de novo. Se a criação falhar (chave ausente, erro de rede), relate o erro e deixe a prévia; não tente outro caminho de envio.

## Resposta final

Assunto, preheader, os itens escolhidos (e os que ficaram de fora, com o motivo) e a confirmação "rascunho criado, não enviado", com o link https://buttondown.com/emails.
