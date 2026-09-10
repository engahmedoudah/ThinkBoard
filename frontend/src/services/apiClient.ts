import type { ApiResponse, ApiError } from "../types/ApiResponse";

/**
 * Custom error class for API errors
 */
export class ApiClientError extends Error {
    statusCode?: number;
    errors?: ApiError["errors"];

    constructor(
        message: string,
        statusCode?: number,
        errors?: ApiError["errors"]
    ) {
        super(message);
        this.name = "ApiClientError";
        this.statusCode = statusCode;
        this.errors = errors;
    }
}

/**
 * Handle API response and throw error if not successful
 */
async function handleResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get("content-type");

    // Check if response is JSON
    if (contentType && contentType.includes("application/json")) {
        const data: ApiResponse<T> | ApiError = await response.json();

        if (!response.ok) {
            const errorData = data as ApiError;
            throw new ApiClientError(
                errorData.message || "An error occurred",
                response.status,
                errorData.errors
            );
        }

        // Return the data field from successful response
        const successData = data as ApiResponse<T>;
        return successData.data as T;
    }

    // Handle non-JSON responses
    if (!response.ok) {
        throw new ApiClientError(
            `HTTP Error: ${response.statusText}`,
            response.status
        );
    }

    return {} as T;
}

/**
 * HTTP GET request
 */
export async function get<T>(url: string): Promise<T> {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        return await handleResponse<T>(response);
    } catch (error) {
        if (error instanceof ApiClientError) {
            throw error;
        }
        throw new ApiClientError(
            error instanceof Error ? error.message : "Network error occurred"
        );
    }
}

/**
 * HTTP POST request
 */
export async function post<T, D = unknown>(url: string, data: D): Promise<T> {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        return await handleResponse<T>(response);
    } catch (error) {
        if (error instanceof ApiClientError) {
            throw error;
        }
        throw new ApiClientError(
            error instanceof Error ? error.message : "Network error occurred"
        );
    }
}

/**
 * HTTP PUT request
 */
export async function put<T, D = unknown>(url: string, data: D): Promise<T> {
    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        return await handleResponse<T>(response);
    } catch (error) {
        if (error instanceof ApiClientError) {
            throw error;
        }
        throw new ApiClientError(
            error instanceof Error ? error.message : "Network error occurred"
        );
    }
}

/**
 * HTTP DELETE request
 */
export async function del<T>(url: string): Promise<T> {
    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        return await handleResponse<T>(response);
    } catch (error) {
        if (error instanceof ApiClientError) {
            throw error;
        }
        throw new ApiClientError(
            error instanceof Error ? error.message : "Network error occurred"
        );
    }
}
