import BreadcrumbNav from "@/components/Shared/layout/SideNav/BreadcrumbNav";
import SideNavBar from "@/components/Shared/layout/SideNav/SideNavBar";
import { useIsMobile } from "@/hooks/common";
import { Box } from "@mui/material";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_dashboard")({
  component: DashboardLayout,
  meta: () => [{ title: "Dashboard" }],
});

function DashboardLayout() {
  return (
    <div>
      <BreadcrumbNav />
      <Box height={"calc(100vh - 88px)"} flexDirection={"row"} display={"flex"}>
        <SideNavBar />
        <Outlet />
      </Box>
    </div>
  );
}
