import { Project } from "@/models/Project";

export const createRoutes = (projects: Project[]): RouteType[] => {
  const projectRoutes = projects?.map((project) => ({
    name: project.name,
    path: `/projects/${project.id}`,
  }));
  return [
    {
      name: "All Projects",
      path: "/projects",
      routes: projectRoutes,
    },
  ];
};

export const AuthenticatedRoutes: RouteType[] = [
  {
    name: "Admin",
    path: "/profile",
  },
];

export interface RouteType {
  name: string;
  path: string;
  group?: string;
  routes?: RouteType[];
}
