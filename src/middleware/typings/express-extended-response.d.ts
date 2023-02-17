
declare namespace Express {
    export interface Response {
        sendError(statusCode: number, errorMessage: string): void
    }
    export interface Request {
        user: IUser | null
    }
}