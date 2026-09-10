import { get } from "./apiClient";
import { API_CONFIG } from "../config/apiConfig";
import type { INote } from "../types/INote";

/**
 * Get all notes from the backend API
 */
export default async function getAllNotes(): Promise<INote[]> {
  const notes = await get<INote[]>(API_CONFIG.ENDPOINTS.NOTES);

  // Add id field for backwards compatibility (map _id to id)
  return notes.map((note) => ({
    ...note,
    id: note._id,
  }));
}

