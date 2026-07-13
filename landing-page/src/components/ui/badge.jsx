/* eslint-disable react-refresh/only-export-components */
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary/[0.07] text-primary-deep border border-primary/15 backdrop-blur-md",
        solid: "bg-primary/10 text-primary-deep",
        inverse: "bg-white/10 text-inverse-ink border border-white/15",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({ className, variant, ...props }) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
