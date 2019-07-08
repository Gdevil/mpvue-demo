<template>
  <div class="index">
    
   
   <map v-if="type == 1" name="map-zsb"
    id="map-zsb"
    class="map-zsb" 
    :scale="scale"
    :latitude="lat"
    :longitude="lng"
    :markers="markers"
    :circles="circles"
    @callouttap="calloutTap"
    @regionchange="regionchange"
    @begin="begin"
    @end="end"
    show-location
    >
      <cover-view class="coView">
        <cover-view @tap="routerFun(2)">换一种方式看看 -></cover-view>
      </cover-view>
    </map>

    <map v-else name="map-zsb"
    id="map-zsb"
    class="map-zsb" 
    :scale="scale"
    :latitude="lat"
    :longitude="lng"
    :markers="markers"
    :circles="circles1"
    @callouttap="calloutTap"
    @regionchange="regionchange"
    @begin="begin"
    @end="end"
    show-location
    >
      <cover-view class="coView">
        <cover-view @tap="routerFun(1)">换一种方式看看 -></cover-view>
      </cover-view>
    </map>


    <view class="section">
      <text class="section__title">调节范围</text>
      <view class="body-view">
        <slider @changing="sliderchange" min="100" max="1000" value="500" step="10" show-value />
      </view>
    </view>
    <div class="content" v-if="type == 1">
      <p>调节范围圈的时候，定位图标会闪烁，体验很差</p>
    </div>
    <div class="content" v-else>
      <p>改良版，定位图标不会闪</p>
    </div>


  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Request from 'r';
import WechatComponents from 'u/wxComps.js'
import { toLogin, checkLoginStatus } from 'u/sessionAuth.js'
// import QQMapWX from 'u/qqmap-wx-jssdk.js'
export default {
  components: {
  },
  data () {
    return {
      type:1,
      // mapCtx:{},
      // qqmap:{},
      lat: 23.099994,
      lng: 113.324520,
      scale:16,
      radius:1000,
      markers: [{
        // iconPath: require('../../images/logo.png'),
        id: 0,
        latitude: 23.099994,
        longitude: 113.324520,
        // width: 50,
        // height: 50
      }],
      circles:[]
      // circles1:[]  //这里不能先定义
    }
  },
  computed:{
    
  },
  methods: {
    // 监听地图是否被拖动
    regionchange (param) {
    },
    // 开始拖动
    begin ({timeStamp}) {
    },
    // 结束拖动
    end ({timeStamp}) {
      
    },
    // 点击气泡回调
    calloutTap (marker) {
    // 点击气泡的操作
    },
    routerFun(num){
      this.type=num
      this.initData()
      // this.$router.push({
      //   url:"pages/main/main"
      // })
    },
    initData(){
      if(this.type == 1){
        this.circles = [{
          latitude: 23.099994,
          longitude: 113.324520,
          color:"#000000AA",
          fillColor:"#000000AA",
          radius:500
        }]
      }else{
        this.$mp.page.setData({
          '$root[0].scale': 16,
          '$root[0].circles1': [{
            latitude: 23.099994,
            longitude: 113.324520,
            color:"#000000AA",
            fillColor:"#000000AA",
            radius:500
          }]
        })
      }
    },
    sliderchange(e){
      // console.log(e.target.value)
      if(this.type == 1){
        this.circles = [{
          latitude: 23.099994,
          longitude: 113.324520,
          color:"#000000AA",
          fillColor:"#000000AA",
          radius:e.target.value
        }]
      }else{
        this.$mp.page.setData({   //直接改变vm数据
          '$root[0].circles1': [{
            latitude: 23.099994,
            longitude: 113.324520,
            color:"#000000AA",
            fillColor:"#000000AA",
            radius:e.target.value
          }]
        })
      }
        
    }
  },
  onLoad(option){
    // this.mapCtx = wx.createMapContext('map-zsb')
    
    this.initData()
  },
  onShow () {
    
  }
}
</script>

<style scoped lang="scss">
  .index {
    height:100%;
    .map-zsb{
      width:100%;
      height:70%;
      .coView{
        position: absolute;
        width: 100%;
        top:0;
        left:0;
        cover-view{
          margin: 5px 10px 0;
          background: #2abf1b;
          border-radius: 4px;
          color: #fff;
          font-size: 16px;
          line-height: 24px;
          text-align: center;
          padding: 10px;
        }
      }
    }
    .content{
      text-align: center;
      color: #888;
      margin: 10px 0 0;
    }
  }
</style>