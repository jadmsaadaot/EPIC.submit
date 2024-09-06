import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/_dashboard/projects/$projectId/submission-packages/submissions/$submissionId",
)({
  component: () => (
    <div>
      Hello
      /_authenticated/_dashboard/projects/$projectId/submission-packages/submissions/$submissionId!
    </div>
  ),
});

export function Submission() {}
