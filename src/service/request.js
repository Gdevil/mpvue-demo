import wxComps from "../utils/wxComps";
import { TOKEN } from "@/utils/constants";

/**
 * 网络请求封装
 */


class Request {
  static cloud({
    url,
    data = {},
    config = {},
    showLoading = false
  }) {
    return http({
      url,
      data,
      config,
      showLoading
    });
  }

}

//网络请求
function http({ url, data, config, showLoading }) {
  const token = wx.getStorageSync(TOKEN);
  
  
  return checkNetWork().then(netWorkStatus => {
    if (!netWorkStatus) {
      wxComps.toast("网络异常");
      return false;
    }
    showLoading &&
    wx.showLoading({
      title: "加载中..."
    });
    return new Promise((resolve, reject) => {



      wx.cloud.callFunction({
        name: url,
        data,
        config,
        success(res) {
          showLoading && wx.hideLoading();
          if(res && res.result.status == 10000){
            resolve(res.result)
          }else{
            errorHandle(res.result.status, res.result.msg);
            reject(res.result)
          }
          
        },
        fail(err) {
          showLoading && wx.hideLoading();
          // errorHandle(null, err.errMsg);
          reject(err)
        },
        complete(res) {}
      })




    });
  });
}

function checkNetWork() {
  return new Promise(resolve => {
    wx.getNetworkType({
      success: res => {
        let networkType = res.networkType;
        if (networkType === "none" || networkType === "unknown") {
          resolve(false);
        } else {
          resolve(true);
        }
      },
      fail: () => {
        resolve(false);
      }
    });
  });
}
/**
 * 异常处理
 * @param  {Object} [error={errorCode] [description]
 * @param  {[type]} message            [description]
 * @return {[type]}                    [description]
 */
function errorHandle(errorCode, errorMessage) {
  switch (errorCode) {
    // case 502:
    //   wxComps.toast("服务器异常");
    //   break;
    case 30000:
      wx.setStorageSync(TOKEN, "");
      errorMessage && wxComps.toast(errorMessage);
      break;
    default:
      errorMessage && wxComps.toast(errorMessage);
      break;
  }
}

export default Request;
