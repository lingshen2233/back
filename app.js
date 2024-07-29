// 导入express框架
const express=require('express')
// 创建express实例
const app=express()
// 引入cors 解决跨域
const cors=require('cors')
// 导入body-parser
const bodyParser = require('body-parser')

// 全局挂载
app.use(cors)
// 解析应用程序/x-www-form-urlencoded 
// extended为false时，值为数组或字符串，当为true时，值可以为任意类型
app.use(bodyParser.urlencoded({extended:false}))
// 解析应用程序/JSON
app.use(bodyParser.json())


// 绑定和侦听端口
app.listen(3000, () => {
	console.log('listenPort:3000')
})