# Benchmarking — Gestão de Documentação em Dev Portals

> Objetivo: embasar a defesa técnica junto ao cliente TIM sobre as funcionalidades de gerenciamento de documentação (estrutura de pastas, histórico de versões e self-service) disponíveis no mercado.

---

## 1. Kong Developer Portal (Konnect v3)

**Modelo de gestão:** Híbrido — admin configura permissões e RBAC; produtores de API publicam via Portal Editor.

**Estrutura de pastas:** Sim. O Portal Editor oferece árvore de páginas hierárquica com slugs aninhados, controle de visibilidade (draft/published) e organização por seções.

**Histórico de versões internas:** Audit log por portal. Não há changelog editorial por página — mudanças não ficam versionadas lado a lado dentro da mesma versão de API.

**Links para referência:**
- Visão geral do Portal: https://developer.konghq.com/dev-portal/
- Deep dive no Portal Editor: https://konghq.com/blog/product-releases/new-dev-portal-deep-dive

---

## 2. Apigee Developer Portal (Google Cloud)

**Modelo de gestão:** Admin central. O gerenciamento de páginas é feito na interface administrativa em *Publish > Portals*, restrito a usuários com permissão de admin — sem self-service para o cliente.

**Estrutura de pastas:** Limitada. Há organização de specs OpenAPI em pastas, mas as páginas editoriais ficam em lista plana — sem hierarquia nativa de pastas.

**Histórico de versões internas:** Não documentado. A interface exibe "last modified" mas não há histórico ou changelog de revisões.

**Links para referência:**
- Intro ao portal: https://docs.cloud.google.com/apigee/docs/api-platform/publish/intro-portals
- Gerenciamento de páginas: https://docs.apigee.com/api-platform/publish/portal/portal-pages

---

## 3. AWS API Gateway Developer Portal

**Modelo de gestão:** Admin central (projeto open-source auto-hospedado). Admins controlam visibilidade das APIs via Admin Panel. Usuários finais acessam para subscrição e uso — sem edição de conteúdo.

**Estrutura de pastas:** Limitada. A documentação é associada a stages e versões de API via Documentation Parts — não há árvore editorial livre.

**Histórico de versões internas:** Parcial. Permite versionar snapshots de documentação associados a stages (ex.: v1, v2), mas sem changelog editorial por página.

**Links para referência:**
- Documentação da API: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-documenting-api.html
- Repositório do Developer Portal: https://github.com/awslabs/aws-api-gateway-developer-portal

---

## 4. Stoplight

**Modelo de gestão:** Híbrido — equipes publicam em self-service via projetos Git (docs-as-code). Admins de workspace controlam permissões e publicação.

**Estrutura de pastas:** Sim. A estrutura de arquivos Git define a hierarquia de navegação do portal.

**Histórico de versões internas:** Sim — o mais próximo do mercado. A funcionalidade "View Changelogs" exibe lista datada de mudanças por asset dentro do projeto, rastreando alterações em specs OpenAPI.

> Observação: o rastreamento é de diffs de specs técnicas, não de conteúdo editorial livre.

**Links para referência:**
- View Changelogs: https://docs.stoplight.io/docs/platform/2f60223ecf6e4-view-changelogs

---

## 5. ReadMe

**Modelo de gestão:** Self-service completo. O dono do projeto e colaboradores convidados gerenciam categorias, páginas e versões diretamente na interface — sem necessidade de admin técnico separado.

**Estrutura de pastas:** Sim. Hierarquia de Categorias → Páginas → Seções. A sidebar é construída a partir dessas categorias.

**Histórico de versões internas:** Changelog existe como seção dedicada (persiste entre versões), mas não há histórico de revisões linha a linha de uma mesma página.

**Links para referência:**
- Versionamento: https://docs.readme.com/main/docs/versions
- Estrutura de docs: https://docs.readme.com/main/docs/structuring-your-docs

---

## 6. SwaggerHub Portal (SmartBear)

**Modelo de gestão:** Híbrido — o "Provider" (dono da API) gerencia conteúdo em self-service via Provider View; admins de organização controlam permissões e publicação.

**Estrutura de pastas:** Sim. Suporta páginas aninhadas (nested pages and APIs), construindo hierarquia de produtos e conteúdo editorial.

**Histórico de versões internas:** Parcial. O editor registra mudanças e exibe o que mudou desde a última publicação no modal de publicação, mas não persiste como log auditável permanente.

> Nota: em 2025 o produto foi renomeado — SwaggerHub virou Swagger Studio; o portal é o Swagger Portal (produto separado).

**Links para referência:**
- Visão geral do portal: https://support.smartbear.com/swaggerhub-portal/docs/en/overview.html
- Provider View: https://support.smartbear.com/swaggerhub-portal/docs/en/provider-view.html

---

## 7. Backstage (TechDocs — Spotify)

**Modelo de gestão:** Self-service por equipe via docs-as-code. Cada time escreve e publica sua própria documentação em Markdown dentro do repositório Git — sem depender de admin central.

**Estrutura de pastas:** Sim. A estrutura é definida pelo `mkdocs.yml` de cada repositório, com suporte a monorepo e navegação hierárquica configurável.

**Histórico de versões internas:** Não nativo. O histórico fica integralmente no Git (git log/blame) — não há UI de histórico dentro do portal para leitores.

**Links para referência:**
- TechDocs overview: https://backstage.io/docs/features/techdocs/
- Criação e publicação: https://backstage.io/docs/features/techdocs/creating-and-publishing/

---

## 8. Tyk Enterprise Developer Portal

**Modelo de gestão:** Híbrido — existe o papel de **Content Manager** (gerencia páginas via CMS interno) separado do Admin (configura APIs e organizações). Desenvolvedor/parceiro acessa em self-service apenas para subscrição.

**Estrutura de pastas:** Sim. Estrutura baseada em templates e content blocks via CMS interno; múltiplos catálogos e organizações criam hierarquia de acesso ao conteúdo.

**Histórico de versões internas:** Não documentado. Há release notes da plataforma, mas sem evidência de changelog editorial por página.

**Links para referência:**
- Enterprise Portal: https://tyk.io/docs/tyk-developer-portal/tyk-enterprise-developer-portal/
- Workflow do Content Manager: https://tyk.io/docs/tyk-stack/tyk-developer-portal/enterprise-developer-portal/customise-enterprise-portal/full-customisation/content-manager-workflow/

---

## Resumo Executivo

| Plataforma | Quem gerencia | Estrutura de pastas | Histórico interno |
|---|---|---|---|
| Kong (Konnect v3) | Híbrido | Sim | Não por página |
| Apigee (Google) | Admin central | Limitada | Não |
| AWS API Gateway | Admin central | Limitada | Parcial (por stage) |
| Stoplight | Híbrido (Git) | Sim | Sim (diffs de specs) |
| ReadMe | Self-service | Sim | Não por página |
| SwaggerHub | Híbrido | Sim | Parcial |
| Backstage | Self-service (Git) | Sim | Não (só via Git) |
| Tyk Enterprise | Híbrido | Sim | Não documentado |

### Conclusão para defesa ao cliente

**Sobre histórico editorial:** Nenhuma plataforma do mercado oferece histórico completo e auditável de alterações dentro da mesma versão de API por página editorial. O Stoplight é o caso mais próximo, rastreando diffs de specs técnicas — não conteúdo textual livre.

**Sobre self-service de gerenciamento:** O modelo padrão do mercado é híbrido — um admin ou equipe técnica central controla publicação, enquanto o consumidor acessa o conteúdo. Self-service editorial completo para o cliente final não é prática estabelecida no segmento.

**Implicação direta:** As funcionalidades que o cliente TIM utiliza no TIM Mine (gerenciamento próprio, histórico editorial, estrutura de wiki) são diferenciais específicos daquela ferramenta — não são padrão de mercado em Dev Portals voltados para exposição de APIs.
