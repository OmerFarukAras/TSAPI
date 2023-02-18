import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";

import User from "@/model/user.model";
import { IUser } from "@/interface/user.interface";
import { RegisterSchema, LoginSchema } from "@/controller/body.controller";

import config from "config";

import { NextFunction } from "express";

export function CRegister(req: Request, res: Response) {
    let { email, password, name } = req.body;
    let value = RegisterSchema.validate({ email, name, password })
    if (value.error) return res.render("auth/signup", { layout: "auth", errorMsg: value.error.details.map(e => e.message).join(", ") })
    const user = new User({
        email,
        password,
        name
    });
    user.save((err) => {
        if (err) { return res.render("auth/signup", { layout: "auth", errorMsg: err }) }
        res.redirect("/auth/login")
    });

}

export async function CLogin(req: Request, res: Response) {
    let { email, password } = req.body;
    let value = LoginSchema.validate({ email, password })
    if (value.error) return res.render("auth/signin", { layout: "auth", errorMsg: value.error.details.map(e => e.message).join(", ") })
    let user: IUser | null = await User.findOne({ email });
    if (user) {
        bcrypt.compare(password, user.password, function (err, isMatch) {
            if (err) { return res.render("auth/signin", { layout: "auth", errorMsg: err }); }
            if (!isMatch) { return res.render("auth/signin", { layout: "auth", errorMsg: "invalid email or password" }); }
            if (isMatch && user) {
                user.generateToken((err: Error, userdata: IUser) => {
                    if (err) { return res.status(500).send({ msg: err.message }); }
                    if (userdata) user = userdata;
                    if (user) res.cookie("x_auth", user.token).redirect("/")
                })
            }
        });
    } else {
        return res.render("auth/signin", { layout: "auth", errorMsg: "invalid email or password" });
    }
}

export async function CLogout(req: Request, res: Response) {
    User.findOneAndUpdate({ _id: req.user._id, token: req.user.token }, { token: null }).then(() => {
        res.clearCookie("x_auth").redirect("/")
    }).catch(err => {
        res.status(401).send({
            message: err.message
        });
    })
}
//for public use
export async function CAuth(req: Request, res: Response, next: NextFunction) {
    try {
        let token = req.cookies.x_auth;
        if (!token) return next()
        let decodedToken = jwt.verify(token, config.get("JWT_SECRET_KEY") as string) as JwtPayload;
        let user = await User.findOne({ token: token, _id: decodedToken._id })
        if (user) {
            req.user = user
            return next()
        } else {
            return next();
        }
    } catch (error) {
        console.log(error)
        res.status(401).send({
            message: error
        });

    }
}

// for admin only
export async function CCAuth(req: Request, res: Response, next: NextFunction) {
    try {
        let token = req.cookies.x_auth;
        if (!token) return res.redirect("/auth/login")
        let decodedToken = jwt.verify(token, config.get("JWT_SECRET_KEY") as string)
        let user = await User.findOne({ token: token, _id: decodedToken })
        if (!user) return res.redirect("/auth/login")
        if (user) {
            req.user = user;
        }
        next()
    } catch (error) {
        res.status(401).send({
            message: error
        });

    }
}
