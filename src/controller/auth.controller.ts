import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "@/model/user.model";
import { IUser, IUserRequest } from "@/interface/user.interface";
import { RegisterSchema, LoginSchema } from "@/controller/body.controller";
import config from "config";
import { NextFunction } from "express-serve-static-core";

export function CRegister(req: Request, res: Response) {
    let { email, password, name } = req.body;
    let value = RegisterSchema.validate({ email, name, password })
    if (value.error) return res.status(400).send({ msg: value.error })
    const user = new User({
        email,
        password,
        name
    });
    user.save((err) => {
        if (err) { return res.status(500).send({ msg: err.message }); }
        res.status(200).send("Registered successfully, please login");
    });

}

export async function CLogin(req: Request, res: Response) {
    let { email, password } = req.body;
    let value = LoginSchema.validate({ email, password })
    if (value.error) return res.status(400).send({ msg: value.error })
    let user: IUser | null = await User.findOne({ email });
    if (user) {
        bcrypt.compare(password, user.password, function (err, isMatch) {
            if (err) { return res.status(500).send({ msg: err.message }); }
            if (!isMatch) { return res.status(400).send({ msg: "Invalid email or password" }); }
            if (isMatch && user) {
                user.generateToken((err: Error, userdata: IUser) => {
                    if (err) { return res.status(500).send({ msg: err.message }); }
                    if (userdata) user = userdata;
                    if (user) res.cookie("x_auth", user.token).status(200).json({
                        loginSuccess: true,
                        userID: user._id,
                        token: user.token
                    });
                })
            }
        });
    } else {
        return res.status(400).send({ msg: "Invalid email or password" });
    }
}

export async function CLogout(req: Request, res: Response) {
    if (!req.headers.authorization) return res.redirect("/")
    // let token = req.headers.authorization.split(" ")[1];

    res.redirect("/")
}

export async function CAuth(req: IUserRequest, res: Response, next: NextFunction) {
    try {
        let user: IUser | null
        if (!req.headers.authorization) return res.redirect("/auth/login")
        let token = req.headers.authorization.split(" ")[1];
        let decodedToken = jwt.verify(token, config.get("JWT_SECRET_KEY") as string);
        user = await User.findOne({ _id: decodedToken, token: token })
        if (!user) return res.redirect("/auth/login")
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).send({
            message: 'Auth failed'
        });
    }
}
