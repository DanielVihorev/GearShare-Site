import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import AuthProvider from "./context/AuthContext.tsx";

// Initialize Microsoft Clarity
import clarity from "@microsoft/clarity";

// Initialize Clarity - Replace 'YOUR_CLARITY_PROJECT_ID' with your actual project ID
if (import.meta.env.PROD) {
  clarity.init("MY_CLARITY_PROJECT_ID");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
