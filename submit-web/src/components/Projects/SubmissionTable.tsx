import { Plan } from "@/models/Plan";
import {
  Link,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import ProjectStatusChip from "../Shared/ProjectStatusChip";
import { PROJECT_STATUS } from "../registration/addProjects/ProjectCard/constants";
import { BCDesignTokens } from "epic.theme";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function SubmissionTable({ plans }: { plans: Array<Plan> }) {
  return (
    <TableBody>
      {plans?.map((row) => (
        <TableRow
          sx={{
            border: "2px solid #F2F2F2",
          }}
        >
          <TableCell component="th" scope="row">
            <Link
              sx={{
                color: BCDesignTokens.themeBlue90,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h5"
                color={BCDesignTokens.themeBlue90}
                fontWeight={"500"}
                sx={{ mr: 0.5 }}
              >
                Management Plan 123
              </Typography>
              <ArrowForwardIosIcon fontSize="small" />
            </Link>
          </TableCell>
          <TableCell align="center">{row.submittedDate || "--"}</TableCell>
          <TableCell align="center">{row.submittedBy || "--"}</TableCell>
          <TableCell align="right">
            {!true ? (
              <ProjectStatusChip status={PROJECT_STATUS.APPROVAL} />
            ) : (
              <ProjectStatusChip status={PROJECT_STATUS.IN_REVIEW} />
            )}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
