# Decisões da AgenticWay

Registro das decisões tomadas e do porquê, para valer em situações semelhantes no futuro. Atualizado em 02/out/2026. Quando uma decisão mudar, edite a linha e registre a data; não apague o motivo antigo sem substituir por outro.

## 1. Proposta editorial

- **O site é feito por agentes, e diz isso.** Todo conteúdo gerado leva a assinatura "Apurado e escrito por agentes AgenticWay · editor responsável: Domiciano Rossi". Domiciano aprova cada publicação no merge do pull request. *Por quê:* transparência é o ativo da marca; esconder que é IA seria a mentira que o site critica.
- **Nunca fingir o que um agente não faz.** Nada de "visitamos", "entrevistamos", "testamos", "a pedido de leitores", "revisado por advogado", "segundo especialistas" sem nome. O validador barra parte disso (ex.: `comoApuramos` com "visitamos"). *Por quê:* a primeira versão das páginas prometia visita, entrevista e teste; um agente não faz nenhum dos três.
- **Fato tem fonte aberta e lida; opinião e orientação são editoriais e podem ser.** Número igual à fonte, sem arredondar nem calcular o que a fonte não afirmou (ex.: 51,7% resolvidos não vira "48,3% não resolvidos").
- **Atribuir o que é de alguém.** Número só do fornecedor sai no título e na ficha como do fornecedor ("não confirmada pelo cliente"). Quem publica pesquisa e vende a solução tem isso dito no texto.
- **Acusação contra empresa ou pessoa identificada** só com fonte oficial ou dois veículos independentes; na dúvida, fica para o editor decidir no PR.
- **Fala de executivo em evento não é caso; reportagem que só repete o comunicado não é segunda fonte independente.**
- **Conteúdo de demonstração no ar leva faixa "CONTEÚDO DE DEMONSTRAÇÃO"** até a editoria ter conteúdo real; a faixa sai quando entra o primeiro item real. *Por quê:* exemplos inventados tinham aparência de notícia real.
- **Ferramentas é relato documentado** (documentação oficial e relatos de usuários), nunca "testamos" sem teste real. "Não documentado" não quer dizer que a ferramenta não faz, e a página diz isso. Preço com período de cobrança e moeda como a fonte mostra; sem superlativo sem fonte (03/out/2026).

## 2. Editorias e rotinas

| Editoria | Formato | Rotina (São Paulo) | Skill |
|---|---|---|---|
| Radar | até 5 notas curtas por rodada, Brasil primeiro, mundo se mudar algo para empresa média brasileira | todo dia 7h (`0 10 * * *` UTC) | `/radar` |
| Na Operação | 1 caso por semana, empresa nomeada, fontes públicas, imagem do Gemini | segunda 8h (`0 11 * * 1`) | `/na-operacao` |
| Guia | guia novo a cada 2 semanas + revisão semanal com versão e histórico | quarta 8h (`0 11 * * 3`); `situacao.py` decide o modo | `/guia` |
| Análise | 1 opinião por semana, tese a partir do que saiu na semana | quinta 17h (`0 20 * * 4`), publica na sexta 7h | `/analise` |
| Ferramentas | 1 comparativo ou avaliação a cada 2 semanas, seis critérios fixos, marcas documentado / com ressalva / não documentado, cada uma com fonte; nunca teste próprio | terça 8h (`0 11 * * 2`); `situacao.py` decide se é semana | `/ferramentas` |
| Newsletter | pendente (sextas) | — | — |

- **Toda rotina abre PR; nunca faz merge nem push no `main`.** O merge é a aprovação do editor.
- **Rodada sem material bom não abre PR** ("rodada sem notas", "semana sem caso"…). Melhor nenhum do que fraco.
- **Toda skill nova é testada com uma rodada real por um agente separado** (que só conhece a skill), parando no commit; os pontos que ele achar ambíguos viram ajuste da skill antes da rotina.
- Rotinas na conta Max do aplicativo (domiciano.rossi@gmail.com), ambiente de nuvem **"Radar AgenticWay"** (rede liberada para abrir as fontes; variáveis `FIRECRAWL_API_KEY` e `GEMINI_API_KEY`). O ambiente "Default" fica restrito.
- **Ao criar rotina pela API, remover os conectores que o servidor anexa sozinho** (Gmail, Drive, Calendar etc.). Rotina que lê a web não deve ter acesso a e-mail e arquivos.
- Modelo das rotinas: Sonnet 5.5.

## 3. Arquitetura do site

- Conteúdo como dados: `conteudo/publicado/<editoria>/<id>.json` → `python scripts/build_dados.py` (valida e gera `site/dados/<editoria>.js`) → páginas leem os dados. Publicar nunca é editar HTML.
- Uma página por editoria mostra qualquer item via `?id=`. Endereço antigo que já circulou vira redirecionamento (ex.: a análise da conta do agente).
- Vercel publica o `main` com Root Directory = `site`. Arquivos internos (`CLAUDE.md`, `conteudo/`, `marca/`) não são servidos.
- Branch por mudança, PR, merge pelo editor. Commit com `Co-Authored-By`.

## 4. Padrões de página e design

- Imagens: ver `conteudo/padroes/imagens.md` (capa tipográfica na Home e listagens; Gemini só em Na Operação, cena genérica, legenda 8px; nunca foto de terceiros).
- **Grades de cards não usam o fundo do contêiner para desenhar linhas**: cada card tem o próprio contorno (classe `aw-grade`), sem moldura externa, para não sobrar quadro vazio quando a última linha não fecha.
- **Listas que crescem com o tempo (como o Guia) usam um item por linha**, não grade de cards: funciona igual com 1 ou 30 itens.
- **Filtros só aparecem com mais de uma opção; blocos "Outros…" só aparecem se houver itens.** Contadores com singular e plural ("1 guia").
- Rótulos de assunto/tema no topo de um item são links para a listagem filtrada (`?assunto=`).
- Tom e marca: ver `CLAUDE.md` (DNA v2, cores, tipografia, um coral por tela).

## 5. Como trabalhar com o editor

- Quando o editor disser que algo está diferente "lá fora", pedir print com a barra de endereço antes de corrigir; conferir a mesma página e a mesma largura de tela. *Por quê:* em 02/out uma correção virou vai e vem porque cada lado olhava uma página diferente.
- Conferir no ar depois de cada merge e verificar fatos novos contra as fontes antes de recomendar o merge.
- Chaves e senhas nunca no chat; o editor cadastra (Firecrawl, Gemini, variáveis de ambiente).
