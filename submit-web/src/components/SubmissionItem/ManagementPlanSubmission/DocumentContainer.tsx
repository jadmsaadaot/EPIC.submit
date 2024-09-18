import { Box, Grid, Typography } from "@mui/material";
import { BCDesignTokens } from "epic.theme";
import React from "react";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import DocumentIcon from "./DocumentIcon";
import ProgressBar from "./ProgressBar";

export interface Document {
  id: string;
  name: string;
  url: string;
}

interface DocumentContainerProps {
  document: Document;
  onRemove: () => void;
}

const DocumentContainer: React.FC<DocumentContainerProps> = ({
  document,
  onRemove,
}) => {
  const { name } = document;
  const isComplete = document?.url;

  return (
    <Grid
      container
      item
      sx={{
        border: `1px solid #D6EBFF`,
        padding: BCDesignTokens.layoutPaddingSmall,
        mb: BCDesignTokens.layoutMarginSmall,
      }}
    >
      <Grid
        container
        item
        xs={11}
        alignItems={"center"}
        justifyContent={"flex-start"}
      >
        <Box
          sx={{
            mr: BCDesignTokens.layoutMarginLarge,
          }}
        >
          <DocumentIcon />
        </Box>
        <Box
          display={"flex"}
          flexDirection={isComplete ? "row" : "column"}
          width={"70%"}
          mr={BCDesignTokens.layoutMarginSmall}
        >
          <Typography
            variant="body1"
            fontWeight={BCDesignTokens.typographyFontWeightsBold}
            sx={{ color: "#222", mr: BCDesignTokens.layoutMarginSmall }}
          >
            {name}
          </Typography>{" "}
          {isComplete ? (
            <CheckRoundedIcon
              sx={{
                color: "#2E8540",
                background: "#C2EACA",
                borderRadius: BCDesignTokens.layoutPaddingLarge,
              }}
            />
          ) : (
            <ProgressBar />
          )}
        </Box>
      </Grid>
      <Grid
        container
        item
        xs={1}
        alignItems={"center"}
        justifyContent={"flex-end"}
      >
        <Box
          sx={{
            cursor: "pointer",
            color: "#1A5A96",
            mr: BCDesignTokens.layoutMarginSmall,
          }}
          onClick={() => onRemove()}
        >
          Remove
        </Box>
      </Grid>
    </Grid>
  );
};

export default DocumentContainer;
