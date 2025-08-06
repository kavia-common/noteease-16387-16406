import React from "react";
import { NoteCard } from "./NoteCard";

export type Note = {
  id: string;
  title: string;
  content: string;
};

export const NotesGrid = ({
  notes,
  onEdit,
  onDelete,
}: {
  notes: Note[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) => (
  <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
    {notes.length === 0 ? (
      <div className="col-span-full text-secondary font-semibold text-lg mt-20">
        No notes found.
      </div>
    ) : (
      notes.map((n) => (
        <NoteCard
          key={n.id}
          title={n.title}
          content={n.content}
          onEdit={() => onEdit(n.id)}
          onDelete={() => onDelete(n.id)}
        />
      ))
    )}
  </section>
);
