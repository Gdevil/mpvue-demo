<template>
  <div class="ind">

      <div class="filterMask" style=""></div>
      <div class="content-wrapper" :animation="brandAnimation">
        <index-filter :filterData="hotBrands" @selFun="selFunBrand"></index-filter>
      </div>

    

    
  </div>
</template>

<script>
import modelData from '@/data/brand_wj.json'
import IndexFilter from 'c/IndexFilter/index.vue';


export default {
  components: {
    IndexFilter
  },
  data() {
    return {
      brandAnimation:'',
      hotBrands: []
    };
  },
  computed: {},
  methods: {
    initData(){
      this.hotBrands = []
      let res = JSON.stringify(modelData)
      res = JSON.parse(res);  //深拷贝原对象，让res不被后面影响

      let all = res.all;
      let hot = res.hot;
      hot.index="hot";
      hot = Object.assign({}, hot)
      this.hotBrands = all;
      this.hotBrands.unshift(hot)
    },
    selFunBrand(str,id){
      this.$wxComps.toast(str+"."+id);
    }

  },
  onLoad(option) {
    let _this = this;
    this.initData()

    let animation = wx.createAnimation({
      duration: 300,
      timingFunction: "ease",
      delay: 0
    })
    animation.right(0).step()
    setTimeout(function(){
      _this.brandAnimation = animation.export()
    },1000)
    
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
  .filterMask{
    position: absolute;
    width:100%;
    height:100%;
    background: #000;
    opacity:0.5;
    top:0;
    left:0;
  }
  .content-wrapper{
    padding:0;
    width: 280px;
    height: 100%;
    position: absolute;
    right: -280px;
    top: 0;
    z-index: 9999;
    background-color: #fff;
  }
}

</style>
