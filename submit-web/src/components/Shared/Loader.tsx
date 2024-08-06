import { CircularProgress } from "@mui/material";
import React from "react";

export const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <CircularProgress />
    </div>
  );
};
