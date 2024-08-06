import { Loader } from "@/components/Shared/Loader";
import { useGetAccountByProponentId } from "@/hooks/useAccounts";
import { useAccount } from "@/store/accountStore";
import { CircularProgress } from "@mui/material";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "react-oidc-context";

export const Route = createFileRoute("/oidc-callback")({
  component: OidcCallback,
});

function OidcCallback() {
  const { error: getAuthError, user } = useAuth();
  const {
    setAccount,
    proponentId,
    isLoading: isAccountStateLoading,
  } = useAccount();

  const { data: accountData, error: getAccountError } =
    useGetAccountByProponentId({
      proponentId: user?.profile.sub,
    });

  useEffect(() => {
    if (accountData) {
      setAccount({
        proponentId: accountData.data?.proponent_id,
        isLoading: false,
      });
    }
    if (getAccountError) {
      setAccount({
        isLoading: false,
      });
    }
  }, [accountData, getAccountError]);

  if (getAuthError) {
    return <Navigate to="/error" />;
  }

  if (isAccountStateLoading) {
    return <Loader />;
  }

  if (proponentId) {
    return <Navigate to="/profile" />;
  }

  return <Navigate to="/registration/create-account"></Navigate>;
}
