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
    name: "Novo menu Integra",
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
    name: "Lock Variants",
    description: "3 variantes de como comunicar módulos bloqueados por assinatura — atual (disabled + tooltip), badge de plano e popover informativo.",
    href: "/lock-variants",
    category: "UI",
    section: "Últimos estudos",
    date: "2026-05-21",
  },
  {
    name: "Estudo de cores",
    description: "Auditoria da paleta dos canvas nodes + 2 propostas de revisão — Opção A (cirúrgica) e Opção B (redistribuição completa).",
    href: "/estudo-de-cores",
    category: "UI",
    section: "Últimos estudos",
    date: "2026-05-27",
  },
  {
    name: "TIM Mine → DHuO",
    description: "Consolidado completo do mapeamento de gaps entre o Redmine (TIM Mine) e o DHuO Dev Portal — atores, 3 gaps, benchmark, propostas e próximos passos.",
    href: "/estudo-tim-dhuo",
    category: "API",
    section: "Últimos estudos",
    date: "2026-06-05",
  },
  {
    name: "Dev Portal + Tree",
    description: "Protótipo do Dev Portal com árvore de navegação lateral e botão de acompanhar — proposta de solução para o gap de navegação em relação ao TIM Mine.",
    href: "/dev-portal-tree",
    category: "API",
    section: "Últimos estudos",
    date: "2026-06-05",
  },
  {
    name: "Bench Dev Portals",
    description: "Comparativo de como Kong, Apigee, AWS, Stoplight, ReadMe, SwaggerHub, Backstage e Tyk implementam gestão de documentação — para embasar defesa técnica ao cliente.",
    href: "/bench-dev-portals",
    category: "API",
    section: "Últimos estudos",
    date: "2026-06-03",
  },
  {
    name: "Oi rafa",
    description: "Estudo em construção.",
    href: "/oi-rafa",
    category: "Outro",
    section: "Últimos estudos",
    date: "2026-05-28",
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
