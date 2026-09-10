import { useEffect } from "react";
import "./ConfirmModal.css";

interface ConfirmModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel?: () => void;
    confirmText?: string;
    cancelText?: string;
    isDanger?: boolean; // True for delete, false for success
}

export default function ConfirmModal({
    isOpen,
    title,
    message,
    onConfirm,
    onCancel,
    confirmText = "Confirm",
    cancelText = "Cancel",
    isDanger = true,
}: ConfirmModalProps) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen && onCancel) {
                onCancel();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onCancel]);

    if (!isOpen) return null;

    return (
        <div className="modal-backdrop" onClick={onCancel || undefined}>
            <div
                className="modal-container"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                <h3 id="modal-title" className="modal-title">
                    {title}
                </h3>
                <p className="modal-message">{message}</p>
                <div className="modal-actions">
                    {onCancel && (
                        <button className="btn-modal btn-cancel" onClick={onCancel}>
                            {cancelText}
                        </button>
                    )}
                    <button
                        className={`btn-modal ${isDanger ? "btn-confirm-danger" : "btn-confirm-success"}`}
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
