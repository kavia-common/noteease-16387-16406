import React, { ReactNode } from "react";
import { AppHeader } from "./AppHeader";
import { Sidebar } from "./Sidebar";

const FILTERS = ["All", "Starred", "Archived"];

export const AppLayout = ({
  children,
  filter,
  setFilter,
}: {
  children: ReactNode;
  filter: string;
  setFilter: (s: string) => void;
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader />
      <div className="flex flex-1 h-full">
        {/* Sidebar visible on sm+ */}
        <div className="hidden sm:block w-56 border-r border-secondary/20">
          <Sidebar
            filters={FILTERS}
            active={filter}
            onSelect={setFilter}
          />
        </div>
        {/* Main content, margin left on sm+ */}
        <main className="flex-1 p-6 sm:p-8">{children}</main>
      </div>
    </div>
  );
};
