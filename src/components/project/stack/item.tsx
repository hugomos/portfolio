import { Link } from '@/components/link'
import { Badge } from '@/components/ui/badge'
import React from 'react'

interface StackItemProps {
  children: React.ReactNode
  href: string
}

export const StackItem: React.FC<StackItemProps> = ({ children, href }) => {
  return (
    <Badge variant="outline">
      <Link href={href} variant="none">
        {children}
      </Link>
    </Badge>
  )
}
