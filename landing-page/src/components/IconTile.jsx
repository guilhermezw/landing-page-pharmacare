import { cn } from "@/lib/utils"

/*
  The cobalt icon tile shared by feature cards. Leans and brightens as its
  parent `.group` is hovered — keep the hover trigger on an ancestor with the
  `group` class. Single source of truth so the micro-interaction stays
  identical across sections (Plataforma, Visão…).
*/
export default function IconTile({ icon: Icon, className }) {
  return (
    <div
      className={cn(
        "flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-primary/15",
        className
      )}
    >
      <Icon className="size-5" />
    </div>
  )
}
