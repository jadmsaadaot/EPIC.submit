import EAOAppBar from "@/components/Shared/EAOAppBar";
import Footer from "@/components/Shared/layout/Footer";
import PageNotFound from "@/components/Shared/PageNotFound";
import SideNavBar from "@/components/Shared/layout/SideNav/SideNavBar";
import { Box } from "@mui/system";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { AuthContextProps, useAuth } from "react-oidc-context";
import { useIsMobile } from "@/hooks/common";
import BreadcrumbNav from "@/components/Shared/layout/SideNav/BreadcrumbNav";

type RouterContext = {
  authentication: AuthContextProps;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: Layout,
  notFoundComponent: PageNotFound,
  meta: () => [{ title: "Home" }],
});
function Layout() {
  const isMobile = useIsMobile();
  const { isAuthenticated } = useAuth();

  return (
    <>
      <EAOAppBar />
      <BreadcrumbNav />
      <Box
        height={"calc(100vh - 88px)"}
        width={isMobile ? "100%" : "calc(100vw)"}
        flexDirection={"row"}
        display={"flex"}
      >
        {<SideNavBar />}
        <Outlet />
      </Box>
      <Footer />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
