"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extendedResponse = void 0;
function extendedResponse(_req, res, next) {
    res.sendError = function (statusCode, errorMessage) {
        this.render("error", { layout: "error", errorCode: statusCode, errorText: errorMessage });
    };
    next();
}
exports.extendedResponse = extendedResponse;
