import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../ui/Button";

// PUBLIC_INTERFACE
export const AppHeader: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between px-8 py-4 border-b border-secondary shadow-sm bg-primary text-white z-10">
      <div className="text-xl font-bold tracking-wide">
        <span className="text-accent">Note</span>
        Ease
      </div>
      {user ? (
        <div className="flex items-center gap-5">
          <span className="font-mono text-base">{user.email}</span>
          <Button variant="accent" onClick={logout}>
            Logout
          </Button>
        </div>
      ) : null}
    </header>
  );
};
