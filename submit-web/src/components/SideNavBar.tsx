import { Box, List, ListItem, ListItemButton, useTheme } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export default function SideNavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const routes = [
    {
      routeName: "Root",
      path: "/",
    },
    {
      routeName: "About",
      path: "/about",
    },
    {
      routeName: "Plans list",
      path: "/planslist",
    },
  ];

  return (
    <div>
      <Box
        sx={{ overflow: "auto", borderRight: "1px solid #0000001A" }}
        width={240}
        height={"calc(100vh - 88px)"}
      >
        <List>
          {routes.map((route) => (
            <ListItem key={route.routeName}>
              <ListItemButton
                onClick={() => navigate(route.path)}
                sx={{
                  fontWeight: "700",
                  backgroundColor:
                    location.pathname === route.path
                      ? "rgba(0, 0, 0, 0.1)"
                      : "transparent",
                  borderLeft:
                    location.pathname === route.path
                      ? `4px solid ${theme.palette.primary.main}`
                      : "none",
                }}
              >
                {route.routeName}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );
}
