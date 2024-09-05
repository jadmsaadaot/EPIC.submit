import { request } from "@/utils/axiosUtils";
import { useMutation } from "@tanstack/react-query";
import { Options } from "./types";

const createSubmissionPackage = ({
  accountProjectId,
  data,
}: {
  accountProjectId: number;
  data: Record<string, unknown>;
}) => {
  return request({
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
