import { Box, Paper, PaperProps, Typography } from "@mui/material";
import { BCDesignTokens } from "epic.theme";

type ContentBoxProps = {
  title: string;
} & PaperProps;
export const ContentBox = ({ children, title, ...rest }: ContentBoxProps) => {
  return (
    <Paper
      sx={{
        disply: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
      {...rest}
    >
      <Box
        sx={{
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
