import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "@/model/user.model";
import { IUser } from "@/interface/user.interface";
import { RegisterSchema, LoginSchema } from "@/controller/body.controller";

import config from "config";

import { NextFunction } from "express";

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
    User.findOneAndUpdate({ _id: req.user._id, token: req.user.token }, { token: null }).then(() => {
        res.redirect("/")
    }).catch(err => {
        res.status(401).send({
            message: err.message
        });
    })
}

export async function CAuth(req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.headers.authorization) return res.redirect("/auth/login")
        let token = req.headers.authorization.split(" ")[1];
        let user = await User.findOne({ token: token })
        let decodedToken = jwt.verify(token, config.get("JWT_SECRET_KEY") as string);
        if (user && decodedToken) {
            req.user = user;
        }
        next()
    } catch (error) {
        res.status(401).send({
            message: error
        });
    }
}
