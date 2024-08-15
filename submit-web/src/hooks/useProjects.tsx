import { PROJECT_STATUS } from "@/components/registration/addProjects/ProjectCard/constants";
import { Project } from "@/models/Project";
import { useQuery } from "@tanstack/react-query";

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

export const useLoadProjectsByProponentId = (proponentId?: string) => {
  return useQuery({
    queryKey: ["projects", proponentId],
    queryFn: () => loadProjectsByProponentId(proponentId),
    enabled: Boolean(proponentId),
    retry: false,
  });
};
