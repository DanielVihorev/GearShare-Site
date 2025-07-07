import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  className = "",
}) => {
  const baseClasses =
    "px-6 py-3 font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-opacity-50";

  const variantClasses = {
    primary:
      "bg-white text-blue-600 hover:shadow-xl hover:bg-gray-50 focus:ring-blue-400",
    secondary:
      "bg-white/10 text-white border-2 border-white/30 hover:bg-white/20 focus:ring-white/50",
  };

  return (
    <a
      href='#'
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </a>
  );
};
