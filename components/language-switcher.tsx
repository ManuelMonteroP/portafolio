"use client"

import { useLanguage } from "@/contexts/language-context"
import { Globe } from "lucide-react"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center space-x-2">
      <Globe className="h-4 w-4 text-slate-400" />
      <div className="flex space-x-1">
        <button
          onClick={() => setLanguage("en")}
          className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
            language === "en" ? "bg-teal-400/10 text-teal-300" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage("es")}
          className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
            language === "es" ? "bg-teal-400/10 text-teal-300" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          ES
        </button>
      </div>
    </div>
  )
}
