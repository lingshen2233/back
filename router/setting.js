const express = require("express");
const router = express.Router();
// 导入路由处理模块
const setHandler = require("../router_handle/setting");

// 上传轮播图
router.post("/uploadSwiper", setHandler.uploadSwiper);
// 获得轮播图
router.post("/getAllSwiper", setHandler.getAllSwiper);
// 获得公司名称
router.post("/getCompanyName", setHandler.getCompanyName);
// 修改公司名称
router.post("/changeCompanyName", setHandler.changeCompanyName);
// 编辑公司介绍
router.post("/changeCompanyIntroduce", setHandler.changeCompanyIntroduce);
// 获取公司介绍
router.post("/getCompanyIntroduce", setHandler.getCompanyIntroduce);
// 获取所有公司信息
router.post("/getAllCompanyIntroduce", setHandler.getAllCompanyIntroduce);
module.exports = router;
