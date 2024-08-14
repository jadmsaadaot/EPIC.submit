import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authenticated/_dashboard/projects")({
  component: NewPage,
  meta: () => [{ title: "Projects" }],
});

function NewPage() {
  return <></>;
}
