import { PROJECT_STATUS } from "@/components/registration/addProjects/ProjectCard/constants";
import { Project } from "@/models/Project";
import { request } from "@/utils/axiosUtils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Options } from "./types";

const dummyProjects: Project[] = [
  {
    id: 1,
    name: "Project 1",
    description: "Description 1",
    status: PROJECT_STATUS.POST_DECISION,
  },
];
const loadProjectsByProponentId = (proponentId?: string) => {
  if (!proponentId) {
    return Promise.reject(new Error("Proponent ID is required"));
  }
  return Promise.resolve(dummyProjects);
};

type AddProject = {
  name: string;
  account_id: number;
  project_id: number;
};
const addProjects = (projects: AddProject[]) => {
  return request<AddProject[]>({
    url: "/projects",
    method: "post",
    data: projects,
  });
};

export const useLoadProjectsByProponentId = (proponentId?: string) => {
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
