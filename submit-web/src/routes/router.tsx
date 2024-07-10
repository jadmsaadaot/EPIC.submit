import Home from "@/pages/Home";
import { createBrowserRouter } from "react-router-dom";
import PageNotFound from "@/pages/PageNotFound";
import About from "@/pages/About";
import App from "@/App";
import PlanListPage from "@/pages/Plans/PlanListPage";
import PlanPage from "@/pages/Plans/PlanPage";
import Plans from "@/pages/Plans/Plans";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    // loader() {
    //   // Our root route always provides the user, if logged in
    //   return { user: fakeAuthProvider.username };
    // },
    Component: App,
    errorElement: <PageNotFound />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "about",
        // action: loginAction,
        // loader: loginLoader,
        Component: About,
      },
      {
        path: "planslist",
        Component: Plans,
        children: [
          {
            index: true,
            Component: PlanListPage,
          },
          {
            path: ":planIdParam",
            Component: PlanPage,
          },
        ],
      },
      // {
      //   path: "protected",
      //   loader: protectedLoader,
      //   Component: ProtectedPage,
      // },
    ],
  },
  // {
  //   path: "/logout",
  //   async action() {
  //     // We signout in a "resource route" that we can hit from a fetcher.Form
  //     await fakeAuthProvider.signout();
  //     return redirect("/");
  //   },
  // },
]);

export default router;
