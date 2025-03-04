import Koa from "koa";
import Router, {RouterContext} from "koa-router";
import logger from "koa-logger";
import json from "koa-json";

import { router as articles } from "./routers/articles";
import { router as dummy} from "./routers/special"

const app: Koa = new Koa();
const router: Router = new Router();

// const welcomeAPI = async (ctx: RouterContext, next: any) => {
//     ctx.body = {
//         message: "Welcome to the blog API!"
//     }
//     await next();
// }

//router.get('/api/v1', welcomeAPI);
app.use(json());
app.use(logger());
// app.use(bodyParser());
//app.use(router.routes()).use(router.allowedMethods());
app.use( articles.routes());
app.use( dummy.routes());

app.listen(10888, () => {
    console.log("Koa Started");
})