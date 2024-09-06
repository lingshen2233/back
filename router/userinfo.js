const express = require("express");
const router = express.Router();
// 导入userinfo路由处理模块
const userinfoHandler = require("../router_handle/userinfo");

// 导入expressJoi
const expressJoi = require("@escook/express-joi");
const {
  name_limit,
  email_limit,
  password_limit,
  forgetPassword_limit,
} = require("../limit/user");
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
// 验证账号与邮箱
router.post("/verifyAccountAndEmail", userinfoHandler.verifyAccountAndEmail);

// 登陆页面修改密码
router.post(
  "/changePasswordInLogin",
  expressJoi(forgetPassword_limit),
  userinfoHandler.changePasswordInLogin
);
// ----------------------用户管理
// 添加管理员
router.post("/createAdmin", userinfoHandler.createAdmin);
// 获取管理员列表
router.post("/getAdminList", userinfoHandler.getAdminList);
//编辑管理员账号信息
router.post("/editAdmin", userinfoHandler.editAdmin);
// 对管理员取消授权
router.post("/changeIdenfifyToUser", userinfoHandler.changeIdenfifyToUser);
// 对用户进行赋权
router.post("/changeIdenfifyToAdmin", userinfoHandler.changeIdenfifyToAdmin);
// 通过账号对用户搜索
router.post("/searchUser", userinfoHandler.searchUser);
// 冻结用户
router.post("/banUser", userinfoHandler.banUser);
// 解冻用户
router.post("/hotUser", userinfoHandler.hotUser);
// 获取冻结列表
router.post("/getBanList", userinfoHandler.getBanList);
// 删除用户
router.post("/deleteUser", userinfoHandler.deleteUser);
// 通过部门对用户搜索 searchUserByDepartment 
router.post("/searchUserByDepartment", userinfoHandler.searchUserByDepartment);
module.exports = router;
