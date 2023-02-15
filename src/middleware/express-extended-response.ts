import { Request, Response, NextFunction } from 'express'

export function extendedResponse(_req: Request, res: Response, next: NextFunction) {
    res.sendError = function (statusCode, errorMessage) {
        this.render("error", { layout: "error", errorCode: statusCode, errorText: errorMessage })
    }
    next()
}