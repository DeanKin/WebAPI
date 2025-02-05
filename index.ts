import Koa from "koa";
import Router, {RouterContext} from "koa-router";
import logger from "koa-logger";
import json from "koa-json";
import bodyParser from "koa-bodyparser";
import { CustomErrorMessageFunction, query, body, validationResults } from "koa-req-validation";

const app: Koa = new Koa();
const router: Router = new Router();
const films = [{ id:1, name: "Indiana Jones"}, { id:2, name: "Harry Po"}];
const customErrorMessage: CustomErrorMessageFunction = (
    _ctx: RouterContext, value: string) => {
        return (
        'The name must be between 3 and 20 ' + 'characters long but received length ${value.length}'
        );
    };
const validatorName = [
    body("name").isLength({ min: 3}).withMessage(customErrorMessage).build(),
    body("id").isInt({ min: 10000, max: 20000 }).build()
    ]


    
router.get('/', 
query("name")
.isLength({ min: 3 }).optional()
.withMessage(customErrorMessage)
.build(),
async (ctx: RouterContext, next:any) => {
    ctx.body = {msg: 'Hello world!'};
    await next();
})

router.post('/', ... validatorName, async (ctx: RouterContext, next: any) =>{
    const data = ctx.request.body;
    ctx.body = data;
    await next();
})

router.get('/film', async (ctx: RouterContext, next:any) => {
    ctx.body = films;
    await next();
})
//change this part
router.post('/film',... validatorName, async (ctx: RouterContext, next:any) => {
    const data: any = ctx.request.body;
    films.push (data);
    await next();
})

router.put('/film', async (ctx: RouterContext, next:any) => {
    const data: any  = ctx.request.body;
    for(let i = 0; i< films.length; i++){
        if(films[i].id == data.id){
            films[i].name = data.name;
        }
    }
    await next();
})

app.use(json());
app.use(logger());
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

app.use(async (ctx: RouterContext, next:any) =>{
    try{
        await next();
        if(ctx.status ===404){
            ctx.status = 404;
            ctx.body = {err:"No such endpoints"}
        }
    }catch(err:any){
        ctx.body = {err:err}
    }
});

app.listen(10888, () => {
    console.log("Koa Started");
})