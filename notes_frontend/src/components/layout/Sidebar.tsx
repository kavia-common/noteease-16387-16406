import React from "react";

// PUBLIC_INTERFACE
export const Sidebar: React.FC<{
  filters: string[];
  active: string;
  onSelect: (f: string) => void;
}> = ({ filters, active, onSelect }) => (
  <aside className="h-full w-full sm:w-56 px-3 py-4 bg-secondary/10 flex flex-col gap-2">
    <div className="text-secondary font-semibold mb-3 ml-2">Filters</div>
    {filters.map((f) => (
      <button
        key={f}
        onClick={() => onSelect(f)}
        className={`px-3 py-2 rounded text-left text-base ${
          active === f
            ? "bg-accent text-primary font-bold"
            : "text-secondary hover:bg-accent/30"
        }`}
      >
        {f}
      </button>
    ))}
  </aside>
);
