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
  const { isAuthenticated, error: getAuthError, user } = useAuth();
  const {
    setAccount,
    proponentId,
    isLoading: isAccountStateLoading,
  } = useAccount();
  const {
    data: accountData,
    isLoading: isGetAccountLoading,
    error: getAccountError,
  } = useGetAccountByProponentId({
    proponentId: user?.profile.sub,
  });

  useEffect(() => {
    if (accountData) {
      console.log("accountData", accountData);
      setAccount({
        proponentId: accountData.data?.proponent_id,
        isLoading: false,
      });
    }
  }, [accountData]);

  if (getAuthError || getAccountError) {
    return <h1>An error occured</h1>;
  }

  if (isAccountStateLoading) {
    return <Loader />;
  }

  if (proponentId) {
    return <Navigate to="/profile" />;
  }

  return <Navigate to="/registration/create-account"></Navigate>;
}
