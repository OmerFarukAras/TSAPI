import { Schema, model } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import config from "config"

const SALT = 10;

const userSchema = new Schema({
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
//saving user data
userSchema.pre("save", function (next) {
    var user = this;
    if (user.isModified("password")) {//checking if password field is available and modified
        bcrypt.genSalt(SALT, function (err, salt) {
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
//for comparing the users entered password with database duing login 
userSchema.methods.comparePassword = function (candidatePassword: any, callBack: any) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return callBack(err);
        callBack(null, isMatch);
    });
}
//for generating token when loggedin
userSchema.methods.generateToken = function (callBack: any) {
    var user = this;
    var token = jwt.sign(user._id.toHexString(), config.get("JWT_SECRET_KEY"));
    user.token = token;
    user.save(function (err: any, user: any) {
        if (err) return callBack(err)
        callBack(null, user)
    });
};
//validating token for auth routes middleware
userSchema.statics.findByToken = function (token, callBack) {
    var user = this;
    jwt.verify(token, config.get("JWT_SECRET_KEY"), function (err: any, decode: any) {//this decode must give user_id if token is valid .ie decode=user_id
        if (err) return callBack(err);
        user.findOne({ "_id": decode, "token": token }, function (err: any, user: any) {
            if (err) return callBack(err);
            callBack(null, user);
        });
    });
};
export default model("User", userSchema);