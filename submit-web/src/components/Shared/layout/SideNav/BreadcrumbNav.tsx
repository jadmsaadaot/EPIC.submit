import React, { useEffect, useState } from "react";
import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import { Routes, RouteType, AuthenticatedRoutes } from "./SideNavElements";
import { useRouter } from "@tanstack/react-router";

const findRouteTrace = (path: string, routes: RouteType[]): RouteType[] => {
  let routeTrace: RouteType[] = [];

  for (const route of routes) {
    if (path.startsWith(route.path)) {
      routeTrace.push(route);
      if (route.routes) {
        const nestedRouteTrace = findRouteTrace(path, route.routes);
        routeTrace = routeTrace.concat(nestedRouteTrace);
      }
    }
  }

  return routeTrace;
};

const BreadcrumbNav: React.FC = () => {
  const router = useRouter();
  const { pathname, search } = router.state.location;

  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Get the full breadcrumb trace
  const routeTrace = findRouteTrace(currentPath, [
    ...Routes,
    ...AuthenticatedRoutes,
  ]);

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname, search]);

  return (
    <Box
      sx={{
        p: 1,
        paddingLeft: 5,
        borderBottom: "1px solid #0000001A",
      }}
    >
      <Breadcrumbs aria-label="breadcrumb">
        {routeTrace.map((route, index) =>
          index < routeTrace.length - 1 ? (
            <Link
              key={route.path}
              color="primary"
              href={route.path}
              onClick={() => setCurrentPath(route.path)}
            >
              {route.name}
            </Link>
          ) : (
            <Typography key={route.path} color="textPrimary">
              {route.name}
            </Typography>
          )
        )}
      </Breadcrumbs>
    </Box>
  );
};

export default BreadcrumbNav;
