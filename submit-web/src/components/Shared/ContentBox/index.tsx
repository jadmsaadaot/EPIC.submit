import { Box, Paper, PaperProps, Typography } from "@mui/material";
import { BCDesignTokens } from "epic.theme";

type ContentBoxProps = {
  title?: string;
  label?: string;
} & PaperProps;
export const ContentBox = ({
  children,
  title = "",
  label = "",
  ...rest
}: ContentBoxProps) => {
  return (
    <Paper elevation={2} {...rest}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "auto",
          padding: "12px 24px",
          backgroundColor: BCDesignTokens.surfaceColorBackgroundLightBlue,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
          }}
        >
          {title}
        </Typography>
        {label && (
          <Typography
            variant="h4"
            color={BCDesignTokens.themeGray70}
            sx={{
              mr: 2,
              fontWeight: 400,
            }}
          >
            {label}
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          padding: "24px 16px 16px 16px",
          alignSelf: "stretch",
        }}
      >
        {children}
      </Box>
    </Paper>
  );
};
