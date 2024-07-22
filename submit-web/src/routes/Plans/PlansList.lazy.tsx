import { createLazyFileRoute } from "@tanstack/react-router";
import PlanListPage from "@/pages/Plans/PlanListPage";

export const Route = createLazyFileRoute("/Plans/PlansList")({
  component: PlanListPage,
});
