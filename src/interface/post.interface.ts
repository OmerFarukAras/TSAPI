import mongoose from "mongoose";

export interface IPost extends Document {
    _id: mongoose.ObjectId;
    title: string;
    content: string;
    author:mongoose.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}