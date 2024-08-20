import { PageLoader } from "@/components/Shared/PageLoader";
import { notify } from "@/components/Shared/Snackbar/snackbarStore";
import { OidcConfig } from "@/utils/config";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "react-oidc-context";

export const Route = createFileRoute("/registration")({
  component: Registration,
});

function Registration() {
  const { isAuthenticated, signinRedirect } = useAuth();
  const { proponent_id } = Route.useSearch<{
    proponent_id: string;
  }>();

  useEffect(() => {
    if (!proponent_id) {
      notify.error("registration link is invalid");
    } else if (!isAuthenticated) {
      signinRedirect({
        redirect_uri: `${OidcConfig.redirect_uri}?proponent_id=${proponent_id}`,
      });
    }
  }, [proponent_id, isAuthenticated, signinRedirect]);

  if (isAuthenticated || !proponent_id) {
    return <Navigate to={"/error"} />;
  }
  return <PageLoader />;
}
