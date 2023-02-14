"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const auth = (req, res, next) => {
    let { authToken } = req.cookies;
    user_model_1.default.findByToken(authToken, (err, user) => {
        if (err)
            throw err;
        if (!user)
            return res.sendError("403", "Invalid Auth");
        req.user = user;
        next();
    });
};
exports.default = auth;
