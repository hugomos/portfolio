import Image from 'next/image'
import React from 'react'
import { CardHeader } from '../ui/card'

interface ProjectImageProps {
  src: string
  alt?: string
}

export const ProjectImage: React.FC<ProjectImageProps> = ({
  src,
  alt = '',
}) => {
  return (
    <CardHeader className="relative h-56 w-full">
      <Image src={src} alt={alt} layout="fill" className="object-cover" />
    </CardHeader>
  )
}
