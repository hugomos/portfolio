# Bugs encontrados na migração Vite → Next.js

## 1. `runtimeEnv: process.env` falha no cliente Next.js

**Arquivo:** `packages/env/src/web.ts`

**Sintoma:** Erro `❌ Invalid environment variables` no console do browser ao acessar rotas com componentes client-side.

**Causa:** O Next.js só faz static replacement de `process.env.VAR` quando a referência é **literal e explícita** no código. Ao passar o objeto `process.env` inteiro como `runtimeEnv`, o bundler não consegue inlinar os valores — a variável chega `undefined` no cliente e falha na validação do Zod.

**Solução:**
```ts
// antes
runtimeEnv: process.env,

// depois
runtimeEnv: {
  NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
  REVALIDATION_SECRET: process.env.REVALIDATION_SECRET,
},
```

---

## 2. PostCSS não processado pelo Turbopack com `.ts`

**Arquivo:** `apps/web/postcss.config.ts` → renomeado para `postcss.config.mjs`

**Sintoma:** Página renderizava sem nenhum estilo — classes Tailwind não eram geradas, diretivas `@apply` ficavam brutas no CSS compilado.

**Causa:** O Turbopack procura `postcss.config.js` ou `postcss.config.mjs`. Arquivos `.ts` são ignorados, então o plugin `@tailwindcss/postcss` nunca era invocado.

**Solução:** Renomear `postcss.config.ts` para `postcss.config.mjs` (mantendo a sintaxe ESM `export default`).
