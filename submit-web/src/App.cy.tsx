import { routeTree } from "./routeTree.gen.ts";
import { createRouter, RouterProvider } from "@tanstack/react-router";

// Create a new router instance
const router = createRouter({ routeTree });

describe("<App />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<RouterProvider router={router} />);
  });
});
