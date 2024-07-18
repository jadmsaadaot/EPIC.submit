import EAOAppBar from "@/components/EAOAppBar";
import SideNavBar from "@/components/SideNavBar";
import { Box } from "@mui/material";
import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

function App() {
  return (
    <>
      <EAOAppBar />
      <Box display={"flex"}>
        <SideNavBar />
        <Box
          display={"flex"}
          flexDirection={"column"}
          flex={1}
          padding={"1rem"}
        >
          <Outlet />
        </Box>
      </Box>
      <TanStackRouterDevtools />
    </>
  );
}

export default App;
