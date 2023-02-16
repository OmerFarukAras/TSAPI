
declare namespace Express {
    export interface Response {
        sendError(statusCode: number, errorMessage: string): void
    }
}