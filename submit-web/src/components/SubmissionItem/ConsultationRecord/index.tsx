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
import FileUpload from "@/components/FileUpload";
import { useDocumentUploadStore } from "@/store/documentUploadStore";
import DocumentContainer from "../ManagementPlanSubmission/DocumentContainer";
import ControlledTextField from "@/components/Shared/controlled/ControlledTextField";
import { YesOrNoOptions } from "./radioOptions";

const MANAGEMENT_PLAN_FOLDER = "Management Plan";

const consultationRecordSchema = yup.object().shape({
  consultedParty: yup
    .string()
    .required("Please provide an answer to this question."),
  allPartiesConsulted: yup
    .boolean()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .required("Please provide an answer to this question."),
  planWasReviewed: yup
    .boolean()
    .required("Please provide an answer to this question."),
  writtenExplanationsProvidedToParties: yup
    .boolean()
    .required("Please provide an answer to this question."),
  writtenExplanationsProvidedToCommenters: yup
    .boolean()
    .required("Please provide an answer to this question."),
});

type ConsultationRecordForm = yup.InferType<typeof consultationRecordSchema>;
export const ConsultationRecord = () => {
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
  const { documents, removeDocument, reset } = useDocumentUploadStore();
  const methods = useForm<ConsultationRecordForm>({
    resolver: yupResolver(consultationRecordSchema),
    mode: "onSubmit",
  });

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

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

  const onSubmitHandler = async (formData: ConsultationRecordForm) => {
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
                <Grid container spacing={BCDesignTokens.layoutMarginMedium}>
                  <Grid item xs={12}>
                    <Typography
                      variant="h5"
                      fontWeight={400}
                      sx={{ color: BCDesignTokens.typographyColorDisabled }}
                    >
                      Consultation Records Information
                    </Typography>
                    <Divider sx={{ mt: BCDesignTokens.layoutMarginXsmall }} />
                  </Grid>
                  <Grid item xs={12} container>
                    <Grid
                      item
                      container
                      xs={12}
                      spacing={BCDesignTokens.layoutMarginSmall}
                    >
                      <Grid item xs={12}>
                        <Typography
                          variant="body1"
                          fontWeight={BCDesignTokens.typographyFontWeightsBold}
                        >
                          Names of consulted/engaged parties
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="body1">
                          These parties have been identified as requiring
                          consultation. Please include any additional parties
                          that have been consulted while developing this
                          Management Plan.
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{ mb: BCDesignTokens.layoutMarginMedium }}
                    >
                      <Typography variant="body1">
                        <ul
                          style={{
                            marginLeft: BCDesignTokens.layoutMarginSmall,
                            paddingLeft: BCDesignTokens.layoutPaddingSmall,
                          }}
                        >
                          <li>Ho’rem</li>
                          <li>Nustuk</li>
                          <li>Langkuem</li>
                          <li>Miskuuck</li>
                        </ul>
                      </Typography>
                      <Box>
                        <ControlledTextField
                          name="consultedParty"
                          placeholder="Enter the name of the consulted party"
                          sx={{
                            mr: BCDesignTokens.layoutMarginSmall,
                            mb: 0,
                          }}
                        />
                        <Button color="secondary">Save</Button>
                      </Box>
                      <Typography
                        variant="body1"
                        sx={{
                          color: BCDesignTokens.typographyColorLink,
                          cursor: "pointer",
                        }}
                      >
                        + Add a Consulted Party
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{ mb: BCDesignTokens.layoutMarginMedium }}
                    >
                      <Typography variant="body1">
                        Ensure that comment trackers clearly demonstrate that
                        consulted parties have had the opportunity to respond to
                        holder responses to the consulted parties comments.
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{ mb: BCDesignTokens.layoutMarginMedium }}
                    >
                      <Typography variant="body1">
                        Were all parties listed above consulted/engaged on the
                        development of this plan?
                      </Typography>
                      <ControlledRadioGroup
                        name="allPartiesConsulted"
                        options={YesOrNoOptions}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{ mb: BCDesignTokens.layoutMarginMedium }}
                    >
                      <Typography variant="body1">
                        Was the plan provided to all parties listed above for
                        review and comment during plan development?
                      </Typography>
                      <ControlledRadioGroup
                        name="planWasReviewed"
                        options={YesOrNoOptions}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{ mb: BCDesignTokens.layoutMarginMedium }}
                    >
                      <Typography variant="body1">
                        Have written explanations been provided to each party
                        listed above on how comments were fully and impartially
                        considered and addressed in the plan?
                      </Typography>
                      <ControlledRadioGroup
                        name="writtenExplanationsProvidedToParties"
                        options={YesOrNoOptions}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{ mb: BCDesignTokens.layoutMarginMedium }}
                    >
                      <Typography variant="body1">
                        For comments not addressed in this plan, have written
                        explanations been provided to the commenters as to why
                        the comments were not addressed?
                      </Typography>
                      <ControlledRadioGroup
                        name="writtenExplanationsProvidedToCommenters"
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
                    <FileUpload
                      height={"13.125rem"}
                      folder={MANAGEMENT_PLAN_FOLDER}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        color: EAOColors.ProponentDark,
                      }}
                    >
                      Accepted file types: pdf, doc, docx, xlsx, Max. file size:
                      250 MB.
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    item
                    xs={12}
                    sx={{ mb: BCDesignTokens.layoutMarginXlarge }}
                  >
                    {documents.length > 0 &&
                      documents
                        .filter(
                          (doc) => doc.folderId === MANAGEMENT_PLAN_FOLDER
                        )
                        .map((document) => (
                          <DocumentContainer
                            key={document.file.name}
                            document={{
                              id: document.file.name,
                              name: document.file.name,
                            }}
                            onRemove={() => removeDocument(document.file.name)}
                          />
                        ))}
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
