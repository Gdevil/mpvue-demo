<template>
  <div class="ind">
    <div class="userBox" @tap="toLogin">
      <img :src="sUserInfo.avatar">
      <p>{{sUserInfo.isLogin == true ? sUserInfo.name : '点击登录'}}</p>
    </div>
    <ul>
      <li v-for="item in mainData" @tap="linkTo(item.url)">{{item.text}}</li>
    </ul>
    
  </div>
</template>

<script>
import Request from "r";
import { mapState } from 'vuex';
export default {
  components: {
    
  },
  data() {
    return {
      mainData: [
        {
          text: "点击获取openId",
          url: "/pages/cloud/getOpenId/main"
        },
        {
          text: "数据库操作",
          url: "/pages/cloud/database/main"
        },
        {
          text: "云文件操作",
          url: "/pages/cloud/cloudFile/main"
        },
        {
          text: "云函数",
          url: "/pages/cloud/cloudFunction/main"
        }
      ]
    };
  },
  computed: {
    ...mapState(['sUserInfo'])
  },
  methods: {
    
    linkTo(url) {
      this.$router.push({
        url: url
      });
    },
    toLogin(){
      if(!this.sUserInfo.isLogin){
        this.linkTo('/pages/login/main')
      }
    },
    getUserInfo(){
      let _this = this

      Request.cloud({
        url: "getUserInfo",
        data: {token:wx.getStorageSync("token")},
        showLoading: true
      }).then(res => {
        // console.log(res)
        _this.sUserInfo.avatar = res.body.avatarUrl
        _this.sUserInfo.name = res.body.nickName
      }).catch(err => {
        console.log(err)
        _this.sUserInfo.isLogin = false;
      });


      // wx.cloud.callFunction({
      //   name: 'getUserInfo',
      //   data: {token:wx.getStorageSync("token")},
      //   success(res) {
      //     if(res){
      //       _this.sUserInfo.avatar = res.result.avatarUrl
      //       _this.sUserInfo.name = res.result.nickName
      //     }else{
      //       _this.sUserInfo.isLogin = false;
      //     }
          
      //   },
      //   fail(err) {
      //     console.log(err)
      //     _this.sUserInfo.isLogin = false;
      //   }
      // })
    }
    
  },
  onLoad(option) {
    
    let token = wx.getStorageSync("token")
    if(token && token != ''){
      this.sUserInfo.isLogin = true;
      this.getUserInfo();
    }

  },
  onShareAppMessage(res) {
    return {
      imageUrl:'',
      title: "厉害厉害",
      path: "/pages/index/main"
    };
  }
};
</script>

<style scoped lang="scss">
.ind {
  .userBox {
    text-align: center;
    padding: 10px 0;
    img{
      width:80px;
      height:80px;
      border-radius: 100px;
      background: #f2f2f2;
      display: inline-block;
    }
    p{
      margin: 10px 0 0;
      font-size: 14px;
      line-height: 22px;
      color: #333;
    }
  }
  ul{
    li{
      background: #fff;
      padding: 12px 15px;
      border-top: solid 1px #f2f2f2;
      position: relative;
      &:after{
        content:"";
        display: block;
        position: absolute;
        width: 8px;
        height:8px;
        top:50%;
        margin-top: -4px;
        right:15px;
        border-top:solid 1px #aaa;
        border-right:solid 1px #aaa;
        transform: rotate(45deg);
      }
    }
  }
}
</style>
