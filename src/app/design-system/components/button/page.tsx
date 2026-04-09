import { Button } from "@/components/ui/button"

const variants = ["default", "secondary", "outline", "ghost", "destructive", "danger", "link"] as const
const sizes    = ["sm", "default", "lg"] as const

const tokens = [
  { token: "--btn-h-sm",          value: "32px",   desc: "Altura small" },
  { token: "--btn-h-md",          value: "36px",   desc: "Altura padrão" },
  { token: "--btn-h-lg",          value: "40px",   desc: "Altura large" },
  { token: "--btn-px-sm",         value: "12px",   desc: "Padding X small" },
  { token: "--btn-px-md",         value: "16px",   desc: "Padding X padrão" },
  { token: "--btn-px-lg",         value: "24px",   desc: "Padding X large" },
  { token: "--btn-radius",        value: "var(--radius)", desc: "Border radius (0.625rem)" },
  { token: "--btn-font-size",     value: "0.875rem", desc: "14px" },
  { token: "--btn-font-weight",   value: "500",    desc: "Medium" },
  { token: "--btn-gap",           value: "0.5rem", desc: "Gap ícone + label" },
  { token: "--btn-default-bg",    value: "var(--primary)",    desc: "Background default" },
  { token: "--btn-secondary-bg",  value: "var(--secondary)",  desc: "Background secondary" },
  { token: "--btn-destructive-bg",value: "var(--destructive)","desc": "Background destructive" },
]

export default function ButtonPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Button</h1>
        <p className="text-muted-foreground">6 variantes, 4 tamanhos, tokens de componente.</p>
      </div>

      {/* Variants */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Variants</h2>
        <div className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-card p-6">
          {variants.map((v) => (
            <Button key={v} variant={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</Button>
          ))}
        </div>
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted">
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Variant</th>
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Background</th>
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Foreground</th>
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Hover</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
              {[
                { v: "default",     bg: "var(--primary)",       fg: "var(--primary-foreground)",     hover: "neutral-700" },
                { v: "secondary",   bg: "var(--secondary)",     fg: "var(--secondary-foreground)",   hover: "neutral-200" },
                { v: "outline",     bg: "transparent",          fg: "var(--foreground)",             hover: "var(--accent)" },
                { v: "ghost",       bg: "transparent",          fg: "var(--foreground)",             hover: "var(--accent)" },
                { v: "destructive", bg: "var(--destructive)",        fg: "neutral-50", hover: "red-400" },
                { v: "danger",     bg: "var(--prim-red-500)",      fg: "neutral-50", hover: "red-400" },
                { v: "link",       bg: "transparent",              fg: "var(--primary)", hover: "underline" },
              ].map(({ v, bg, fg, hover }) => (
                <tr key={v}>
                  <td className="px-4 py-3 font-mono text-xs">{v}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground font-mono">{bg}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground font-mono">{fg}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground font-mono">{hover}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Sizes */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Sizes</h2>
        <div className="flex items-end gap-4 rounded-lg border border-border bg-card p-6">
          {sizes.map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <Button size={s}>{s}</Button>
              <span className="text-xs text-muted-foreground font-mono">size="{s}"</span>
            </div>
          ))}
          <div className="flex flex-col items-center gap-2">
            <Button size="icon">S</Button>
            <span className="text-xs text-muted-foreground font-mono">size="icon"</span>
          </div>
        </div>
      </section>

      {/* Disabled */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">States</h2>
        <div className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-card p-6">
          <Button>Default</Button>
          <Button disabled>Disabled</Button>
          <Button variant="secondary" disabled>Disabled</Button>
          <Button variant="outline" disabled>Disabled</Button>
        </div>
      </section>

      {/* Tokens */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Component Tokens</h2>
        <p className="text-sm text-muted-foreground">
          Definidos em <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">src/tokens/components/button.css</code>
        </p>
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted">
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Token</th>
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Valor</th>
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Descrição</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
              {tokens.map(({ token, value, desc }) => (
                <tr key={token}>
                  <td className="px-4 py-2.5 font-mono text-xs">{token}</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{value}</td>
                  <td className="px-4 py-2.5 text-xs text-muted-foreground">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
