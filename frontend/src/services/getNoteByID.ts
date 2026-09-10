import { get } from "./apiClient";
import { API_CONFIG } from "../config/apiConfig";
import type { INote } from "../types/INote";

/**
 * Get a single note by ID from the backend API
 */
export default async function getNoteByID(id: string): Promise<INote | undefined> {
  try {
    const note = await get<INote>(`${API_CONFIG.ENDPOINTS.NOTES}/${id}`);

    // Add id field for backwards compatibility
    return {
      ...note,
      id: note._id,
    };
  } catch (error) {
    // Return undefined if note not found (404)
    return undefined;
  }
}

