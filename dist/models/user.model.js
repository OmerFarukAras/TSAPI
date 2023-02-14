"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
const SALT = 10;
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, "The email field is required!"],
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        required: [true, "The password field is required!"],
        minlength: 5
    },
    firstName: {
        type: String,
        required: [true, "The first name field is required!"],
        trim: true,
        maxlength: 100
    },
    lastName: {
        type: String,
        required: [true, "The last name field is required!"],
        trim: true,
        maxlength: 100
    },
    token: {
        type: String
    }
});
userSchema.pre("save", function (next) {
    var user = this;
    if (user.isModified("password")) {
        bcrypt_1.default.genSalt(SALT, function (err, salt) {
            if (err)
                return next(err);
            bcrypt_1.default.hash(user.password, salt, function (err, hash) {
                if (err)
                    return next(err);
                user.password = hash;
                next();
            });
        });
    }
    else {
        next();
    }
});
userSchema.methods.comparePassword = function (candidatePassword, callBack) {
    bcrypt_1.default.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err)
            return callBack(err);
        callBack(null, isMatch);
    });
};
userSchema.methods.generateToken = function (callBack) {
    var user = this;
    var token = jsonwebtoken_1.default.sign(user._id.toHexString(), config_1.default.get("JWT_SECRET_KEY"));
    user.token = token;
    user.save(function (err, user) {
        if (err)
            return callBack(err);
        callBack(null, user);
    });
};
userSchema.statics.findByToken = function (token, callBack) {
    var user = this;
    jsonwebtoken_1.default.verify(token, config_1.default.get("JWT_SECRET_KEY"), function (err, decode) {
        if (err)
            return callBack(err);
        user.findOne({ "_id": decode, "token": token }, function (err, user) {
            if (err)
                return callBack(err);
            callBack(null, user);
        });
    });
};
exports.default = (0, mongoose_1.model)("User", userSchema);
