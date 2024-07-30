
// 导入MySQL
const mysql = require('mysql');
// 创建MySQL链接
const db=mysql.createPool({
    host:'localhost',
    user:"root",
    password:'123456',
    database:'back_system'
})
// 暴露出去 
module.exports=db