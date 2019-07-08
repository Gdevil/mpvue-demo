// 云函数入口文件
const cloud = require('wx-server-sdk')

// cloud.init()
cloud.init({
  env: "gyk-test"
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const id = event.token
  // 先查询有无该用户openId
  const checkUser = await db.collection('users')
  .where({
    _id: id
  })
  .get()
  if (checkUser.data.length > 0) {
    
    // return checkUser.data[0];
    return {
      status: 10000,
      msg: "请求成功",
      body: checkUser.data[0]
    }
  } else {
    
    return {
      status: 30000,
      msg: "无效token",
      body: null
    };
  }

}