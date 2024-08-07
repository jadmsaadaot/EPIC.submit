/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppConfig, OidcConfig } from "@/utils/config";
import axios, { AxiosError } from "axios";
import { User } from "oidc-client-ts";

export type OnErrorType = (error: AxiosError) => void;
export type OnSuccessType = (data: any) => void;

const client = axios.create({ baseURL: AppConfig.apiUrl });
const trackClient = axios.create({ baseURL: AppConfig.apiUrl });

function getUser() {
  const oidcStorage = sessionStorage.getItem(
    `oidc.user:${OidcConfig.authority}:${OidcConfig.client_id}`,
  );
  if (!oidcStorage) {
    return null;
  }

  return User.fromStorageString(oidcStorage);
}

export const request = ({ ...options }) => {
  const user = getUser();

  if (user?.access_token) {
    client.defaults.headers.common.Authorization = `Bearer ${user?.access_token}`;
  } else {
    throw new Error("No access token!");
  }

  const onSuccess = (response: any) => response;
  const onError = (error: AxiosError) => {
    // optionaly catch errors and add additional logging here
    if (!error.response) {
      // CORS error or network error
      throw new Error("Internal Server error");
    }
    throw error;
  };

  client.get("/health").then(onSuccess).catch(onError);
  return client(options).then(onSuccess).catch(onError);
};
