/**
 * Generic API Response type
 */
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    count?: number;
}

/**
 * API Error Response type
 */
export interface ApiError {
    success: false;
    message: string;
    errors?: Array<{
        field: string;
        message: string;
    }>;
}

/**
 * API Response with array data
 */
export interface ApiListResponse<T> extends ApiResponse<T[]> {
    count: number;
}
