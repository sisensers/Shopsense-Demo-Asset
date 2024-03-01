import React from "react";
import ReactDOM from "react-dom/client";
//import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";

// Sisense
import { SisenseContextProvider } from "@sisense/sdk-ui";
const sisenseContextProviderArgs = () => {
  const baseOptions = {
    url: process.env.REACT_APP_SISENSE_URL,
    defaultDataSource: "Ecommerce Data [MASTER]",
  };
  const username = process.env.REACT_APP_SISENSE_USERNAME;
  const password = process.env.REACT_APP_SISENSE_PASSWORD;
  const wat = process.env.REACT_APP_SISENSE_WAT;
  const token = process.env.REACT_APP_SISENSE_API_TOKEN;
  const ssoEnabled = process.env.REACT_APP_SISENSE_SSO_ENABLED;

  console.log(baseOptions.url);
  console.log(token);

  if (ssoEnabled) {
    return { ...baseOptions, ssoEnabled: ssoEnabled?.toLowerCase() === "true" };
  } else if (wat) {
    return { ...baseOptions, wat };
  } else if (token) {
    return { ...baseOptions, token };
  } else if (username && password) {
    return { ...baseOptions, username, password };
  } else {
    return baseOptions;
  }
};

// Material Dashboard 2 PRO React TS Context Provider
import { MaterialUIControllerProvider } from "context";
import { AiContextProvider } from "@sisense/sdk-ui/ai";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <SisenseContextProvider {...sisenseContextProviderArgs()}>
    <AiContextProvider>
      <BrowserRouter>
        <MaterialUIControllerProvider>
          <App />
        </MaterialUIControllerProvider>
      </BrowserRouter>
    </AiContextProvider>
  </SisenseContextProvider>
);
