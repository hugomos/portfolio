import React from 'react'
import { Link } from './link'
import { ToggleTheme } from './toggle-theme'

type HeaderProps = React.ComponentProps<'header'>

export const Header: React.FC<HeaderProps> = ({ ...props }) => {
  const links = [
    { href: '/', label: 'home' },
    { href: '/work', label: 'work' },
    { href: '/experience', label: 'experience' },
  ]

  return (
    <header
      className="w-full flex justify-between items-center -ml-[8px] mb-16 tracking-tight"
      {...props}
    >
      <nav className="flex flex-row items-start">
        {links.map((link) => (
          <Link key={link.href} href={link.href} variant="navigation">
            {link.label}
          </Link>
        ))}
      </nav>
      <ToggleTheme />
    </header>
  )
}
