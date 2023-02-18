import { IRouter } from "express";
import { Logger } from "ng2-logger";

import Post from "@/model/post.model"

import routerClass from "@/class/routerClass.class";
import { CCAuth } from "@/controller/auth.controller";

import { createPost, readPost, updatePost, deletePost } from "@/controller/post.controller";

export default class main_route extends routerClass {
    constructor(log: Logger) {
        super({
            level: "public",
            log: log,
        });
    }
    run(router = this.router as IRouter) {
        router.post("/create", CCAuth, createPost)
        router.post("/:id", CCAuth, readPost)
        router.post("/:id/update", CCAuth, updatePost)
        router.post("/:id/delete", CCAuth, deletePost)

        router.get("/", async (_req, res) => {
            let post = await Post.find().populate("author")
            if (!post) return res.redirect("/")
            return res.render("post/main", {
                posts: post
            })
        }) //for public
        return router
    }
}

