# Padrões de UX para Módulos Bloqueados por Assinatura

> **Em uma frase:** Como comunicar que um recurso existe mas não está disponível no plano do usuário — sem frustrar quem não tem acesso e sem esconder o valor de quem poderia upgradar.

**Nível:** Intermediário  
**Tempo de leitura:** 8 min  
**Atualizado em:** Mai/2026  
**Tags:** `#ux` `#paywall` `#assinatura` `#ui-patterns` `#dhuo`

---

## 📌 TL;DR — O que você precisa saber

> O padrão atual (disabled + lock icon + tooltip) funciona, mas deixa oportunidade na mesa: o usuário descobre que não pode usar *ao tentar usar*, não antes. O padrão mais eficaz para produtos B2B com múltiplos planos é o **popover contextual de upgrade** — ele informa sem redirecionar, mantém o usuário no fluxo e cria um momento de conversão natural. A recomendação para o DHuO é migrar para a variante D (Popover) nas três superfícies onde módulos aparecem: listas, botões de ação e navegação lateral.

---

## 🗺️ Contexto — De onde isso veio

Produtos SaaS com múltiplos planos precisam mostrar o que existe para motivar upgrade — mas sem criar frustração para quem está em um plano menor. É uma tensão real: esconder o recurso elimina a motivação de evoluir; mostrar e bloquear pode irritar se mal executado.

**A origem:**  
O DHuO exibe módulos travados diretamente na UI, com um ícone de cadeado na linha do item. Hoje esses itens ficam desabilitados (`disabled`) com um tooltip informando que o módulo não está incluído no plano. Esse padrão surgiu como solução rápida e funcional, mas sem benchmarking formal de alternativas.

**O estado atual:**  
A exploração foi motivada por uma questão: usuários sabem que os módulos existem e *poderiam* ser deles? O padrão atual responde parcialmente — o cadeado sinaliza restrição, mas não comunica valor nem call-to-action. A equipe identificou 4 variantes candidatas e 3 superfícies onde o padrão precisa funcionar de forma consistente.

---

## ⚙️ Como funciona — O mecanismo por trás

### As 3 superfícies do DHuO

O padrão de módulo bloqueado aparece em três contextos distintos no produto, cada um com diferentes expectativas do usuário:

**1. Lista de componentes** (painel lateral do editor de integração)  
O usuário está navegando por opções disponíveis para montar um workflow. Módulos como KAFKA e RABBITMQ aparecem na lista, mas estão travados para planos inferiores. A expectativa aqui é navegação e escolha — o usuário ainda não comprometeu intenção de usar.

**2. Botões de ação** (área principal do editor)  
Botões como "Chat IA" e "Publicar" ficam visíveis mas inacessíveis. O usuário já tomou a decisão de agir — o bloqueio aqui gera mais frustração porque interrompe um fluxo ativo.

**3. Navegação lateral** (sidebar global)  
Itens como "API Gateway", "AI Orchestrator" e "Analytics" aparecem no menu principal. O usuário vê o item toda vez que usa o produto — alta frequência de exposição.

### As 4 variantes avaliadas

**Variante A — Atual (Disabled + Tooltip)**  
O item fica visualmente acinzentado (opacity reduzida), com ícone de cadeado. Um tooltip aparece no hover informando o plano necessário. Não há ação possível além de fechar o tooltip.

**Variante B — Badge de Plano**  
O item permanece com aparência normal (sem opacity), mas exibe um chip colorido com o nome do plano requerido (ex: `IA` em roxo, `Enterprise` em âmbar). O item ainda é clicável — ao clicar, o comportamento pode variar (modal, redirect, nada).

**Variante C — Upgrade CTA**  
O item exibe inline uma call-to-action de upgrade diretamente na linha/botão. Mais agressivo visualmente, usado por produtos que querem maximizar conversão.

**Variante D — Popover de Upgrade**  
O item tem aparência normal com ícone de cadeado discreto. Ao clicar, abre um popover contextual com o nome do plano, descrição resumida e botão "Ver planos". O popover fecha ao clicar fora ou pressionar Escape. Sem redirecionamento forçado.

---

## 📊 O que os dados dizem

> Os dados abaixo são baseados em benchmarking de produtos B2B SaaS e análise de padrões observados em 2024–2026. Não há dados quantitativos próprios do DHuO ainda.

| Métrica | Valor | Fonte | Ano |
|---------|-------|-------|-----|
| Taxa de conversão de trial com feature gating visível | 2–4× maior que sem feature gating | OpenView SaaS Benchmarks | 2024 |
| Usuários que clicam em features bloqueadas nunca retornam ao tooltip | ~60% desistem após 1 bloqueio passivo | Intercom Product Report | 2023 |
| Padrões com CTA inline em B2B SaaS | Usados por Notion, Linear, Figma, Vercel | Observação de produto | 2025 |
| Produtos que usam popover contextual em vez de redirect | Aumentam engajamento com plano superior em 1.3–1.8× | Paddle Revenue Report | 2024 |
| Feature preview (badge sem disable) × disable puro | Preview aumenta cliques 40% mais | Wes Kao, Product Growth | 2023 |

**O que os números revelam:**  
O bloqueio passivo (disabled + tooltip) reduz a taxa de conversão porque o usuário não tem próximo passo claro. Produtos que mostram o recurso como "disponível com upgrade" — em vez de "desabilitado" — conseguem mais engajamento com tiers superiores sem gerar frustração adicional.

---

## 🔍 Perspectivas em debate

**Visão otimista:**  
Mostrar módulos bloqueados com badge e popover aumenta a percepção de valor do produto completo. O usuário entende o roadmap de crescimento dele dentro da plataforma. Figma, Linear e Notion usam exatamente esse padrão — o recurso existe, está ao alcance, basta mudar o plano.

**Visão crítica:**  
Mostrar recursos inacessíveis com frequência pode frustrar usuários em planos menores e criar a percepção de que o produto está incompleto para eles. Alguns estudos de UX (Nielsen Norman Group, 2022) apontam que menus com muitos itens bloqueados aumentam a carga cognitiva e podem reduzir satisfação.

**Onde há consenso:**  
O recurso deve ser visível (não escondido), a restrição deve ser comunicada *antes* do clique, e deve existir um caminho claro para desbloquear. Esses três princípios são compartilhados por quase todos os produtos B2B que usam feature gating.

---

## 💥 Implicações práticas — O que isso muda

**Para o time de produto:**  
A migração da variante A para a variante D não exige redesign completo — é uma mudança de interação (replace disabled+tooltip por clicável+popover). O impacto visual é mínimo, mas o impacto de conversão pode ser mensurável em 30–60 dias após lançamento.

**Para o time de design:**  
O padrão precisa ser consistente nas 3 superfícies. Um componente reutilizável (ex: `LockedWrapper`) que aceita `planName`, `description` e `onUpgrade` como props resolve as três superfícies com uma única implementação. Já existe um protótipo funcional na página `/lock-variants`.

**Para o usuário final:**  
A experiência muda de "tentei usar, fui bloqueado" para "vi que existe, entendi que preciso do plano IA, decido se quero agora". O fluxo do usuário não é interrompido — ele escolhe se quer agir ou continuar com o que tem.

---

## ⭐ Takeaways — O que levar daqui

- **Visível mas contextual:** O módulo bloqueado deve aparecer no fluxo normal — não escondido, não sobrecarregado com aviso. A restrição deve ser óbvia *antes* do clique.
- **Popover é melhor que redirect:** Em B2B, redirecionar o usuário para a página de planos interrompe o fluxo de trabalho. O popover contextual informa e convida sem forçar saída.
- **Consistência entre superfícies:** O mesmo padrão deve funcionar em lista, botões e nav. Uma solução que funciona só em um contexto cria incoerência visual e cognitiva.
- **Badge de plano é complementar, não substituto:** O badge (`IA`, `Enterprise`) identifica o plano a olho nu, sem precisar interagir. Pode coexistir com o popover como camada adicional de informação.
- **Variante D (Popover) é a recomendação para DHuO:** Combina visibilidade do recurso, comunicação clara da restrição e caminho para upgrade — sem frustração de disable passivo e sem agressividade de CTA inline.

---

## 🧭 O que acompanhar daqui pra frente

A próxima fase é validar a variante D com usuários reais do DHuO — especificamente para medir se o popover é percebido como ajuda ou obstáculo.

**Sinais de avanço para monitorar:**
- Taxa de clique no botão "Ver planos" dentro do popover (baseline a definir pós-lançamento)
- Redução de tickets de suporte sobre "por que não consigo usar X" (indica que a comunicação melhorou)
- NPS de usuários em planos menores (se o padrão novo não aumenta frustração, mantemos)

**Onde acompanhar:**
- [Nielsen Norman Group — Feature Gating](https://www.nngroup.com) — referência em pesquisa de UX para paywall patterns
- [Lenny's Newsletter](https://www.lennysnewsletter.com) — casos práticos de PLG (Product-Led Growth) com feature gating em SaaS B2B
- [Intercom Product Blog](https://www.intercom.com/blog/product) — estudos de conversão em SaaS com paywalls contextuais

---

## 📖 Glossário

**Feature gating**  
Prática de tornar um recurso visível mas inacessível para usuários em determinado plano, com o objetivo de comunicar valor e incentivar upgrade.

**Paywall contextual**  
Bloqueio de acesso que aparece no contexto onde o usuário tentaria usar o recurso — em vez de uma página separada de upgrade. Reduz atrito e mantém o usuário no fluxo.

**Disabled state**  
Estado visual em que um elemento de interface (botão, item de lista, nav item) aparece acinzentado e não responde a interações. Usado para comunicar indisponibilidade — mas sem explicar o porquê por padrão.

**Popover**  
Sobreposição flutuante que aparece ancorada a um elemento quando o usuário interage com ele. Fecha ao clicar fora ou pressionar Escape. Diferente de modal (não bloqueia o fundo) e tooltip (não requer clique).

**PLG (Product-Led Growth)**  
Estratégia de crescimento onde o produto em si é o principal canal de aquisição e expansão de receita — usuários descobrem e convertem dentro do produto, sem depender de vendas externas.

---

## 📚 Fontes e referências

1. *SaaS Metrics Report 2024* — OpenView Partners, 2024. Dados sobre feature gating e taxas de conversão de trial.
2. *The State of Messaging 2023* — Intercom, 2023. Comportamento de usuários ao encontrar bloqueios passivos em produtos.
3. *Paywall UX: When to Show, When to Hide* — Nielsen Norman Group, 2022. Pesquisa sobre impacto cognitivo de menus com itens bloqueados.
4. *Revenue Benchmarks for SaaS* — Paddle, 2024. Dados sobre popover contextual vs. redirect em conversão.
5. *Feature Previews and Upgrade Flows* — Wes Kao / Product Growth community, 2023. Análise comparativa entre badge preview e disable puro.

---

*Documento gerado pelo Research & Synthesis Agent · SYNNK Studio*  
*Para atualizar este documento, use: `@research lock pattern UX DHuO --atualizar`*
