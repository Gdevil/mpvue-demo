<template>
  <div class="ind">

    <div class="wrap t-c list-end line">
      <div class="scrollInner">
        <button type="primary" @tap="scrollToBottom">滚动到页面底部</button>
        <div class="blank">

          <div class="page-body">
            <div class="page-section message">
              <p v-if="appear">小球出现</p>
              <p v-else>小球消失</p>
            </div>
            <div class="page-section">
              <scroll-view class="scroll-view" scroll-y>
                <div class="scroll-area" :style="appear ? 'background: #ef1' : ''">
                  <text class="notice">向下滚动让小球出现</text>
                  <div class="filling"></div>
                  <div class="ball"></div>
                </div>
              </scroll-view>
            </div>
          </div>

        </div>
        <button type="primary" @tap="scrollToTop">返回顶部</button>
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
      appear: false,
      _observer:{}
    };
  },
  computed: {},
  methods: {
    scrollToTop() {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 300
      })
    },

    scrollToBottom() {
      wx.pageScrollTo({
        scrollTop: 3000,
        duration: 300
      })
    }

  },
  onLoad(option) {
    this._observer = wx.createIntersectionObserver()
    this._observer
      .relativeTo('.scroll-view')
      .observe('.ball', (res) => {
        console.log(res)
        this.appear = res.intersectionRatio > 0
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
    padding: 60px 15px;
    .scrollInner{
      .blank{
        height:900px;
        padding-top: 50px;
      }
      button{

      }
      .scroll-view {
        height: 400rpx;
        background: #f8f8f8;
      }

      .scroll-area {
        height: 1300rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: .5s;
      }

      .notice {
        margin-top: 150rpx;
      }

      .ball {
        width: 200rpx;
        height: 200rpx;
        background: #1AAD19;
        border-radius: 50%;
      }

      .filling {
        height: 400rpx;
      }

      .message {
        width: 100%;
        display: flex;
        justify-content: center;
      }

      .message text {
        font-size: 40rpx;
      }
    }
  }
  
}

</style>
