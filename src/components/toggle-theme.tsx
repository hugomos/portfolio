'use client'

import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'
import React from 'react'
import { Button } from './ui/button'

export const ToggleTheme: React.FC = () => {
  const { theme, setTheme } = useTheme()

  function toggle() {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <Button variant="outline" size="icon" onClick={toggle}>
      <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
