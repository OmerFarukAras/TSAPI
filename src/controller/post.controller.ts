
import { Request, Response } from "express";

import { PostSchema } from "@/controller/body.controller";
import Post from "@/model/post.model";
import User from "@/model/user.model"

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
        post.save((err, post) => {
            if (err) return res.status(400).send({ msg: err })
            if (!err) res.send("Post ID : " + post._id)
        });
    } catch (err) {
        res.status(400).send({ msg: err })
    }
}
export async function readPost(req: Request, res: Response) {
    let { id } = req.params
    try {
        if (!id) return res.redirect("/")
        let post = await Post.findOne({ _id: id })
        if (!post) return res.redirect("/")
        return res.status(200).json(post)
    } catch (err) {
        res.status(400).send({ msg: err })
    }
}
export async function updatePost(req: Request, res: Response) {
    let { id } = req.params
    let { title, content } = req.body
    try {
        if (!id) return res.redirect("/")
        let value = PostSchema.validate({ title, content })
        if (value.error) return res.status(400).send({ msg: value.error.details.map(e => e.message).join(", ") })
        let post = await Post.findOneAndUpdate({ _id: id }, { title, content })
        if (!post) return res.redirect("/")
        post.save((err, post) => {
            if (err) return res.status(400).send({ msg: err })
            if (!err) return res.send("Success. Post ID : " + post._id)
        });
    } catch (err) {
        res.status(400).send({ msg: err })
    }
}
export async function deletePost(req: Request, res: Response) {
    let { id } = req.params
    try {
        if (!id) return res.redirect("/")
        let post = await Post.findOne({ _id: id })
        if (!post) return res.redirect("/")
        let user = await User.findOne({ _id: post.author })
        if (!user) return res.redirect("/")
        if (req.user.email != user.email) return res.status(403).json("Unautharized access.")
        post.delete()
        return res.send("Success. Post ID : " + post?._id)
    } catch (err) {
        res.status(400).send({ msg: err })
    }
}
