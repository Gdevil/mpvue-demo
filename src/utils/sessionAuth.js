import user from '@/service/user'
import {
  TOKEN
} from '@/utils/constants'
import {
  $
} from "@/utils"
import store from '../store'
import { vueRouter } from '../main'
import Request from 'r'
import Vue from 'vue'

const redirectFn=(res)=>{
  if(res.status === 80003){
    vueRouter.push({
      url: '/pages/login/main'
    })
  }
}

//校验登录状态
export const checkLoginStatus = (url) => {
  const token = wx.getStorageSync(TOKEN)
  if(token){
    return true
  }
  return false
}

//去登录
export const toLogin = (redirectUrl,params) => {
  const _redirect = redirectUrl ? `?redirectUrl=${redirectUrl}` : ''
  return new Promise((resolve,reject) => {
    $(wx.login).then(wxres => {
      const data = {
        ...params,
        ...params.userInfo,
        code: wxres.code,
      }
      console.log(data)
      // return;
      //获取登录token
      // wx.cloud.callFunction({
      //   name: 'createUser',
      //   data: data,
      //   success(res) {
      //     console.log(res)
      //     if(res){
      //       wx.setStorageSync(TOKEN, res.result)
      //       resolve(res)
      //     }else{
      //       reject()
      //     }
          
      //   },
      //   fail(err) {
      //     console.log(err)
      //     reject()
      //   }
      // })
      Request.cloud({
        url: "createUser",
        data: data,
        showLoading: true
      }).then(res => {
        wx.setStorageSync(TOKEN, res.body)
        resolve(res)
      }).catch(err => {
        reject()
      });
      
    })
    
  })
}

function setUserInfo(){
  $(wx.getUserInfo, {withCredentials:false}).then(r => {
    const userInfo = r.userInfo
    const data = {nickname:userInfo.nickName, avatar:userInfo.avatarUrl, sex:userInfo.gender}
    user.update(data).then(res => {
      return Promise.resolve()
    })
  })
}

//完整登录流
export const loginHandle = (url) => {
  return new Promise((resolve, reject) => {
		Vue.prototype.globalData.loginUrl = undefined;
    if(checkLoginStatus()){
      resolve(1)
    }else{
			if(url){
				Vue.prototype.globalData.loginUrl = url;
			}
      vueRouter.push({
        url: '/pages/login/main'
      })
    }
  })
}


export function setPhone(){
  user.getPhone().then(res => {
    store.state.sUserInfo.phone = res.mobile || '';
  })
}