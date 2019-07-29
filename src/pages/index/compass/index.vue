<template>
  <div class="page-body">
    <div class="page-section page-section_center">
      <text class="page-body-text">旋转手机即可获取方位信息</text>
      <div class="direction">
        <div class="bg-compass-line"></div>
        <img class="bg-compass" src="../../../images/compass.png" :style="'transform: rotate(-'+direction+'deg)'">
        <div class="direction-value">
          <text>{{direction}}</text>
          <text class="direction-degree">o</text>
        </div>
      </div>
      <div class="mid">
        <p>由于平台差异，accuracy 在 iOS/Android 的值不同</p>
        <h5>accuracy:{{accuracy}}</h5>
      </div>
      <div class="controls">
        <button @tap="startCompass" :disabled="enabled">开始监听</button>
        <button @tap="stopCompass" :disabled="!enabled">停止监听</button>
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
      enabled: true,
      direction: 0,
      accuracy:''
    };
  },
  computed: {},
  methods: {
    startCompass() {
      if (this.enabled) {
        return
      }
      const that = this
      wx.startCompass({
        success() {
          that.enabled = true
        }
      })
    },
    stopCompass() {
      if (!this.enabled) {
        return
      }
      const that = this
      wx.stopCompass({
        success() {
          that.enabled = false
        }
      })
    }
  },
  onLoad(option) {
    const that = this
    wx.onCompassChange(function (res) {
      that.direction = parseInt(res.direction, 10)
      that.accuracy = res.accuracy
    })
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
.page-body{
  text-align: center;
  padding-top: 20px;
}
.direction {
  position: relative;
  margin: 35px auto 0;
  display: flex;
  width: 270px;
  height: 270px;
  align-items: center;
  justify-content: center;
}
.direction-value {
  position: relative;
  font-size: 100px;
  color: #353535;
  line-height: 1;
  z-index: 1;
}
.direction-degree {
  position: absolute;
  top: 0;
  right: -40rpx;
  font-size: 60rpx;
}
.bg-compass{
  position: absolute;
  top: 0;
  left: 0;
  width: 540rpx;
  height: 540rpx;
  transition: .1s;
}
.bg-compass-line{
  position: absolute;
  left: 267rpx;
  top: -10rpx;
  width: 6rpx;
  height: 56rpx;
  background-color: #1AAD19;
  border-radius: 999rpx;
  z-index: 1;
}
.controls{
  margin-top: 30px;
  display: inline-block;
  &:after{
    content:"";
    display:table;
    clear:both;
  };
}
.controls button{
  margin-left: 20rpx;
  float: left;
}
.mid{
  padding: 10px 0;
}
</style>
