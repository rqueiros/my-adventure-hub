import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getRouter } from "./router";
import { initContent, refreshContent } from "./content/loader";
import "./styles.css";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60_000, refetchOnWindowFocus: false } },
});
const router = getRouter(queryClient);

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootEl = document.getElementById("root")!;

// Fetch markdown content from /public/content/*.md BEFORE first render so
// every page sees fully populated data. Nothing is bundled into JS — edit
// any file in public/content/ to update the site.
initContent().finally(() => {
  createRoot(rootEl).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>,
  );
});

// Refresh content when the tab regains focus / becomes visible — useful
// after editing a markdown file: no full reload needed to see new items.
if (typeof window !== "undefined") {
  window.addEventListener("focus", () => { void refreshContent(); });
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") void refreshContent();
  });
}
