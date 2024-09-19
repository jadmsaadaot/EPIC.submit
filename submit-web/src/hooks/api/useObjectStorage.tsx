import {
  documentRequest,
  OSSGetRequest,
  OSSPutRequest,
} from "@/utils/axiosUtils";
import { useMutation } from "@tanstack/react-query";
import { Options } from "./types";

type ObjectStorageHeaderDetails = {
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
  return documentRequest<ObjectStorageHeaderDetails[]>({
    url: `/objects`,
    method: "post",
    data,
  });
};

const uploadObject = async (
  headerDetails: ObjectStorageHeaderDetails,
  file: File,
) => {
  return await OSSPutRequest(headerDetails.filepath, file, {
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
  await uploadObject(fileDetailsResponse[0], file);
  return Promise.resolve(fileDetailsResponse[0]);
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
  return await getObject(response[0]);
};

export const useSaveObject = (options?: Options) => {
  return useMutation({
    mutationFn: saveObject,
    ...options,
  });
};
