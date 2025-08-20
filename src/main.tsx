import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import AuthProvider from "./context/AuthContext.tsx";

// Initialize Microsoft Clarity
import clarity from "@microsoft/clarity";

// Initialize Clarity
const clarityID = import.meta.env.MY_CLARITY_PROJECT_ID;
if (process.env.NODE_ENV === "production") {
  console.log("Clarity ID", clarityID);
  clarity.init(clarityID);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
