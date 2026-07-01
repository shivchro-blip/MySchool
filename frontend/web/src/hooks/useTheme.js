import { useEffect, useState } from 'react'

const STORAGE_KEY = 'ec-theme'
const VALID = ['system', 'light', 'dark']

function readStored() {
  const stored = localStorage.getItem(STORAGE_KEY)
  // Back-compat: earlier versions stored only 'light' | 'dark'; those remain valid.
  return VALID.includes(stored) ? stored : 'system'
}

function systemPrefersDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

/**
 * Tri-state theme hook.
 * Returns a 4-tuple: [dark, toggleTheme, theme, setTheme]
 *   - dark        → effective boolean (system resolves to the OS preference)
 *   - toggleTheme → legacy 2-state flip (light ⇄ dark); used by DashboardShell
 *   - theme       → 'system' | 'light' | 'dark' (the stored choice)
 *   - setTheme    → set the stored choice
 * Destructuring only the first two keeps every existing caller working.
 */
export function useTheme() {
  const [theme, setThemeState] = useState(readStored)
  const [systemDark, setSystemDark] = useState(systemPrefersDark)

  // Track the OS preference only while 'system' is selected.
  useEffect(() => {
    if (theme !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = e => setSystemDark(e.matches)
    mq.addEventListener('change', onChange)
    setSystemDark(mq.matches)
    return () => mq.removeEventListener('change', onChange)
  }, [theme])

  const dark = theme === 'system' ? systemDark : theme === 'dark'

  // Apply + persist.
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme, dark])

  function setTheme(next) {
    if (VALID.includes(next)) setThemeState(next)
  }

  // Legacy toggle: explicit light ⇄ dark, resolving 'system' by its current effect.
  function toggleTheme() {
    setThemeState(dark ? 'light' : 'dark')
  }

  return [dark, toggleTheme, theme, setTheme]
}
