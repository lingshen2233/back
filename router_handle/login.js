const db = require('../db/index');
// 导入加密中间件
const bcrypt = require('bcrypt');

// 导入jwt 用于生成token
const jwt=require('jsonwebtoken')

// 导入jwt配置文件 用于加密解密
const jwtconfig=require('../jwt_config/index')
exports.register=(req,res)=>{

    const reginfo=req.body
    // 判断数据是否为空
    if(!reginfo.account|| !reginfo.password){
        return res.send({
            status:1,
            message:'账号/密码不能为空'
        })
    }
    // 判断前端穿的数据是否已经存在表中
    const sql='select * from users where account = ?'
    db.query(sql,reginfo.account,(err,result)=>{
        if(result.length>0){
            return res.send({
                status:1,
                message:'账号已存在'
            })
        }
		// 对密码加密 bcrypt.js
		reginfo.password=bcrypt.hashSync(reginfo.password,10)
		// 把账号密码插入user表
		const sqlUser='insert into users set ?'
		const identify='用户'
		const create_time=new Date()
		db.query(sqlUser,{
		    account:reginfo.account,
		    password:reginfo.password,
		    identify,
		    create_time,
		    status:0
		},(err,result)=>{
		    // affectedRows 影响的行数，插入失败，不影响行数
		    if(result.affectedRows !==1){
		        return res.send({
		            status:1,
		            message:'注册失败'
		        })
				
		    }
		    res.send({
		        status:0,
		        message:'注册成功'
		    })
		})
    })

}
exports.login=(req,res)=>{
    const loginfo=req.body
    // 查询数据表中有没有前端传过来的账号
    const sql='select * from users where account=?'
    db.query(sql,loginfo.account,(err,result)=>{
        // 执行sql语句失败，一般在数据库断开执行
        if(err) return  res.cc(err)
        if(result.length!==1)return res.cc('登陆失败1')
        // 对前端传过来数值解密
    const comareResult=bcrypt.compareSync(loginfo.password,result[0].password)
    if(!comareResult){
        return res.cc('登陆失败2')
    }
    // 判断账号是否冻结
    if(result[0].status==1){
        return res.cc('账号被冻结')
    }
    // 登陆成功 返回token
    const user={
        ...result[0],
        password:'',
        imageUrl:'',
        create_time:'',
        update_time:'',
    }
    // 设置token有效时长
    const tokenStr=jwt.sign(user,jwtconfig.jwtSecretKey,{
        expiresIn:'7h'
    })
    res.send({
        result:result[0],
        status:0,
        message:'登陆成功',
        token:'Bearer '+tokenStr
    })
    }) 
}