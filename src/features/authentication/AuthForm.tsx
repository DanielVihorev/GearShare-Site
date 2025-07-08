// src/features/authentication/AuthForm.tsx

import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom"; // Import Link
import { Button } from "../../components/ui/Button";

export const AuthForm: React.FC = () => {
  // Get the current location object, which contains the URL path
  const location = useLocation();

  // The state now defaults based on the URL path
  const [isLogin, setIsLogin] = useState(location.pathname === "/login");

  // This effect will run if the component is already on the page
  // and the user navigates between /login and /register.
  useEffect(() => {
    setIsLogin(location.pathname === "/login");
  }, [location.pathname]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className='w-full max-w-md mx-auto'>
      <div className='bg-white/5 border border-white/20 rounded-2xl shadow-xl p-8 backdrop-blur-lg'>
        <h2 className='text-center text-3xl font-bold text-white mb-2'>
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>
        <p className='text-center text-white/70 mb-8'>
          {isLogin ? "Sign in to continue" : "Get started with GearShare"}
        </p>

        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* We will add form fields here */}
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-white/90 mb-2'
            >
              Email Address
            </label>
            <input
              type='email'
              name='email'
              id='email'
              placeholder='you@example.com'
              className='w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-white/50 focus:ring-2 focus:ring-blue-400 focus:outline-none transition'
              required
            />
          </div>

          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-white/90 mb-2'
            >
              Password
            </label>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='••••••••'
              className='w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-white/50 focus:ring-2 focus:ring-blue-400 focus:outline-none transition'
              required
            />
          </div>

          <div>
            <Button
              type='submit'
              variant='primary'
              className='w-full justify-center text-base py-3'
            >
              {isLogin ? "Sign In" : "Create Account"}
            </Button>
          </div>
        </form>

        <div className='mt-6 text-center'>
          <p className='text-sm text-white/70'>
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            {/* UPDATED: Use Link to navigate and change the URL */}
            <Link
              to={isLogin ? "/register" : "/login"}
              className='font-medium text-blue-400 hover:text-blue-300 focus:outline-none'
            >
              {isLogin ? "Sign up" : "Sign in"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
