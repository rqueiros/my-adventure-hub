import { createFileRoute } from "@tanstack/react-router";
import { AdminFacetPage } from "./admin";

export const Route = createFileRoute("/admin/$facet")({
  component: Page,
});

function Page() {
  const { facet } = Route.useParams();
  return <AdminFacetPage facet={facet} />;
}
