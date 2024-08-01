
import { OnErrorType, OnSuccessType, request } from "@/utils/axiosUtils";
import { useMutation } from "@tanstack/react-query";

type CreateAccount = {
first_name: string;
last_name: string;
position: string;
work_contact_number: string;
work_email_address: string;
proponent_id: string;
}
const createAccount = (account: CreateAccount) => {
    return request({ url: "/accounts", method: "post" , data: account});
  };


export const useCreateAccount = (onSuccess: OnSuccessType, onError: OnErrorType) => {
    return useMutation({
      mutationFn: createAccount,
      onSuccess,
      onError
    })
  }
