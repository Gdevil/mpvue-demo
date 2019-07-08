// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let type = typeof(event.a) + " - " + typeof(event.b)
  let a = Number(event.a)
  let b = Number(event.b)
  let sum = a+b
  let cut = a-b
  return{
    sum,
    cut,
    type
  }
}

// exports.main = async (event, context) => ({
//   sum: event.a + event.b
// })