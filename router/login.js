// 登陆注册路由

const express = require("express");
const router = express.Router();
// 导入路由处理模块
const loginHandler = require("../router_handle/login");

// 导入expressJoi
const expressJoi = require("@escook/express-joi");
const { login_limit } = require("../limit/login.js");
// 注册
router.post("/register", expressJoi(login_limit), loginHandler.register);
// 登录
router.post("/login", expressJoi(login_limit), loginHandler.login);

module.exports = router;
