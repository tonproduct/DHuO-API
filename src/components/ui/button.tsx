import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * Button
 * Consome exclusivamente tokens de componente (--btn-*)
 * que por sua vez referenciam tokens semânticos → primitivos.
 *
 * Cadeia: --btn-default-bg → var(--primary) → var(--prim-neutral-800)
 */
const buttonVariants = cva(
  // ── Base ──────────────────────────────────────────────────────
  // Geometria via tokens: radius, font-size, font-weight, gap
  [
    "inline-flex items-center justify-center whitespace-nowrap",
    "rounded-[var(--btn-radius)]",
    "text-[var(--btn-font-size)]",
    "font-[var(--btn-font-weight)]",
    "gap-[var(--btn-gap)]",
    "transition-all",
    "shrink-0",
    "outline-none",
    // Estados
    "disabled:pointer-events-none disabled:opacity-50",
    // SVG interno
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    "[&_svg:not([class*='size-'])]:size-4",
    // Focus ring (usa token semântico)
    "focus-visible:ring-[var(--ring)]/50 focus-visible:ring-[3px]",
    // Validação
    "aria-invalid:ring-[var(--destructive)]/20 dark:aria-invalid:ring-[var(--destructive)]/40",
    "aria-invalid:border-[var(--destructive)]",
  ],
  {
    variants: {
      // ── Variantes de cor ──────────────────────────────────────
      variant: {
        default: [
          "bg-[var(--btn-default-bg)]",
          "text-primary-foreground",
          "hover:bg-[var(--btn-default-bg-hover)]",
        ],
        secondary: [
          "bg-[var(--btn-secondary-bg)]",
          "text-secondary-foreground",
          "hover:bg-[var(--btn-secondary-bg-hover)]",
        ],
        destructive: [
          "bg-[var(--btn-destructive-bg)]",
          "text-white",
          "hover:bg-[var(--btn-destructive-bg-hover)]",
          "focus-visible:ring-[var(--btn-destructive-bg)]/20",
        ],
        danger: [
          "bg-[var(--btn-danger-bg)]",
          "text-white",
          "hover:bg-[var(--btn-danger-bg-hover)]",
          "focus-visible:ring-[var(--btn-danger-bg)]/20",
        ],
        outline: [
          "border border-[var(--btn-outline-border)]",
          "bg-[var(--btn-outline-bg)]",
          "text-foreground",
          "hover:bg-[var(--btn-outline-bg-hover)]",
          "hover:text-accent-foreground",
          "shadow-xs",
        ],
        ghost: [
          "text-foreground",
          "hover:bg-[var(--btn-ghost-bg-hover)]",
          "hover:text-accent-foreground",
        ],
        link: [
          "text-primary",
          "underline-offset-4",
          "hover:underline",
        ],
      },

      // ── Variantes de tamanho ──────────────────────────────────
      size: {
        default: "h-[var(--btn-h-md)] px-[var(--btn-px-md)] py-2 has-[>svg]:px-3",
        xs:      "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm:      "h-[var(--btn-h-sm)] rounded-md px-[var(--btn-px-sm)] gap-1.5 has-[>svg]:px-2.5",
        lg:      "h-[var(--btn-h-lg)] rounded-md px-[var(--btn-px-lg)] has-[>svg]:px-4",
        icon:    "size-[var(--btn-h-md)]",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-[var(--btn-h-sm)]",
        "icon-lg": "size-[var(--btn-h-lg)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
