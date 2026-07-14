// Single source of truth for the system-screen gallery. The Lightbox walks this
// ordered list for prev/next; each section renders its own thumbnail and opens
// the viewer by `id`. Vite resolves the shared asset imports to the same URL as
// the sections, so there is no duplicate-download cost.
import dashboard from "@/assets/dashboard_pharma.png"
import prontuario from "@/assets/prontuario_paciente.png"
import admin from "@/assets/dashboard_admin.png"
import assist from "@/assets/pharma_assist.png"

export const SCREENS = [
  {
    id: "dashboard",
    src: dashboard,
    alt: "Dashboard Pharma",
    width: 2940,
    height: 1664,
  },
  {
    id: "prontuario",
    src: prontuario,
    alt: "Prontuário do paciente",
    width: 2940,
    height: 1740,
  },
  {
    id: "admin",
    src: admin,
    alt: "Dashboard do administrador",
    width: 2940,
    height: 1740,
  },
  {
    id: "assist",
    src: assist,
    alt: "PharmAssist analisando o caso clínico e apresentando evidências ao farmacêutico",
    width: 2940,
    height: 1740,
  },
]

export const screenIndex = (id) => SCREENS.findIndex((s) => s.id === id)
