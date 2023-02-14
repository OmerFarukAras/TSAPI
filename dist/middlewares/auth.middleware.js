"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const auth = (req, res, next) => {
    let token = req.cookies.authToken;
    user_model_1.default.findByToken(token, (err, user) => {
        if (err)
            throw err;
        if (!user)
            return res.json({ isAuth: false, error: true });
        req.token = token;
        req.user = user;
        next();
    });
};
exports.default = auth;
