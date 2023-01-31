"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class routerClass {
    level;
    router;
    constructor(options) {
        this.level = options.level;
        this.router = (0, express_1.Router)();
    }
    run(router = this.router) {
        router.get("/", (_req, res) => {
            res.send("Hello World");
        });
        return router;
    }
}
exports.default = routerClass;
