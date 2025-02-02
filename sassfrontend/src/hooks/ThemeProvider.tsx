"use client"

import { createContext, useContext, type ReactNode } from "react"
import useThemeSwitcher from "@/hooks/UseThemeSwitcher"

type ThemeContextType = ReturnType<typeof useThemeSwitcher>

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const themeSwitcher = useThemeSwitcher()

  return <ThemeContext.Provider value={themeSwitcher}>{children}</ThemeContext.Provider>
}

