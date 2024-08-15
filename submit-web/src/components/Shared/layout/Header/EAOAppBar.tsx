import { AppBar, Grid, Typography } from "@mui/material";
import EAO_Logo from "@/assets/images/EAO_Logo.png";
import { AppConfig } from "@/utils/config";
import AppBarActions from "./AppBarActions";
import { useIsMobile } from "@/hooks/common";
import MobileNav from "./MobileNav";
import { theme } from "@/styles/theme";

export default function EAOAppBar() {
  const isMobile = useIsMobile();
  return (
    <>
      <AppBar
        position="static"
        color="inherit"
        sx={{
          borderBottom: `1px solid ${theme.palette.grey[300]}`,
          boxShadow: "none",
        }}
      >
        <Grid
          container
          padding={"0.5rem"}
          paddingX={isMobile ? 0 : "0.5rem"}
          margin={0}
          justifyContent="space-between"
        >
          <Grid display="flex" justifyContent="start" alignItems="center">
            <img src={EAO_Logo} height={isMobile ? 40 : 72} />
            {!isMobile && (
              <Typography
                variant="h2"
                color="inherit"
                component="div"
                paddingLeft={"0.5rem"}
                fontWeight={"bold"}
              >
                {AppConfig.appTitle}
              </Typography>
            )}
          </Grid>
          <Grid
            display="flex"
            justifyContent="center"
            alignItems="center"
            paddingRight={"0.75rem"}
          >
            <AppBarActions />
          </Grid>
        </Grid>
      </AppBar>
      {isMobile && <MobileNav />}
    </>
  );
}
