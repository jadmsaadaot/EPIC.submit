import {
  documentRequest,
  OSSGetRequest,
  OSSPutRequest,
} from "@/utils/axiosUtils";
import { useMutation } from "@tanstack/react-query";
import { Options } from "./types";

export type ObjectStorageHeaderDetails = {
  filename: string;
  filepath: string;
  authheader: string;
  amzdate: string;
  uniquefilename: string;
};

type AuthHeaderRequestData = {
  filename: string;
};
const createAuthHeaders = (data: AuthHeaderRequestData) => {
  return documentRequest<ObjectStorageHeaderDetails>({
    url: `/objects`,
    method: "post",
    data,
  });
};

const uploadObject = (
  headerDetails: ObjectStorageHeaderDetails,
  file: File,
) => {
  return OSSPutRequest(headerDetails.filepath, file, {
    amzDate: headerDetails.amzdate,
    authHeader: headerDetails.authheader,
  });
};

export const saveObject = async ({
  file,
  fileDetails,
}: {
  file: File;
  fileDetails: AuthHeaderRequestData;
}) => {
  const fileDetailsResponse = await createAuthHeaders(fileDetails);
  if (!fileDetailsResponse) {
    throw Error(
      "Error occurred while fetching document from the object storage",
    );
  }
  await uploadObject(fileDetailsResponse, file);
  return Promise.resolve(fileDetailsResponse);
};

const getObject = async (headerDetails: ObjectStorageHeaderDetails) => {
  return await OSSGetRequest(headerDetails.filepath, {
    amzDate: headerDetails.amzdate,
    authHeader: headerDetails.authheader,
  });
};

export const downloadObject = async (file: AuthHeaderRequestData) => {
  const response = await createAuthHeaders(file);
  if (!response) {
    throw Error(
      "Error occurred while fetching document from the object storage",
    );
  }
  return await getObject(response);
};

export const useSaveObject = (options?: Options) => {
  return useMutation({
    mutationFn: saveObject,
    ...options,
    retry: 0,
  });
};
