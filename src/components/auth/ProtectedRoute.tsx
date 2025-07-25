import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const ProtectedRoute: React.FC = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    // You can show a loading spinner here while checking auth state
    return (
      <div className='flex h-screen w-full items-center justify-center bg-gray-900 text-white'>
        Loading...
      </div>
    );
  }

  if (!currentUser) {
    // If user is not logged in, redirect them to the login page
    return <Navigate to='/login' replace />;
  }

  // If user is logged in, render the child routes (which will be the DashboardLayout)
  return <Outlet />;
};
