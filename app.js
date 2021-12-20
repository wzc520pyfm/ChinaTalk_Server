const defaultSettings = require('./settings')
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const expressJWT = require("express-jwt");
const { PRIVATE_KEY } = require("./utils/constant");
process.env.PORT = defaultSettings.PORT;
const swaggerOptions = require("./config/swagger");

//引入路由
var indexRouter = require("./routes/index");

//创建实例
var app = express();

// swagger
const expressSwagger = require("express-swagger-generator")(app);
expressSwagger(swaggerOptions);

console.log(1);
// view engine setup ---模板页面,使用jade模板引擎
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());  // 全局跨域--默认允许所有请求支持跨域
app.use(logger("dev")); // 记录网络请求日志
// post请求解析json, 将请求内容赋值给req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser()); // 解析cookie
app.use(express.static(path.join(__dirname, "public"))); // 静态资源
//定义的image目录为静态图片资源目录
app.use(express.static(path.join(__dirname, 'image')));
//赋予别名
app.use('/chinatalk/static', express.static(path.join(__dirname, 'public')));

// url验证---登录拦截(需要放在所有路由的前面),token解密
// app.use(
//   expressJWT({
//     secret: PRIVATE_KEY,
//   }).unless({
//     path: [], //白名单,除了这里写的地址，其他的URL都需要验证
//   })
//   // 前端需要为请求头添加token,格式遵守: headers['Authorization'] = `Bearer ${token}`  设置好后,发送请求在浏览器network请求头中可以看到 Authorization: Bearer token值
// );


//路由配置并使用中间件,在本项目中所有定义的路由都应当使用checkAPP中间件检查请求来源
app.use("/chinatalk", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.log(err);
  // token不正确或token过期都会进入这个错误
  if (err.name === "UnauthorizedError") {
    //  这个需要根据自己的业务逻辑来处理
    res.status(401).send({ code: -1, msg: "token验证失败" });
  } else {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {}; // 开发环境会返回详细的错误信息, 而在正式环境不会返回任何内容

    // render the error page
    res.status(err.status || 500);
    res.render("error");
  }
});

module.exports = app;
