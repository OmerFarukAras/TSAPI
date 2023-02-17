import { IRouter } from "express";
import { Logger } from "ng2-logger";

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
        router.get("/", CCAuth, (_req, res) => {
            res.send("CRUD API. create, read, update, delete")
        })
        router.post("/create", CCAuth, createPost)
        router.post("/read", CCAuth, readPost)
        router.post("/update", CCAuth, updatePost)
        router.post("/delete", CCAuth, deletePost)
        return router
    }
}

