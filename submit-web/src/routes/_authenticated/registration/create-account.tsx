import { TabPanel } from "@/components/registration/TabPanel";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/registration/create-account"
)({
  component: CreateAccount,
});

function CreateAccount() {
  return (
    <>
      <TabPanel />
    </>
  );
}
