import { Request, Response, NextFunction } from 'express'

export function extendedResponse(req: Request, res: Response, next: NextFunction) {
    req.user = null
    res.sendError = function (statusCode, errorMessage) {
        this.render("error", { layout: "error", errorCode: statusCode, errorText: errorMessage })
    }
    next()
}