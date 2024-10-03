import { submitRequest } from "@/utils/axiosUtils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Options } from "./types";
import {
  Submission,
  SUBMISSION_TYPE,
  SubmissionType,
} from "@/models/Submission";
import { SubmissionItem } from "@/models/SubmissionItem";

type FormType = Record<string, unknown>;
export const editSubmission = (id: number, data: FormType) => {
  return submitRequest<Submission>({
    url: `/submissions/${id}`,
    method: "patch",
    data,
  });
};

export const createSubmission = (itemId: number, data: FormType) => {
  return submitRequest<Submission>({
    url: `/submissions/items/${itemId}`,
    method: "post",
    data,
  });
};

export const useCreateSubmission = (itemId: number, options?: Options) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data }: { data: FormType }) =>
      createSubmission(itemId, data),
    ...options,
    onSuccess: () => {
      if (options?.onSuccess) {
        options.onSuccess();
      }
      queryClient.invalidateQueries({
        queryKey: ["item", itemId],
      });
    },
  });
};

export const useSaveSubmission = (
  submissionItem?: SubmissionItem,
  options?: Options,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data }: { data: FormType }) => {
      if (!submissionItem) {
        throw new Error("Submission item is required");
      }

      const formSubmission = submissionItem.submissions.find(
        (submission) => submission.type === SUBMISSION_TYPE.FORM,
      );
      if (formSubmission) {
        return editSubmission(formSubmission.id, data);
      }
      return createSubmission(submissionItem.id, data);
    },
    ...options,
    onSuccess: (submission) => {
      if (options?.onSuccess) {
        options.onSuccess();
      }
      queryClient.invalidateQueries({
        queryKey: ["item", submission.item_id],
      });
    },
  });
};

type GetSubmissionItemByIdParams = {
  itemId: number;
};
const getSubmissionsByItemIdAndType = ({
  itemId,
}: GetSubmissionItemByIdParams) => {
  return submitRequest<Submission[]>({
    url: `submissions/items/${itemId}`,
    params: {
      type: SUBMISSION_TYPE.DOCUMENT,
    },
  });
};

type UseGetSubmissionItemByIdParams = {
  itemId: number;
  type: SubmissionType;
  enabled?: boolean;
};

export const useGetSubmissionsByItemIdAndType = ({
  itemId,
  type,
  enabled = true,
}: UseGetSubmissionItemByIdParams) => {
  return useQuery({
    queryKey: ["submissions", type],
    queryFn: () => getSubmissionsByItemIdAndType({ itemId }),
    enabled: enabled && Boolean(itemId),
  });
};
