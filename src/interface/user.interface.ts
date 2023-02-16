import { Request } from "express";

export interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: number;
    token: string;
    createdAt: Date;
    updatedAt: Date;
    generateToken: (callBack: Function) => void;
};


export interface IUserRequest extends Request {
    user: IUser | null;
}