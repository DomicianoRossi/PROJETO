---
name: radar
description: Produz a rodada do Radar da AgenticWay — pesquisa na web as notícias recentes sobre agentes de IA nas empresas, descarta o que já foi publicado, escreve até 5 notas curtas com fonte primária no formato JSON do site, valida com scripts/build_dados.py e abre um pull request para o editor aprovar. Use sempre que pedirem "roda o radar", "atualiza o radar", "notícias do dia", "o que saiu hoje sobre agentes", "nova rodada", ou quando uma rotina agendada da AgenticWay disparar, mesmo que a palavra "radar" não apareça. Não use para escrever análise, caso de Na Operação, guia ou carrossel de rede social.
---

# Radar AgenticWay

O Radar é a editoria de notas curtas do site www.agenticway.com.br: o que aconteceu com agentes de IA e o que isso muda na operação de uma empresa média brasileira. O público é decisor de empresa média e gerente de TI ou processos, não desenvolvedor.

O site se apresenta como conteúdo apurado e escrito por agentes, com um editor humano responsável. Isso só se sustenta se cada nota for verificável: o leitor precisa conseguir clicar na fonte e encontrar ali o que a nota afirma. Uma nota errada publicada por agente custa mais caro do que uma rodada com menos notas, então na dúvida, corte.

## Saída de uma rodada

- 0 a 5 arquivos novos em `conteudo/publicado/radar/<id>.json`
- `site/dados/radar.js` regenerado
- um branch `radar/AAAA-MM-DD-HHMM` com um commit, enviado ao GitHub, e um pull request aberto (ou o link para abri-lo)
- no chat (ou no log da rotina): a lista das notas, as pautas descartadas e o motivo de cada descarte

Rodada com zero notas é um resultado válido quando nada novo e verificável apareceu. Diga isso e não abra PR.

## Passo 1 — Preparar

1. Trabalhe a partir da raiz do repositório `agentic-way/site`. Atualize o `main` (`git checkout main && git pull`) e confirme que não há alteração pendente; se houver, pare e avise, porque misturar trabalho alheio na rodada esconde o que o editor vai aprovar.
2. Liste o que já existe, para não repetir pauta:
   ```bash
   python .claude/skills/radar/scripts/existentes.py
   ```
   Ele imprime id, data, título e URLs de fonte de cada nota publicada, e a data da mais recente. A janela de busca vai da nota mais recente até agora (no mínimo 24 horas, no máximo 7 dias).

## Passo 2 — Buscar

Prefira o Firecrawl (`firecrawl search` e `firecrawl scrape`), que devolve o texto da página; se ele não estiver disponível ou falhar por autenticação, use WebSearch e WebFetch. Guarde o que baixar em `.firecrawl/`, que é ignorado pelo git.

Faça de 4 a 6 buscas com ângulos diferentes, porque uma busca só devolve o consenso que todo mundo já publicou:

- agentes de IA em empresas brasileiras (português, `--country BR`)
- lançamentos de agentes ou conectores para sistemas que empresa média usa: ERP (TOTVS, SAP, Senior, Sankhya, Omie), CRM, WhatsApp, planilhas
- regulação e normas no Brasil (BCB, ANPD, Receita, CVM) que toquem decisão automatizada ou agentes
- pesquisas e estudos com dado novo sobre adoção, custo ou falha de agentes (em inglês também)
- casos de empresas com nome e número
- o contraditório: crítica, projeto cancelado, incidente

Use o filtro de tempo do Firecrawl (`--tbs qdr:d` para um dia, `qdr:w` para uma semana) conforme a janela do Passo 1. Exemplo:

```bash
firecrawl search "agentes de IA empresas Brasil" --sources news,web --tbs qdr:w --country BR --limit 10 -o .firecrawl/radar-1.json
```

## Passo 3 — Escolher as pautas

Para cada candidata, abra a página (scrape) e responda:

1. **É novo?** Compare com a saída de `existentes.py`: mesmo fato, mesma pesquisa ou mesma URL de fonte é repetição, mesmo com título diferente.
2. **Tem fonte primária?** O ideal é o próprio documento: comunicado da empresa, relatório da pesquisa, norma no site do órgão. Matéria de veículo serve quando ela cita a origem com clareza; nesse caso, procure e prefira a origem. Agregador, post de rede social e blog de fornecedor anônimo não servem como única fonte.
3. **Muda algo para empresa média brasileira?** Notícia internacional entra quando afeta ferramenta, custo, regra ou decisão de quem opera aqui. Rodada de investimento, troca de executivo e anúncio sem data ou sem produto ficam de fora, a não ser que mudem algo concreto.
4. **Quem afirma o número?** Se só o fornecedor diz que o cliente economizou X, a nota pode sair, mas atribui o número ao fornecedor no título ou na linha, e a ficha registra "Confirmação: não confirmada pelo cliente".

Fique com no máximo 5, priorizando Brasil e o que tiver consequência prática mais clara. Registre as descartadas com o motivo em uma linha, porque o editor precisa saber o que ficou de fora.

## Passo 4 — Escrever cada nota

Cada nota é um arquivo `conteudo/publicado/radar/<id>.json`. O `id` é o nome do arquivo, em kebab-case sem acento, curto e descritivo (`totvs-conector-agentes-protheus`). O esquema exato, com um exemplo completo, está em `references/esquema.md` — leia antes de escrever a primeira nota da rodada.

Regras de conteúdo, e por que existem:

- **Número entra igual à fonte.** "17.412" não vira "quase 18 mil". Arredondar é inventar, e o leitor que conferir vai achar outro número.
- **Todo número, nome e data do texto está numa fonte listada em `fontes`.** O validador confere formato, não verdade; a verdade é responsabilidade sua.
- **`publicado_em` é a hora desta rodada** (fuso `-03:00`), não a data da notícia. A data em que a fonte divulgou vai na `ficha`, como "Divulgação".
- **Tema** é um destes: REGULAÇÃO, LANÇAMENTOS, CASOS, PESQUISA, MERCADO.
- **`consequencias`** são leitura editorial (o que observar, o que muda), não fato novo. Podem dizer que a fonte tem interesse no resultado — isso é informação útil para o leitor, não ataque.
- **Tom do site:** analítico, direto, sem hype, sem exclamação, sem emoji. Anglicismo só quando não houver termo em português de uso corrente. Nada de "revolucionário", "nova era", "game changer".
- **Título** diz o fato, não a opinião. Se o fato é atribuído, o título atribui ("Segundo a X…", "X diz que…").

## Passo 5 — Validar

```bash
python scripts/build_dados.py
```

Se reprovar, corrija a nota e rode de novo. Não edite `site/dados/radar.js` à mão: ele é gerado.

Depois, releia cada nota contra a página da fonte uma última vez, procurando especificamente número, nome próprio e data. É o único ponto da esteira em que alguém compara a nota com a fonte antes do editor.

## Passo 6 — Abrir o pull request

```bash
git checkout -b radar/$(date +%Y-%m-%d-%H%M)
git add conteudo/publicado/radar/ site/dados/radar.js
git commit -m "Radar: <n> notas de <data>"
git push -u origin HEAD
```

Abra o PR com `gh pr create` se estiver disponível, ou pela ferramenta de GitHub da sessão; se nenhuma existir, informe o link `https://github.com/agentic-way/site/pull/new/<branch>`. A descrição do PR leva:

- as notas, uma por linha: título · tema · fonte primária
- as pautas descartadas e o motivo
- qualquer nota com número só do fornecedor, destacada

O merge é a aprovação do editor. Não faça merge nem push direto no `main`: o site publica sozinho a partir do `main`, e o PR é o único momento em que uma pessoa lê a nota antes do leitor.

## Quando parar e avisar em vez de publicar

- a busca não funcionou (Firecrawl e WebSearch indisponíveis): diga isso, não escreva nota de memória
- a única fonte de uma notícia relevante está atrás de paywall e você não conseguiu ler o conteúdo: descarte e registre
- a notícia envolve acusação contra pessoa ou empresa identificada (fraude, vazamento, processo): só entra com fonte oficial ou dois veículos independentes; na dúvida, descarte e mencione no PR para o editor decidir
