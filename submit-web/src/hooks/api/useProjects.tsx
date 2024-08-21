import { Project } from "@/models/Project";
import { request } from "@/utils/axiosUtils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Options } from "./types";

const loadProjectsByProponentId = (proponentId?: number) => {
  if (!proponentId) {
    return Promise.reject(new Error("Proponent ID is required"));
  }
  return request<Project[]>({ url: `/projects/proponents/${proponentId}` });
};

const addProjects = ({
  accountId,
  projectIds,
}: {
  accountId: number;
  projectIds: number[];
}) => {
  return request({
    url: `/projects/accounts/${accountId}`,
    method: "post",
    data: {
      project_ids: projectIds,
    },
  });
};

export const useLoadProjectsByProponentId = (proponentId?: number) => {
  return useQuery({
    queryKey: ["projects", proponentId],
    queryFn: () => loadProjectsByProponentId(proponentId),
    enabled: Boolean(proponentId),
    retry: false,
  });
};

export const useAddProjects = (options?: Options) => {
  return useMutation({
    mutationFn: addProjects,
    ...options,
  });
};
