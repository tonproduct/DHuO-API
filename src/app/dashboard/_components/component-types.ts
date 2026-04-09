export const COMPONENT_TYPES = [
  { id: "http",       label: "HTTP",      abbr: "API", color: "#1678d1", bg: "#e8f4ff" },
  { id: "grpc",       label: "GRPC",      abbr: "G",   color: "#6b7280", bg: "#f0f0f0" },
  { id: "go-plugin",  label: "GO PLUGIN", abbr: "Go",  color: "#00acd7", bg: "#e0f7f7" },
  { id: "bigtable",   label: "BIGTABLE",  abbr: "BT",  color: "#1a73e8", bg: "#e8f0fe" },
  { id: "mongodb",    label: "MONGODB",   abbr: "M",   color: "#13aa52", bg: "#e8f5e9" },
] as const

export type ComponentTypeId = (typeof COMPONENT_TYPES)[number]["id"]
export type ComponentTypeDef = (typeof COMPONENT_TYPES)[number]
