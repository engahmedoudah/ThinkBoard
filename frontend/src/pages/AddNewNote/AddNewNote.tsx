import { useState } from "react";
import { useNavigate } from "react-router-dom";
import addNewNote from "../../services/addNewNote";
import "./AddNewNote.css";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";

export default function AddNewNote() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() && !body.trim()) {
      setErrorMessage("Please enter at least a title or body for your note.");
      setIsErrorModalOpen(true);
      return;
    }

    try {
      setLoading(true);
      await addNewNote({
        title,
        body,
      });
      setIsSuccessModalOpen(true);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to create note"
      );
      setIsErrorModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const onSuccessClose = () => {
    setIsSuccessModalOpen(false);
    navigate("/");
  };

  return (
    <>
      <section className="add-new-note-container">
        <div className="header-actions">
          <button onClick={() => navigate("/")} className="btn-back">
            <span>&larr;</span> Back to Notes
          </button>
        </div>
        <div className="note-form-card">
          <h2>Create New Note</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Note Title"
                autoComplete="off"
              />
            </div>
            <div className="form-group">
              <label htmlFor="body">Content</label>
              <textarea
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={8}
                placeholder="Write your note here..."
              ></textarea>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? "Creating..." : "Create Note"}
              </button>
            </div>
          </form>
        </div>
      </section>
      <ConfirmModal
        isOpen={isSuccessModalOpen}
        title="Success!"
        message="Your note has been created successfully."
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
