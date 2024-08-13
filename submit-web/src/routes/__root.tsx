import EAOAppBar from "@/components/Shared/EAOAppBar";
import Footer from "@/components/Shared/layout/Footer";
import PageNotFound from "@/components/Shared/PageNotFound";
import { Box } from "@mui/material";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { AuthContextProps } from "react-oidc-context";
type RouterContext = {
  authentication: AuthContextProps;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: Layout,
  notFoundComponent: PageNotFound,
  meta: () => [{ title: "Home" }],
});

function Layout() {
  return (
    <>
      <EAOAppBar />
      <Box height={"calc(100vh - 88px)"}>
        <Outlet />
      </Box>
      <Footer />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
