<template>
  <div class="container">
    <div class="content">
      <img src="../../images/logo.png" class="logo">
    </div>
    <button class="btn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">微信用户一键登录</button>

  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { $ } from "@/utils";
import user from "@/service/user";
import WechatComponents from "u/wxComps.js";
import { toLogin, loginHandle, checkLoginStatus } from "u/sessionAuth.js";
import Request from "r";

export default {
  components: {
    
  },
  data() {
    return {
      login: checkLoginStatus(),
      
      
    };
  },
  computed: {},
  methods: {
    getPhoneNumber(e) {
      const { encryptedData, iv, errMsg } = e.mp.detail;
      const mid = this.$root.$mp.query.mid;
      const _this = this;
      if (errMsg === "getPhoneNumber:ok") {
        $(wx.login).then(wxres => {
          const data = {
            iv,
            encryptedData,
            token: wx.getStorageSync("token"),
            // token:'dfdaa59e0bd8d769c60dfb3ff0d053c0b1d994c9e8b50d491a131ce92eb527d0',
            code: wxres.code,
            plat: "wa",
            plat_name: "51wj",
            source_mid: mid || null
          };
          //获取登录token
          user
            .login(data, {
              showLoading: true
            })
            .then(res => {
              console.log(res);

              // _this.$router.back()
              this.next = true;
              this.globalData.isBindPhone = 1;
              WechatComponents.toast("授权成功！");
            });
        });
      } else {
      }
    }
  },

  onLoad(option) {}
};
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  background-color: #fff;
  text-align: center;
  .content {
    margin-bottom: 20px;
    padding-top: 58px;
  }
  .logo {
    width: 75px;
    height: 75px;
  }
  .btn {
    width: 316px;
    height: 48px;
    line-height: 48px;
    background-color: #007130;
    color: #fff;
    font-size: 20px;
    margin: auto;
    margin-top: 78px;
  }

  
}
</style>
