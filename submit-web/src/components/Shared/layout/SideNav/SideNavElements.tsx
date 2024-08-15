export const Routes: RouteType[] = [
  {
    name: "About",
    path: "/aboutpage",
  },
  {
    name: "All Projects",
    path: "/projects",
  },
  {
    name: "Plans",
    path: "/eao-plans",
  },
  {
    name: "Users",
    path: "/users",
  },
];

export const AuthenticatedRoutes: RouteType[] = [
  {
    name: "Profile",
    path: "/profile",
  },
];

export interface RouteType {
  name: string;
  path: string;
  group?: string;
  routes?: RouteType[];
}
