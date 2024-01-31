import { ThemeSwitcher } from '@/components/theme-switcher'
import React from 'react'

const App: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-3xl font-mono">Hello world</h1>
      <ThemeSwitcher />
    </main>
  )
}

export default App
