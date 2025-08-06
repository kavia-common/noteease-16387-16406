import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "accent";
  children: React.ReactNode;
  fullWidth?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  className,
  fullWidth = false,
  ...rest
}) => {
  let colorClass = "";
  if (variant === "primary") colorClass = "bg-primary text-white hover:bg-accent";
  else if (variant === "secondary") colorClass = "bg-secondary text-white hover:bg-accent";
  else colorClass = "bg-accent text-primary hover:bg-primary hover:text-white";

  return (
    <button
      className={`rounded px-4 py-2 font-semibold transition-colors duration-150 focus:outline-none shadow-sm ${colorClass} ${
        fullWidth ? "w-full" : ""
      } ${className ?? ""}`}
      {...rest}
    >
      {children}
    </button>
  );
};
