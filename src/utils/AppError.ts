class AppError extends Error {
    statusCode: number;
    status: string;
    constructor(statusCode: number, status: string, message: string) {
        super(message)
        this.statusCode = statusCode
        this.status = status
    }
}

export default AppError