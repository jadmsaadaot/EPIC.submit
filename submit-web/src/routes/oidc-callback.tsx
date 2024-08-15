import { Loader } from "@/components/Shared/Loader";
import { useGetUserByGuid } from "@/hooks/api/useAccounts";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";

export const Route = createFileRoute("/oidc-callback")({
  component: OidcCallback,
});

function OidcCallback() {
  const { error: getAuthError, user: kcUser } = useAuth();
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const params = new URLSearchParams(window.location.search);
  const proponent_id = params.get("proponent_id");

  useEffect(() => {
    if (kcUser) {
      setIsAuthLoading(false);
    }
  }, [kcUser, setIsAuthLoading]);

  const { data: userData, isLoading: isUserDataLoading } = useGetUserByGuid({
    guid: kcUser?.profile.sub,
  });

  if (getAuthError) {
    return <Navigate to="/error" />;
  }

  if (userData?.account_id) {
    return <Navigate to="/projects" />;
  }

  if (!isAuthLoading && !isUserDataLoading) {
    return (
      <Navigate
        to="/registration/create-account"
        search={{
          proponent_id: proponent_id
            ? Number.parseInt(proponent_id)
            : undefined,
        }}
      />
    );
  }

  return <Loader />;
}
