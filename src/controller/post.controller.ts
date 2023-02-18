
import { Request, Response } from "express";

import { PostSchema } from "@/controller/body.controller";
import Post from "@/model/post.model";
import User from "@/model/user.model"
import { getPosts } from "@/middleware/getAllPosts";

export async function createPost(req: Request, res: Response) {
    let { title, content } = req.body
    try {
        let value = PostSchema.validate({ title, content })
        if (value.error) return res.render("post/create", { errorMsg: value.error.details.map(e => e.message).join(", ") });
        let post = new Post({
            title,
            content,
            author: req.user
        })
        post.save(async (err, post) => {
            if (err) return res.render("post/create", { errorMsg: err });
            let posts = await getPosts()
            if (!err) res.render("post/main", {
                posts: posts,
                user: req.user,
                msg: "Post created. ID: " + post._id
            })
        });
    } catch (err) {
        return res.render("post/create", { errorMsg: err });
    }
}
export async function readPost(req: Request, res: Response) {
    let { id } = req.params
    try {
        if (!id) return res.redirect("/")
        let post = await Post.findOne({ _id: id }).populate("author")
        if (!post) return res.redirect("/")
        let user = await User.findOne({ _id: post.author })
        let owner = ((req.user && user) ? true : false) ? (user?.email == req.user.email ? true : false) : false
        return res.render("post/read", {
            user: req.user,
            post: post,
            owner
        })
    } catch (err) {
        res.status(400).send({ msg: err })
    }
}
export async function updatePost(req: Request, res: Response) {
    let { id } = req.params
    let { title, content } = req.body
    try {
        if (!id) return res.redirect("/post")
        let post = await Post.findOneAndUpdate({ _id: id }, { title, content })
        if (!post) return res.redirect("/post")
        let value = PostSchema.validate({ title, content })
        if (value.error) return res.render("post/read", { owner: true, post: post, user: req.user, errorMsg: value.error.details.map(e => e.message).join(", ") });
        post.save((err) => {
            if (err) return res.render("post/read", { owner: true, post: post, user: req.user, errorMsg: err });
            if (!err) return res.redirect("/post/" + id)
        });
    } catch (err) {
        return res.render("post/read", { owner: true, user: req.user, errorMsg: err + " Refresh page" });
    }
}
export async function deletePost(req: Request, res: Response) {
    let { id } = req.params
    try {
        if (!id) return res.redirect("/post")
        let post = await Post.findOne({ _id: id })
        if (!post) return res.redirect("/post")
        let user = await User.findOne({ _id: post.author })
        if (!user) return res.redirect("/post")
        if (req.user.email != user.email) return res.sendError(403, "Unautharized access.")
        post.delete()
        return res.redirect("/post")
    } catch (err) {
        return res.render("post/read", { owner: true, user: req.user, errorMsg: err + " Refresh page" });
    }
}
