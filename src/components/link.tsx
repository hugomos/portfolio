import { cn } from '@/lib/utils'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import React from 'react'

interface LinkProps extends NextLinkProps, React.ComponentPropsWithoutRef<'a'> {
  href: string
  children: React.ReactNode | React.ReactNode[]
  variant?: 'default' | 'navigation' | 'badge' | 'none' | 'icon'
}

export const Link: React.FC<LinkProps> = ({
  href,
  children,
  variant = 'default',
  className = '',
  ...props
}) => {
  const variants = {
    icon: 'flex items-center gap-1',
    default: '',
    none: 'no-underline',
    navigation:
      'transition-all flex px-2 font-medium hover:text-muted-foreground',
    badge:
      'border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded p-1 text-sm inline-flex items-center leading-4 text-neutral-900 dark:text-neutral-100 no-underline',
  }

  const target = href.startsWith('http') ? '_blank' : ''

  return (
    <NextLink
      href={href}
      target={target}
      className={cn([variants[variant], className])}
      {...props}
    >
      {children}
    </NextLink>
  )
}
