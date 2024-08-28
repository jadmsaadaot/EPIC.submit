import React from "react";
import {
  createRootRoute,
  createRouter,
  RouteComponent,
  RouterProvider,
} from "@tanstack/react-router";
import { OidcConfig } from "../../../src/utils/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material";
import { theme } from "../../../src/styles/theme";
import { AuthProvider } from "react-oidc-context";

export const mockZustandStore = (storeModule, initialState) => {
  const storeResetFn = storeModule.getState().reset;

  storeModule.setState(initialState, true); // Reset the store state to initialState

  // Clean up the mock after each test
  return () => {
    storeResetFn();
  };
};

export const setupTokenStorage = () => {
  sessionStorage.setItem(
    `oidc.user:${OidcConfig.authority}:${OidcConfig.client_id}`,
    JSON.stringify({
      access_token: "1234",
    }),
  );
};

export const TestWrapper = ({
  component,
}: {
  component: RouteComponent<any>;
}) => {
  const rootRoute = createRootRoute();
  const queryClient = new QueryClient();

  const mockAuth = {
    // mock the necessary properties and methods for useAuth context
    isAuthenticated: true,
    user: { profile: { name: "Test User" } },
    signoutRedirect: cy.stub(),
    signinRedirect: cy.stub(),
    // add other necessary mocks here
  };
  const router = createRouter({
    routeTree: rootRoute,
    context: {
      authentication: mockAuth,
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AuthProvider {...OidcConfig}>
          <RouterProvider router={router} defaultComponent={component} />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
