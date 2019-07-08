<template>
  <div class="help-container">
    <img src="https://assets.gongji58.com/sale/image/help_g0.png" class="img-1" mode="widthFix" />
    <img src="https://assets.gongji58.com/sale/image/help_g2.png" class="img-2" mode="widthFix"/>
    <img src="https://assets.gongji58.com/sale/image/help_g3.png" class="img-2" mode="widthFix"/>
    <img src="https://assets.gongji58.com/sale/image/help_g4.png" class="img-2" mode="widthFix"/>
    <!-- <bottom-nav :btns='bottomBtns' :current-page="currentPage"></bottom-nav> -->
  </div>
</template>

<script>
import BottomNav from 'c/BottomNav/index.vue'
export default {
  components: {
    BottomNav,
  },
  data () {
    return {
	  currentPage:1,
      bottomBtns: [],
      // helpImg1: require(`https://assets.gongji58.com/sale/image/help_01.jpg`),
      // helpImg2: require(`https://assets.gongji58.com/sale/image/help_02.jpg`),
      // helpImg3: require(`https://assets.gongji58.com/sale/image/help_03.jpg`),
      // helpImg4: require(`https://assets.gongji58.com/sale/image/help_04.jpg`)
    }
  },
  computed:{
  },
  methods: {
  },
  onLoad(option){
    
  },
  onShow () {
   //  this.bottomBtns = [{
   //    text: '估价',
   //    img: require('../../images/index-bottom-gu.png'),
   //    highlight: false,
   //    url: '/pages/evaluate/main'
   //  },{
	  //   text: '帮助',
	  //   img: require('../../images/index-bottom-help-selected.png'),
	  //   highlight: true,
	  //   url: '/pages/help/main'
	  // },{
   //    text: '二手名片',
   //    img: require('../../images/index-bottom-pub-selected.png'),
   //    highlight: false,
   //    large: true,
   //    url: '/pages/pubSale/main'
   //  },{
	  //   text: '新机',
	  //   img: require('../../images/index-bottom-new.png'),
	  //   highlight: false,
	  //   url: '/pages/machineList/main'
	  // },{
   //    text: '二手管理',
   //    img: require('../../images/index-bottom-my.png'),
   //    highlight: false,
   //    url: '/pages/vipStore/main?mid='+wx.getStorageSync('UID')
   //  }]
  },
  onHide(){
  }
}
</script>

<style scoped lang="scss">
  .help-container {
    padding-bottom: 60px;
    >img {
      display: block;
      width: 100%;
    }
  }
</style>
