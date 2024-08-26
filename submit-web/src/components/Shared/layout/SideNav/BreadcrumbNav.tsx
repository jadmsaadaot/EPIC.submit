import React from "react";
import { Box, Breadcrumbs } from "@mui/material";
import { Link, useRouterState } from "@tanstack/react-router";
import { theme } from "@/styles/theme";

interface RouteSegment {
  title: string;
  path?: string;
}

const filterUniqueRoutes = (breadcrumbs: RouteSegment[]) => {
  const seenPaths = new Set();
  return breadcrumbs.filter((segment) => {
    if (!segment?.path || !segment?.title) return false;
    const isUnique = !seenPaths.has(segment?.path);
    if (isUnique) {
      seenPaths.add(segment?.path);
    }
    return isUnique;
  });
};

const BreadcrumbNav: React.FC = () => {
  const router = useRouterState();
  const breadcrumbs = router.matches.map((match) => {
    const { meta, pathname } = match;
    if (meta)
      return {
        title: meta[0].title,
        path: pathname,
      };
  });

  const uniqueBreadcrumbs = filterUniqueRoutes(breadcrumbs as RouteSegment[]);
  return (
    <>
      {
        <Box
          sx={{
            p: 1,
            paddingLeft: theme.spacing(4),
            borderBottom: "1px solid #0000001A",
          }}
        >
          <Breadcrumbs aria-label="breadcrumb">
            {uniqueBreadcrumbs.map(
              (segment: { title: string; path?: string }) => {
                const { title, path } = segment;
                return (
                  <Link
                    key={path}
                    style={{
                      color: theme.palette.primary.dark,
                      textDecoration: "underline",
                    }}
                    to={path}
                  >
                    {title}
                  </Link>
                );
              }
            )}
          </Breadcrumbs>
        </Box>
      }
    </>
  );
};

export default BreadcrumbNav;
