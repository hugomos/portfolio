'use client'

import { useTheme } from 'next-themes'
import React from 'react'
import { Switch } from './ui/switch'

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme()

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return <Switch onClick={toggleTheme} />
}
