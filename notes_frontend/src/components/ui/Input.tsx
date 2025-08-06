import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export const Input: React.FC<InputProps> = ({ label, className, ...rest }) => (
  <div className="flex flex-col gap-1 w-full">
    {label && <label className="text-sm font-medium text-secondary">{label}</label>}
    <input
      className={`rounded border border-secondary/30 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent bg-white text-primary ${className ?? ""}`}
      {...rest}
    />
  </div>
);
