// src/pages/LoginPage.tsx

import React from "react";
// We'll import Link later, but it's good practice to plan for it
// import { Link } from "react-router-dom";

export const LoginPage: React.FC = () => {
  return (
    <div className='container mx-auto px-6 py-24 text-center'>
      <h1 className='text-4xl font-bold mb-4'>Login to Your Account</h1>
      <p className='text-white/80'>
        {/* This will eventually be a <Link> component */}
        Don't have an account? Sign up here.
      </p>
      {/* The login form will be built here in the next step */}
    </div>
  );
};
