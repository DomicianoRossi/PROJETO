# Esquema de `conteudo/publicado/ferramentas/<id>.json`

Validado por `scripts/build_dados.py` (`valida_ferramenta`). Item inválido derruba o build.

| campo | tipo | regra |
|---|---|---|
| `id` | str | kebab-case sem acento, igual ao nome do arquivo |
| `publicado_em` | str | ISO 8601 com fuso, ex. `2026-10-06T08:00:00-03:00` |
| `consultadoEm` | str | mês e ano da consulta às fontes, ex. `out/2026` |
| `tipo` | str | `COMPARATIVO` ou `AVALIAÇÃO` |
| `categoria` | str | `PLATAFORMAS DE AGENTES`, `CONECTORES ERP`, `LEITURA DE DOCUMENTOS`, `WHATSAPP`, `PLANILHAS`, `ATENDIMENTO` ou `AUTOMAÇÃO` |
| `titulo` | str | até ~90 caracteres, diz o recorte |
| `linhaFina` | str | uma ou duas frases sob o título |
| `linha` | str | uma frase para card e listagem |
| `leitura` | int | minutos de leitura |
| `abertura` | str | 1 parágrafo: o problema do leitor |
| `metodo` | str | 1 parágrafo: o que foi lido, por que estas ferramentas, o que não foi feito. Não pode conter "testamos", "testado", "instalamos", "bancada" |
| `ferramentas` | lista 1–6 | `{nome, fornecedor, tipo, preco, resumo, texto}`. `preco` igual à fonte; `resumo` até ~100 caracteres (linha "Em resumo" da tabela); `texto` 1 parágrafo |
| `criterios` | lista de 6 | exatamente nesta ordem: Autenticação, Log por ação, Conector, Humano no fluxo, Dados, Custo por tarefa. Cada um `{criterio, pergunta, celulas}`; `celulas` tem uma por ferramenta, na ordem de `ferramentas` |
| célula | obj | `{marca, nota, fonte}`. `marca` = `documentado`, `ressalva` ou `nao-documentado`. `fonte` = número 1-based em `fontes`; em `nao-documentado` vai `null` |
| `conclusao1`, `conclusao2` | str | "o que isso significa para quem vai comprar" |
| `ficha` | lista 2–10 | `{rotulo, valor}`, ex. Ferramentas, Categoria, Documentação consultada, Fontes, Método |
| `fontes` | lista 1–30 | `{titulo, origem, url}`, url https |
| `correcoes` | lista (opcional) | `{data, texto}`, acrescentadas depois da publicação |

A listagem usa o critério **Conector** como placar de cada card.

Perguntas sugeridas para `pergunta` (podem ser ajustadas ao recorte):
- Autenticação: usa o usuário e a permissão do sistema da empresa (SSO, perfis)?
- Log por ação: registra o que o agente consultou e o que fez, e por quanto tempo?
- Conector: liga ao ERP, CRM ou WhatsApp sem código, com conector mantido pelo fornecedor?
- Humano no fluxo: escala exceção para uma pessoa, com motivo, antes de agir?
- Dados: onde ficam, o que vai para o modelo, se é usado para treino, há DPA ou cláusula LGPD?
- Custo por tarefa: preço público e previsível com o volume?
