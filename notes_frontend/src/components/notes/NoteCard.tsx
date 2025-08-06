import React from "react";
import { Button } from "../ui/Button";

// PUBLIC_INTERFACE
export const NoteCard = ({
  title,
  content,
  onEdit,
  onDelete,
}: {
  title: string;
  content: string;
  onEdit?: () => void;
  onDelete?: () => void;
}) => (
  <div className="rounded-xl bg-white shadow p-5 min-h-40 flex flex-col">
    <div className="flex justify-between items-center gap-2">
      <div className="font-bold text-lg truncate text-primary">{title}</div>
      {onEdit || onDelete ? (
        <div className="flex gap-1">
          {onEdit && (
            <Button
              variant="secondary"
              className="py-1 px-3 text-xs"
              onClick={onEdit}
            >
              Edit
            </Button>
          )}
          {onDelete && (
            <Button
              variant="accent"
              className="py-1 px-3 text-xs"
              onClick={onDelete}
            >
              Delete
            </Button>
          )}
        </div>
      ) : null}
    </div>
    <div className="mt-2 text-secondary text-base whitespace-pre-line break-words flex-1">
      {content.length > 400
        ? `${content.slice(0, 400)}...`
        : content}
    </div>
  </div>
);
