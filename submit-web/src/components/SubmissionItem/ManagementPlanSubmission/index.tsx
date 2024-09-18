import { ContentBox } from "@/components/Shared/ContentBox";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { BCDesignTokens, EAOColors } from "epic.theme";
import { useSubmissionItemStore } from "../submissionItemStore";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateSubmission } from "@/hooks/api/useSubmissions";
import { notify } from "@/components/Shared/Snackbar/snackbarStore";
import { useEffect } from "react";
import { useLoaderBackdrop } from "@/components/Shared/Overlays/loaderBackdropStore";
import { Navigate, useNavigate, useParams } from "@tanstack/react-router";
import { SUBMISSION_TYPE } from "@/models/Submission";
import { useGetProject } from "@/hooks/api/useProjects";
import { CardInnerBox } from "@/components/Projects/Project";
import { PROJECT_STATUS } from "@/components/registration/addProjects/ProjectCard/constants";
import { ProjectStatus } from "@/components/registration/addProjects/ProjectStatus";
import BarTitle from "@/components/Shared/Text/BarTitle";
import ControlledRadioGroup from "@/components/Shared/controlled/ControlledRadioGroup";
import { YesNoNotApplicableOptions, YesOrNoOptions } from "./radioOptions";
import FileUpload from "@/components/FileUpload";
import DocumentContainer from "./DocumentContainer";
import { Document } from "./DocumentContainer";
import { useFileUploadStore } from "@/store/fileUploadStore";

const managementPlanSubmissionSchema = yup.object().shape({
  conditionSatisfied: yup
    .boolean()
    .required("Please provide an answer to this question."),
  allRequirementsAddressed: yup
    .boolean()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .required("Please provide an answer to this question."),
  requirementsClear: yup
    .boolean()
    .required("Please provide an answer to this question."),
  informationAccurate: yup
    .boolean()
    .required("Please provide an answer to this question."),
});

type ManagementPlanSubmissionForm = yup.InferType<
  typeof managementPlanSubmissionSchema
>;
export const ManagementPlanSubmission = () => {
  const { submissionItem } = useSubmissionItemStore();
  const { projectId: projectIdParam, submissionPackageId } = useParams({
    strict: false,
  });
  const projectId = Number(projectIdParam);
  const { data: accountProject } = useGetProject({
    projectId,
  });

  const { setIsOpen } = useLoaderBackdrop();
  const navigate = useNavigate();
  const { addedFileName, clearFiles, resetStore } = useFileUploadStore();
  const methods = useForm<ManagementPlanSubmissionForm>({
    resolver: yupResolver(managementPlanSubmissionSchema),
    mode: "onSubmit",
  });

  useEffect(() => {
    return () => {
      resetStore();
    };
  }, [resetStore]);

  const documentToUpload = {
    id: addedFileName,
    name: addedFileName,
  };

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
    useCreateSubmission({
      onError: onCreateFailure,
      onSuccess: onCreateSuccess,
    });

  const onSubmitHandler = async (formData: ManagementPlanSubmissionForm) => {
    if (!submissionItem) {
      notify.error("Failed to load submission item");
      return;
    }
    createSubmission({
      itemId: submissionItem.id,
      data: {
        type: SUBMISSION_TYPE.DOCUMENT,
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

  const mockFiles = [
    {
      id: "1",
      name: "Consultation Record",
      url: "https://via.placeholder.com/150",
    },
  ] as Document[];

  if (!accountProject) return <Navigate to="/error" />;

  return (
    <Grid item xs={12}>
      <ContentBox
        mainLabel={"Copper Mine"}
        label={`EAC #${accountProject?.project.ea_certificate}`}
      >
        <Box
          sx={{
            borderRadius: "4px",
            p: BCDesignTokens.layoutPaddingMedium,
            border: `1px solid ${BCDesignTokens.surfaceColorBorderDefault}`,
          }}
        >
          <CardInnerBox sx={{ pl: 0, pb: BCDesignTokens.layoutPaddingMedium }}>
            <Typography variant="h4" fontWeight={700}>
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
                <Grid container spacing={BCDesignTokens.layoutMarginMedium}>
                  <Grid item xs={12}>
                    <Typography
                      variant="h5"
                      fontWeight={400}
                      sx={{ color: BCDesignTokens.typographyColorDisabled }}
                    >
                      Management Plan Requirements
                    </Typography>
                    <Divider sx={{ mt: BCDesignTokens.layoutMarginXsmall }} />
                  </Grid>
                  <Grid item xs={12} container>
                    <Grid item xs={12}>
                      <Typography variant="body1">
                        Does the plan address all the requirements in the
                        (condition number)?
                      </Typography>
                      <ControlledRadioGroup
                        name="conditionSatisfied"
                        options={YesOrNoOptions}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body1">
                        If the condition(s) associated with the plan reference
                        other documents, in whole or part (e.g., project
                        application sections), does the plan address all
                        requirements within the referenced document(s)?
                      </Typography>
                      <ControlledRadioGroup
                        name="allRequirementsAddressed"
                        options={YesNoNotApplicableOptions}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body1">
                        Is each requirement in the plan clear, measurable,
                        and/or include accountability?
                      </Typography>
                      <ControlledRadioGroup
                        name="requirementsClear"
                        options={YesOrNoOptions}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="h5"
                      fontWeight={400}
                      sx={{ color: BCDesignTokens.typographyColorDisabled }}
                    >
                      Information Verification
                    </Typography>
                    <Divider sx={{ mt: BCDesignTokens.layoutMarginXsmall }} />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      The information on this form is correct to the best of
                      your knowledge.
                    </Typography>
                    <ControlledRadioGroup
                      name="informationAccurate"
                      options={YesOrNoOptions}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="h5"
                      fontWeight={400}
                      sx={{ color: BCDesignTokens.typographyColorDisabled }}
                    >
                      Document(s) Upload
                    </Typography>
                    <Divider sx={{ mt: BCDesignTokens.layoutMarginXsmall }} />
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ flexDirection: "column", display: "flex" }}>
                      <Typography
                        variant="body1"
                        color={BCDesignTokens.typographyColorPrimary}
                      >
                        Upload Consultation Record(s), Including Comment Tracker
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: BCDesignTokens.typographyColorPlaceholder,
                        }}
                      >
                        Must be unlocked PDF document (i.e., not password
                        protected).
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: BCDesignTokens.typographyColorPlaceholder,
                        }}
                      >
                        Any proposed changes must be in tracked changes.
                      </Typography>
                    </Box>
                    <FileUpload height={"13.125rem"} />
                    <Typography
                      variant="body2"
                      sx={{
                        color: EAOColors.ProponentDark,
                      }}
                    >
                      Accepted file types: pdf, doc, docx, xlsx, Max. file size:
                      ???.
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    item
                    xs={12}
                    sx={{ mb: BCDesignTokens.layoutMarginXlarge }}
                  >
                    {mockFiles.map((document) => (
                      <DocumentContainer
                        key={document.id}
                        document={document}
                        onRemove={() => {}}
                      />
                    ))}
                    {addedFileName && (
                      <DocumentContainer
                        document={documentToUpload}
                        onRemove={() => {
                          clearFiles();
                        }}
                      />
                    )}
                  </Grid>
                  <Grid item xs={12} container spacing={2}>
                    <Grid item xs={12} sm="auto">
                      <Button color="secondary" onClick={handleCancel}>
                        Save & Continue Later
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm="auto">
                      <Button type="submit">Save Completed Form</Button>
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
