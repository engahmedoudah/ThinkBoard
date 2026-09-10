import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import getNoteByID from "../../services/getNoteByID";
import updateNote from "../../services/updateNote";
import "./UpdateNote.css";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";

export default function UpdateNote() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      if (id) {
        try {
          const note = await getNoteByID(id);
          if (note) {
            setTitle(note.title || "");
            setBody(note.body || "");
          } else {
            navigate("/");
          }
        } catch (error) {
          console.error("Failed to fetch note:", error);
          navigate("/");
        } finally {
          setInitialLoading(false);
        }
      }
    };
    fetchNote();
  }, [id, navigate]);

  if (initialLoading) {
    return (
      <section className="update-note-container">
        <p>Loading note...</p>
      </section>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() && !body.trim()) {
      setErrorMessage("Please enter at least a title or body for your note.");
      setIsErrorModalOpen(true);
      return;
    }

    if (id) {
      try {
        setLoading(true);
        await updateNote(id, { title, body });
        setIsSuccessModalOpen(true);
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : "Failed to update note"
        );
        setIsErrorModalOpen(true);
      } finally {
        setLoading(false);
      }
    }
  };

  const onSuccessClose = () => {
    setIsSuccessModalOpen(false);
    navigate("/");
  };

  return (
    <>
      <section className="update-note-container">
        <div className="header-actions">
          <button onClick={() => navigate(-1)} className="btn-back">
            <span>&larr;</span> Back
          </button>
        </div>
        <div className="note-form-card">
          <h2>Update Note</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Note title"
              />
            </div>
            <div className="form-group">
              <label htmlFor="body">Content</label>
              <textarea
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={8}
                placeholder="Note details"
              ></textarea>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? "Updating..." : "Update Note"}
              </button>
            </div>
          </form>
        </div>
      </section>
      <ConfirmModal
        isOpen={isSuccessModalOpen}
        title="Success!"
        message="Your note has been updated successfully."
        onConfirm={onSuccessClose}
        isDanger={false}
        confirmText="OK"
      />
      <ConfirmModal
        isOpen={isErrorModalOpen}
        title="Error"
        message={errorMessage}
        onConfirm={() => setIsErrorModalOpen(false)}
        isDanger={true}
        confirmText="OK"
      />
    </>
  );
}
