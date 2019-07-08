import request from './request'

export default {
 //  /**
 //   * 登录
 //   * @param {Boolean}} showLoading
 //   */
 //  login (data, showLoading) {
 //    return request.post({ url: '/v1/weixin', data, showLoading })
 //  },
  
 //  /**
 //   * 更新用户信息
 //   * @param {Boolean}} showLoading
 //   */
 //  update (data, showLoading) {
 //    return request.post({ url: '/api/user/update-profile', data, showLoading })
 //  },
	
	// /**
	//  * 获取手机号
	//  * @param {Boolean}} showLoading
	//  */
	// getPhone(data, showLoading){
	// 	return request.post({url: "/api/user/profile", data, showLoading})
	// },

  /**
   * 时间戳转化为年 月 日 时 分 秒
   * ts: 传入时间戳
   * format：返回格式，支持自定义，但参数必须与formateArr里保持一致
  */
  tsFormatTime(timestamp, format) {
      const formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
      const formatNumber = n => {
          n = n.toString()
          return n[1] ? n : '0' + n
      }
      let returnArr = [];
      let date = new Date(timestamp);
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      let hour = date.getHours()
      let minute = date.getMinutes()
      let second = date.getSeconds()
      returnArr.push(year, month, day, hour, minute, second);
      returnArr = returnArr.map(formatNumber);
      for (var i in returnArr) {
          format = format.replace(formateArr[i], returnArr[i]);
      }
      return format;
  }




}
