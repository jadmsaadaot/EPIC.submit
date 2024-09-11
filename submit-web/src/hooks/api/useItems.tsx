import { SubmissionItem } from "@/models/SubmissionItem";
import { request } from "@/utils/axiosUtils";
import { useQuery } from "@tanstack/react-query";

type GetSubmissionItemByIdParams = {
  itemId: number;
};
const getSubmissionItemById = ({ itemId }: GetSubmissionItemByIdParams) => {
  return request<SubmissionItem>({
    url: `items/${itemId}`,
  });
};

type UseGetSubmissionItemByIdParams = {
  itemId: number;
  enabled?: boolean;
};

export const useGetSubmissionItem = ({
  itemId,
  enabled = true,
}: UseGetSubmissionItemByIdParams) => {
  return useQuery({
    queryKey: ["item", itemId],
    queryFn: () => getSubmissionItemById({ itemId }),
    enabled: enabled && Boolean(itemId),
  });
};
