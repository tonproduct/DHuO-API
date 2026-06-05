export default function BenchDevPortalsPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden" style={{ fontFamily: "Noto Sans, sans-serif" }}>

      {/* Hero */}
      <div style={{ backgroundColor: "#7c22c0" }} className="px-10 py-12">
        <div className="max-w-4xl mx-auto">
          <span className="text-[11px] font-semibold text-white/50 uppercase tracking-widest">
            Benchmarking · Dev Portal
          </span>
          <h1 className="text-3xl font-bold text-white mt-2 mb-3">Gestão de Documentação em Dev Portals</h1>
          <p className="text-[15px] text-white/70 max-w-2xl leading-relaxed">
            Análise comparativa de como os principais Dev Portals do mercado implementam fluxos de publicação,
            árvore de navegação e histórico de versões — para embasar a defesa técnica junto ao cliente.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-10 pt-12 flex flex-col gap-14">

        {/* Contexto */}
        <section>
          <H2>Contexto</H2>
          <P>
            O cliente utiliza o <Strong>TIM Mine</Strong> — uma ferramenta interna com funcionalidades avançadas
            de wiki: árvore de navegação, histórico de alterações dentro da mesma versão e acompanhamento com notificações.
            Com a migração para o <Strong>Dev Portal (DHuO)</Strong>, o cliente percebeu que não possui essas funcionalidades
            e questiona por que não estão disponíveis.
          </P>
          <P>
            O objetivo desta pesquisa é verificar se essas funcionalidades são padrão de mercado — ou um diferencial
            específico do TIM Mine — para embasar uma resposta fundamentada ao cliente.
          </P>
        </section>

        <Divider />

        {/* Critérios avaliados */}
        <section>
          <H2>Critérios Avaliados</H2>
          <P>Para cada plataforma, foram analisados três pontos:</P>
          <div className="flex flex-col gap-4 mt-5">
            <Criterion
              number="1"
              title="Quem gerencia as documentações?"
              description="É self-service (o próprio cliente/parceiro publica) ou é operado por um admin/eng. central?"
            />
            <Criterion
              number="2"
              title="Existe árvore de navegação?"
              description="Há hierarquia de categorias e tópicos formando uma árvore de navegação para organização do conteúdo?"
            />
            <Criterion
              number="3"
              title="Existe histórico interno de versões?"
              description="É possível rastrear alterações dentro da mesma versão de API — sem precisar criar uma nova versão?"
            />
          </div>
        </section>

        <Divider />

      </div>

      {/* Tabela resumo — container próprio mais largo */}
      <div className="max-w-6xl mx-auto px-10 pb-14">
        <section>
          <H2>Visão Geral</H2>
          <div className="mt-5 rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Plataforma</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Quem gerencia</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Árvore de navegação</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Histórico interno</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Kong (Konnect v3)", manager: "Híbrido", managerDesc: "Admin controla permissões, mas o produtor publica dentro do que foi liberado.", folders: true, historyNote: "Audit log por portal", historyDesc: "Registra quem fez o quê, mas não compara conteúdo." },
                  { name: "Apigee (Google)", manager: "Admin central", managerDesc: "Só a equipe técnica interna publica. O cliente não tem acesso.", folders: false, historyNote: "Não documentado", historyDesc: "Sem evidência na documentação oficial da plataforma." },
                  { name: "AWS API Gateway", manager: "Admin central", managerDesc: "Só a equipe técnica interna publica. O cliente não tem acesso.", folders: false, historyNote: "Parcial (por stage)", historyDesc: "Só rastreia quando muda de versão, não dentro da mesma versão." },
                  { name: "Stoplight", manager: "Híbrido (Git)", managerDesc: "Admin controla permissões; times publicam via repositório Git.", folders: true, historyNote: "Diffs de specs", historyDesc: "Compara mudanças técnicas no OpenAPI, não no texto editorial." },
                  { name: "ReadMe", manager: "Self-service", managerDesc: "O próprio cliente publica e edita sem depender de ninguém.", folders: true, historyNote: "Não por página", historyDesc: "Tem changelog geral, mas não por página individual." },
                  { name: "SwaggerHub", manager: "Híbrido", managerDesc: "Admin controla permissões, mas o produtor publica dentro do que foi liberado.", folders: true, historyNote: "Parcial, não auditável", historyDesc: "Registra no editor mas não salva como histórico permanente." },
                  { name: "Backstage", manager: "Self-service (Git)", managerDesc: "Cada time publica via repositório Git sem depender de admin central.", folders: true, historyNote: "Só via Git", historyDesc: "O histórico existe, mas só quem acessa o repositório consegue ver." },
                  { name: "Tyk Enterprise", manager: "Híbrido", managerDesc: "Papel de Content Manager separado do Admin — gerencia via CMS interno.", folders: true, historyNote: "Não documentado", historyDesc: "Sem evidência na documentação oficial da plataforma." },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-gray-100 last:border-0">
                    <td className="px-4 py-3 font-semibold text-gray-800">{row.name}</td>
                    <td className="px-4 py-3">
                      <p className="text-gray-600">{row.manager}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5 leading-snug">{row.managerDesc}</p>
                    </td>
                    <td className="px-4 py-3">
                      <Badge value={row.folders} />
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-gray-600">{row.historyNote}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5 leading-snug">{row.historyDesc}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </section>
      </div>

      <div className="max-w-4xl mx-auto px-10 pb-12 flex flex-col gap-14">

        <Divider />

        {/* Plataformas detalhadas */}
        <section>
          <H2>Análise por Plataforma</H2>

          {/* Kong */}
          <PlatformCard
            name="Kong Developer Portal"
            subtitle="Konnect v3"
            manager="Híbrido"
            folders={true}
            history={false}
            links={[
              { label: "Visão geral do portal", url: "https://developer.konghq.com/dev-portal/" },
              { label: "Deep dive no Portal Editor", url: "https://konghq.com/blog/product-releases/new-dev-portal-deep-dive" },
            ]}
          >
            O Portal Editor oferece uma árvore de páginas hierárquica com slugs aninhados e controle de visibilidade
            (draft/published). Admins configuram RBAC por time; produtores de API publicam via editor visual.
            Possui audit log por portal, mas <strong>não há changelog editorial por página</strong> — mudanças não ficam
            versionadas lado a lado dentro da mesma versão de API.
          </PlatformCard>

          {/* Apigee */}
          <PlatformCard
            name="Apigee Developer Portal"
            subtitle="Google Cloud"
            manager="Admin central"
            folders={false}
            history={false}
            links={[
              { label: "Intro ao portal", url: "https://docs.cloud.google.com/apigee/docs/api-platform/publish/intro-portals" },
              { label: "Gerenciamento de páginas", url: "https://docs.apigee.com/api-platform/publish/portal/portal-pages" },
            ]}
          >
            O gerenciamento de páginas é feito exclusivamente na interface administrativa (<em>Publish &gt; Portals</em>),
            restrito a usuários com permissão de admin. As páginas editoriais ficam em lista plana —
            <strong> sem hierarquia nativa de pastas</strong>. A interface exibe &quot;last modified&quot; mas
            não há histórico ou changelog de revisões.
          </PlatformCard>

          {/* AWS */}
          <PlatformCard
            name="AWS API Gateway Developer Portal"
            subtitle="Open-source, auto-hospedado"
            manager="Admin central"
            folders={false}
            history="partial"
            links={[
              { label: "Documentação da API", url: "https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-documenting-api.html" },
              { label: "Repositório no GitHub", url: "https://github.com/awslabs/aws-api-gateway-developer-portal" },
            ]}
          >
            Admins controlam visibilidade das APIs via Admin Panel; usuários finais acessam para subscrição e uso —
            sem edição de conteúdo. A documentação é associada a stages e versões de API via Documentation Parts,
            sem árvore editorial livre. Permite versionar snapshots de documentação por stage (v1, v2),
            mas <strong>sem changelog editorial por página</strong>.
          </PlatformCard>

          {/* Stoplight */}
          <PlatformCard
            name="Stoplight"
            subtitle="Docs-as-code"
            manager="Híbrido (Git)"
            folders={true}
            history="partial"
            links={[
              { label: "View Changelogs", url: "https://docs.stoplight.io/docs/platform/2f60223ecf6e4-view-changelogs" },
            ]}
          >
            O mais próximo do mercado em termos de histórico. A funcionalidade <em>View Changelogs</em> exibe lista datada
            de mudanças por asset — rastreando diffs de specs OpenAPI. A estrutura de arquivos Git define a hierarquia
            de navegação. Porém, o rastreamento é de <strong>diffs técnicos de specs</strong>, não de conteúdo
            editorial livre como texto ou descrições de API.
          </PlatformCard>

          {/* ReadMe */}
          <PlatformCard
            name="ReadMe"
            subtitle="Self-service completo"
            manager="Self-service"
            folders={true}
            history={false}
            links={[
              { label: "Versionamento", url: "https://docs.readme.com/main/docs/versions" },
              { label: "Estrutura de docs", url: "https://docs.readme.com/main/docs/structuring-your-docs" },
            ]}
          >
            O modelo mais self-service entre os avaliados — dono e colaboradores gerenciam tudo diretamente na interface.
            Hierarquia de Categorias → Páginas → Seções bem definida. Possui um changelog como seção dedicada,
            mas <strong>não há histórico de revisões linha a linha de uma mesma página</strong>.
          </PlatformCard>

          {/* SwaggerHub */}
          <PlatformCard
            name="SwaggerHub Portal"
            subtitle="SmartBear — renomeado para Swagger Portal em 2025"
            manager="Híbrido"
            folders={true}
            history="partial"
            links={[
              { label: "Visão geral", url: "https://support.smartbear.com/swaggerhub-portal/docs/en/overview.html" },
              { label: "Provider View", url: "https://support.smartbear.com/swaggerhub-portal/docs/en/provider-view.html" },
            ]}
          >
            Suporta páginas aninhadas com hierarquia de produtos. O editor registra mudanças e exibe o que mudou
            desde a última publicação no modal de publicação — mas <strong>não persiste como log auditável permanente</strong>.
            Provider gerencia conteúdo em self-service; admin controla permissões e publicação.
          </PlatformCard>

          {/* Backstage */}
          <PlatformCard
            name="Backstage (TechDocs)"
            subtitle="Spotify · Open-source CNCF"
            manager="Self-service por time (Git)"
            folders={true}
            history={false}
            links={[
              { label: "TechDocs overview", url: "https://backstage.io/docs/features/techdocs/" },
              { label: "Criação e publicação", url: "https://backstage.io/docs/features/techdocs/creating-and-publishing/" },
            ]}
          >
            Modelo docs-as-code puro: cada time escreve sua documentação em Markdown no próprio repositório Git.
            A estrutura é definida pelo <code className="bg-gray-100 px-1.5 py-0.5 rounded text-[11px]">mkdocs.yml</code> de cada repo.
            O histórico fica integralmente no Git — <strong>não há UI de histórico dentro do portal para leitores</strong>.
            Requer engenharia para deploy e manutenção.
          </PlatformCard>

          {/* Tyk */}
          <PlatformCard
            name="Tyk Enterprise Developer Portal"
            subtitle="Enterprise Portal"
            manager="Híbrido (Content Manager)"
            folders={true}
            history={false}
            links={[
              { label: "Enterprise Portal", url: "https://tyk.io/docs/tyk-developer-portal/tyk-enterprise-developer-portal/" },
              { label: "Workflow do Content Manager", url: "https://tyk.io/docs/tyk-stack/tyk-developer-portal/enterprise-developer-portal/customise-enterprise-portal/full-customisation/content-manager-workflow/" },
            ]}
          >
            Papel de <Strong>Content Manager</Strong> separado do Admin — gerencia páginas via CMS interno com templates
            e content blocks. Múltiplos catálogos e organizações criam hierarquia de acesso ao conteúdo.
            <strong> Sem evidência de changelog editorial por página</strong> na documentação oficial.
          </PlatformCard>
        </section>

        <Divider />

        {/* Sugestões de ação */}
        <section>
          <H2>Sugestões de Ação</H2>
          <P>Encaminhamentos definidos na reunião de alinhamento com base nos gaps identificados.</P>
          <div className="flex flex-col gap-3 mt-5">
            {[
              {
                title: "Defesa da solução ao cliente",
                description: "Elaborar justificativa clara explicando por que as funcionalidades do TIM Mine não serão replicadas no Dev Portal, apresentando alternativas viáveis e embasamento de mercado.",
                owners: ["Eder", "Thiago"],
              },
              {
                title: "Validação de perfil restrito no Manager",
                description: "Avaliar a viabilidade de criar uma permissão específica de 'admin Dev Portal' no Manager, permitindo que usuários da TIM gerenciem apenas o Dev Portal sem acesso irrestrito ao sistema.",
                owners: ["Fernanda", "Thiago"],
              },
              {
                title: "Esclarecimento sobre processo de alteração de docs",
                description: "Confirmar com Jeremias quem realiza as alterações nas documentações, como é feito o controle de versões e por que não se utiliza o PEF para atualizações.",
                owners: ["Thiago"],
              },
              {
                title: "Confirmação do canal de notificações",
                description: "Verificar se as notificações de alteração de documentação são enviadas apenas por e-mail ou se há outros canais no sistema atual do TIM Mine.",
                owners: ["Thiago"],
              },
              {
                title: "Análise de implementação de favoritos",
                description: "Avaliar a viabilidade de implementar a funcionalidade de favoritar/acompanhar documentações no Dev Portal, incluindo disparo de e-mails quando houver alterações.",
                owners: ["Luiz", "Thiago"],
              },
            ].map((item, i) => (
              <div key={i} className="rounded-xl border border-gray-200 px-5 py-4">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-[14px] font-semibold text-gray-900">{item.title}</p>
                  <div className="flex gap-1.5 shrink-0">
                    {item.owners.map((owner) => (
                      <span key={owner} className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-purple-50 text-purple-600 border border-purple-200">
                        {owner}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-[13px] text-gray-500 mt-2 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* Conclusão */}
        <section>
          <H2>Conclusão</H2>

          <div className="flex flex-col gap-4 mt-5">
            <Note>
              <strong>Histórico editorial:</strong> Nenhuma plataforma avaliada oferece histórico completo e auditável
              de alterações dentro da mesma versão de API por página editorial. O Stoplight é o caso mais próximo,
              rastreando diffs de specs técnicas — não conteúdo textual livre.
            </Note>

            <Note>
              <strong>Self-service de gerenciamento:</strong> O modelo padrão do mercado é híbrido — um admin ou equipe
              técnica central controla publicação, o consumidor acessa o conteúdo. Self-service editorial completo
              para o cliente final não é prática estabelecida no segmento de Dev Portals para APIs.
            </Note>

            <Note>
              <strong>Implicação direta:</strong> As funcionalidades que o cliente utiliza no TIM Mine (gerenciamento
              próprio, histórico editorial, estrutura de wiki) são diferenciais específicos daquela ferramenta —
              não são padrão de mercado em Dev Portals voltados para exposição de APIs.
            </Note>
          </div>
        </section>

      </div>
    </div>
  )
}

// ─── Design components ────────────────────────────────────────────────────────

function H2({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <h2 className={`text-[20px] font-bold text-gray-900 ${className}`}>{children}</h2>
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-[14px] text-gray-500 leading-relaxed mt-3">{children}</p>
}

function Strong({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-gray-700">{children}</strong>
}

function Divider() {
  return <div className="border-t border-gray-100" />
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-lg px-4 py-3 text-[13px] leading-relaxed"
      style={{ backgroundColor: "#faf5ff", borderLeft: "3px solid #7c22c0", color: "#6b21a8" }}
    >
      {children}
    </div>
  )
}

function Badge({ value }: { value: boolean | "partial" }) {
  if (value === true)
    return <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-green-50 text-green-600 border border-green-200">Sim</span>
  if (value === "partial")
    return <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-yellow-50 text-yellow-600 border border-yellow-200">Parcial</span>
  return <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-gray-50 text-gray-400 border border-gray-200">Não</span>
}

function Criterion({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="flex gap-4">
      <div
        className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold text-white mt-0.5"
        style={{ backgroundColor: "#7c22c0" }}
      >
        {number}
      </div>
      <div>
        <p className="text-[14px] font-semibold text-gray-800">{title}</p>
        <p className="text-[13px] text-gray-500 mt-0.5 leading-snug">{description}</p>
      </div>
    </div>
  )
}

function PlatformCard({
  name, subtitle, manager, folders, history, links, children,
}: {
  name: string
  subtitle: string
  manager: string
  folders: boolean
  history: boolean | "partial"
  links: { label: string; url: string }[]
  children: React.ReactNode
}) {
  return (
    <div className="mt-8 rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-5 py-4 bg-gray-50 border-b border-gray-200 flex items-start justify-between gap-4">
        <div>
          <p className="text-[15px] font-bold text-gray-900">{name}</p>
          <p className="text-[12px] text-gray-400 mt-0.5">{subtitle}</p>
        </div>
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <div className="flex items-center gap-2 text-[11px] text-gray-500">
            <span>Árvore</span><Badge value={folders} />
          </div>
          <div className="flex items-center gap-2 text-[11px] text-gray-500">
            <span>Histórico</span><Badge value={history} />
          </div>
        </div>
      </div>
      <div className="px-5 py-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[11px] text-gray-400">Gerenciamento:</span>
          <span className="text-[11px] font-semibold text-gray-700">{manager}</span>
        </div>
        <p className="text-[13px] text-gray-600 leading-relaxed">{children}</p>
        <div className="flex flex-wrap gap-3 mt-4">
          {links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-medium underline underline-offset-2"
              style={{ color: "#7c22c0" }}
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
