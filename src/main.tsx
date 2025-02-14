import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppContext from "./context/appContext";
import "@/style/index.css";
import App from "./App";
const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <AppContext>
        <App />
      </AppContext>
    </StrictMode>,
  );
} else {
  console.error("Root element not found");
}
