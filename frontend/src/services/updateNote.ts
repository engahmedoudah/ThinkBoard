import { put } from "./apiClient";
import { API_CONFIG } from "../config/apiConfig";
import type { INote } from "../types/INote";

/**
 * Update a note via the backend API
 */
export default async function updateNote(
  id: string,
  updatedFields: Partial<Omit<INote, "id" | "_id" | "createdAt" | "updatedAt">>
): Promise<INote> {
  const updatedNote = await put<INote, typeof updatedFields>(
    `${API_CONFIG.ENDPOINTS.NOTES}/${id}`,
    updatedFields
  );

  // Add id field for backwards compatibility
  return {
    ...updatedNote,
    id: updatedNote._id,
  };
}

