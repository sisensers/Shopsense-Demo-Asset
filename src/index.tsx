/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.2
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
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
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <SisenseContextProvider {...sisenseContextProviderArgs()}>
    <BrowserRouter>
      <MaterialUIControllerProvider>
        <App />
      </MaterialUIControllerProvider>
    </BrowserRouter>
  </SisenseContextProvider>
);
