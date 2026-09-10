import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import getNoteByID from "../../services/getNoteByID";
import deleteNote from "../../services/deleteNote";
import type { INote } from "../../types/INote";
import "./ShowNoteDetails.css";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";

export default function ShowNoteDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState<INote | undefined>(undefined);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      if (id) {
        try {
          setLoading(true);
          const found = await getNoteByID(id);
          setNote(found);
        } catch (error) {
          console.error("Failed to fetch note:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchNote();
  }, [id]);

  if (loading) {
    return (
      <section className="show-note-details">
        <p>Loading note...</p>
      </section>
    );
  }

  if (!note) {
    return (
      <section className="show-note-details">
        <p>Note not found!</p>
        <button onClick={() => navigate("/")} className="btn-back">
          Back to Home
        </button>
      </section>
    );
  }

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteNote(note.id || note._id);
      setIsDeleteModalOpen(false);
      navigate("/");
    } catch (error) {
      alert("Failed to delete note");
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <section className="show-note-details">
        <button onClick={() => navigate("/")} className="btn-back">
          <span>&larr;</span> Back
        </button>
        <div className="note-content">
          <h2>{note.title || "Without Title"}</h2>
          <span className="note-date">
            {new Date(note.createdAt).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <div className="note-body">
            <p>{note.body || "No content"}</p>
          </div>
        </div>
        <div className="actions">
          <button
            onClick={() => navigate(`/notes/edit/${note.id || note._id}`)}
            className="btn-action btn-edit"
          >
            Edit
          </button>
          <button onClick={handleDelete} className="btn-action btn-delete">
            Delete
          </button>
        </div>
      </section>
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Delete Note?"
        message="Are you sure you want to delete this note? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </>
  );
}
