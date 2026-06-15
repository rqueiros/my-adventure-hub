import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { componentTagger } from "lovable-tagger";
import { readFileSync, readdirSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import yaml from "js-yaml";

const SITE_URL = "https://www.ricardoqueiros.com";
const SITE_TITLE = "Ricardo Queirós — Opinion";
const SITE_DESC = "Op-eds and essays by Ricardo Queirós.";

function escapeXml(s: string) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildOpinionFeed(): string {
  const file = join(process.cwd(), "public", "content", "opinion.md");
  if (!existsSync(file)) return "";
  const raw = readFileSync(file, "utf8");
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  const data = (m ? (yaml.load(m[1]) as Record<string, unknown>) : {}) ?? {};
  const rawItems = Array.isArray((data as any).items) ? ((data as any).items as Record<string, unknown>[]) : [];
  const items = rawItems
    .map((it) => {
      const id = String(it.id ?? "");
      return {
        id,
        title: String(it.title ?? id),
        date: String(it.date ?? ""),
        magazine: String(it.magazine ?? ""),
        subtitle: String(it.subtitle ?? ""),
        url: `${SITE_URL}/opiniao/${id}`,
        body: String(it.body ?? "").trim(),
      };
    })
    .filter((it) => it.date)
    .sort((a, b) => b.date.localeCompare(a.date));

  const lastBuild = new Date().toUTCString();
  const itemXml = items
    .map(
      (it) => `    <item>
      <title>${escapeXml(it.title)}</title>
      <link>${it.url}</link>
      <guid isPermaLink="true">${it.url}</guid>
      <pubDate>${new Date(it.date).toUTCString()}</pubDate>
      ${it.magazine ? `<source url="${SITE_URL}">${escapeXml(it.magazine)}</source>` : ""}
      <description>${escapeXml(it.subtitle || it.body.slice(0, 280))}</description>
    </item>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESC)}</description>
    <language>pt-PT</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${itemXml}
  </channel>
</rss>
`;
}

function rssPlugin(): Plugin {
  return {
    name: "opinion-rss-feed",
    apply: () => true,
    configureServer(server) {
      server.middlewares.use("/feed.xml", (_req, res) => {
        res.setHeader("Content-Type", "application/rss+xml; charset=utf-8");
        res.end(buildOpinionFeed());
      });
    },
    closeBundle() {
      const outDir = join(process.cwd(), "dist");
      if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
      writeFileSync(join(outDir, "feed.xml"), buildOpinionFeed(), "utf8");
    },
  };
}

export default defineConfig(({ mode }) => ({
  plugins: [
    TanStackRouterVite({
      target: "react",
      autoCodeSplitting: true,
      routesDirectory: "./src/routes",
      generatedRouteTree: "./src/routeTree.gen.ts",
    }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
    rssPlugin(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  server: {
    host: "::",
    port: 8080,
    strictPort: true,
  },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
  resolve: {
    dedupe: ["react", "react-dom", "@tanstack/react-router", "@tanstack/react-query"],
  },
}));
