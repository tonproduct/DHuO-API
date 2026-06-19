"use client"

import { useState } from "react"
import { ChevronRight, ChevronLeft, X, ChevronDown, Eye, Copy, Info } from "lucide-react"

const sections = [
  { id: "conceito", label: "O padrão" },
  { id: "defesa", label: "Por que esse padrão?" },
  { id: "drawer1", label: "Drawer — Novo Plugin" },
  { id: "drawer2", label: "Drawer — AI Agent" },
]

export default function RecursosDrawerPage() {
  const [collapsed, setCollapsed] = useState(false)
  const [active, setActive] = useState("conceito")

  function scrollTo(id: string) {
    setActive(id)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="min-h-screen bg-white flex" style={{ fontFamily: "Noto Sans, sans-serif" }}>

      {/* Sidebar */}
      <div className={`shrink-0 border-r border-gray-200 flex flex-col transition-all duration-200 ${collapsed ? "w-12" : "w-52"}`}>
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
                {s.label[2]}
              </button>
            ))}
          </nav>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-10 py-14 flex flex-col gap-12">

          <div>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">DHuO · Integra</span>
            <h1 className="text-[26px] font-bold text-gray-900 mt-2">Recursos do Drawer</h1>
          </div>

          {/* O padrão */}
          <section id="conceito" className="flex flex-col gap-3">
            <H2>O padrão</H2>
            <Card>
              <P>O drawer é um painel lateral que desliza sobre o conteúdo principal. A estrutura canônica tem três zonas com comportamentos distintos de scroll: <strong>header fixo</strong> no topo, <strong>body scrollável</strong> no meio, e <strong>footer fixo</strong> na base.</P>
            </Card>
            <Card>
              <H3>Por que esse layout?</H3>
              <Ul items={[
                "Header fixo — mantém o contexto (título + fechar) sempre visível, independente do quanto o usuário rolou o formulário",
                "Body scrollável — permite formulários longos sem quebrar o layout; o conteúdo cresce dentro de uma área com overflow-y: auto",
                "Footer fixo — as ações principais (Cancelar / Salvar) ficam sempre acessíveis, sem precisar rolar até o fim",
              ]} />
            </Card>
            <Card>
              <H3>Implementação em CSS</H3>
              <Ul items={[
                "O container do drawer usa display: flex + flex-direction: column + height: 100%",
                "O header e o footer recebem flex-shrink: 0 para não ceder espaço",
                "O body recebe flex: 1 + overflow-y: auto para ocupar o espaço restante e rolar",
              ]} />
            </Card>
          </section>

          <Divider />

          {/* Por que esse padrão? */}
          <section id="defesa" className="flex flex-col gap-3">
            <H2>Por que esse padrão?</H2>
            <Card>
              <P>Com tudo scrollável, o usuário rola para baixo para preencher os campos e em algum momento perde o título — não sabe mais com certeza em qual drawer está. Quando termina, precisa rolar de volta para fechar ou até o fim para salvar. Em formulários técnicos com muitos campos, isso acontece repetidamente.</P>
              <P>Com header e footer fixos, o contexto e as ações ficam sempre visíveis, independente do scroll. O corpo cresce o quanto precisar sem penalizar a navegação.</P>
            </Card>
            <Card>
              <H3>Visibilidade do contexto</H3>
              <P>O header fixo mantém o título do drawer sempre visível. No DHuO, onde o usuário configura múltiplos componentes em sequência, perder o título é perder o contexto — e isso gera erro: salvar a configuração errada achando que está no drawer certo.</P>
            </Card>
            <Card>
              <H3>Acesso imediato às ações</H3>
              <P>Cancelar e Salvar precisam estar sempre disponíveis, sem custo de scroll. Se o footer some, o usuário que quer abortar precisa primeiro rolar para encontrar o botão — atrito que aumenta a chance de ele fechar a janela acidentalmente ou desistir da ação.</P>
            </Card>
            <Card>
              <H3>Memória muscular (Lei de Fitts)</H3>
              <P>Com footer fixo, Cancelar e Salvar estão sempre na mesma posição. O usuário desenvolve memória muscular: não precisa procurar. Com scroll livre, a posição dos botões muda a cada interação — o sistema exige atenção onde não deveria.</P>
            </Card>
            <Card>
              <H3>Padrão de mercado (Lei de Jakob)</H3>
              <P>Figma, Linear, Salesforce, ServiceNow — todos usam drawer com header e footer fixos em painéis de configuração. O usuário já aprendeu esse comportamento em outros produtos. Quebrar o padrão exige reaprendizado sem nenhum ganho perceptível.</P>
            </Card>
          </section>

          <Divider />

          {/* Drawer 1 */}
          <section id="drawer1" className="flex flex-col gap-4">
            <H2>Drawer — Novo Plugin</H2>
            <p className="text-[13px] text-gray-400">Drawer de 550px com seleção de ambiente/plugin e formulário de configurações. Demonstra o padrão com accordion e seções dentro do body.</p>
            <DrawerNovoPlugin />
          </section>

          <Divider />

          {/* Drawer 2 */}
          <section id="drawer2" className="flex flex-col gap-4">
            <H2>Drawer — AI Agent</H2>
            <p className="text-[13px] text-gray-400">Drawer de largura maior com dois painéis: formulário principal + nav lateral de abas. Demonstra o padrão com layout de colunas dentro do body.</p>
            <DrawerAIAgent />
          </section>

        </div>
      </div>
    </div>
  )
}

// ─── Drawer 1: Novo Plugin ────────────────────────────────────────────────────

function DrawerNovoPlugin() {
  const [authMethod, setAuthMethod] = useState<"Header" | "Parameter">("Header")
  const [allowOverride, setAllowOverride] = useState(false)
  const [accordionOpen, setAccordionOpen] = useState(true)

  return (
    <div className="flex justify-center">
      <div
        className="flex flex-col overflow-hidden shadow-[0_4px_32px_rgba(0,0,0,0.15)] border border-gray-200"
        style={{ width: 550, height: 640, borderRadius: 0 }}
      >
        {/* Header — fixo */}
        <div
          className="shrink-0 flex items-center gap-3 px-8 py-0 h-[60px]"
          style={{ backgroundColor: "#8e3ccb" }}
        >
          <p className="flex-1 text-[16px] font-bold text-white truncate">Novo Plugin</p>
          <button className="shrink-0 text-white/70 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Body — scrollável */}
        <div className="flex-1 overflow-y-auto bg-white flex flex-col">
          {/* Selects iniciais */}
          <div className="flex flex-col gap-6 px-8 py-6">
            <FormField label="Ambiente" required>
              <SelectInput value="Prod" />
            </FormField>
            <FormField label="Plugins" required>
              <SelectInput value="AI Proxy" />
            </FormField>
          </div>

          {/* Accordion */}
          <button
            className="shrink-0 flex items-center gap-2 px-6 h-[56px] border-y border-gray-100 bg-gray-50 text-left w-full"
            onClick={() => setAccordionOpen(!accordionOpen)}
          >
            <span className="flex-1 text-[16px] font-semibold text-gray-600">Configurações do Plugin</span>
            <ChevronDown
              size={18}
              className={`shrink-0 text-gray-400 transition-transform ${accordionOpen ? "" : "-rotate-90"}`}
            />
          </button>

          {accordionOpen && (
            <div className="flex flex-col gap-6 px-8 py-6 pb-10">
              <p className="text-[12px] font-semibold uppercase tracking-widest text-gray-400">Configuração Básica</p>

              <FormField label="Model Provider" required info>
                <SelectInput value="Anthropic" />
              </FormField>

              <FormField label="Model name" required info>
                <TextInput placeholder="" />
              </FormField>

              <FormField label="Route Type" required info>
                <SelectInput value="" placeholder="Escolha uma opção" />
              </FormField>

              <p className="text-[12px] font-semibold uppercase tracking-widest text-gray-400">Autenticação</p>

              <div className="flex flex-col gap-3">
                <label className="text-[14px] text-gray-500">Authentication Method</label>
                <div className="flex items-center gap-5">
                  {(["Header", "Parameter"] as const).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setAuthMethod(opt)}
                      className="flex items-center gap-2"
                    >
                      <div
                        className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                        style={{
                          borderColor: authMethod === opt ? "#8e3ccb" : "#6e6e6e",
                        }}
                      >
                        {authMethod === opt && (
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#8e3ccb" }} />
                        )}
                      </div>
                      <span className="text-[14px] text-gray-500">{opt}</span>
                    </button>
                  ))}
                </div>
              </div>

              <FormField label="Auth.Header Name" required info>
                <TextInput placeholder="" />
              </FormField>

              <FormField label="Auth.Header Value" required info>
                <TextInput placeholder="•••••••••••••••" type="password" icon={<Eye size={14} className="text-gray-400" />} />
              </FormField>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAllowOverride(!allowOverride)}
                  className="flex items-center gap-2"
                >
                  <div
                    className="relative w-8 h-4 rounded-full transition-colors"
                    style={{ backgroundColor: allowOverride ? "#8e3ccb" : "#d1d5db" }}
                  >
                    <div
                      className="absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-all"
                      style={{ left: allowOverride ? "calc(100% - 14px)" : "2px" }}
                    />
                  </div>
                  <span className="text-[14px] text-gray-500">Auth.Allow Override</span>
                </button>
                <Info size={12} className="text-gray-300" />
              </div>

              <FormField label="Model.Options.Anthropic Version" required info>
                <TextInput placeholder="" />
              </FormField>

              <AccordionRow label="COMPORTAMENTO DO MODELO" />
              <AccordionRow label="RASTREAMENTO DE CUSTOS" />
              <AccordionRow label="LOGGING" />
              <AccordionRow label="CONFIGURAÇÕES TÉCNICAS" />
            </div>
          )}
        </div>

        {/* Footer — fixo */}
        <div className="shrink-0 flex items-center justify-end gap-3 px-6 py-6 border-t border-gray-100 bg-white">
          <button className="h-10 px-4 rounded border border-gray-300 text-[14px] font-bold text-gray-500 hover:bg-gray-50 transition-colors">
            Cancelar
          </button>
          <button
            className="h-10 px-4 rounded text-[14px] font-bold text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: "#39b29d" }}
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Drawer 2: AI Agent ───────────────────────────────────────────────────────

function DrawerAIAgent() {
  const [activeTab, setActiveTab] = useState("Configurações")
  const [insecure, setInsecure] = useState(false)

  return (
    <div className="flex justify-center">
      <div
        className="flex flex-col overflow-hidden shadow-[0_4px_32px_rgba(0,0,0,0.15)] border border-gray-200 w-full"
        style={{ height: 680, borderRadius: 0 }}
      >
        {/* Header — fixo */}
        <div
          className="shrink-0 flex items-center gap-4 px-6 h-[58px]"
          style={{ background: "linear-gradient(to right, #8e3ccb, #7933ac)" }}
        >
          <p className="flex-1 text-[16px] font-bold text-white truncate">Configurar Componente Técnico - AI Agent</p>
          <button className="text-white/60 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Body — scrollável */}
        <div className="flex-1 overflow-hidden flex">
          {/* Formulário principal */}
          <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6">

            <SectionLabel>Configuração Básica</SectionLabel>

            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <FormField label="ID do componente" required>
                  <TextInput placeholder="Insira um ID único" />
                </FormField>
              </div>
              <button className="shrink-0 w-10 h-10 flex items-center justify-center border border-gray-400 rounded text-gray-500 hover:bg-gray-50 transition-colors">
                <Copy size={16} />
              </button>
            </div>

            <FormField label="Nome do Componente">
              <TextInput placeholder="Insira o nome" />
            </FormField>

            <FormField label="Secret" required>
              <SelectInput value="" placeholder="Escolha uma opção" />
            </FormField>

            <div className="flex gap-4">
              <div className="flex-1">
                <FormField label="Provedor" required>
                  <SelectInput value="" placeholder="Escolha uma opção" />
                </FormField>
              </div>
              <div className="flex-1">
                <FormField label="Modelo" required>
                  <TextInput placeholder="Insira o nome do modelo" />
                </FormField>
              </div>
            </div>

            <FormField label="Endpoint">
              <TextInput placeholder="Insira o endpoint" />
            </FormField>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="insecure"
                  checked={insecure}
                  onChange={(e) => setInsecure(e.target.checked)}
                  className="w-4 h-4 rounded border-2 border-gray-400 accent-purple-600 cursor-pointer"
                />
                <label htmlFor="insecure" className="text-[14px] text-gray-500 cursor-pointer">
                  Permitir conexões inseguras
                </label>
              </div>
              <p className="text-[12px] text-gray-400 leading-relaxed">
                Habilite esta opção para que o cliente aceite conexões SSL inseguras. Recomendada apenas para testes ou ambientes internos.
              </p>
            </div>

            <SectionLabel>Parâmetros do Modelo</SectionLabel>

            <div className="flex gap-4">
              <div className="flex-1">
                <FormField label="Temperatura" required>
                  <TextInput value="0.5" spinners />
                </FormField>
              </div>
              <div className="flex-1">
                <FormField label="Máximo de Tokens de Saída">
                  <TextInput value="1000" spinners />
                </FormField>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <FormField label="Top K" required>
                  <TextInput value="10" spinners />
                </FormField>
              </div>
              <div className="flex-1">
                <FormField label="Top P" required>
                  <TextInput value="1" spinners />
                </FormField>
              </div>
            </div>

            <SectionLabel>Configurações Avançadas</SectionLabel>

            <div className="flex gap-4">
              <div className="flex-1">
                <FormField label="Timeout (ms)" required>
                  <TextInput value="60000" spinners />
                </FormField>
              </div>
              <div className="flex-1">
                <FormField label="Máximo de tentativas" required>
                  <TextInput value="3" spinners />
                </FormField>
              </div>
            </div>

          </div>

          {/* Nav lateral de abas */}
          <div className="shrink-0 w-48 border-l border-gray-100 px-4 py-6 flex flex-col gap-1">
            {["Configurações", "Prompts", "Playground"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-left px-2 py-2 rounded text-[14px] transition-colors ${
                  activeTab === tab
                    ? "font-bold bg-purple-50 text-purple-700"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Footer — fixo */}
        <div className="shrink-0 flex items-center justify-end gap-3 pr-10 py-4 border-t border-gray-100 bg-white">
          <button
            className="h-9 px-4 rounded border text-[12px] font-bold transition-colors hover:bg-purple-50"
            style={{ borderColor: "#8e3ccb", color: "#8e3ccb" }}
          >
            Cancelar
          </button>
          <button className="h-9 px-4 rounded text-[12px] font-bold text-white bg-gray-300 cursor-default">
            Adicionar
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Shared form primitives ───────────────────────────────────────────────────

function FormField({ label, required, info, children }: {
  label: string
  required?: boolean
  info?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1 justify-between">
        <div className="flex items-center gap-1">
          <span className="text-[14px] text-gray-500">{label}</span>
          {info && <Info size={11} className="text-gray-300" />}
        </div>
        {required && <span className="text-[13px] text-gray-300">Obrigatório</span>}
      </div>
      {children}
    </div>
  )
}

function TextInput({ placeholder, value, type, icon, spinners }: {
  placeholder?: string
  value?: string
  type?: string
  icon?: React.ReactNode
  spinners?: boolean
}) {
  return (
    <div className="relative flex items-center h-10 border border-gray-300 rounded px-4 bg-white">
      <input
        type={type || "text"}
        defaultValue={value}
        placeholder={placeholder}
        className="flex-1 text-[14px] text-gray-500 placeholder-gray-300 bg-transparent outline-none min-w-0"
        style={{ fontWeight: value ? 500 : 400 }}
      />
      {icon && <div className="shrink-0 ml-2">{icon}</div>}
      {spinners && (
        <div className="shrink-0 ml-2 flex flex-col">
          <button className="text-gray-300 hover:text-gray-500 leading-none text-[10px]">▲</button>
          <button className="text-gray-300 hover:text-gray-500 leading-none text-[10px]">▼</button>
        </div>
      )}
    </div>
  )
}

function SelectInput({ value, placeholder }: { value?: string; placeholder?: string }) {
  return (
    <div className="relative flex items-center h-10 border border-gray-400 rounded px-4 bg-white cursor-pointer">
      <span className={`flex-1 text-[14px] truncate ${value ? "text-gray-500 font-medium" : "text-gray-300"}`}>
        {value || placeholder}
      </span>
      <ChevronDown size={18} className="shrink-0 text-gray-400 ml-2" />
    </div>
  )
}

function AccordionRow({ label }: { label: string }) {
  return (
    <div className="relative flex items-center h-[56px] border border-gray-100 rounded px-0 -mx-0 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[56px] bg-white border-b border-gray-100" />
      <span
        className="relative flex-1 text-[12px] font-medium uppercase text-gray-500 pl-6"
        style={{ letterSpacing: "0.05em" }}
      >
        {label}
      </span>
      <ChevronDown size={18} className="relative mr-6 text-gray-400 -rotate-90" />
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[12px] font-normal uppercase tracking-widest text-gray-400">{children}</p>
  )
}

// ─── Layout helpers ───────────────────────────────────────────────────────────

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-gray-200 px-6 py-5 flex flex-col gap-3">
      {children}
    </div>
  )
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-[18px] font-bold text-gray-900">{children}</h2>
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="text-[14px] font-semibold text-gray-700">{children}</h3>
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-[14px] text-gray-500 leading-relaxed">{children}</p>
}

function Divider() {
  return <div className="border-t border-gray-100" />
}

function Ul({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#7c22c0" }} />
          <span className="text-[14px] text-gray-500 leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  )
}
