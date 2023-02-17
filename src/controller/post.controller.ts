
import { Request, Response } from "express";

import { PostSchema } from "@/controller/body.controller";
import Post from "@/model/post.model";

export async function createPost(req: Request, res: Response) {
    let { title, content } = req.body
    try {

        let value = PostSchema.validate({ title, content })
        if (value.error) return res.status(400).send({ msg: value.error.details.map(e => e.message).join(", ") })
        let post = new Post({
            title,
            content,
            author: req.user
        })
        post.save((err) => {
            if (err) return res.status(400).send({ msg: err })
            if (!err) res.send("createPost as " + req.user.name)
        });
    } catch (err) {
        res.status(400).send({ msg: err })
    }
}
export async function readPost(_req: Request, _res: Response) {

}
export async function updatePost(_req: Request, _res: Response) {

}
export async function deletePost(_req: Request, _res: Response) {

}