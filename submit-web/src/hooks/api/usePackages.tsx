import { submitRequest } from "@/utils/axiosUtils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Options } from "./types";
import { SubmissionPackage } from "@/models/Package";
import { usePackageTableStore } from "@/components/Submission/packageStore";
import { defaultUseQueryOptions } from "./constants";

const createSubmissionPackage = ({
  accountProjectId,
  data,
}: {
  accountProjectId: number;
  data: Record<string, unknown>;
}) => {
  return submitRequest<SubmissionPackage>({
    url: `/packages/account-projects/${accountProjectId}`,
    method: "post",
    data,
  });
};

export const useCreateSubmissionPackage = (options?: Options) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSubmissionPackage,
    ...options,
    onSuccess: (submissionPackage: SubmissionPackage) => {
      if (options?.onSuccess) {
        options.onSuccess();
      }
      queryClient.invalidateQueries({
        queryKey: ["account-projects", submissionPackage.account_project_id],
      });
    },
  });
};

type GetSubmissionPackageByIdParams = {
  packageId: number;
};
const getSubmissionPackageById = ({
  packageId,
}: GetSubmissionPackageByIdParams) => {
  return submitRequest<SubmissionPackage>({
    url: `packages/${packageId}`,
  });
};

type UseGetSubmissionPackageByIdParams = {
  packageId: number;
  enabled?: boolean;
};

export const useGetSubmissionPackage = ({
  packageId,
  enabled = true,
}: UseGetSubmissionPackageByIdParams) => {
  return useQuery({
    queryKey: ["package", packageId],
    queryFn: () => getSubmissionPackageById({ packageId }),
    enabled: enabled && Boolean(packageId),
    ...defaultUseQueryOptions,
  });
};

const updateStateSubmissionPackage = ({
  packageId,
  data,
}: {
  packageId: number;
  data: Record<string, unknown>;
}) => {
  return submitRequest<SubmissionPackage>({
    url: `/packages/${packageId}/state`,
    method: "post",
    data,
  });
};

export const useUpdateStateSubmissionPackage = (options?: Options) => {
  const queryClient = useQueryClient();
  const {} = usePackageTableStore();
  return useMutation({
    mutationFn: updateStateSubmissionPackage,
    ...options,
    onSuccess: (submissionPackage) => {
      if (options?.onSuccess) {
        options.onSuccess();
      }
      queryClient.invalidateQueries({
        queryKey: ["package", submissionPackage.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["account-projects", submissionPackage.account_project_id],
      });
    },
  });
};
