// 云函数入口文件
const cloud = require('wx-server-sdk')

// cloud.init()
cloud.init({
  env: "gyk-test"
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const userInfo = event.userInfo
  // 先查询有无该用户openId
  const checkUser = await db.collection('users')
  .where({
    openId: userInfo.openId
  })
  .get()
  // 如果有该用户，则更新基本用户信息
  if (checkUser.data.length > 0) {
    await db.collection('users').doc(checkUser.data[0]._id)
    .update({
      data: {
        avatarUrl: event.avatarUrl,
        nickName: event.nickName,
        gender: event.gender, //性别 0：未知、1：男、2：女
        province: event.province,
        city: event.city,
        country: event.country
      }
    })
    
    return {
      status: 10000,
      msg: "请求成功",
      body: checkUser.data[0]._id
    }
  } else {
    // 插入
    const insertResult = await db.collection('users').add({
      data: {
        avatarUrl: event.avatarUrl,
        nickName: event.nickName,
        gender: event.gender, //性别 0：未知、1：男、2：女
        province: event.province,
        city: event.city,
        country: event.country,
        openId: userInfo.openId,
        createTime: new Date()
      }
    })
    // return insertResult._id;
    return {
      status: 10000,
      msg: "请求成功",
      body: insertResult._id
    }
  }
}