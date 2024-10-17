import { AccountProject, Project } from "@/models/Project";
import { submitRequest } from "@/utils/axiosUtils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Options } from "./types";

const loadProjectsByProponentId = (proponentId?: number) => {
  if (!proponentId) {
    return Promise.reject(new Error("Proponent ID is required"));
  }
  return submitRequest<Project[]>({
    url: `/projects/proponents/${proponentId}`,
  });
};

const addProjects = ({
  accountId,
  projectIds,
}: {
  accountId: number;
  projectIds: number[];
}) => {
  return submitRequest({
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

type GetProjectsByAccountParams = {
  accountId?: number;
  searchOptions?: Record<string, string | number>;
};

const getProjectsByAccount = ({
  accountId,
  searchOptions,
}: GetProjectsByAccountParams) => {
  // Initialize URL with base path and account ID
  const url = `/projects/accounts/${accountId}`;

  return submitRequest<AccountProject[]>({
    url,
    params: searchOptions,
  });
};

export const useAddProjects = (options?: Options) => {
  return useMutation({
    mutationFn: addProjects,
    ...options,
  });
};

type UseGetProjectsByAccountParams = {
  accountId: number;
  searchOptions?: Record<string, string | number>;
};
export const useGetProjects = ({
  accountId,
  searchOptions,
}: UseGetProjectsByAccountParams) => {
  return useQuery({
    queryKey: ["account-projects", accountId, searchOptions],
    queryFn: () => getProjectsByAccount({ accountId, searchOptions }),
  });
};

type GetProjectsByIdParams = {
  projectId: number;
};
const getProjectById = ({ projectId }: GetProjectsByIdParams) => {
  return submitRequest<AccountProject>({
    url: `projects/${projectId}`,
  });
};

type UseGetProjectByIdParams = {
  projectId: number;
};

export const useGetProject = ({ projectId }: UseGetProjectByIdParams) => {
  return useQuery({
    queryKey: ["account-project", projectId],
    queryFn: () => getProjectById({ projectId }),
    enabled: Boolean(projectId),
  });
};
