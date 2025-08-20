import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import AuthProvider from "./context/AuthContext.tsx";

// Initialize Microsoft Clarity
import Clarity from "@microsoft/clarity";

// Initialize Clarity
const clarityID = import.meta.env.VITE_CLARITY_PROJECT_ID;

if (clarityID && import.meta.env.PROD) {
  Clarity.init(clarityID);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
