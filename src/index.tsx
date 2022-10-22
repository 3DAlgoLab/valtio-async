import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { PageLoader } from "./PageLoader";

import App from "./App";

const rootElement = document.getElementById("root") as HTMLDivElement;
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Suspense fallback={<PageLoader />}>
      <App />
    </Suspense>
  </StrictMode>
);
