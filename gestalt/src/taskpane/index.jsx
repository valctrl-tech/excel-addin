import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import { FluentProvider, webDarkTheme } from "@fluentui/react-components";

/* global document, Office, module, require */

const title = "Contoso Task Pane Add-in";

const rootElement = document.getElementById("container");
const root = rootElement ? createRoot(rootElement) : undefined;

/* Render application after Office initializes */
Office.onReady(() => {
  root?.render(
    <FluentProvider theme={webDarkTheme}>
      <App title={title} />
    </FluentProvider>
  );
});

if (module.hot) {
  module.hot.accept("./components/App", () => {
    const NextApp = require("./components/App").default;
    root?.render(NextApp);
  });
}
