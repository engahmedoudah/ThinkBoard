import { del } from "./apiClient";
import { API_CONFIG } from "../config/apiConfig";

/**
 * Delete a note via the backend API
 */
export default async function deleteNote(id: string): Promise<void> {
  await del(`${API_CONFIG.ENDPOINTS.NOTES}/${id}`);
}

