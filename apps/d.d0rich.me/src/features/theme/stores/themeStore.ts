import { defineStore } from 'pinia'
import { ref, watch, computed } from 'vue'

export type ColorMode = 'light' | 'dark' | 'system'
export type ExplicitColorMode = 'light' | 'dark'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<ColorMode>('system')
  const systemTheme = ref<ExplicitColorMode>(getSystemTheme())
  const explicitTheme = computed<ExplicitColorMode>(() =>
    getExplicitTheme(theme.value)
  )

  if (window.matchMedia) {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (event) => {
        systemTheme.value = event.matches ? 'dark' : 'light'
      })
  }

  setThemeInHtml(theme.value)

  watch(theme, (newTheme) => {
    setThemeInHtml(newTheme)
  })

  function getExplicitTheme(theme: ColorMode): ExplicitColorMode {
    return theme === 'system' ? systemTheme.value : theme
  }

  function getSystemTheme(): ExplicitColorMode {
    if (!window.matchMedia) {
      return 'light'
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }

  function setThemeInHtml(newTheme: ColorMode) {
    const newThemeExplicit = getExplicitTheme(newTheme)
    const classToRemove = newThemeExplicit === 'light' ? 'dark' : 'light'
    const classToAdd = newThemeExplicit === 'light' ? 'light' : 'dark'
    document.documentElement.classList.add(classToAdd)
    document.documentElement.classList.remove(classToRemove)
  }

  function setTheme(newTheme: ColorMode) {
    theme.value = newTheme
  }

  return {
    theme,
    explicitTheme,
    systemTheme,
    setTheme
  }
})
