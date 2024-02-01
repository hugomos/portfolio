import Link from 'next/link'
import React from 'react'

const Work: React.FC = () => {
  return (
    <main className="flex-1">
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">my work</h1>
      <div className="prose prose-neutral dark:prose-invert">
        <p>
          On a mission to build products developers love, and, along the way,
          write another page in the history of technology and development.
          Here's a summary of my work so far.
        </p>
        <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
        <h2 className="font-medium text-xl mb-1 tracking-tighter">
          Athenas Consultoria Agrícola e Laboratórios
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
          Software Developer
        </p>
        <p>
          I joined Athenas early as part of the{' '}
          <Link href="https://www.sp.senac.br/jovem-aprendiz-empresa">
            Young Apprentice program at Senac São Paulo
          </Link>
          . I worked for about a year on the agricultural consulting team and
          later transferred to the development team. I created scripts,
          developed plugins, and tools for automating processes from the office
          to the field.
        </p>
        <ul>
          <li>
            In 2021, within the consulting team, I gained insights into the
            significance of georeferenced points in precision agriculture. Using
            GPS, we marked points to collect data, such as soil samples. This
            data guides decisions regarding inputs and irrigation. Sending
            samples to the laboratory, based on these points, generates
            personalized recommendations, optimizing agricultural production and
            promoting sustainability.
          </li>
          <li>
            In 2022, already integrated into the development team, I contributed
            to the development of automation scripts using the Python language.
            I wrote technical documentation on the processes and scripts, and I
            developed a website with Next.js and TypeScript to make the
            documentation available.
          </li>
          <li>
            In 2023, I actively participated in decision-making related to the
            software developed by the team. I created tools and improved
            existing scripts. I also took part in the process of rewriting
            legacy code and in the development of a unified process management
            system.
          </li>
        </ul>
      </div>
    </main>
  )
}

export default Work
