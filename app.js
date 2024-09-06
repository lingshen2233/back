// 导入express框架
const express = require("express");
const multer = require("multer");
// 创建express实例
const app = express();
// 引入cors 解决跨域
const cors = require("cors");

// 导入body-parser
const bodyParser = require("body-parser");

// 全局挂载
app.use(cors());

// 文件上传

// 在server服务端下新建一个public文件，在public文件下新建upload文件用于存放图片
const upload = multer({ dest: "./public/upload" });
app.use(upload.any());
app.use(express.static("./public"));
// 解析应用程序/x-www-form-urlencoded
// extended为false时，值为数组或字符串，当为true时，值可以为任意类型
app.use(bodyParser.urlencoded({ extended: false }));
// 解析应用程序/JSON
app.use(bodyParser.json());

const userRouter = require("./router/userinfo");
app.use("/user", userRouter);
const setRouter = require("./router/setting");
app.use("/set", setRouter);
app.use((req, res, next) => {
  // status=0成功 默认值为 1，方便处理失败情况
  res.cc = (err, status = 1) => {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    });
  };
  next();
});
const jwtconfig = require("./jwt_config/index");
const { expressjwt: jwt } = require("express-jwt");
// 除了注册登录  都需要携带token
// app.use(jwt({
// 	secret:jwtconfig.jwtSecretKey,algorithms:['HS256']
// }).unless({
// 	path:[/^\/api\//]
// }))

const loginRouter = require("./router/login");
const Joi = require("joi");
app.use("/api", loginRouter);

// 对不符合joi规则的情况进行报错
app.use((err, req, res, next) => {
  // status=0成功 默认值为 1，方便处理失败情况
  if (err instanceof Joi.ValidationError)
    res.send({
      status: 1,
      message: "输入的数据不符合验证规则",
    });
});
// 绑定和侦听端口
app.listen(3009, () => {
  console.log("listenPort:3009");
});
