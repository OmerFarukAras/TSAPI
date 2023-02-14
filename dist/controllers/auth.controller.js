"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserDetails = exports.LogoutUser = exports.LoginUser = exports.RegisterUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const RegisterUser = async (req, res) => {
    const user = new user_model_1.default(req.body);
    await user.save((err, doc) => {
        if (err) {
            return res.status(422).json({ errors: err });
        }
        else {
            const userData = {
                firtsName: doc.firstName,
                lastName: doc.lastName,
                email: doc.email,
            };
            return res.status(200).json({
                success: true,
                message: "Successfully Signed Up",
                userData
            });
        }
    });
};
exports.RegisterUser = RegisterUser;
const LoginUser = (req, res) => {
    user_model_1.default.findOne({ "email": req.body.email }, (_err, user) => {
        if (!user) {
            return res.status(404).json({ success: false, message: "User email not found!" });
        }
        else {
            user.comparePassword(req.body.password, (_err, isMatch) => {
                console.log(isMatch);
                if (!isMatch) {
                    return res.status(400).json({ success: false, message: "Wrong Password!" });
                }
                else {
                    user.generateToken((err, user) => {
                        if (err) {
                            return res.status(400).send({ err });
                        }
                        else {
                            const data = {
                                userID: user._id,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                email: user.email,
                                token: user.token
                            };
                            res.cookie("authToken", user.token).status(200).json({
                                success: true,
                                message: "Successfully Logged In!",
                                userData: data
                            });
                        }
                    });
                }
            });
        }
    });
};
exports.LoginUser = LoginUser;
const LogoutUser = (req, res) => {
    user_model_1.default.findByIdAndUpdate({ _id: req.user._id }, { token: "" }, (err) => {
        if (err)
            return res.json({ success: false, err });
        return res.status(200).send({ success: true, message: "Successfully Logged Out!" });
    });
};
exports.LogoutUser = LogoutUser;
const getUserDetails = (req, res) => {
    return res.status(200).json({
        isAuthenticated: true,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
    });
};
exports.getUserDetails = getUserDetails;
