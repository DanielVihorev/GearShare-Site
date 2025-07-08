// src/pages/AuthPage.tsx

import React from "react";
import { AuthForm } from "../features/authentication/AuthForm";

export const AuthPage: React.FC = () => {
  return (
    <div className='container mx-auto px-6 py-12 md:py-24 flex items-center justify-center'>
      <AuthForm />
    </div>
  );
};
