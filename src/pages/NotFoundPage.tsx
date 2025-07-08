import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

export const NotFoundPage: React.FC = () => {
  return (
    <div className='container mx-auto px-6 py-24 text-center flex flex-col items-center'>
      <h1 className='text-8xl font-bold text-white'>404</h1>
      <p className='text-2xl text-white/80 mt-4 mb-8'>Oops! Page Not Found.</p>
      <p className='max-w-md text-white/70 mb-8'>
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Link to='/'>
        <Button variant='primary' className='text-lg px-8 py-4'>
          Go to Homepage
        </Button>
      </Link>
    </div>
  );
};
