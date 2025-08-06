"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AppLayout } from "../components/layout/Layout";
import { NotesGrid, Note } from "../components/notes/NotesGrid";
import { Loader } from "../components/ui/Loader";
import { Button } from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";
import { useModal } from "../contexts/ModalContext";
import { useAuth } from "../contexts/AuthContext";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  getNoteById,
} from "../utils/api";
import { NoteModal } from "../components/notes/NoteModal";

export default function HomePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const { open: openModal, close: closeModal } = useModal();
  const [saving, setSaving] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (user === null) {
      router.replace("/auth");
    }
  }, [user, router]);

  // Fetch notes
  const fetchNotes = useCallback(() => {
    setLoading(true);
    getNotes(filter !== "All" ? filter : undefined)
      .then((res) => {
        if (Array.isArray(res)) setNotes(res);
        else setNotes([]);
      })
      .catch(() => setNotes([]))
      .finally(() => setLoading(false));
  }, [filter]);

  useEffect(() => {
    if (user) fetchNotes();
  }, [user, filter, fetchNotes]);

  // Add note
  const handleCreate = () => {
    openModal(
      <NoteModal
        mode="create"
        loading={saving}
        onSave={async (title, content) => {
          setSaving(true);
          try {
            await createNote({ title, content });
            closeModal();
            fetchNotes();
          } catch {
            alert("Could not create note");
          } finally {
            setSaving(false);
          }
        }}
        onCancel={closeModal}
      />
    );
  };

  // Edit note
  const handleEdit = async (id: string) => {
    let note = notes.find((n) => n.id === id);
    if (!note) {
      // Backup fetch in case not loaded
      note = (await getNoteById(id)) as Note | undefined;
    }
    openModal(
      <NoteModal
        mode="edit"
        note={note}
        loading={saving}
        onSave={async (title, content) => {
          setSaving(true);
          try {
            await updateNote(id, { title, content });
            closeModal();
            fetchNotes();
          } catch {
            alert("Could not update note");
          } finally {
            setSaving(false);
          }
        }}
        onCancel={closeModal}
      />
    );
  };

  // Delete note
  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this note?")) return;
    setSaving(true);
    deleteNote(id)
      .then(fetchNotes)
      .catch(() => alert("Could not delete note"))
      .finally(() => setSaving(false));
  };

  return (
    <AppLayout filter={filter} setFilter={setFilter}>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">My Notes</div>
          <Button variant="accent" onClick={handleCreate}>
            + New Note
          </Button>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <NotesGrid notes={notes} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </div>
      <Modal />
    </AppLayout>
  );
}
