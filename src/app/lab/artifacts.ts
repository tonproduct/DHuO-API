export type ArtifactCategory = "IA" | "Integração" | "API" | "UI" | "Outro"
export type ArtifactSection = "Últimos estudos" | "Testes com usuários"

export type Artifact = {
  name: string
  description: string
  href: string
  category?: ArtifactCategory
  section?: ArtifactSection
  epic?: string
  feature?: string
  us?: string
  date?: string // ISO: YYYY-MM-DD
}

export const artifacts: Artifact[] = [
  {
    name: "Trigger Sidebar",
    description: "Sidebar de seleção de trigger para workflows — manual, schedule, webhook, form, etc.",
    href: "/preview",
    category: "Integração",
    section: "Últimos estudos",
    date: "2026-05-05",
  },
  {
    name: "Integration Editor",
    description: "Editor de workflow com canvas React Flow, painel de trigger e abas de config/docs/deploy.",
    href: "/integration",
    category: "Integração",
    section: "Últimos estudos",
    date: "2026-05-05",
  },
  {
    name: "Go Plugin Docs",
    description: "Levantamento da documentação do Go Plugin para reforçar a documentação do componente e auxiliar o chat IA a responder dúvidas.",
    href: "/go-plugin",
    category: "IA",
    section: "Últimos estudos",
    date: "2026-05-05",
  },
  {
    name: "Teste de menu",
    description: "Sessão de teste com usuários sobre o menu de componentes no editor de integração.",
    href: "/teste-menu",
    category: "Integração",
    section: "Testes com usuários",
    date: "2026-05-18",
  },
]
