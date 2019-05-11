const Koa = require("koa");
//数据库初始化
const {
    connect
} = require("./db/dbInit");

//路由
const router = require("koa-router")();
//用户祖册控制器
const user = require("./router/controller");

//初始化koa
const app = new Koa();

//处理请求
const bodyParser = require("koa-bodyparser");
app.use(bodyParser());

// 跨域
const cors = require("koa2-cors");
app.use(cors());

(async () => {
    // 连接数据库
    await connect();
})();

router.use("/user", user.routes());
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000);