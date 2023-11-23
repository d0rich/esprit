import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export type ColorMode = 'light' | 'dark' | 'system'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<ColorMode>('system')
  const systemTheme = ref<ColorMode>(getSystemTheme())

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

  function getSystemTheme(): ColorMode {
    if (!window.matchMedia) {
      return 'light'
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }

  function setThemeInHtml(newTheme: ColorMode) {
    const newThemeExplicit =
      newTheme === 'system' ? systemTheme.value : newTheme
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
    systemTheme,
    setTheme
  }
})
