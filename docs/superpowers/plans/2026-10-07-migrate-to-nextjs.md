# Migrate Web App to Next.js (Vite → Next.js App Router)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Vite SPA with Next.js App Router so that the public pages (`/` and `/projects/:slug`) are server-rendered and cached at Vercel's edge — eliminating the Render cold-start wait for visitors.

**Architecture:** Public pages become Server Components that fetch data from the Fastify API at build/revalidation time; Vercel serves the cached HTML instantly. Fastify calls `POST /api/revalidate` on the Next.js app after every portfolio mutation (hero, project, experience), triggering `revalidateTag('portfolio')` so the cache is invalidated immediately. The admin section (`/~/admin`) and sign-in page remain client-side with React Query unchanged.

**Tech Stack:** Next.js 15 (App Router), Tailwind v4 via `@tailwindcss/postcss`, `@tanstack/react-query` (admin only), axios (admin only), `@t3-oss/env-core`, existing shadcn/Radix components, Fastify (unchanged on Render).

**Spec:** This plan implements the decisions documented in the session that produced it. Backend stays on Render. Admin stays client-side. Revalidation is on-demand (not time-based). A `revalidate = 3600` fallback is included as a safety net.

## Global Constraints

- Next.js version: `^15.0.0`
- Tailwind: v4 — use `@tailwindcss/postcss`, NOT `tailwind.config.js`
- TypeScript strict mode on
- Path alias `@` → `./src` must be preserved (all existing module imports use it)
- Admin URL remains `/~/admin/*` (tilde is a valid URL/filesystem character)
- No new API endpoints added to Fastify — only mutation handlers gain a revalidation side-effect call
- `REVALIDATION_SECRET` env var must be set on both Next.js (Vercel) and Fastify (Render) sides
- Do not add `"use client"` to server components; only the admin/auth pages and their sub-components carry it
- Intro terminal animation (`HeroPageSkeleton`) is **removed** — its sole purpose was masking API load time, which no longer exists with SSR

## Review Focus

- `generateStaticParams` fetches projects at build time; if Render is cold during CI build, the `fetch` will time out and the build fails — add a `try/catch` fallback that returns `[]` (dynamic fallback via `dynamicParams = true`).
- Revalidation endpoint must reject requests with wrong or missing secret with `401`, not silently succeed — verify the `Authorization` header check returns early.
- `NEXT_PUBLIC_SERVER_URL` is exposed to the browser bundle; confirm no private credentials are embedded in the API responses cached by Next.js.
- The admin `QueryClientProvider` wraps client components including the sign-in page (which calls `useMutation`); if it is placed only in the admin layout, sign-in breaks — place `Providers` in the root layout.
- `useNavigate(-1)` in the project detail back button has no server equivalent; the replacement `BackButton` must be `"use client"` — verify it compiles without "hooks cannot be used in server components" errors.

---

## Task 1: Feature branch + Next.js bootstrap

**Files:**
- Modify: `apps/web/package.json`
- Create: `apps/web/next.config.ts`
- Create: `apps/web/postcss.config.ts`
- Modify: `apps/web/tsconfig.json`
- Delete: `apps/web/tsconfig.app.json`, `apps/web/tsconfig.node.json`
- Modify: `apps/web/components.json`
- Modify: `turbo.json`

**Interfaces:**
- Produces: a compilable Next.js project skeleton (no pages yet — `next build` will fail until Task 3 adds `app/layout.tsx`, but `tsc --noEmit` should pass once the tsconfig is correct)

- [ ] **Step 1: Create the feature branch**

```bash
git checkout -b feat/migrate-to-nextjs
```

- [ ] **Step 2: Replace deps in `apps/web/package.json`**

Remove: `vite`, `@vitejs/plugin-react`, `@tailwindcss/vite`, `react-router`, `tsconfig.node.json` ref.  
Add: `next@^15.0.0`, `@tailwindcss/postcss`.  
Keep everything else (shadcn, tanstack-query, axios, etc.).

```json
{
  "name": "web",
  "private": true,
  "version": "0.0.0",
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@blocknote/core": "^0.51.4",
    "@blocknote/react": "^0.51.4",
    "@blocknote/shadcn": "^0.51.4",
    "@fontsource-variable/jetbrains-mono": "^5.2.8",
    "@hookform/resolvers": "^5.4.0",
    "@phosphor-icons/react": "^2.1.10",
    "@tanstack/react-query": "^5.101.1",
    "axios": "^1.18.1",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "date-fns": "^4.4.0",
    "lucide-react": "^1.21.0",
    "mermaid": "^11.15.0",
    "next": "^15.0.0",
    "next-themes": "catalog:",
    "radix-ui": "^1.6.0",
    "react": "^19.2.6",
    "react-dom": "^19.2.6",
    "react-hook-form": "^7.80.0",
    "react-markdown": "^10.1.0",
    "react-movable": "^3.4.1",
    "remark-gfm": "^4.0.1",
    "shadcn": "^4.11.0",
    "slugify": "^1.6.9",
    "sonner": "^2.0.7",
    "tailwind-merge": "^3.6.0",
    "tailwindcss": "^4.3.1",
    "@tailwindcss/postcss": "^4.3.1",
    "tw-animate-css": "^1.4.0",
    "zod": "catalog:"
  },
  "devDependencies": {
    "@types/node": "^24.12.3",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "typescript": "~6.0.2"
  }
}
```

- [ ] **Step 3: Create `apps/web/next.config.ts`**

```ts
import type { NextConfig } from "next";

const config: NextConfig = {};

export default config;
```

- [ ] **Step 4: Create `apps/web/postcss.config.ts`**

```ts
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

- [ ] **Step 5: Replace `apps/web/tsconfig.json`**

Delete `tsconfig.app.json` and `tsconfig.node.json` — they are Vite artefacts.  
Write a new `apps/web/tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 6: Update `apps/web/components.json`**

Change `"rsc": false` → `"rsc": true`.

- [ ] **Step 7: Update `turbo.json` build outputs**

Add `.next/**` to the `build` task outputs:

```json
"build": {
  "dependsOn": ["^build"],
  "inputs": ["$TURBO_DEFAULT$", ".env*"],
  "outputs": ["dist/**", ".next/**"]
}
```

- [ ] **Step 8: Install deps**

```bash
pnpm install
```

- [ ] **Step 9: Commit**

```bash
git add apps/web/package.json apps/web/next.config.ts apps/web/postcss.config.ts apps/web/tsconfig.json apps/web/components.json turbo.json
git commit -m "chore(web): substituir vite por next.js 15"
```

---

## Task 2: Environment variables

**Files:**
- Modify: `packages/env/src/web.ts`
- Modify: `packages/env/src/server.ts`
- Modify: `apps/web/src/infra/http/api-http-client.ts`

**Interfaces:**
- Produces: `env.NEXT_PUBLIC_SERVER_URL` (replaces `VITE_SERVER_URL`) and `env.REVALIDATION_SECRET` from `packages/env/src/web.ts`; `env.WEB_URL` and `env.REVALIDATION_SECRET` from `packages/env/src/server.ts`

- [ ] **Step 1: Update `packages/env/src/web.ts`**

Replace `VITE_` prefix with `NEXT_PUBLIC_` and switch to `process.env`:

```ts
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  clientPrefix: "NEXT_PUBLIC_",
  client: {
    NEXT_PUBLIC_SERVER_URL: z.string().url(),
  },
  server: {
    REVALIDATION_SECRET: z.string().min(1),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
```

- [ ] **Step 2: Update `packages/env/src/server.ts`**

Add `WEB_URL` and `REVALIDATION_SECRET`:

```ts
import "dotenv/config";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    CORS_ORIGIN: z.string().url(),
    SERVER_URL: z.string().url(),
    WEB_URL: z.string().url(),
    REVALIDATION_SECRET: z.string().min(1),
    PORT: z.coerce.number().default(3000),
    JWT_SECRET: z.string().min(32),
    REFRESH_TOKEN_EXPIRY_IN_DAYS: z.coerce.number().default(30),
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
  },
  runtimeEnv: process.env,
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
```

- [ ] **Step 3: Update `apps/web/src/infra/http/api-http-client.ts`**

Change `env.VITE_SERVER_URL` → `env.NEXT_PUBLIC_SERVER_URL`:

```ts
import { env } from "@portfolio/env/web";
import axios, type { InternalAxiosRequestConfig } from "axios";

export const apiHttpClient = axios.create({
  baseURL: env.NEXT_PUBLIC_SERVER_URL,
  withCredentials: true,
});
```

(Keep the rest of the interceptor code unchanged.)

- [ ] **Step 4: Add env vars to Vercel and Render**

On **Vercel** (web app): add `NEXT_PUBLIC_SERVER_URL`, `REVALIDATION_SECRET`.  
On **Render** (server app): add `WEB_URL` (the Vercel deployment URL, e.g. `https://www.hugomos.com`), `REVALIDATION_SECRET` (same value).

- [ ] **Step 5: Commit**

```bash
git add packages/env/src/web.ts packages/env/src/server.ts apps/web/src/infra/http/api-http-client.ts
git commit -m "chore(env): migrar variáveis para next.js e adicionar segredo de revalidação"
```

---

## Task 3: App shell — root layout, styles, providers

**Files:**
- Create: `apps/web/src/app/layout.tsx`
- Create: `apps/web/src/app/(public)/layout.tsx`
- Create: `apps/web/src/app/globals.css` (copy of `src/presentation/index.css`)
- Create: `apps/web/src/components/providers.tsx`
- Delete: `apps/web/src/presentation/main.tsx` (old entry point)
- Delete: `apps/web/index.html` (Vite entry)

**Interfaces:**
- Consumes: ThemeProvider, Toaster, QueryClient from existing components
- Produces: `<RootLayout>` (server, wraps all routes) and `<PublicLayout>` (container + footer for `/` and `/projects/*`)

- [ ] **Step 1: Create `apps/web/src/components/providers.tsx`**

This is the React Query provider — must be `"use client"` since `QueryClient` is browser state:

```tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
```

- [ ] **Step 2: Copy `src/presentation/index.css` → `src/app/globals.css`**

The file content is identical — just copy it. The `@import "tailwindcss"` directive is already Tailwind v4 syntax.

- [ ] **Step 3: Create `apps/web/src/app/layout.tsx`**

Root layout — server component, sets up HTML shell, fonts, theme, toasts:

```tsx
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/presentation/components/theme-provider";
import { Toaster } from "@/presentation/components/ui/sonner";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "Vitor Hugo | Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <ThemeProvider defaultTheme="dark" storageKey="hugomos-ui-theme">
            <Toaster richColors />
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Create `apps/web/src/app/(public)/layout.tsx`**

Public route group layout — adds the container and footer. Server component:

```tsx
import { Separator } from "@/presentation/components/ui/separator";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-10 md:px-8">
      {children}
      <footer className="mt-16">
        <Separator className="mb-6" />
        <p className="text-muted-foreground text-xs">
          © {new Date().getFullYear()} Vitor Hugo Oliveira
        </p>
      </footer>
    </div>
  );
}
```

- [ ] **Step 5: Delete old entry files**

```bash
rm apps/web/src/presentation/main.tsx
rm apps/web/index.html
rm apps/web/vite.config.ts
```

- [ ] **Step 6: Verify `pnpm --filter web build` fails only on missing pages**

The error at this point should be "No pages found in the app directory" — not a TypeScript or config error.

- [ ] **Step 7: Commit**

```bash
git add apps/web/src/app/ apps/web/src/components/providers.tsx
git commit -m "feat(web): adicionar shell do app next.js com layout raiz e estilos globais"
```

---

## Task 4: Public pages — Server Components

**Files:**
- Create: `apps/web/src/lib/server-api.ts`
- Create: `apps/web/src/app/(public)/page.tsx`
- Create: `apps/web/src/app/(public)/projects/[slug]/page.tsx`
- Create: `apps/web/src/app/(public)/projects/[slug]/components/back-button.tsx`
- Modify: `apps/web/src/presentation/app/(public)/@sections/experience/index.tsx`
- Modify: `apps/web/src/presentation/app/(public)/@sections/projects/index.tsx`
- Modify: `apps/web/src/presentation/app/(public)/@sections/projects/$slug/index.tsx`

**Interfaces:**
- Consumes: `HeroDTO`, `ProjectDTO`, `ExperienceDTO` from existing `src/modules/portfolio/*/dto.ts`
- Produces: pre-rendered HTML pages at `/` and `/projects/[slug]` served from Vercel edge cache

- [ ] **Step 1: Create `apps/web/src/lib/server-api.ts`**

Server-side fetch utilities. Uses `next: { tags: ['portfolio'] }` for tagged cache invalidation and `NEXT_PUBLIC_SERVER_URL` (available on server in Next.js):

```ts
import type { ExperienceDTO } from "@/modules/portfolio/experience/dto";
import type { HeroDTO } from "@/modules/portfolio/hero/dto";
import type { ProjectDTO } from "@/modules/portfolio/project/dto";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    next: { tags: ["portfolio"] },
  });
  if (!res.ok) throw new Error(`API error ${res.status} for ${path}`);
  return res.json() as Promise<T>;
}

export function getHeroServerSide(): Promise<HeroDTO> {
  return apiFetch<HeroDTO>("/api/portfolio/hero");
}

export function getProjectsServerSide(): Promise<ProjectDTO[]> {
  return apiFetch<ProjectDTO[]>("/api/portfolio/projects");
}

export function getExperiencesServerSide(): Promise<ExperienceDTO[]> {
  return apiFetch<ExperienceDTO[]>("/api/portfolio/experiences");
}
```

- [ ] **Step 2: Modify `Experience` section to accept props**

Replace internal `useExperiences()` call with a required `experiences` prop.  
File: `apps/web/src/presentation/app/(public)/@sections/experience/index.tsx`

```tsx
import type React from "react";
import type { ExperienceDTO } from "@/modules/portfolio/experience/dto";
import { SectionTitle } from "@/presentation/components/section-title";
import { Separator } from "@/presentation/components/ui/separator";
import { ExperienceItem } from "./components/experience-item";

interface ExperienceProps {
  experiences: ExperienceDTO[];
}

export const Experience: React.FC<ExperienceProps> = ({ experiences }) => {
  if (!experiences.length) return null;

  return (
    <section className="space-y-6">
      <SectionTitle>Experience</SectionTitle>
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div key={exp.id} className="space-y-6">
            <ExperienceItem experience={exp} />
            {index < experiences.length - 1 && <Separator />}
          </div>
        ))}
      </div>
    </section>
  );
};
```

- [ ] **Step 3: Modify `Projects` section to accept props**

Replace internal `useProjects()` with a required `projects` prop.  
File: `apps/web/src/presentation/app/(public)/@sections/projects/index.tsx`

```tsx
import type React from "react";
import type { ProjectDTO } from "@/modules/portfolio/project/dto";
import { categoryLabels, categoryOrder } from "@/modules/portfolio/project/dto";
import { SectionTitle } from "@/presentation/components/section-title";
import { ProjectGroup } from "./@components/project-group";

interface ProjectsProps {
  projects: ProjectDTO[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  if (!projects.length) return null;

  const grouped = categoryOrder
    .map((cat) => ({
      category: cat,
      label: categoryLabels[cat],
      projects: projects.filter((p) => p.category === cat),
    }))
    .filter((g) => g.projects.length > 0);

  return (
    <div className="space-y-8">
      <SectionTitle as="h2">Projects</SectionTitle>
      <div className="space-y-10">
        {grouped.map((group) => (
          <ProjectGroup
            key={group.category}
            label={group.label}
            projects={group.projects}
          />
        ))}
      </div>
    </div>
  );
};
```

- [ ] **Step 4: Create `apps/web/src/app/(public)/page.tsx`**

Homepage Server Component. Fetches all data in parallel (`async-parallel` rule from Vercel best practices):

```tsx
import { Experience } from "@/presentation/app/(public)/@sections/experience";
import { Hero } from "@/presentation/app/(public)/@sections/hero";
import { Projects } from "@/presentation/app/(public)/@sections/projects";
import {
  getExperiencesServerSide,
  getHeroServerSide,
  getProjectsServerSide,
} from "@/lib/server-api";

export const revalidate = 3600;

export default async function HomePage() {
  const [hero, allProjects, allExperiences] = await Promise.all([
    getHeroServerSide(),
    getProjectsServerSide(),
    getExperiencesServerSide(),
  ]);

  const projects = allProjects.filter((p) => p.visible);
  const experiences = allExperiences.filter((e) => e.visible);

  return (
    <main className="space-y-12">
      <Hero hero={hero} />
      <Experience experiences={experiences} />
      <Projects projects={projects} />
    </main>
  );
}
```

- [ ] **Step 5: Create `BackButton` client component**

`useNavigate(-1)` cannot run in a Server Component.  
File: `apps/web/src/app/(public)/projects/[slug]/components/back-button.tsx`

```tsx
"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="inline-flex items-center gap-1.5 text-muted-foreground text-xs transition-colors hover:text-foreground"
    >
      <ArrowLeft className="size-3" />
      back
    </button>
  );
}
```

- [ ] **Step 6: Create `apps/web/src/app/(public)/projects/[slug]/page.tsx`**

Project detail Server Component with static params generation:

```tsx
import { notFound } from "next/navigation";
import { GithubLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { Globe } from "lucide-react";
import Link from "next/link";
import { categoryLabels, statusColors } from "@/modules/portfolio/project/dto";
import { getProjectsServerSide } from "@/lib/server-api";
import { SectionTitle } from "@/presentation/components/section-title";
import { Button } from "@/presentation/components/ui/button";
import { Separator } from "@/presentation/components/ui/separator";
import { MarkdownContent } from "@/presentation/app/(public)/@sections/projects/$slug/components/markdown-content";
import { BackButton } from "./components/back-button";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const projects = await getProjectsServerSide();
    return projects
      .filter((p) => p.visible)
      .map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projects = await getProjectsServerSide();
  const project = projects.find((p) => p.slug === slug && p.visible);

  if (!project) notFound();

  const {
    title,
    category,
    status,
    summary,
    impact,
    techs,
    repositoryUrl,
    liveUrl,
    highlights,
    content,
  } = project;

  return (
    <div className="space-y-8">
      <BackButton />

      <header className="space-y-3">
        <h1 className="font-bold text-xl tracking-tight sm:text-2xl">{title}</h1>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-muted-foreground">{categoryLabels[category]}</span>
          <span className="text-muted-foreground">·</span>
          <span className={statusColors[status]}>{status}</span>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">{summary}</p>
        {impact && <p className="text-muted-foreground/60 text-xs">{impact}</p>}
      </header>

      {(repositoryUrl || liveUrl) && (
        <div className="flex flex-wrap gap-3">
          {repositoryUrl && (
            <Button variant="outline" size="sm" className="group" asChild>
              <Link href={repositoryUrl} target="_blank" rel="noopener noreferrer">
                <GithubLogoIcon className="mr-2 size-4 text-zinc-400 transition-colors group-hover:text-foreground" />
                GitHub
              </Link>
            </Button>
          )}
          {liveUrl && (
            <Button variant="outline" size="sm" className="group" asChild>
              <Link href={liveUrl} target="_blank" rel="noopener noreferrer">
                <Globe className="mr-2 size-4 text-zinc-400 transition-colors group-hover:text-foreground" />
                Live
              </Link>
            </Button>
          )}
        </div>
      )}

      {techs && techs.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {techs.map((t) => (
            <span
              key={t.name}
              className="rounded border border-border px-2 py-0.5 text-muted-foreground text-xs"
            >
              {t.name}
            </span>
          ))}
        </div>
      )}

      <Separator />

      {highlights && highlights.length > 0 && (
        <>
          <div className="space-y-4">
            <SectionTitle>highlights</SectionTitle>
            <ul className="space-y-2">
              {highlights.map((h) => (
                <li key={h.sortOrder} className="flex gap-2 text-muted-foreground text-sm">
                  <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground/40" />
                  <span>{h.content}</span>
                </li>
              ))}
            </ul>
          </div>
          <Separator />
        </>
      )}

      {content && <MarkdownContent content={content} />}
    </div>
  );
}
```

- [ ] **Step 7: Verify pages build**

```bash
pnpm --filter web build
```

Expected: build succeeds, Next.js reports static generation for `/` and `/projects/[slug]`.

- [ ] **Step 8: Commit**

```bash
git add apps/web/src/lib/ apps/web/src/app/\(public\)/ apps/web/src/presentation/app/\(public\)/@sections/
git commit -m "feat(web): adicionar páginas públicas como server components com ISR"
```

---

## Task 5: Revalidation API Route (Next.js side)

**Files:**
- Create: `apps/web/src/app/api/revalidate/route.ts`

**Interfaces:**
- Consumes: `Authorization: Bearer <REVALIDATION_SECRET>` header
- Produces: `POST /api/revalidate` → 200 (revalidated) or 401 (wrong secret)

- [ ] **Step 1: Create `apps/web/src/app/api/revalidate/route.ts`**

```ts
import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { env } from "@portfolio/env/web";

export async function POST(request: NextRequest) {
  const auth = request.headers.get("authorization");
  const token = auth?.replace("Bearer ", "");

  if (token !== env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  revalidateTag("portfolio");
  return NextResponse.json({ revalidated: true });
}
```

- [ ] **Step 2: Verify endpoint locally**

With the dev server running:

```bash
curl -X POST http://localhost:3000/api/revalidate \
  -H "Authorization: Bearer wrong-secret"
# Expected: {"error":"Unauthorized"} with status 401

curl -X POST http://localhost:3000/api/revalidate \
  -H "Authorization: Bearer <your-secret>"
# Expected: {"revalidated":true} with status 200
```

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/app/api/revalidate/route.ts
git commit -m "feat(web): adicionar endpoint de revalidação de cache on-demand"
```

---

## Task 6: Fastify — trigger revalidation after mutations

**Files:**
- Create: `apps/server/src/infra/http/revalidate.ts`
- Modify: `apps/server/src/modules/portfolio/features/hero/routes.ts`
- Modify: `apps/server/src/modules/portfolio/features/project/routes.ts`
- Modify: `apps/server/src/modules/portfolio/features/experience/routes.ts`

**Interfaces:**
- Consumes: `env.WEB_URL`, `env.REVALIDATION_SECRET` from `@portfolio/env/server`
- Produces: side-effect call to Next.js revalidation endpoint after each portfolio mutation

- [ ] **Step 1: Create `apps/server/src/infra/http/revalidate.ts`**

Fire-and-forget: if the call fails (e.g. network blip), it logs a warning and does not throw — the `revalidate = 3600` fallback on the Next.js side ensures eventual consistency:

```ts
import { env } from "@portfolio/env/server";
import { logger } from "@/infra/logger";

export async function triggerRevalidation(): Promise<void> {
  try {
    const res = await fetch(`${env.WEB_URL}/api/revalidate`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.REVALIDATION_SECRET}`,
      },
    });
    if (!res.ok) {
      logger.warn(`revalidation endpoint returned ${res.status}`);
    }
  } catch (err) {
    logger.warn({ err }, "failed to trigger revalidation");
  }
}
```

- [ ] **Step 2: Update hero routes — add revalidation after mutations**

In `apps/server/src/modules/portfolio/features/hero/routes.ts`, import `triggerRevalidation` and call it at the end of the `PUT /portfolio/hero` and `PUT /portfolio/hero/skills` handlers:

```ts
import { triggerRevalidation } from "@/infra/http/revalidate";
// ...

// inside PUT /portfolio/hero handler, after controller call:
async (request, reply) => {
  const result = await controllerFactory.updateHero.handle(reply, request.input);
  void triggerRevalidation();
  return result;
},

// inside PUT /portfolio/hero/skills handler:
async (request, reply) => {
  const result = await controllerFactory.replaceSkills.handle(reply, request.input);
  void triggerRevalidation();
  return result;
},
```

- [ ] **Step 3: Update project routes — add revalidation after mutations**

Mutating project routes: `POST /portfolio/projects`, `PUT /portfolio/projects/:id`, `PATCH /portfolio/projects/:id/toggle-active`, `PUT /portfolio/projects/:id/highlights`, `PUT /portfolio/projects/:id/techs`, `DELETE /portfolio/projects/:id`.

Add `void triggerRevalidation()` to each handler after the controller call. Pattern (same for all six):

```ts
async (request, reply) => {
  const result = await controllerFactory.createProject.handle(reply, request.input);
  void triggerRevalidation();
  return result;
},
```

- [ ] **Step 4: Update experience routes — add revalidation after mutations**

Mutating experience routes: `POST /portfolio/experiences`, `PUT /portfolio/experiences/:id`, `PATCH /portfolio/experiences/:id/toggle-active`, `PUT /portfolio/experiences/:id/highlights`, `DELETE /portfolio/experiences/:id`.

Same pattern as Step 3.

- [ ] **Step 5: Smoke test**

Start both server and web locally. Update a project title in admin. Within a few seconds, reload `/` and verify the title change is reflected (ISR revalidated).

- [ ] **Step 6: Commit**

```bash
git add apps/server/src/infra/http/revalidate.ts \
  apps/server/src/modules/portfolio/features/hero/routes.ts \
  apps/server/src/modules/portfolio/features/project/routes.ts \
  apps/server/src/modules/portfolio/features/experience/routes.ts
git commit -m "feat(server): chamar revalidação do next.js após mutações de portfólio"
```

---

## Task 7: Admin and Auth pages (client-side)

**Files:**
- Create: `apps/web/src/app/auth/sign-in/page.tsx`
- Create: `apps/web/src/app/~/admin/layout.tsx`
- Create: `apps/web/src/app/~/admin/page.tsx`
- Create: `apps/web/src/app/~/admin/projects/page.tsx`
- Create: `apps/web/src/app/~/admin/projects/new/page.tsx`
- Create: `apps/web/src/app/~/admin/projects/[id]/page.tsx`
- Create: `apps/web/src/app/~/admin/experiences/page.tsx`
- Create: `apps/web/src/app/~/admin/experiences/new/page.tsx`
- Create: `apps/web/src/app/~/admin/experiences/[id]/page.tsx`
- Create: `apps/web/src/app/~/admin/hero/page.tsx`
- Modify: `apps/web/src/presentation/app/(admin)/@components/auth-guard.tsx`
- Modify: `apps/web/src/presentation/app/(admin)/@components/header.tsx`

**Interfaces:**
- Consumes: existing admin form components from `src/presentation/app/(admin)/`
- Produces: routed admin pages accessible at `/~/admin/*`

- [ ] **Step 1: Update `AuthGuard` — replace React Router with Next.js**

`Outlet` → `children` prop. `useNavigate` + `useLocation` → `useRouter` + `usePathname`:

```tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMe } from "@/modules/identity/user/hooks/useMe";
import { SectionLoadingSkeleton } from "@/presentation/components/section-loading-skeleton";

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const router = useRouter();
  const { user, userIsLoading } = useMe();

  useEffect(() => {
    if (!userIsLoading && !user) {
      router.replace("/auth/sign-in");
    }
  }, [router, user, userIsLoading]);

  if (userIsLoading) return <SectionLoadingSkeleton />;
  if (!user) return null;

  return <>{children}</>;
};
```

- [ ] **Step 2: Update `Header` — replace React Router with Next.js**

`Link` from `react-router` → `Link` from `next/link`. `useLocation` → `usePathname`. `useNavigate` → `useRouter`:

```tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSignOut } from "@/modules/identity/authentication/hooks/use-sign-out";
import { Button } from "@/presentation/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/presentation/components/ui/navigation-menu";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { handleSignOut, signOutIsPending } = useSignOut({
    navigate: (path) => router.push(path),
  });

  return (
    <header className="flex items-center justify-between border-b px-4 py-2">
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/">Portfolio</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              data-active={pathname.startsWith("/~/admin/projects")}
            >
              <Link href="/~/admin/projects">Projects</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              data-active={pathname.startsWith("/~/admin/experiences")}
            >
              <Link href="/~/admin/experiences">Experiences</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              data-active={pathname === "/~/admin/hero"}
            >
              <Link href="/~/admin/hero">Hero</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <Button
        variant="ghost"
        size="sm"
        className="hover:text-destructive"
        onClick={handleSignOut}
        disabled={signOutIsPending}
      >
        Sign out
      </Button>
    </header>
  );
};
```

- [ ] **Step 3: Update sign-in hook — replace `useNavigate` with passed `navigate`**

Check `apps/web/src/modules/identity/authentication/hooks/use-sign-in.tsx` — it already receives `navigate` as a prop, so no change needed. The sign-in form component that calls it needs to pass `router.push`:

Look at `apps/web/src/presentation/app/(public)/auth/sign-in/components/sign-in-form/index.tsx` — if it imports `useNavigate`, replace with `useRouter().push`.

- [ ] **Step 4: Create `apps/web/src/app/auth/sign-in/page.tsx`**

Thin wrapper — marks as client, re-exports existing `SignIn` component:

```tsx
"use client";

import { SignIn } from "@/presentation/app/(public)/auth/sign-in";

export default function SignInPage() {
  return <SignIn />;
}
```

- [ ] **Step 5: Create `apps/web/src/app/~/admin/layout.tsx`**

Admin layout: AuthGuard + AdminRootLayout. Must be `"use client"` because AuthGuard is a client component:

```tsx
"use client";

import { AuthGuard } from "@/presentation/app/(admin)/@components/auth-guard";
import { Header } from "@/presentation/app/(admin)/@components/header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 p-4">{children}</main>
      </div>
    </AuthGuard>
  );
}
```

- [ ] **Step 6: Create admin index page `apps/web/src/app/~/admin/page.tsx`**

```tsx
import { redirect } from "next/navigation";

export default function AdminIndexPage() {
  redirect("/~/admin/projects");
}
```

- [ ] **Step 7: Create remaining admin pages**

Each page is a thin `"use client"` wrapper that re-exports the existing component. Create these six files:

**`apps/web/src/app/~/admin/projects/page.tsx`**
```tsx
"use client";
import { Projects } from "@/presentation/app/(admin)/projects";
export default function AdminProjectsPage() { return <Projects />; }
```

**`apps/web/src/app/~/admin/projects/new/page.tsx`**
```tsx
"use client";
import { NewProject } from "@/presentation/app/(admin)/projects/new";
export default function NewProjectPage() { return <NewProject />; }
```

**`apps/web/src/app/~/admin/projects/[id]/page.tsx`**
```tsx
"use client";
import { useParams } from "next/navigation";
import { EditProject } from "@/presentation/app/(admin)/projects/$id";
export default function EditProjectPage() {
  const { id } = useParams<{ id: string }>();
  return <EditProject id={id} />;
}
```

**`apps/web/src/app/~/admin/experiences/page.tsx`**
```tsx
"use client";
import { Experiences } from "@/presentation/app/(admin)/experiences";
export default function AdminExperiencesPage() { return <Experiences />; }
```

**`apps/web/src/app/~/admin/experiences/new/page.tsx`**
```tsx
"use client";
import { NewExperience } from "@/presentation/app/(admin)/experiences/new";
export default function NewExperiencePage() { return <NewExperience />; }
```

**`apps/web/src/app/~/admin/experiences/[id]/page.tsx`**
```tsx
"use client";
import { useParams } from "next/navigation";
import { EditExperience } from "@/presentation/app/(admin)/experiences/$id";
export default function EditExperiencePage() {
  const { id } = useParams<{ id: string }>();
  return <EditExperience id={id} />;
}
```

**`apps/web/src/app/~/admin/hero/page.tsx`**
```tsx
"use client";
import { EditHero } from "@/presentation/app/(admin)/hero";
export default function AdminHeroPage() { return <EditHero />; }
```

> **Note:** The existing admin components (`Projects`, `NewProject`, `EditProject`, etc.) may use `useNavigate`/`useParams` from `react-router`. Before this step, audit each one and replace:
> - `useNavigate()` → `const router = useRouter(); const navigate = router.push;`
> - `useParams()` from `react-router` → receive `id` as a prop (passed from the page wrapper above)
> - `Link` from `react-router` → `Link` from `next/link`

- [ ] **Step 8: Verify admin flow**

```bash
pnpm --filter web dev
```

Navigate to `/auth/sign-in`, sign in, confirm redirect to `/~/admin/projects`. Create/edit a project, confirm it saves and redirects correctly.

- [ ] **Step 9: Commit**

```bash
git add apps/web/src/app/auth/ apps/web/src/app/~/  \
  apps/web/src/presentation/app/\(admin\)/@components/
git commit -m "feat(web): migrar páginas de admin e auth para next.js app router"
```

---

## Task 8: Cleanup

**Files:**
- Delete: `apps/web/src/presentation/app/index.tsx` (React Router app root)
- Delete: `apps/web/src/presentation/app/(public)/_layout.tsx` (replaced by Next.js layout)
- Delete: `apps/web/src/presentation/app/(public)/@components/skeleton.tsx` (intro animation removed)
- Delete: `apps/web/vercel.json` (SPA rewrite rule no longer needed)
- Delete: `apps/web/src/infra/http/query-client.ts` (QueryClient now lives in `providers.tsx`)
- Modify: `apps/web/src/presentation/app/+not-found.tsx` → move to `apps/web/src/app/not-found.tsx`

**Interfaces:**
- Produces: clean repository with no Vite/React-Router artefacts

- [ ] **Step 1: Move not-found page**

Create `apps/web/src/app/not-found.tsx` (Next.js convention):

```tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="space-y-2 text-center">
        <p className="text-muted-foreground text-sm">Page not found.</p>
        <Link href="/" className="text-xs underline">
          go home
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Delete obsolete files**

```bash
rm apps/web/src/presentation/app/index.tsx
rm apps/web/src/presentation/app/+not-found.tsx
rm apps/web/src/presentation/app/\(public\)/_layout.tsx
rm apps/web/src/presentation/app/\(public\)/@components/skeleton.tsx
rm apps/web/vercel.json
rm apps/web/src/infra/http/query-client.ts
```

- [ ] **Step 3: Remove `query-client.ts` import from any remaining files**

```bash
grep -r "query-client" apps/web/src --include="*.ts" --include="*.tsx"
```

If any file still imports from `query-client.ts`, remove or update that import.

- [ ] **Step 4: Full build check**

```bash
pnpm --filter web build
```

Expected: clean build, no TypeScript errors.

- [ ] **Step 5: Final smoke test**

Visit `/`, `/projects/<any-slug>`, `/auth/sign-in`, `/~/admin/projects` — confirm all render correctly.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore(web): remover artefatos do vite e react-router após migração"
```
