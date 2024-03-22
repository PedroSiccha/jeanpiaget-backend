interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
    token?: string;
}