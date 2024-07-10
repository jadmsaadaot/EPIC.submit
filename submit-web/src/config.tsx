declare global {
  interface Window {
    _env_: {
      VITE_API_URL: string;

      // Keycloak
      VITE_KEYCLOAK_URL: string;
      VITE_KEYCLOAK_CLIENT: string;
      VITE_KEYCLOAK_REALM: string;
      VITE_ENV: string;
      VITE_VERSION: string;
      VITE_APP_TITLE: string;
    };
  }
}
const API_URL =
  window._env_?.VITE_API_URL || import.meta.env.VITE_API_URL || "";

// Keycloak Environment Variables
const KC_URL =
  window._env_?.VITE_KEYCLOAK_URL || import.meta.env.VITE_KEYCLOAK_URL;
const KC_CLIENT =
  window._env_?.VITE_KEYCLOAK_CLIENT ||
  import.meta.env.VITE_KEYCLOAK_CLIENT;
const KC_REALM =
  window._env_?.VITE_KEYCLOAK_REALM ||
  import.meta.env.VITE_KEYCLOAK_REALM;
const APP_ENVIRONMENT =
  window._env_?.VITE_ENV || import.meta.env.VITE_ENV || "";
const APP_VERSION =
  window._env_?.VITE_VERSION || import.meta.env.VITE_VERSION || "";
const APP_TITLE =
  window._env_?.VITE_APP_TITLE || import.meta.env.VITE_APP_TITLE || "";

export const AppConfig = {
  // apiUrl: `${API_URL}/api/v1/`,
  apiUrl: `${API_URL}`,
  environment: APP_ENVIRONMENT,
  version: APP_VERSION,
  appTitle: APP_TITLE,
  keycloak: {
    url: KC_URL || "",
    clientId: KC_CLIENT || "",
    realm: KC_REALM || "",
  },
};
