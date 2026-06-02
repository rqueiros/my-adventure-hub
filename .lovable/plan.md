## Objetivo

Site totalmente estático (sem Node.js no servidor), conteúdo gerido por ficheiros markdown locais, gráficos no dashboard, novo avatar.

## 1. Arquitetura: TanStack Start (SSR) → Vite SPA

- Remover `@tanstack/react-start`, `createServerFn`, Cloudflare Worker, `src/server.ts`, `src/start.ts`, `src/lib/error-capture.ts`, `vite.config.ts` SSR config.
- Manter `@tanstack/react-router` mas em modo **browser history** (cliente puro).
- Novo `index.html` na raiz + `src/main.tsx` que monta o router.
- `vite build` produz `dist/` com `index.html` + assets — serve em qualquer host estático.
- Para hosts sem SPA fallback: adicionar pequeno script de prerender (rota → HTML estático) usando `vite-plugin-prerender` ou um script Node pós-build. Decisão: começar com SPA puro; se o teu host não fizer fallback, adicionamos prerender depois.

## 2. Remover Lovable Cloud / backoffice

Apagar:
- `src/routes/admin.tsx`, `admin.index.tsx`, `admin.$facet.tsx`, `login.tsx`
- `src/components/admin/`
- `src/lib/cms.functions.ts`, `admin.functions.ts`, `admin-config.ts`
- `src/hooks/use-cms.ts`
- `src/integrations/supabase/*`
- `supabase/` (migrations + config)
- `src/components/HudNav.tsx` link de admin

## 3. Conteúdo em markdown

Estrutura:
```
content/
  profile.md
  books/<slug>.md
  events/<slug>.md
  projects/<slug>.md
  travels/<slug>.md
  running/<slug>.md
  opinion/<slug>.md
  others/<slug>.md
  upcoming/<slug>.md
public/
  images/
    books/, events/, projects/, travels/, running/, opinion/, others/, upcoming/, profile/
```

Cada `.md` com frontmatter YAML + corpo (só relevante para `opinion`):
```md
---
title: Título
date: 2024-05-12
image: /images/events/talk-x.jpg
kind: talk
subtitle: ...
url: https://...
meta: 40 min
---
Corpo markdown (opinião)
```

Loader: `src/content/loader.ts` usa `import.meta.glob('/content/**/*.md', { eager: true, query: '?raw', import: 'default' })` + `gray-matter` para parse. Resultado tipado por faceta.

Seed: converter o conteúdo atual de `src/data/activity.ts` em ficheiros `.md` (script único `scripts/seed-content.ts` que corro localmente).

Páginas (`livros`, `eventos`, etc.) passam a ler do loader em vez de `activity.ts`. `activity.ts` mantém só types + helpers.

Detalhe de opinião (`/opiniao/$id`) lê body markdown e renderiza com `react-markdown` + `remark-gfm`.

## 4. Gráficos no dashboard

Usar `recharts` (já incluído pelo shadcn). Abaixo das caixas:
- **Timeline anual**: barras empilhadas por faceta, eixo X = ano.
- **Distribuição por faceta**: donut com % de cada faceta.
- **Heatmap mensal**: grelha 12×N anos, intensidade por nº de itens no mês.

Componentes em `src/components/charts/{TimelineChart,FacetDonut,MonthlyHeatmap}.tsx`. Dados agregados a partir do loader unificado.

## 5. Avatar

Atualizar `profile.md` (e fallback em `activity.ts`) com:
`https://dashboard.cip.ipp.pt/assets/9adc22ac-485b-4f86-877a-b352b7ff12c2?width=600&height=600&format=webp`

## 6. Contagem ORCID

Continua client-side fetch (já é). Sem mudança.

## Ordem de execução

1. Adicionar deps: `gray-matter`, `react-markdown`, `remark-gfm`. Remover `@tanstack/react-start`, `@supabase/*`, `@cloudflare/*`, `wrangler`, etc.
2. Migrar bootstrap para Vite SPA (`index.html`, `src/main.tsx`, novo `vite.config.ts`).
3. Criar loader + seed do `content/` a partir de `activity.ts`.
4. Adaptar rotas para ler do loader.
5. Apagar tudo de Supabase/admin.
6. Adicionar gráficos.
7. Atualizar avatar.

## Notas

- Imagens externas (URLs http) continuam a funcionar. Para imagens locais, pôr em `public/images/{faceta}/` e referenciar como `/images/...` no frontmatter.
- Para acrescentares conteúdo: criar novo `.md` na pasta da faceta + pôr imagem em `public/images/{faceta}/`. Build & deploy.
- README curto em `content/README.md` explica o fluxo.

Vou avançar de uma vez, é um batch grande mas coeso.
