import { OnErrorType, OnSuccessType, request } from "@/utils/axiosUtils";
import { useMutation, useQuery } from "@tanstack/react-query";

const defaultOnSuccess: OnSuccessType = () => {
  return;
};
const defaultOnError: OnErrorType = () => {
  return;
};
type CreateAccount = {
  first_name: string;
  last_name: string;
  position: string;
  work_contact_number: string;
  work_email_address: string;
  proponent_id: string;
};
const createAccount = (account: CreateAccount) => {
  return request({ url: "/accounts", method: "post", data: account });
};

const getAccountByProponentId = (proponentId?: string) => {
  return request({ url: `/accounts/proponent/${proponentId}` });
};

export const useCreateAccount = (
  onSuccess = defaultOnSuccess,
  onError = defaultOnError,
) => {
  return useMutation({
    mutationFn: createAccount,
    onSuccess,
    onError,
  });
};

export const useGetAccountByProponentId = ({
  proponentId,
}: {
  proponentId?: string;
}) => {
  return useQuery({
    queryKey: ["account", proponentId],
    queryFn: () => getAccountByProponentId(proponentId),
    enabled: Boolean(proponentId),
    retry: false,
  });
};
