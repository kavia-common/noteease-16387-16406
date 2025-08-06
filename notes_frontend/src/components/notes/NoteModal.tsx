import React, { useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Loader } from "../ui/Loader";

export const NoteModal = ({
  mode,
  note,
  onSave,
  onCancel,
  loading,
}: {
  mode: "create" | "edit";
  note?: { title: string; content: string };
  onSave: (title: string, content: string) => void;
  onCancel: () => void;
  loading: boolean;
}) => {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        onSave(title, content);
      }}
    >
      <div>
        <h2 className="text-xl font-bold text-primary mb-2">
          {mode === "edit" ? "Edit Note" : "New Note"}
        </h2>
      </div>
      <Input
        label="Title"
        value={title}
        maxLength={100}
        required
        onChange={(e) => setTitle(e.target.value)}
      />
      <div>
        <label className="text-sm font-medium text-secondary">Content</label>
        <textarea
          className="rounded border border-secondary/30 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent bg-white text-primary w-full resize-none min-h-[120px]"
          value={content}
          maxLength={2000}
          required
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-end gap-3 mt-2">
        <Button
          variant="secondary"
          type="button"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          type="submit"
          disabled={loading}
        >
          {loading ? <Loader /> : mode === "edit" ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
};
