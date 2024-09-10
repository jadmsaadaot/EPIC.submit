import { request } from "@/utils/axiosUtils";
import { useMutation } from "@tanstack/react-query";
import { Options } from "./types";
import { Submission } from "@/models/Submission";

const createSubmission = ({
  itemId,
  data,
}: {
  itemId: number;
  data: Record<string, unknown>;
}) => {
  return request<Submission>({
    url: `/submissions/items/${itemId}`,
    method: "post",
    data,
  });
};

export const useCreateSubmission = (options?: Options) => {
  return useMutation({
    mutationFn: createSubmission,
    ...options,
  });
};
