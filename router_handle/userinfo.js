const db = require("../db/index");
// 导入加密中间件
const bcrypt = require("bcrypt");
const crypto = require("crypto");
fs = require("fs");
// 头像上传
exports.uploadAvatar = (req, res) => {
  const onlyId = crypto.randomUUID();
  let oldName = req.files[0].filename;
  let newName = Buffer.from(req.files[0].originalname, "latin1").toString(
    "utf8"
  );

  fs.renameSync("./public/upload/" + oldName, "./public/upload/" + newName);
  const sql = "insert into image set ?";
  db.query(
    sql,
    {
      image_url: `http://127.0.0.1:3009/upload/${newName}`,
      onlyId,
    },
    (err, result) => {
      if (err) return res.cc(err);
      res.send({
        onlyId,
        status: 0,
        url: "http://127.0.0.1:3009/upload/" + newName,
      });
    }
  );
};

// 绑定账号 onlyId account url
exports.bindAccount = (req, res) => {
  const { account, onlyId, url } = req.body;
  const sql = "update image set account=? where onlyId =?";
  db.query(sql, [account, onlyId], (err, result) => {
    if (err) return res.cc(err);
    if (result.affectedRows == 1) {
      const sql1 = "update users set image_url =? where account=?";
      db.query(sql1, [url, account], (err, result) => {
        if (err) return res.cc(err);
        res.send({
          status: 0,
          message: "修改成功",
        });
      });
    }
  });
};
// 获取用户信息 接收参数id
exports.getUserInfo = (req, res) => {
  const sql = "select * from users where id=? ";
  db.query(sql, req.body.id, (err, result) => {
    if (err) return res.cc(err);
    res.send(result);
  });
};

// 修改姓名 接收参数 id name

exports.changeName = (req, res) => {
  const { id, name } = req.body;
  const sql = "update users set name=? where id =?";
  db.query(sql, [name, id], (err, result) => {
    if (err) return res.cc(err);
    res.send({
      status: 0,
      message: "修改成功",
    });
  });
};

// 修改性别 接收参数 id sex

exports.changeSex = (req, res) => {
  const { id, sex } = req.body;
  const sql = "update users set sex=? where id =?";
  db.query(sql, [sex, id], (err, result) => {
    if (err) return res.cc(err);
    res.send({
      status: 0,
      message: "修改成功",
    });
  });
};

// 修改邮箱 接收参数 id email

exports.changeEmail = (req, res) => {
  const { id, email } = req.body;
  const sql = "update users set email=? where id =?";
  db.query(sql, [email, id], (err, result) => {
    if (err) return res.cc(err);
    res.send({
      status: 0,
      message: "修改成功",
    });
  });
};
// 修改用户密码 先输入旧密码 oldPassoord 新密码 newPassword   id

exports.changePasswpord = (req, res) => {
  const sql = "select password from users where id =? ";
  db.query(sql, req.body.id, (err, result) => {
    if (err) return res.cc(err);
    const compareResult = bcrypt.compareSync(
      req.body.oldPassword,
      result[0].password
    );
    if (!compareResult) {
      res.send({
        status: 1,
        message: "原密码错误",
      });
    }
    req.body.newPassword = bcrypt.hashSync(req.body.newPassword, 10);
    const sql1 = "update users set password =? where id=?";
    db.query(sql1, [req.body.newPassword, req.body.id], (err, result) => {
      if (err) return res.cc(err);
      res.send({
        status: 0,
        message: "修改成功",
      });
    });
  });
};

// 验证账户与邮箱是否一致 email account
exports.verifyAccountAndEmail = (req, res) => {
  const { account, email } = req.body;
  const sql = "select email,id from users where account =?";
  db.query(sql, account, (err, result) => {
    if (err) return res.cc(err);
    if (email == result[0].email) {
      res.send({
        status: 0,
        id: result[0].id,
        message: "查询成功",
      });
    } else {
      res.send({
        status: 1,
        message: "查询失败",
      });
    }
  });
};

// 登陆页面修改密码 newPassword id
exports.changePasswordInLogin = (req, res) => {
  req.body.newPassword = bcrypt.hashSync(req.body.newPassword, 10);
  const sql = "update users set password =? where id=?";
  db.query(sql, [req.body.newPassword, req.body.id], (err, result) => {
    // 真奇怪，没有这个id 还没报错
    // 所以像判断是否修改成功 我选择判断修改的行数改了没
    /*     if (err) return res.cc(err);
    res.send({
      status: 0,
      message: "更新成功",
    });
    return; */

    if (result.affectedRows != 0) {
      res.send({
        status: 0,
        message: "更新成功",
      });
    } else {
      res.send({
        status: 1,
        message: "更新失败",
      });
    }
  });
};
