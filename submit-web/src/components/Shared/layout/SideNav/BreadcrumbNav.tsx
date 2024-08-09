import React from "react";
import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import { useRouter } from "@tanstack/react-router";

const BreadcrumbNav: React.FC = () => {
  const router = useRouter();
  const { pathname } = router.state.location;
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  return (
    <Box
      sx={{
        p: 1,
        paddingLeft: 5,
        borderBottom: "1px solid #0000001A",
      }}
    >
      <Breadcrumbs aria-label="breadcrumb">
        {pathSegments.map((segment, index) => {
          const url = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSegments.length - 1;
          return isLast ? (
            <Typography key={segment} color="text.primary">
              {segment}
            </Typography>
          ) : (
            <Link key={segment} color="primary" href={url}>
              {segment}
            </Link>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
};

export default BreadcrumbNav;
