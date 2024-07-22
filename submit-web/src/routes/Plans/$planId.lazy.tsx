import { createLazyFileRoute } from "@tanstack/react-router";
import PlanPage from "@/pages/Plans/PlanPage";


export const Route = createLazyFileRoute("/Plans/$planId")({
  component: PlanPage,
});
