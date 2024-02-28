import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

interface Redirects {
  [key: string]: URL
}

export function middleware(request: NextRequest) {
  const redirects: Redirects = {
    '/github': new URL('/hugomos/', 'https://github.com'),
    '/linkedin': new URL('/in/hugomos/', 'https://linkedin.com'),
  }

  const { pathname } = request.nextUrl

  if (pathname in redirects) {
    return NextResponse.redirect(redirects[pathname])
  }
}
