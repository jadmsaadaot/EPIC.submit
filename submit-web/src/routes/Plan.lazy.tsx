import { createFileRoute } from "@tanstack/react-router";
import PlanPage from "@/pages/Plans/PlanPage";

export const Route = createFileRoute("/planslist/$planId")({
  component: PlanPage,
});
