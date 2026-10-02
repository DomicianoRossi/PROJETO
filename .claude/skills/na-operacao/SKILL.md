---
name: na-operacao
description: Produz o caso semanal da editoria Na Operação da AgenticWay — encontra um caso real e recente de empresa nomeada usando agentes de IA num processo de negócio, apura em fontes públicas, escreve o caso no formato JSON do site (números com quem mediu, fluxo, antes/depois, o que a história não conta, lições), gera a imagem ilustrativa com o Gemini, valida com scripts/build_dados.py e abre um pull request para o editor aprovar. Use sempre que pedirem "caso da semana", "roda a na operação", "novo caso", "caso de empresa usando agente", ou quando a rotina semanal da AgenticWay disparar. Não use para notas curtas do dia (isso é /radar), opinião (Análise) ou guia prático.
---

# Na Operação AgenticWay

Na Operação é a editoria de casos: uma empresa real colocou um agente de IA num processo de negócio, e o caso mostra o que mudou, como foi medido e o que a fonte não conta. O público é decisor de empresa média e gerente de TI ou processos.

**A promessa da editoria, que a página repete:** casos com empresa nomeada, montados a partir de fontes públicas, dizendo quem mediu cada número. Não houve visita nem entrevista, e o caso diz isso. O validador recusa um "Como apuramos" que fale em visita ou entrevista, porque um agente não faz nenhuma das duas, e prometer o contrário é a mentira que a marca diz não contar.

Um caso por semana. Melhor nenhum do que um caso fraco: se a busca não achar um caso que passe nos critérios, diga isso e não abra PR.

## Saída

- 1 arquivo `conteudo/publicado/na-operacao/<id>.json`
- 1 imagem `site/img/na-operacao/<id>-ia.png` (opcional, ver Passo 5)
- `site/dados/na-operacao.js` regenerado
- branch `na-operacao/AAAA-MM-DD` com um commit, enviado, e um pull request aberto
- no chat ou no log da rotina: o caso escolhido, os candidatos descartados e o motivo de cada um

## Passo 1 — Preparar

1. Na raiz do repositório, atualize o `main` (`git checkout main && git pull`). Se houver alteração pendente, pare e avise.
2. Veja o que já foi publicado, para não repetir empresa nem caso:
   ```bash
   grep -h '"empresa"\|"titulo"' conteudo/publicado/na-operacao/*.json 2>/dev/null || echo "nenhum caso publicado ainda"
   ```
3. Leia o esquema e o exemplo em `references/esquema.md` antes de escrever.

## Passo 2 — Encontrar candidatos

Prefira o Firecrawl (`firecrawl search ... --json`, `firecrawl scrape`, um de cada vez); sem ele, WebSearch e WebFetch. Guarde o que baixar em `.firecrawl/`.

Faça de 4 a 6 buscas, priorizando Brasil, nos últimos 30 dias (`--tbs qdr:m`):
- empresas brasileiras que colocaram agentes em produção num processo (atendimento, faturamento, fiscal, compras, cobrança, estoque, comércio exterior)
- estudos de caso publicados por fornecedores de ERP, CRM e plataformas de agentes com cliente nomeado
- comunicados de empresas sobre resultado com agentes
- casos que pararam ou deram errado (piloto encerrado, agente desligado) — eles entram, e são os mais úteis

## Passo 3 — Escolher o caso

Um candidato só passa se tiver tudo isto:

1. **Empresa nomeada.** Caso anônimo não entra: o leitor não consegue conferir.
2. **Processo concreto.** O que o agente faz, em que sistema, com que entrada e saída. "Usa IA no atendimento" não basta.
3. **Ao menos um número com quem mediu.** Se o único número é do fornecedor, o caso pode entrar, mas o título e o `quemMediu` dizem isso.
4. **Fonte aberta e lida.** Você abriu a página e o que vai escrever está lá.
5. **Novo:** empresa e caso ainda não publicados aqui; fonte dos últimos 30 dias.
7. **Fala em evento não é caso.** Executivo citando número em palestra, sem processo, sistema ou período de medição, fica como reserva, não como caso.
6. **Relevante para empresa média brasileira:** empresa brasileira, ou caso de fora com consequência clara para quem opera aqui.

Quando houver mais de um, prefira: Brasil; número medido pela empresa ou por terceiro; caso que parou ou que mostra custo e prazo; setor ainda pouco coberto na editoria.

Uma acusação contra empresa identificada (fraude, vazamento, demissão em massa) só entra com fonte oficial ou dois veículos independentes; na dúvida, descarte e mencione no PR.

## Passo 4 — Escrever o caso

Arquivo `conteudo/publicado/na-operacao/<id>.json` (escreva o JSON com a ferramenta de escrita de arquivo, não com heredoc no terminal: aspas e acentos quebram), `id` em kebab-case sem acento com a empresa e o processo (`ifood-beneficios-agentes-vendas`). O esquema completo está em `references/esquema.md`.

Regras de conteúdo, e por quê:

- **Setor é o da empresa, processo é o do agente.** Fabricante com agente no atendimento: setor INDÚSTRIA, processo ATENDIMENTO.
- **Número calculado não entra.** Se a fonte diz 51,7% resolvidos, não escreva os 48,3% restantes: a fonte não afirmou isso.
- **Reportagem que só repete o comunicado não é segunda fonte independente.** Liste as duas, mas o `transparencia` diz que a matéria reproduz os números da empresa.
- **Número igual à fonte**, com `quemMediu` dizendo de onde veio ("empresa, em comunicado", "fornecedor X, em estudo de caso", "veículo Y"). Arredondar é inventar.
- **Fluxo** descreve o processo como a fonte descreve. Se a fonte não diz qual sistema, escreva "sistema de gestão da empresa (não informado)" em vez de supor.
- **Indicadores antes/depois** só com os dois valores na fonte. Se a fonte só dá o depois, não invente o antes: deixe a lista vazia.
- **`naoConta`** é a leitura crítica do que a fonte omite: custo do projeto, tempo de implantação, quanto ainda passa por pessoa, quem mediu, período da medição. Escreva como ausência ("a empresa não divulgou o custo"), nunca como fato inventado.
- **`citacao`** só se a fala estiver publicada na fonte, com quem disse.
- **`comoApuramos`** descreve as fontes de verdade, com datas, e termina dizendo que não houve visita nem entrevista.
- **`transparencia`** diz a relação de quem publicou com o resultado (fornecedor que vende a solução, empresa divulgando o próprio projeto).
- **Tom:** analítico, direto, sem hype, sem exclamação, sem emoji.

## Passo 5 — Imagem

Siga `conteudo/padroes/imagens.md`. Resumo:

```bash
echo '{"prompt":"<cena genérica do setor e processo, em inglês>. Computer monitors turned away or out of focus with no readable content. No text, no lettering, no logos, no signage, no readable screens, no identifiable faces.","style":"realistic editorial photo, shallow depth of field, calm, not staged, not stock-photo, muted navy and warm paper tones"}' \
  | python .claude/skills/design-conteudo/scripts/gerar_fundo.py --model flash --aspect-ratio 16:9 --no-open
```

Nesta skill a imagem é gerada sem perguntar: a rodada já foi pedida, e o editor aprova no PR. Rode o script a partir de `.firecrawl/` (`cd .firecrawl`), para a pasta `generated-images/` ficar fora do repositório; o arquivo sai com o nome `meta_ad_draft_*.png`, que é só o padrão do script. O script lê `GEMINI_API_KEY` do ambiente (localmente, carregue com `set -a; . ~/api_keys.env; set +a`). Mova o PNG de `.firecrawl/generated-images/` para `site/img/na-operacao/<id>-ia.png`, abra a imagem e confira: nenhuma tela legível, nenhum texto ou logotipo, nenhum rosto identificável, nada que pareça a empresa real (fachada, uniforme, produto com marca). Se falhar, gere de novo uma vez; se falhar de novo, publique sem imagem e diga isso no PR. Registre no campo `imagem`: arquivo (`img/na-operacao/<id>-ia.png`), alt descrevendo a cena, modelo e o prompt usado.

Se `GEMINI_API_KEY` não existir, publique sem imagem e registre no PR.

## Passo 6 — Validar

```bash
python scripts/build_dados.py
```

Corrija até passar. Depois releia o caso contra as fontes, procurando número, nome próprio, data e sistema citado.

## Passo 7 — Abrir o pull request

```bash
git checkout -b na-operacao/$(date +%Y-%m-%d)
git add conteudo/publicado/na-operacao/ site/dados/na-operacao.js site/img/na-operacao/
git commit -m "Na Operação: <empresa> — <processo>"
git push -u origin HEAD
```

Abra o PR para o `main` (ferramenta de GitHub da sessão ou `gh pr create`; se nenhuma existir, informe `https://github.com/agentic-way/site/pull/new/<branch>`). Descrição: o caso em uma linha, as fontes, os números e quem mediu cada um, os candidatos descartados com motivo, e qualquer ponto que o editor precise decidir. Nunca faça merge nem push no `main`: o merge é a aprovação do editor.
