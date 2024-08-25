const express = require("express");
const router = express.Router();
// 导入userinfo路由处理模块
const userinfoHandler = require("../router_handle/userinfo");

// 导入expressJoi
const expressJoi = require("@escook/express-joi");
const { name_limit, email_limit, password_limit } = require("../limit/user");
// 上传头像
router.post("/uploadAvatar", userinfoHandler.uploadAvatar);
// 绑定账号
router.post("/bindAccount", userinfoHandler.bindAccount);
// 获取用户信息
router.post("/getUserInfo", userinfoHandler.getUserInfo);
// 修改姓名
router.post("/changeName", expressJoi(name_limit), userinfoHandler.changeName);
// 修改性别
router.post("/changeSex", userinfoHandler.changeSex);
// 修改邮箱
router.post(
  "/changeEmail",
  expressJoi(email_limit),
  userinfoHandler.changeEmail
);
// 修改密码
router.post(
  "/changePasswpord",
  expressJoi(password_limit),
  userinfoHandler.changePasswpord
);

module.exports = router;
