export const Routes: RouteType[] = [
  {
    name: "Admin",
    path: "/",
    routes: [
      {
        name: "Account Information",
        path: '/test1',
      },
      {
        name: "User Management",
        path: '/test2',
      },
      {
        name: "Hom3",
        path: '/test3',
      },



    ]
  },
  {
    name: "About",
    path: "/aboutpage",
  },
  {
    name: "Lazy Loaded Page",
    path: "/newpage",
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
