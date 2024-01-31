import Link from 'next/link'
import React from 'react'

const Home: React.FC = () => {
  return (
    <main className="flex-1">
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">
        hey, I'm hugomos 👋
      </h1>
      <p className="prose prose-neutral dark:prose-invert">
        I am a software developer, technology enthusiast, and very practical.
        Currently, I work in the development team at{' '}
        <Link href="https://athenasagricola.com.br" target="_blank">
          Athenas Consultoria Agrícola e Laboratórios
        </Link>
        , where I build tools and plugins focused on precision agriculture. I
        use{' '}
        <Link
          href="https://www.python.org/"
          target="_blank"
          className="border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded p-1 text-sm inline-flex items-center leading-4 text-neutral-900 dark:text-neutral-100 no-underline"
        >
          Python
        </Link>
        ,{' '}
        <Link
          href="https://www.typescriptlang.org"
          target="_blank"
          className="border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded p-1 text-sm inline-flex items-center leading-4 text-neutral-900 dark:text-neutral-100 no-underline"
        >
          Typescript
        </Link>
        ,{' '}
        <Link
          href="https://qgis.org/pt_BR/site/"
          target="_blank"
          className="border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded p-1 text-sm inline-flex items-center leading-4 text-neutral-900 dark:text-neutral-100 no-underline"
        >
          QGIS
        </Link>
        , and{' '}
        <Link
          href="https://www.esri.com/pt-br/arcgis/about-arcgis/overview"
          target="_blank"
          className="border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded p-1 text-sm inline-flex items-center leading-4 text-neutral-900 dark:text-neutral-100 no-underline"
        >
          ArcGIS
        </Link>{' '}
        in the development of these solutions.
      </p>
    </main>
  )
}

export default Home
