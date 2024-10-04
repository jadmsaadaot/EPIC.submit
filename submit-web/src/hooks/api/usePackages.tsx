import { submitRequest } from "@/utils/axiosUtils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Options } from "./types";
import { SubmissionPackage } from "@/models/Package";

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
  return useMutation({
    mutationFn: createSubmissionPackage,
    ...options,
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
  });
};
