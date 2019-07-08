<template>
  <div class="ind">

    <div class="wrap t-c list-end line">
      <h2>第二个页面</h2>
    </div>
    

    <bottom-nav :btns="bottomBtns" :current-page="1"></bottom-nav>
    
  </div>
</template>

<script>

import BottomNav from "c/BottomNav/index.vue";

export default {
  components: {
    BottomNav
  },
  data() {
    return {
      mainData: [
        
      ],
      bottomBtns: [
        {
          text: "第一个页面",
          img: require("images/myTab_a.png"),
          highlight: false,
          url: "pages/index/customTabbar/main"
        },
        {
          text: "第二个页面",
          img: require("images/myTab_b1.png"),
          highlight: true,
          url: "pages/index/customTabbar2/main"
        }
      ]
    };
  },
  computed: {},
  methods: {
    
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
