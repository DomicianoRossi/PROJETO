# AgenticWay — memória do projeto

## Contexto
Marca de Domiciano Rossi. Pivô (set/2026): começar como **mídia especializada** em agentes de IA na operação das empresas; vender **serviço de AI Integration** depois, a partir da audiência.

## Decisões fixadas (DNA v2)
- Frase central: "O que está acontecendo com agentes de IA — e o que isso muda na sua operação."
- Frase de serviço: "Conectamos IA aos processos que sua empresa já utiliza."
- Editorias: Radar · Na Operação · Ferramentas · Análise · Guia
- Público: decisores de empresas médias (primário); gerentes de TI/processos (secundário). Não: devs, curiosos.
- Tom: analítico, direto, com fonte, sem hype. Sem emoji, sem exclamação, anglicismo só quando necessário.
- Serviço: seção "Para empresas" + bloco discreto ao fim das análises (só em Análise; as demais editorias não têm). Sem pop-up.
- Newsletter semanal às sextas. Oferta de entrada: "Diagnóstico de Oportunidades com IA".
- Idioma: português (pt-BR).

## Identidade visual
- Símbolo: infinito contínuo com duas cabeças (humano + agente), traço geométrico, sem 3D. SVG path: `M50,70 C50,42 80,42 100,70 C120,98 150,98 150,70 C150,42 120,42 100,70 C80,98 50,98 50,70 Z` (viewBox 30 0 140 110, stroke 15, cabeças r=11 em (72,16) e (128,16)).
- Wordmark: Montserrat 600, "Agentic" navy + "Way" coral.
- Cores: Navy #0F2A44 · Azul #1F4E79 · Azul claro #4A8FC7 · Coral #E8785A · Coral claro #F08A6E (sobre escuro) · Papel #F7F5F0 · Cinza #5B6572 · Linha #DDD9D0. Regra: um coral por tela.
- Tipografia: Montserrat (títulos), Source Serif 4 (corpo), IBM Plex Mono (datas, editorias, metadados).
- Imagens: padrão completo em `conteudo/padroes/imagens.md` (ler antes de criar qualquer imagem ou página). Resumo: capa tipográfica (`site/aw.css`) na Home e nas listagens; imagem do Gemini só em matéria de Na Operação, cena genérica, com legenda 8px "Imagem ilustrativa gerada por IA (Gemini). Não retrata a empresa do caso."; nunca foto de terceiros.

## Estrutura do repositório (agentic-way/site)
- `site/` — o que vai ao ar. Root Directory na Vercel = `site`. `index.html` redireciona para a Home. `support.js` fica aqui e é usado também pelas pranchas.
- `marca/` — identidade: logos, DNA v1, cores (`marca/*`), arquivos originais enviados (`marca/originais/`) e pranchas internas (`marca/pranchas/`, carregam `../../site/support.js`). Não é publicado.
- `conteudo/` — produção editorial: `publicado/<editoria>/` (JSON do que está no ar), `pesquisas/` (dossiês, copies, carrosséis; PNG e PDF fora do git) e `padroes/` (**`decisoes.md`: todas as decisões e o porquê — ler antes de mudar algo**; `imagens.md`).

## Skills do projeto (fonte: este repositório)
- `.claude/skills/`: `radar`, `na-operacao`, `analise`, `guia` (editorias, usadas pelas rotinas) e `pesquisa-conteudo`, `copy-conteudo`, `design-conteudo` (carrossel e peças avulsas). Versionadas no GitHub; a nuvem (rotinas) e o computador local usam estas cópias.
- As cópias do repositório gravam em `conteudo/pesquisas/` a partir da raiz e chamam os scripts por `.claude/skills/design-conteudo/scripts/`.
- Existem cópias globais antigas em `~/.claude/skills/` (e `.skill` em `C:	emp`) para uso fora deste projeto. Alteração feita aqui não chega lá sozinha.
- Chaves ficam fora do repositório: `FIRECRAWL_API_KEY` e `GEMINI_API_KEY` como variáveis do ambiente "Radar AgenticWay" na nuvem; localmente, login do Firecrawl e `~/api_keys.env`.
- `render.py` precisa de Chrome; na nuvem pode não existir (render de carrossel é tarefa local por enquanto).

## Conteúdo como dados
- Cada item publicado é um JSON em `conteudo/publicado/<editoria>/<id>.json`. Nenhum HTML é editado para publicar.
- `python scripts/build_dados.py` valida tudo (campos, tema, fonte com https, data com fuso) e gera `site/dados/<editoria>.js`, que define `window.AW_DADOS`. Item inválido derruba o build. O `.js` gerado é commitado (a Vercel não roda build).
- As páginas carregam `dados/<editoria>.js` e `aw.js` (datas, endereços, assinatura) antes do `support.js`. Uma página por editoria mostra qualquer item via `?id=`.
- Assinatura do conteúdo gerado: "Apurado e escrito por agentes AgenticWay · editor responsável: Domiciano Rossi" (em `build_dados.py`).
- Aprovação humana = merge do pull request que traz o JSON. Rotinas abrem PR, não publicam direto.
- Migrados e com conteúdo real: Radar, Na Operação, Análise, Guia e a Home (radar, destaque de Na Operação, cards de Análise e Guia). Ainda de demonstração, com faixa: Ferramentas (listagem, artigo e card da Home).

## Decisões e rotinas
- Registro completo em `conteudo/padroes/decisoes.md` (proposta editorial, rotinas, arquitetura, padrões de página, como trabalhar com o editor).
- Rotinas na nuvem (conta Max do app): Radar diário 7h, Na Operação segunda 8h, Guia quarta 8h, Análise quinta 17h. Todas abrem PR; o merge é a aprovação.
- Pendentes em 02/out/2026: editoria Ferramentas (relato documentado) e newsletter de sexta (precisa de serviço de envio; o formulário "Assinar" ainda não guarda e-mails).

## Arquivos
### site/
- `AgenticWay Home.dc.html` — home do site (dados reais; card de Ferramentas ainda de demonstração)
- `AgenticWay Radar Lista.dc.html` — listagem do Radar por dia, com filtro por tema
- `AgenticWay Radar Artigo.dc.html` — página de nota do Radar (`?id=`)
- `AgenticWay Na Operacao Lista.dc.html` — listagem de casos com filtro por setor e processo, destaque e marca "parou"
- `AgenticWay Na Operacao Artigo.dc.html` — caso de Na Operação (números, fluxo, antes/depois, "o que a história não conta")
- `AgenticWay Analise Lista.dc.html` — listagem de análises por tema (réplicas aparecem quando houver)
- `AgenticWay Analise Artigo.dc.html` — opinião assinada (tese em três pontos, "onde posso estar errado", bloco de serviço ao fim)
- `AgenticWay Analise Conta do Agente.dc.html` — redirecionamento para `Analise Artigo?id=agente-funciona-planilha-nao` (endereço antigo que pode ter circulado)
- `AgenticWay Ferramentas Lista.dc.html` — listagem de Ferramentas com placar "integra?" por item e fila de testes votável
- `AgenticWay Ferramentas Artigo.dc.html` — comparativo de Ferramentas (tabela passou/parcial/não, ficha do teste)
- `AgenticWay Guia Lista.dc.html` — biblioteca de guias por assunto, com versão, status e atualizações recentes
- `AgenticWay Guia Artigo.dc.html` — artigo de Guia (itens numerados, resposta boa/ruim, checklist imprimível, histórico de versões)
- `AgenticWay Para Empresas.dc.html` — página de serviço "Para empresas" (conteúdo de exemplo)
- `AgenticWay Sobre.dc.html` — página "Sobre" com critérios editoriais e declaração de conflito de interesse

### marca/pranchas/
- `AgenticWay Marca.dc.html` — prancha de marca (1a–1e)
- `DNA da Marca v2.dc.html` — documento imprimível (usa `doc-page.js`, na mesma pasta)
- `AgenticWay Posts.dc.html` — prancha de templates de post LinkedIn/Instagram (2a–2i, canvas em 50%)
- `AgenticWay Newsletter.dc.html` — template da newsletter semanal (e-mail 600 px + painel de envio)

### Raiz
- `github.md` — repo agentic-way/site (antes DomicianoRossi/PROJETO)

## Próximos passos sugeridos
1. ~~Página de artigo / nota do Radar~~ (feita em 20/set/2026)
2. ~~Página "Para empresas" completa~~ (feita em 20/set/2026)
3. ~~Template de post LinkedIn/Instagram~~ (feito em 20/set/2026)
4. ~~Template da newsletter~~ (feito em 20/set/2026)
5. ~~Listagem do Radar~~ (feita em 20/set/2026)
6. ~~Página "Sobre" e critérios editoriais~~ (feita em 20/set/2026)
7. ~~Templates das editorias Ferramentas e Guia~~ (feitos em 20/set/2026)
8. ~~Página de artigo das editorias Na Operação e Análise~~ (feitas em 20/set/2026)
9. ~~Listagem de Na Operação~~ (feita em 20/set/2026)
10. ~~Listagens de Ferramentas, Análise e Guia~~ (feitas em 20/set/2026)

## Navegação entre páginas
- Links relativos entre os `.dc.html`, com `%20` no lugar dos espaços. Nav e rodapé iguais em todas as páginas: logo → Home; editorias → listagem; itens de listagem → página-modelo; relacionados de artigo → listagem; rodapé → Sobre, Sobre#criterios, Para Empresas#contato. E-mails em `mailto:`. Só "LinkedIn", "Carregar notas anteriores", "Casos anteriores" e "Imprimir" ficam em `#`.
