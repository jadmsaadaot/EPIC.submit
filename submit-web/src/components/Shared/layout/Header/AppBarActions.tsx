import {
  Box,
  Typography,
  Button,
  Menu,
  IconButton,
  MenuItem,
} from "@mui/material";
import { useAuth } from "react-oidc-context";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { theme } from "@/styles/theme";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
import { OidcConfig } from "@/utils/config";
import { useNavigate } from "@tanstack/react-router";
import { BCDesignTokens } from "epic.theme";

export default function AppBarActions() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {auth.isAuthenticated ? (
        <>
          <Box id="menu-appbar" display={"flex"} onClick={handleClick}>
            <Typography variant="body2" color="primary">
              Hi, <b>{auth.user?.profile.name}</b>
            </Typography>
            <IconButton size="small" sx={{ m: 0, p: 0 }}>
              <KeyboardArrowDownIcon
                fontSize="small"
                htmlColor={theme.palette.grey[900]}
              />
            </IconButton>
          </Box>
          <AccountCircleIcon
            fontSize="large"
            htmlColor={theme.palette.grey[900]}
            sx={{ marginLeft: "0.25rem" }}
          />
          <Menu
            id="menu-appbar"
            aria-labelledby="menu-appbar"
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem
              onClick={() => {
                navigate({ to: "/profile" });
              }}
            >
              My Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                auth.signoutRedirect();
              }}
            >
              Sign Out
            </MenuItem>
          </Menu>
        </>
      ) : (
        <Button
          variant="text"
          onClick={() =>
            auth.signinRedirect({
              redirect_uri: `${OidcConfig.redirect_uri}${window.location.search}`,
            })
          }
          sx={{
            color: BCDesignTokens.themeGray100,
            border: `2px solid ${theme.palette.grey[700]}`,
          }}
        >
          Sign In
        </Button>
      )}
    </>
  );
}
