import { IRouter } from "express";
import { Logger } from "ng2-logger";

import routerClass from "@/class/routerClass.class";
import { CCAuth, CAuth } from "@/controller/auth.controller";

import { createPost, readPost, updatePost, deletePost } from "@/controller/post.controller";
import { getPosts } from "@/middleware/getAllPosts";

export default class main_route extends routerClass {
    constructor(log: Logger) {
        super({
            level: "public",
            log: log,
        });
    }
    run(router = this.router as IRouter) {
        router.post("/create", CCAuth, createPost)
        router.post("/:id/update", CCAuth, updatePost)

        router.get("/:id/delete", CCAuth, deletePost) // TODO: Add a confirmation page
        router.get("/", CAuth, async (req, res) => {
            let post = await getPosts()
            if (!post) return res.redirect("/")
            return res.render("post/main", {
                user: req.user,
                posts: post
            })
        })
        router.get("/create", CCAuth, (req, res) => {
            return res.render("post/create", {
                user: req.user
            })
        })

        router.get("/:id", CCAuth, readPost)
        return router
    }
}

