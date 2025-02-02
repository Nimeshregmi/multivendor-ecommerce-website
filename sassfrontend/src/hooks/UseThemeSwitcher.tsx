import { useEffect, useState } from "react"

type ThemeMode = "light" | "dark"

const useThemeSwitcher = () => {
  const prefersDarkTheme = "(prefers-color-scheme: dark)"
  const [mode, setMode] = useState<ThemeMode>("dark") // Set dark as default

  useEffect(() => {
    const userPref = window.localStorage.getItem("theme") as ThemeMode | null
    const systemPref = window.matchMedia(prefersDarkTheme).matches ? "dark" : "light"

    // Use user preference, then system preference, then default to dark
    const initialTheme = userPref || systemPref || "dark"
    setMode(initialTheme)
    updateTheme(initialTheme)

    const mediaQuery = window.matchMedia(prefersDarkTheme)
    const handleChange = () => {
      if (!userPref) {
        const newMode = mediaQuery.matches ? "dark" : "light"
        setMode(newMode)
        updateTheme(newMode)
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  useEffect(() => {
    window.localStorage.setItem("theme", mode)
    updateTheme(mode)
  }, [mode])

  const updateTheme = (newMode: ThemeMode) => {
    document.documentElement.classList.toggle("dark", newMode === "dark")
    document.documentElement.setAttribute("data-theme", newMode)
  }

  return [mode, setMode] as const
}

export default useThemeSwitcher

