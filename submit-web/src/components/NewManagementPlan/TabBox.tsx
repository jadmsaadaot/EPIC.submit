import { Box, BoxProps, Divider, Typography } from "@mui/material";
import { BCDesignTokens } from "epic.theme";

type TabBoxProps = {
  title: string;
} & BoxProps;
export const TabBox = ({ title, children, ...rest }: TabBoxProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
      {...rest}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 400,
          color: BCDesignTokens.typographyColorPlaceholder,
        }}
      >
        {title}
      </Typography>
      <Divider />
      {children}
    </Box>
  );
};
