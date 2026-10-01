# Padrão de imagens da AgenticWay

Definido em 01/out/2026, depois de testar capas tipográficas na Home e nas listagens e uma imagem do Gemini na matéria de Na Operação. Vale para páginas feitas à mão, para as skills de editoria e para as rotinas agendadas.

## Regra geral

- **Nunca foto de veículo, agência ou terceiros**, mesmo com crédito. A imagem da matéria de origem pertence a quem a publicou.
- **Nunca imagem que pareça registro do fato**: tela de sistema, documento, extrato, conversa, prédio ou rosto identificável. Imagem parece evidência; uma tela inventada vira prova falsa do caso.
- **Toda imagem gerada por IA leva legenda visível** dizendo isso (ver abaixo).

## Qual imagem usar, por lugar

| Onde | O que usar |
|---|---|
| Home (destaque e cards) | Capa tipográfica |
| Listagens (Na Operação e outras com caixa de imagem) | Capa tipográfica |
| Matéria de **Na Operação** (caso com lugar e processo) | Imagem do Gemini, cena genérica, com legenda |
| Matérias de **Radar, Análise, Guia, Ferramentas** | Sem imagem, ou capa tipográfica se o layout pedir; não gastar geração com dado, tese ou checklist, que não têm cena |

## Capa tipográfica

- Estilo em `site/aw.css`, classes `aw-capa` + tom: `aw-capa` (navy), `aw-capa aw-capa-azul`, `aw-capa aw-capa-papel`. `aw-capa-grande` para o destaque principal.
- Conteúdo: editoria no topo (`aw-capa-ed`), um número ou uma palavra em destaque (`aw-capa-fig`), uma linha de rótulo (`aw-capa-rot`), símbolo do infinito no canto (`aw-capa-marca`).
- O destaque vem dos dados do item e precisa estar no texto da matéria: número igual à fonte, nunca arredondado. Se o número já aparece ao lado da capa (cards de Na Operação), a capa destaca a palavra do processo, não repete o número.
- Tom papel marca casos que pararam; nos demais, alternar navy e azul.
- O tamanho da letra acompanha a largura da capa (`cqi`); conferir que nenhuma palavra fica cortada.

## Imagem gerada pelo Gemini

- Script: `~/.claude/skills/design-conteudo/scripts/gerar_fundo.py --model flash --aspect-ratio 16:9 --no-open`. A chave `GEMINI_API_KEY` é carregada do `.env` (localmente, `~/api_keys.env`, sem exibir o valor).
- Cada geração custa crédito do Gemini. Fora das rotinas, perguntar antes de gerar.
- Prompt em inglês, descrevendo um ambiente genérico do setor do caso, sempre com: "Computer monitors turned away or out of focus with no readable content. No text, no lettering, no logos, no signage, no readable screens, no identifiable faces." Estilo: "realistic editorial photo, shallow depth of field, calm, not staged, not stock-photo". Tons próximos da paleta (navy e papel).
- Antes de publicar, abrir a imagem e conferir: nenhuma tela legível, nenhum texto ou logotipo, nenhum rosto identificável. Se falhar, gerar de novo ou ficar sem imagem.
- Arquivo: `site/img/<editoria>/<id-do-item>-ia.png`.
- Na página: `<figure>` com a imagem em `aspect-ratio:16/7; object-fit:cover; border-radius:4px`, texto alternativo descrevendo a cena, e `<figcaption>` em IBM Plex Mono, **8px**, cor `#5B6572`.
- Legenda, texto fixo: **"Imagem ilustrativa gerada por IA (Gemini). Não retrata a empresa do caso."**
- Registrar no item (ou na ficha de design) que a imagem é gerada, com modelo e prompt.
