import { Schema, model } from "mongoose";

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import config from "config"
import { IUser } from "@/interface/user.interface";

const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    role: {
        type: Number,
        required: true,
        default: 0
    },
    token: {
        type: String
    }
}, { timestamps: true });

userSchema.pre("save", function (next) {
    var user = this;
    if (user.isModified("password")) {//checking if password field is available and modified
        bcrypt.genSalt(config.get("SALT") as number, function (err, salt) {
            if (err) return next(err)
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

userSchema.methods.generateToken = function (callBack: Function) {
    var user = this;
    var token = jwt.sign({ _id: user._id.toHexString() }, config.get("JWT_SECRET_KEY"), { expiresIn: '48h' });
    user.token = token;
    user.save(function (err: Error, user: IUser) {
        if (err) return callBack(err)
        callBack(null, user)
    });
};
export default model<IUser>("User", userSchema);