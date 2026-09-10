import "./NoteCard.css";
import type { INote } from "../../types/INote";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import deleteNote from "../../services/deleteNote";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

interface NoteCardProps {
  note: INote;
  onDelete: () => void;
}

export default function NoteCard({ note, onDelete }: NoteCardProps) {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`notes/edit/${note.id}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    deleteNote(note.id);
    onDelete();
    setIsDeleteModalOpen(false);
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const onShowNoteDetails = () => {
    navigate("/notes/" + note.id);
  };

  return (
    <>
      <section
        className="note-card"
        id={`note-${note.id || note._id}`}
        onClick={onShowNoteDetails}
      >
        <h3>{note.title || "Without Title"}</h3>
        <p>{note.body || "Without Body"}</p>
        <div className="note-card-footer">
          <span className="note-date">
            {new Date(note.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <div className="note-actions">
            <button
              className="btn-action btn-edit"
              aria-label="Edit"
              title="Edit"
              onClick={handleEdit}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
            </button>
            <button
              className="btn-action btn-delete"
              aria-label="Delete"
              title="Delete"
              onClick={handleDelete}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </button>
          </div>
        </div>
      </section>
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Delete Note?"
        message="Are you sure you want to delete this note?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </>
  );
}
