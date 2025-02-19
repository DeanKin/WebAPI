import Router, {RouterContext} from "koa-router";
import bodyParser from "koa-bodyparser";

const router = new Router({prefix: '/api/v1/articles'});
const articles = [ 
    {title:'hello article', fullText:'some text here to fill the body'}, 
    {title:'another article', fullText:'again here is some text here to fill'}, 
    {title:'coventry university ', fullText:'some news about coventry university'}, 
    {title:'smart campus', fullText:'smart campus is coming to IVE'} 
];
interface Article {
    title: string,
    fullText: string
}

//define the handler function
const getAll = async (ctx: RouterContext, next: any)=>{
    ctx.body = articles;
    await next();
}

//Get by ID
const getById = async (ctx: RouterContext, next: any)=>{
    let id = +ctx.params.id
    if ((id < articles.length+1) && (id>0)){
        ctx.body = articles[id-1];
    } else {
        ctx.state = 404;
    }
    await next();
}

//create the new Articles
const createArticles = async (ctx: RouterContext, next: any)=>{
    let article: any = ctx.request.body;
    let newArticles = {title: article.title, fullText: article.fullText};
    articles.push(newArticles);
    ctx.status = 201;
    ctx.body = newArticles;
    await next();
}

const updateArticles = async (ctx: RouterContext, next: any)=>{
    let id = +ctx.params.id;
    let article = <Article> ctx.request.body;
    
    if ((id < articles.length + 1) && (id > 0)) {
              
        if (article.title && article.fullText) {
            articles[id - 1] = { title: article.title, fullText: article.fullText };
            ctx.body = articles[id - 1];
        } else {
            ctx.status = 400;
            ctx.body = { error: 'Title and fullText are required' };
        }
    } else {
        ctx.status = 404;
        ctx.body = { error: "Article not found" };
    }
    await next();
}

const deleteArticles = async (ctx: RouterContext, next: any)=>{
    let id = +ctx.params.id;
    if ((id < articles.length + 1) && (id > 0)) {
        articles.splice(id - 1, 1);
        ctx.status = 204; // No content
        ctx.body = {
            message: "Articles deleted"
        }
    } else {
        ctx.status = 404;
        ctx.body = { error: "Article not found" };
    }
    await next();
}


router.get('/', getAll);
router.get('/:id([0-9]{1,})', getById);
router.post('/',bodyParser(), createArticles);
router.put('/:id([0-9]{1,})',bodyParser(), updateArticles);
router.del('/:id([0-9]{1,})', deleteArticles);

export { router };