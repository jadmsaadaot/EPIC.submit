import { ContentBox } from "@/components/Shared/ContentBox";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { BCDesignTokens } from "epic.theme";
import { useSubmissionItemStore } from "../submissionItemStore";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ControlledTextField from "@/components/Shared/controlled/ControlledTextField";
import { useCreateSubmission } from "@/hooks/api/useSubmissions";
import { notify } from "@/components/Shared/Snackbar/snackbarStore";
import { useEffect } from "react";
import { useLoaderBackdrop } from "@/components/Shared/Overlays/loaderBackdropStore";
import { useNavigate, useParams } from "@tanstack/react-router";
import { SUBMISSION_TYPE } from "@/models/Submission";
import ControlledInputMask from "@/components/Shared/controlled/ControlledInputMask";
import BarTitle from "@/components/Shared/Text/BarTitle";
import { CardInnerBox } from "@/components/Projects/Project";
import { ProjectStatus } from "@/components/registration/addProjects/ProjectStatus";
import { PROJECT_STATUS } from "@/components/registration/addProjects/ProjectCard/constants";
import { useGetProject } from "@/hooks/api/useProjects";

const contactInformationSchema = yup.object().shape({
  primaryContact: yup.object().shape({
    givenName: yup.string().required("Please enter given name."),
    surname: yup.string().required("Please enter surname."),
    position: yup.string().required("Please enter position."),
    company: yup.string().required("Please enter company."),
    workPhoneNumber: yup.string().required("Please enter work phone number."),
    workEmailAddress: yup
      .string()
      .email("Invalid email")
      .required("Please enter work email."),
  }),
  secondaryContact: yup.object().shape({
    givenName: yup.string().required("Please enter given name."),
    surname: yup.string().required("Please enter surname."),
    position: yup.string().required("Please enter position."),
    company: yup.string().required("Please enter company."),
    workPhoneNumber: yup.string().required("Please enter work phone number."),
    workEmailAddress: yup
      .string()
      .email("Invalid email")
      .required("Please enter work email."),
  }),
});

type ContactInformationForm = yup.InferType<typeof contactInformationSchema>;
export const ContactInformation = () => {
  const { submissionItem } = useSubmissionItemStore();
  const {
    projectId: projectIdParam,
    submissionPackageId,
    submissionId,
  } = useParams({
    from: "/_authenticated/_dashboard/projects/$projectId/_projectLayout/submission-packages/$submissionPackageId/_submissionLayout/submissions/$submissionId",
  });
  const projectId = Number(projectIdParam);
  const { data: accountProject } = useGetProject({
    projectId,
  });

  const { setIsOpen } = useLoaderBackdrop();
  const navigate = useNavigate();

  const methods = useForm<ContactInformationForm>({
    resolver: yupResolver(contactInformationSchema),
    mode: "onSubmit",
  });

  const { handleSubmit } = methods;

  const onCreateFailure = () => {
    notify.error("Failed to create submission");
  };

  const onCreateSuccess = () => {
    notify.success("Submission created successfully");
    navigate({
      to: `/projects/${projectId}/submission-packages/${submissionPackageId}`,
    });
  };
  const { mutate: createSubmission, isPending: isCreatingSubmissionPending } =
    useCreateSubmission(Number(submissionId), {
      onError: onCreateFailure,
      onSuccess: onCreateSuccess,
    });

  const onSubmitHandler = async (formData: ContactInformationForm) => {
    if (!submissionItem) {
      notify.error("Failed to load submission item");
      return;
    }
    createSubmission({
      itemId: submissionItem.id,
      data: {
        type: SUBMISSION_TYPE.FORM,
        data: formData,
      },
    });
  };

  useEffect(() => {
    setIsOpen(isCreatingSubmissionPending);
    return () => setIsOpen(false);
  }, [isCreatingSubmissionPending, setIsOpen]);

  const handleCancel = () => {
    navigate({
      to: `/projects/${projectId}/submission-packages/${submissionPackageId}`,
    });
  };

  if (!accountProject) return <Navigate to="/error" />;

  return (
    <Grid item xs={12}>
      <ContentBox
        mainLabel={"Copper Mine"}
        // label={submissionItem?.project.ea_certificate}
      >
        <Box
          sx={{
            borderRadius: "4px",
            p: BCDesignTokens.layoutPaddingMedium,
            border: `1px solid ${BCDesignTokens.surfaceColorBorderDefault}`,
          }}
        >
          <CardInnerBox sx={{ pl: 0, pb: BCDesignTokens.layoutPaddingMedium }}>
            <Typography variant="h4" fontWeight={400}>
              Management Plans
            </Typography>
            <ProjectStatus status={PROJECT_STATUS.POST_DECISION} />
          </CardInnerBox>
          <Box
            sx={{
              p: BCDesignTokens.layoutPaddingMedium,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              borderRadius: "4px",
              border: `1px solid ${BCDesignTokens.surfaceColorBorderDefault}`,
              gap: BCDesignTokens.layoutPaddingLarge,
            }}
          >
            <BarTitle
              title={accountProject.project.name + " Management Plan"}
            />

            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmitHandler)}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography
                      variant="h5"
                      fontWeight={400}
                      sx={{ color: BCDesignTokens.typographyColorDisabled }}
                    >
                      Contact Information
                    </Typography>
                    <Divider sx={{ mt: BCDesignTokens.layoutMarginXsmall }} />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: "bold",
                      }}
                    >
                      Primary Contact
                    </Typography>
                  </Grid>
                  <Grid item xs={12} container>
                    <Grid item xs={12}>
                      <ControlledTextField
                        name="primaryContact.givenName"
                        label="Given Name"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <ControlledTextField
                        name="primaryContact.surname"
                        label="Surname"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <ControlledTextField
                        name="primaryContact.company"
                        label="Company"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <ControlledTextField
                        name="primaryContact.position"
                        label="Position/Role"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <ControlledInputMask
                        name="primaryContact.workPhoneNumber"
                        mask="(999) 999-9999"
                        label="Work Phone Number"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <ControlledTextField
                        name="primaryContact.workEmailAddress"
                        label="Work Email Address"
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: "bold",
                      }}
                    >
                      Secondary Contact
                    </Typography>
                  </Grid>
                  <Grid item xs={12} container>
                    <Grid item xs={12} container>
                      <Grid item xs={12}>
                        <ControlledTextField
                          name="secondaryContact.givenName"
                          label="Given Name"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <ControlledTextField
                          name="secondaryContact.surname"
                          label="Surname"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <ControlledTextField
                          name="secondaryContact.company"
                          label="Company"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <ControlledTextField
                          name="secondaryContact.position"
                          label="Position/Role"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <ControlledInputMask
                          name="secondaryContact.workPhoneNumber"
                          mask="(999) 999-9999"
                          label="Work Phone Number"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <ControlledTextField
                          name="secondaryContact.workEmailAddress"
                          label="Work Email Address"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} container spacing={2}>
                    <Grid item xs={12} sm="auto">
                      <Button color="secondary" onClick={handleCancel}>
                        Close
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm="auto">
                      <Button type="submit">Save</Button>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            </FormProvider>
          </Box>
        </Box>
      </ContentBox>
    </Grid>
  );
};
