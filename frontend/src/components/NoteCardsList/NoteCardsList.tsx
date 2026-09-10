import { useState, useEffect } from "react";
import type { INote } from "../../types/INote";
import getAllNotes from "../../services/getAllNotes";
import NoteCard from "../NoteCard/NoteCard";
import "./NoteCardsList.css";

export default function NoteCardsList() {
  const [notes, setNotes] = useState<INote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const fetchedNotes = await getAllNotes();
        setNotes(fetchedNotes);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load notes");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const handleDeleteFromList = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  if (loading) {
    return (
      <section className="container note-cards-list">
        <div className="text-center">
          <p>Loading notes...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container note-cards-list">
        <div className="text-center text-danger">
          <p>Error: {error}</p>
        </div>
      </section>
    );
  }

  if (notes.length === 0) {
    return (
      <section className="container note-cards-list">
        <div className="text-center">
          <p>No notes yet. Create your first note!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="container note-cards-list">
      {notes.map((note) => (
        <NoteCard
          note={note}
          onDelete={() => {
            handleDeleteFromList(note.id || note._id);
          }}
          key={`note-${note.id || note._id}`}
        />
      ))}
    </section>
  );
}
