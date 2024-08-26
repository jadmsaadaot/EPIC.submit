import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { RouteType } from "./SideNavElements";
import { Link, useRouterState } from "@tanstack/react-router";
import { theme } from "@/styles/theme";

export const SubListItem = ({ route }: { route: RouteType }) => {
  const router = useRouterState();
  const currentPath = router.location.pathname;
  return (
    <ListItem key={`sub-list-${route?.name}`} sx={{ margin: 0, padding: 0 }}>
      <Link
        to={route.path}
        style={{
          textDecoration: "none",
          margin: 0,
          padding: 0,
          color: "inherit",
        }}
        activeProps={{
          style: {
            color: theme.palette.primary.main,
            fontWeight: currentPath === route.path ? "bold" : "normal",
            width: "100%",
          },
        }}
      >
        <ListItemButton
          key={`sub-list-button-${route?.name}`}
          sx={{
            marginLeft: "40px",
            borderLeft:
              currentPath === route.path
                ? `4px solid ${theme.palette.primary.main}`
                : `1px solid ${theme.palette.divider}`,
          }}
        >
          <ListItemText key={`sub-list-text-${route?.name}`}>
            <span style={{ color: "inherit" }}>{route.name}</span>
          </ListItemText>
        </ListItemButton>
      </Link>
    </ListItem>
  );
};
