import { Schema, model } from "mongoose";
import { IPost } from "@/interface/post.interface";

const PostSchema = new Schema<IPost>({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: 1
    }, content: {
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    author: { type: Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export default model<IPost>("Post", PostSchema);