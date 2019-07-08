<template>
  <div class="container">
    <div>
      <img src="../../images/logo.png" class="logo">
      <p class="name">别废话快登陆</p>
      <p class="desc">猴子出品，反正不是残次品</p>
    </div>
    <button class="login" open-type="getUserInfo" @getuserinfo="handleLogin">微信登录</button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { $ } from "@/utils";
import user from "@/service/user";
import { toLogin } from "u/sessionAuth.js";
import Request from "r";

export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState(['sUserInfo'])
  },
  methods: {
    handleLogin(e) {
      const _this = this;
      const mid = this.$root.$mp.query.mid

      wx.getUserInfo({
        success(res) {
          // console.log(res);
          // const { iv, encryptedData } = res;
          toLogin(undefined, res).then(data => {
            _this.$wxComps.toast("授权成功");
            // console.log("授权成功")
            // console.log(data)
            _this.sUserInfo.avatar = res.userInfo.avatarUrl
            _this.sUserInfo.name = res.userInfo.nickName
            _this.sUserInfo.isLogin = true

            // if (!res.mobile) {
            //   _this.$router.replace({
            //     url: "/pages/bindPhone/main"
            //   });
            // } else {
              _this.$router.back();
            // }
            
          }).catch(err => {
            _this.$wxComps.toast("授权失败");
          });
        }
      });
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
  .logo {
    width: 100px;
    height: 100px;
    margin-top: 100px;
  }
  .name {
    color: #2f3130;
    font-size: 29px;
    margin-top: 13px;
  }
  .desc {
    color: #2f3130;
    font-size: 15px;
    margin-top: 19px;
  }
  .login {
    width: 316px;
    height: 48px;
    line-height: 48px;
    padding: 0;
    background-color: #007130;
    color: #fff;
    font-size: 20px;
    margin: auto;
    margin-top: 155px;
  }
}
</style>
