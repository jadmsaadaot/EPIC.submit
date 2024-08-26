export const Routes: RouteType[] = [
  {
    name: "All Projects",
    path: "/projects",
    routes: [],
  },
];

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
