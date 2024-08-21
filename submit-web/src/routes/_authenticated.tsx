import { PageLoader } from "@/components/Shared/PageLoader";
import { useGetUserByGuid } from "@/hooks/api/useAccounts";
import { useAccount } from "@/store/accountStore";
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "react-oidc-context";

export const Route = createFileRoute("/_authenticated")({
  component: Auth,
});

function Auth() {
  const {
    isAuthenticated,
    signinRedirect,
    isLoading: isUserAuthLoading,
    user,
  } = useAuth();
  const { data: userAccountData, isPending: isUserAccountLoading } =
    useGetUserByGuid({
      guid: user?.profile.sub,
    });
  const { setAccount } = useAccount();

  const isLoading = isUserAuthLoading || isUserAccountLoading;

  useEffect(() => {
    if (!isAuthenticated && !isUserAuthLoading) {
      signinRedirect();
    }
    if (isAuthenticated && !isLoading) {
      setAccount({
        isLoading: false,
        proponentId: userAccountData?.account.proponent_id,
        accountId: userAccountData?.account.id,
      });
    }
  }, [
    isAuthenticated,
    isUserAuthLoading,
    signinRedirect,
    setAccount,
    userAccountData,
    isLoading,
  ]);

  if (isLoading) {
    return <PageLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return <Outlet />;
}
