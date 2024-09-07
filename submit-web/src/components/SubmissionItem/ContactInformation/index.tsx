import { PROJECT_STATUS } from "@/components/registration/addProjects/ProjectCard/constants";
import { ProjectStatus } from "@/components/registration/addProjects/ProjectStatus";
import { ContentBox } from "@/components/Shared/ContentBox";
import { YellowBar } from "@/components/Shared/YellowBar";
import { Box, Grid, Typography } from "@mui/material";
import { BCDesignTokens } from "epic.theme";
import { useSubmissionItemStore } from "../submissionItemStore";
import * as yup from "yup";

const contactInformationSchema = yup.object().shape({
  givenName: yup.string().required("Please enter your given name."),
  surname: yup.string().required("Please enter your surname."),
  position: yup.string().required("Please enter your position."),
  phone: yup.string().required("Please enter your phone number."),
  email: yup
    .string()
    .email("Invalid email")
    .required("Please enter your email."),
});

type ContactInformationForm = yup.InferType<typeof contactInformationSchema>;
export const ContactInformation = () => {
  const { submissionItem } = useSubmissionItemStore();
  return (
    <Grid item xs={12}>
      <ContentBox
        mainLabel={"Copper Mine"}
        // label={submissionItem?.project.ea_certificate}
      >
        <Box
          sx={{
            padding: "24px 16px 16px 16px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            borderRadius: "4px",
            border: `1px solid ${BCDesignTokens.surfaceColorBorderDefault}`,
            gap: BCDesignTokens.layoutPaddingSmall,
          }}
        >
          <YellowBar />
          <Typography variant="h5">Contact Information</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                }}
              >
                Primary Contact
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </ContentBox>
    </Grid>
  );
};
