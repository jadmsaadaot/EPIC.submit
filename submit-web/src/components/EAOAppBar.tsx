import { AppBar, Grid, Typography } from "@mui/material";
import EAO_Logo from "@/assets/images/EAO_Logo.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AppConfig } from "@/config";

export default function EAOAppBar() {
  return (
    <>
      <AppBar position="static" color="inherit" elevation={2}>
        <Grid
          container
          padding={"0.5rem"}
          margin={0}
          justifyContent="space-between"
        >
          <Grid display="flex" justifyContent="start" alignItems="center">
            <img src={EAO_Logo} height={72} />
            <Typography
              variant="h4"
              color="inherit"
              component="div"
              paddingLeft={"0.5rem"}
              fontWeight={"bold"}
            >
              {AppConfig.appTitle}
            </Typography>
          </Grid>
          <Grid display="flex" justifyContent="center" alignItems="center">
            <Typography
              variant="body2"
              color="inherit"
              component="div"
              paddingRight={"0.25rem"}
            >
              Sign In
            </Typography>
            <AccountCircleIcon fontSize="large"></AccountCircleIcon>
          </Grid>
        </Grid>
      </AppBar>
    </>
  );
}
