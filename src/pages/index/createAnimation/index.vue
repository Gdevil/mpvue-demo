<template>
  <div class="ind">

    <div class="wrap t-c list-end line">
      <div class="animation-element" :animation="animation">动画方块</div>
    </div>

    <div class="btn-box">
      <li @tap="rotate">旋转</li>
      <li @tap="scale">缩放</li>
      <li @tap="translate">移动</li>
      <li @tap="skew">倾斜</li>
      <li @tap="rotateAndScale">旋转并缩放</li>
      <li @tap="rotateThenScale">旋转后缩放</li>
      <li @tap="all">全部同时进行</li>
      <li @tap="allInQueue">全部顺序进行</li>
      <li @tap="reset">还原</li>
    </div>
    

    
  </div>
</template>

<script>



export default {
  components: {
    
  },
  data() {
    return {
      animation:'',
      animationInit:{}
    };
  },
  computed: {},
  methods: {
    rotate() {
      this.animationInit.rotate(Math.random() * 720 - 360).step()
      this.animation = this.animationInit.export()
    },
    scale() {
      this.animationInit.scale(Math.random() * 2).step()
      this.animation = this.animationInit.export()
    },
    translate() {
      this.animationInit.translate(Math.random() * 100 - 50, Math.random() * 100 - 50).step()
      this.animation = this.animationInit.export()
    },
    skew() {
      this.animationInit.skew(Math.random() * 90, Math.random() * 90).step()
      this.animation = this.animationInit.export()
    },
    rotateAndScale() {
      this.animationInit.rotate(Math.random() * 720 - 360)
        .scale(Math.random() * 2)
        .step()
      this.animation = this.animationInit.export()
    },
    rotateThenScale() {
      this.animationInit.rotate(Math.random() * 720 - 360).step()
        .scale(Math.random() * 2).step()
      this.animation = this.animationInit.export()
    },
    all() {
      this.animationInit.rotate(Math.random() * 720 - 360)
        .scale(Math.random() * 2)
        .translate(Math.random() * 100 - 50, Math.random() * 100 - 50)
        .skew(Math.random() * 90, Math.random() * 90)
        .step()
      this.animation = this.animationInit.export()
    },
    allInQueue() {
      this.animationInit.rotate(Math.random() * 720 - 360).step()
        .scale(Math.random() * 2).step()
        .translate(Math.random() * 100 - 50, Math.random() * 100 - 50)
        .step()
        .skew(Math.random() * 90, Math.random() * 90)
        .step()
      this.animation = this.animationInit.export()
    },
    reset() {
      this.animationInit.rotate(0, 0)
        .scale(1)
        .translate(0, 0)
        .skew(0, 0)
        .step({duration: 0})
      this.animation = this.animationInit.export()
    }

  },
  onLoad(option) {
    this.animationInit = wx.createAnimation({
        duration: 300,
        timingFunction: "ease",
        delay: 0
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
.ind{
  .wrap{
    text-align: center;
    padding: 60px 0;
    .animation-element{
      display: inline-block;
      width: 100px;
      height: 100px;
      line-height: 100px;
      font-size: 18px;
      color:#fff;
      background-color: #1AAD19;
    }
  }
  .btn-box{
    display:flex;
    flex-wrap:wrap;
    align-items:center;
    justify-content: center;
    margin-top: 15px;
    li{
      text-align:center;
      border:solid 1px #888;
      padding:2px 10px;
      border-radius:4px;
      font-size: 14px;
      line-height: 22px;
      min-width: 100px;
      margin-right: 15px;
      margin-bottom: 10px;
    }
  }
}

</style>
