// src/pages/RegisterPage.tsx

import React from "react";
import { Link } from "react-router-dom"; // Using the real Link component now

export const RegisterPage: React.FC = () => {
  return (
    <div className='container mx-auto px-6 py-24 text-center'>
      <h1 className='text-4xl font-bold mb-4'>Create a New Account</h1>
      <p className='text-white/80'>
        Already have an account?{" "}
        <Link to='/login' className='text-blue-400 hover:underline'>
          Login here.
        </Link>
      </p>
      {/* Registration form will be built here later */}
    </div>
  );
};
