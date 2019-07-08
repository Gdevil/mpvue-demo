<template>
  <div class="container">

    <div class="wrap t-c line">
      <div class="list-end">
        <button @tap="onGetOpenid">点击获取openID</button>
        <p v-if="result != ''">{{result}}</p>
      </div>
    </div>
    

    
  </div>
</template>

<script>


export default {
  components: {
    
  },
  data() {
    return {
      result:''
    };
  },
  computed: {},
  methods: {
    onGetOpenid: function() {
      let _this = this;
      // 调用云函数
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          _this.result = JSON.stringify(res.result);
          console.log('[云函数] [login] user openid: ', res.result)
        },
        fail: err => {
          console.error('[云函数] [login] 调用失败', err)
        }
      })
    },
  },
  onLoad(option) {
    
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

</style>
