import { post } from "./apiClient";
import { API_CONFIG } from "../config/apiConfig";
import type { INote } from "../types/INote";

/**
 * Create a new note via the backend API
 */
export default async function addNewNote(
  note: Omit<INote, "id" | "_id" | "createdAt" | "updatedAt">
): Promise<INote> {
  const newNote = await post<INote, typeof note>(
    API_CONFIG.ENDPOINTS.NOTES,
    note
  );

  // Add id field for backwards compatibility
  return {
    ...newNote,
    id: newNote._id,
  };
}

