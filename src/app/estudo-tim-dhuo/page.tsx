"use client"

import { useState } from "react"
import { ChevronRight, ChevronLeft, ExternalLink } from "lucide-react"

const sections = [
  { id: "contexto", label: "Contexto" },
  { id: "atores", label: "Atores e papéis" },
  { id: "gaps", label: "Os 3 gaps" },
  { id: "bloqueio", label: "Bloqueio de acesso" },
  { id: "benchmark", label: "Benchmark de mercado" },
  { id: "propostas", label: "Propostas de solução" },
  { id: "proximos", label: "Próximos passos" },
]

export default function EstudoTimDhuoPage() {
  const [collapsed, setCollapsed] = useState(false)
  const [active, setActive] = useState("contexto")

  function scrollTo(id: string) {
    setActive(id)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="min-h-screen bg-white flex" style={{ fontFamily: "Noto Sans, sans-serif" }}>

      {/* Sidebar */}
      <div className={`shrink-0 border-r border-gray-200 flex flex-col transition-all duration-200 ${collapsed ? "w-12" : "w-56"}`}>
        <div className="flex items-center justify-between px-3 py-4 border-b border-gray-100">
          {!collapsed && <span className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">Estudo</span>}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto p-1 rounded-md text-gray-400 hover:bg-gray-100 transition-colors"
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>
        {!collapsed && (
          <nav className="flex flex-col gap-0.5 px-2 py-3">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`text-left px-3 py-2 rounded-lg text-[13px] transition-colors ${
                  active === s.id
                    ? "font-semibold text-purple-700 bg-purple-50"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                {s.label}
              </button>
            ))}
          </nav>
        )}
        {collapsed && (
          <nav className="flex flex-col gap-1 px-1.5 py-3">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                title={s.label}
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold transition-colors ${
                  active === s.id ? "bg-purple-100 text-purple-700" : "text-gray-400 hover:bg-gray-100"
                }`}
              >
                {s.label[0]}
              </button>
            ))}
          </nav>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-10 py-12 flex flex-col gap-16">

          {/* Header */}
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">DHuO · Dev Portal</span>
            <h1 className="text-[28px] font-bold text-gray-900 mt-2">TIM Mine → DHuO</h1>
            <p className="text-[15px] text-gray-500 mt-2 leading-relaxed max-w-xl">
              Consolidado do mapeamento de gaps entre o Redmine (TIM Mine) e o DHuO Dev Portal — com descobertas, benchmark e propostas de solução.
            </p>
          </div>

          <Divider />

          {/* Contexto */}
          <section id="contexto">
            <Tag>01</Tag>
            <H2>Contexto</H2>
            <P>
              A TIM utiliza o <Strong>Redmine</Strong> — internamente chamado de TIM Mine — como ferramenta de gestão de documentação de APIs.
              Com a migração para o <Strong>DHuO Dev Portal</Strong>, perceberam que perderam funcionalidades do dia a dia e passaram a solicitar que o Dev Portal replicasse o comportamento do Redmine.
            </P>
            <P>
              O pedido inicial chegou como uma lista de requisitos de features. Após investigação, ficou claro que o problema é mais estrutural — envolve processo, acesso e arquitetura de ferramenta, não apenas funcionalidades faltantes.
            </P>
            <Note>
              O TIM Mine é uma instância do Redmine — uma ferramenta open-source de gestão de projetos com wiki embutida. Não é um Dev Portal. São categorias de produto completamente diferentes.
            </Note>
          </section>

          <Divider />

          {/* Atores */}
          <section id="atores">
            <Tag>02</Tag>
            <H2>Atores e papéis</H2>
            <P>Confirmado com Jeremias (Eng TIM):</P>

            <div className="mt-5 flex flex-col gap-3">
              <Actor
                name="Eng TIM"
                role="Publica, edita e mantém as docs e a estrutura de pastas no Redmine"
                tag="Operador"
                color="purple"
              />
              <Actor
                name="TIM Tim (CCC)"
                role="Apenas consulta as documentações — não edita, não publica"
                tag="Consumidor"
                color="gray"
              />
              <Actor
                name="Eng DHuO (X Digital)"
                role="Controla o Manager — única com acesso para publicar no Dev Portal hoje"
                tag="Admin"
                color="orange"
              />
            </div>

            <Note className="mt-6">
              O modelo de acesso da TIM no Redmine é idêntico ao modelo do DHuO hoje — a Eng publica, o consumidor lê. Não há perda de autonomia do cliente final. O gap está na <Strong>ferramenta e no acesso da Eng da TIM</Strong>.
            </Note>
          </section>

          <Divider />

          {/* Gaps */}
          <section id="gaps">
            <Tag>03</Tag>
            <H2>Os 3 gaps</H2>
            <P>Diferenças concretas entre o que o Redmine oferece e o que o DHuO tem hoje:</P>

            <div className="mt-6 flex flex-col gap-4">
              <GapCard
                number="1"
                title="Versionamento"
                redmine="A Eng da TIM controla 4 dígitos manualmente — cada dígito representa um tipo de alteração: Major, Minor, Doc e Fix."
                dhuo="O Manager não suporta o controle granular de 4 dígitos que a TIM usa."
                severity="high"
              />
              <GapCard
                number="2"
                title="Histórico / Diff"
                redmine="O Redmine registra cada edição de página. O consumidor recebe notificação de alteração, acessa a doc e compara com a versão anterior para ver o que mudou."
                dhuo="O DHuO não tem mecanismo de comparação entre versões de uma mesma doc (diff)."
                severity="high"
              />
              <GapCard
                number="3"
                title="Navegação"
                redmine="As docs são organizadas em formato wiki com árvore de pastas — a Eng mantém a hierarquia manualmente via links no Redmine."
                dhuo="O Dev Portal exibe uma doc por versão, sem hierarquia de navegação lateral."
                severity="medium"
              />
            </div>
          </section>

          <Divider />

          {/* Bloqueio */}
          <section id="bloqueio">
            <Tag>04</Tag>
            <H2>Bloqueio de acesso</H2>
            <P>
              A Eng da TIM precisa de acesso ao Manager para fazer no DHuO o que já faz no Redmine.
              O Manager hoje não é acessível para eles porque foi construído como ferramenta interna da Eng DHuO.
            </P>
            <P>
              A solução é criar um <Strong>perfil de usuário com escopo limitado</Strong> no Manager — a Eng da TIM veria apenas a parte de documentação das suas próprias APIs, sem acesso a configurações da plataforma ou outros clientes.
            </P>
            <div className="mt-5 rounded-xl border border-gray-200 overflow-hidden">
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-4 py-2.5 font-semibold text-gray-600">Permissão</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-gray-600">Eng DHuO</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-gray-600">Eng TIM (proposto)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Publicar documentação", "✅", "✅"],
                    ["Editar documentação", "✅", "✅"],
                    ["Gerenciar versionamento", "✅", "✅"],
                    ["Configurações da plataforma", "✅", "❌"],
                    ["Acessar outros clientes", "✅", "❌"],
                    ["Configurar integrações", "✅", "❌"],
                  ].map(([perm, eng, tim], i) => (
                    <tr key={i} className="border-b border-gray-100 last:border-0">
                      <td className="px-4 py-2.5 text-gray-700">{perm}</td>
                      <td className="px-4 py-2.5 text-gray-500">{eng}</td>
                      <td className="px-4 py-2.5 text-gray-500">{tim}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Note className="mt-4">
              A melhoria de perfis de usuário no Manager está no backlog sem previsão. Ela é pré-requisito para qualquer solução de acesso da Eng TIM.
            </Note>
          </section>

          <Divider />

          {/* Benchmark */}
          <section id="benchmark">
            <Tag>05</Tag>
            <H2>Benchmark de mercado</H2>
            <P>
              Pesquisa realizada em 8 Dev Portals concorrentes — Kong, Apigee, AWS, Stoplight, ReadMe, SwaggerHub, Backstage e Tyk.
            </P>
            <div className="mt-5 flex flex-col gap-3">
              <FindingCard
                title="Histórico editorial"
                content="Nenhuma plataforma oferece histórico completo e auditável de alterações dentro da mesma versão de API por página. O Stoplight é o mais próximo, com diff de specs OpenAPI — não de conteúdo textual."
              />
              <FindingCard
                title="Self-service de gerenciamento"
                content="O modelo padrão do mercado é híbrido — admin técnico controla publicação, consumidor acessa. Self-service editorial completo para o cliente final não é prática estabelecida."
              />
              <FindingCard
                title="Árvore de navegação"
                content="A maioria tem hierarquia de navegação, mas nenhum no formato wiki do Redmine — são catálogos de API estruturados, não ferramentas de colaboração."
              />
            </div>
            <a
              href="/bench-dev-portals"
              target="_blank"
              className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-medium underline underline-offset-2"
              style={{ color: "#7c22c0" }}
            >
              Ver benchmark completo <ExternalLink size={12} />
            </a>
          </section>

          <Divider />

          {/* Propostas */}
          <section id="propostas">
            <Tag>06</Tag>
            <H2>Propostas de solução</H2>

            <div className="mt-5 flex flex-col gap-4">
              <ProposalCard
                number="1"
                title="Árvore de navegação no Dev Portal"
                effort="Baixo"
                gap="Navegação"
                description="Adicionar menu lateral com hierarquia de categorias no Dev Portal. A Eng da TIM organiza cada doc numa pasta/subpasta ao publicar no Manager. O portal monta a árvore automaticamente."
              />
              <ProposalCard
                number="2"
                title="Controle de 4 dígitos no Manager"
                effort="Médio"
                gap="Versionamento"
                description="Adaptar o seletor de versão no Manager para suportar os 4 dígitos com rótulos descritivos (Major, Minor, Doc, Fix). A Eng da TIM incrementa apenas o dígito correspondente ao tipo de alteração."
              />
              <ProposalCard
                number="3"
                title="Notificação com resumo de alteração"
                effort="Baixo"
                gap="Histórico"
                description="Campo obrigatório 'O que mudou?' ao publicar. O texto vai no e-mail para quem acompanha a doc. Resolve 80% da necessidade de histórico sem construir um sistema de diff."
              />
              <ProposalCard
                number="4"
                title="Perfil Eng TIM no Manager"
                effort="Médio"
                gap="Acesso"
                description="Criar role com escopo limitado — a Eng da TIM acessa apenas a gestão de docs das suas APIs, sem ver configurações da plataforma ou outros clientes. Pré-requisito para as demais soluções."
              />
            </div>

            <a
              href="/dev-portal-tree"
              target="_blank"
              className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-medium underline underline-offset-2"
              style={{ color: "#7c22c0" }}
            >
              Ver protótipo interativo (Solução 1 + 2) <ExternalLink size={12} />
            </a>
          </section>

          <Divider />

          {/* Próximos passos */}
          <section id="proximos">
            <Tag>07</Tag>
            <H2>Próximos passos</H2>

            <div className="mt-5 flex flex-col gap-3">
              {[
                {
                  owner: "Thiago",
                  title: "Sessão de mapeamento com Jeremias",
                  description: "Mapear o processo completo da Eng TIM no Redmine — quem altera, como versiona, quem aprova, com que frequência ocorrem alterações silenciosas.",
                  priority: "Alta",
                },
                {
                  owner: "Eng DHuO",
                  title: "Priorizar perfis de usuário no Manager",
                  description: "A melhoria de perfis é pré-requisito de tudo. Precisa sair do backlog sem previsão e ganhar uma estimativa.",
                  priority: "Alta",
                },
                {
                  owner: "Eder + Thiago",
                  title: "Defesa ao cliente",
                  description: "Com o benchmark + protótipo + mapeamento do Jere, montar resposta estruturada para o Lupareri sobre o que será entregue, quando e o que não entra.",
                  priority: "Média",
                },
                {
                  owner: "Thiago",
                  title: "Confirmar se Dev Portal tem diff de versões",
                  description: "Verificar se o comparador de versões existente no DHuO já cobre o gap de histórico parcialmente.",
                  priority: "Média",
                },
              ].map((item, i) => (
                <div key={i} className="rounded-xl border border-gray-200 px-5 py-4">
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-[14px] font-semibold text-gray-900">{item.title}</p>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                        item.priority === "Alta"
                          ? "bg-red-50 text-red-500 border-red-200"
                          : "bg-yellow-50 text-yellow-600 border-yellow-200"
                      }`}>{item.priority}</span>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-purple-50 text-purple-600 border border-purple-200">{item.owner}</span>
                    </div>
                  </div>
                  <p className="text-[13px] text-gray-500 mt-1.5 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}

// ─── Components ───────────────────────────────────────────────────────────────

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[11px] font-bold text-gray-300 tracking-widest">{children}</span>
  )
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-[20px] font-bold text-gray-900 mt-1">{children}</h2>
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

function Note({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-lg px-4 py-3 text-[13px] leading-relaxed mt-4 ${className}`}
      style={{ backgroundColor: "#faf5ff", borderLeft: "3px solid #7c22c0", color: "#6b21a8" }}
    >
      {children}
    </div>
  )
}

function Actor({ name, role, tag, color }: { name: string; role: string; tag: string; color: "purple" | "gray" | "orange" }) {
  const colors = {
    purple: "bg-purple-50 text-purple-700 border-purple-200",
    gray: "bg-gray-50 text-gray-500 border-gray-200",
    orange: "bg-orange-50 text-orange-600 border-orange-200",
  }
  return (
    <div className="flex items-start gap-4 rounded-xl border border-gray-200 px-5 py-4">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <p className="text-[14px] font-semibold text-gray-900">{name}</p>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${colors[color]}`}>{tag}</span>
        </div>
        <p className="text-[13px] text-gray-500 leading-snug">{role}</p>
      </div>
    </div>
  )
}

function GapCard({ number, title, redmine, dhuo, severity }: {
  number: string; title: string; redmine: string; dhuo: string; severity: "high" | "medium"
}) {
  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-5 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-gray-400">{number}</span>
          <p className="text-[14px] font-semibold text-gray-900">{title}</p>
        </div>
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
          severity === "high" ? "bg-red-50 text-red-500 border-red-200" : "bg-yellow-50 text-yellow-600 border-yellow-200"
        }`}>{severity === "high" ? "Gap crítico" : "Gap médio"}</span>
      </div>
      <div className="grid grid-cols-2 divide-x divide-gray-100">
        <div className="px-5 py-4">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-2">Redmine hoje</p>
          <p className="text-[13px] text-gray-600 leading-snug">{redmine}</p>
        </div>
        <div className="px-5 py-4">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-2">DHuO hoje</p>
          <p className="text-[13px] text-gray-600 leading-snug">{dhuo}</p>
        </div>
      </div>
    </div>
  )
}

function FindingCard({ title, content }: { title: string; content: string }) {
  return (
    <div className="rounded-xl border border-gray-200 px-5 py-4">
      <p className="text-[13px] font-semibold text-gray-800">{title}</p>
      <p className="text-[13px] text-gray-500 mt-1 leading-snug">{content}</p>
    </div>
  )
}

function ProposalCard({ number, title, effort, gap, description }: {
  number: string; title: string; effort: string; gap: string; description: string
}) {
  return (
    <div className="rounded-xl border border-gray-200 px-5 py-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <span
            className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0"
            style={{ backgroundColor: "#7c22c0" }}
          >
            {number}
          </span>
          <p className="text-[14px] font-semibold text-gray-900">{title}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-50 text-gray-500 border border-gray-200">
            Gap: {gap}
          </span>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
            effort === "Baixo" ? "bg-green-50 text-green-600 border-green-200" : "bg-yellow-50 text-yellow-600 border-yellow-200"
          }`}>
            Esforço {effort}
          </span>
        </div>
      </div>
      <p className="text-[13px] text-gray-500 mt-2 leading-relaxed">{description}</p>
    </div>
  )
}
