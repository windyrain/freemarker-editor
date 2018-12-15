const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const dirTree = require("directory-tree");
const tree = dirTree("server/ftl");
const Router = require('koa-router')
const cors = require('koa-cors');
const Freemarker = require('freemarker');
const freemarker = new Freemarker();
const fs=require("fs");

let home = new Router()

// 子路由1
home.get('/', async ( ctx )=>{
  ctx.body = 'koa restful';
});

// 子路由2
let directory = new Router()
directory.get('/list', async ( ctx )=>{
  ctx.body = JSON.stringify(tree)
});

// 子路由3
let staticRouter = new Router();
staticRouter.post('/render', async ( ctx )=>{
  const content = ctx.request.body.content;
  const data = JSON.parse(ctx.request.body.data);

  const {err, result} = await new Promise((resolve, reject) => {
    freemarker.render(content, data, (err, result) => {
      resolve({err, result});
    });
  });
  if (err) {
    ctx.body = err;
  } else {
    ctx.body = result;
  }
});

staticRouter.post('/saveFile', async ( ctx )=>{
  const path = ctx.request.body.path;
  console.log(path)
  const data = ctx.request.body.data;

  const {err, result} = await new Promise((resolve, reject) => {
    fs.writeFile(path, data,function(err, result){
      resolve({err, result});
    })
  });

  if (err) {
    ctx.body = err;
  } else {
    ctx.body = result;
  }
});


directory.get('/fileContent', async ( ctx )=>{
  // console.log(ctx.request.query);
  let path = ctx.request.query.path;

  const {err, data} = await new Promise((resolve) => {
    fs.readFile(path,"utf-8",function(err, data){
      resolve({err, data});
    })
  }); 
  if (err) {
    ctx.body = err;
  } else {
    ctx.body = data;
  }
});

// 装载所有子路由
let router = new Router()
router.use('/', home.routes(), home.allowedMethods())
router.use('/directory', directory.routes(), directory.allowedMethods())
router.use('/static', staticRouter.routes(), staticRouter.allowedMethods())

// 加载路由中间件
app.use(cors());
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods())

app.listen(3001, () => {
  console.log('[demo] route-use-middleware is starting at port 3001')
})