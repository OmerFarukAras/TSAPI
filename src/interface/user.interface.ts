import mongoose from "mongoose";
export interface IUser extends Document {
    _id: mongoose.ObjectId;
    name: string;
    email: string;
    password: string;
    role: number;
    token: string | null;
    createdAt: Date;
    updatedAt: Date;
    generateToken: (callBack: Function) => void;
};
