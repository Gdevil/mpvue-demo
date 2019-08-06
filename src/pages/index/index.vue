<template>
  <div class="ind">

    <ul v-if="tabIndex == 0">
      <li v-for="item in mainData" @tap="linkTo(item.url)">{{item.text}}</li>
    </ul>
    <div class="wrap t-c list-end line" v-if="tabIndex == 1">
      <button @tap="setTabBarBadge">
        {{!hasSetTabBarBadge?'设置tab徽标':'移除tab徽标'}}
      </button>
      <button @tap="showTabBarRedDot">
        {{!hasShownTabBarRedDot?'显示红点':'移除红点'}}
      </button>
      <button @tap="customStyle">
        {{!hasCustomedStyle?'自定义Tab样式':'移除自定义样式'}}
      </button>
      <button @tap="customItem">
        {{ !hasCustomedItem ? '自定义Tab信息' : '移除自定义信息' }}
      </button>
      <button @tap="hideTabBar">
        {{ !hasHiddenTabBar ? '隐藏TabBar' : '显示TabBar' }}
      </button>
      <button @tap="backIndex" style="background: #e6e4e1">
        返回首页
      </button>
    </div>
    
  </div>
</template>

<script>
import Request from "r";

const defaultTabBarStyle = {
  color: '#7A7E83',
  selectedColor: '#f00',
  backgroundColor: '#ffffff',
}
export default {
  components: {
    
  },
  data() {
    return {
      tabIndex:0,
      hasSetTabBarBadge:false,
      hasShownTabBarRedDot:false,
      hasCustomedStyle:false,
      hasCustomedItem:false,
      hasHiddenTabBar:false,
      mainData: [
        {
          text: "mpvue自定义底部导航",
          url: "/pages/index/customTabbar/main"
        },
        {
          text: "mpvue自定义顶部菜单 --- 待定",
          url: ""
        },
        {
          text: "mpvue地图动态改变数据",
          url: "/pages/index/mapSetData/main"
        },
        {
          text: "动画操作",
          url: "/pages/index/createAnimation/main"
        },
        {
          text: "图片裁剪we-cropper",
          url: "/pages/index/weCropper/main"
        },
        {
          text: "首字母滑动索引",
          url: "/pages/index/indexFilter/main"
        },
        {
          text: "设置tabbar底部菜单",
          url: "@tabbar"
        },
        {
          text: "页面滚动控制+相交控制",
          url: "/pages/index/scrollControl/main"
        },
        {
          text: "监听罗盘数据",
          url: "/pages/index/compass/main"
        },
        {
          text: "editor富文本编辑器",
          url: "/pages/index/editor/main"
        }
      ]
    };
  },
  computed: {},
  methods: {
    
    linkTo(url) {
      if(url == ""){
        this.$wxComps.toast("功能开发中...");
        return;
      }
      if(url == "@tabbar"){
        this.tabIndex = 1
      }else{
        this.$router.push({
          url: url
        });
      }
      
    },
    backIndex(){
      this.tabIndex = 0
    },

    setTabBarBadge() {
      if (this.hasSetTabBarBadge) {
        this.removeTabBarBadge()
        return
      }
      this.hasSetTabBarBadge = true
      wx.setTabBarBadge({
        index: 0,
        text: '100',
      })
    },
    removeTabBarBadge() {
      this.hasSetTabBarBadge = false
      wx.removeTabBarBadge({
        index: 0,
      })
    },
    showTabBarRedDot() {
      if (this.hasShownTabBarRedDot) {
        this.hideTabBarRedDot()
        return
      }
      this.hasShownTabBarRedDot = true
      wx.showTabBarRedDot({
        index: 1
      })
    },
    hideTabBarRedDot() {
      this.hasShownTabBarRedDot = false
      wx.hideTabBarRedDot({
        index: 1
      })
    },
    customStyle() {
      if (this.hasCustomedStyle) {
        this.removeCustomStyle()
        return
      }
      this.hasCustomedStyle = true
      wx.setTabBarStyle({
        color: '#FFF',
        selectedColor: '#f00',
        backgroundColor: '#37f',
      })
    },

    removeCustomStyle() {
      this.hasCustomedStyle = false
      wx.setTabBarStyle(defaultTabBarStyle)
    },
    customItem() {
      if (this.hasCustomedItem) {
        this.removeCustomItem()
        return
      }
      this.hasCustomedItem = true
      wx.setTabBarItem({
        index: 1,
        text: '什么玩意'
      })
    },

    removeCustomItem() {
      this.hasCustomedItem = false
      wx.setTabBarItem({
        index: 1,
        text: "云开发"
      })
    },
    showTabBar() {
      this.hasHiddenTabBar = false
      wx.showTabBar()
    },
    hideTabBar() {
      if (this.hasHiddenTabBar) {
        this.showTabBar()
        return
      }
      this.hasHiddenTabBar = true
      wx.hideTabBar()
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
.ind {
  ul{
    li{
      background: #fff;
      padding: 12px 15px;
      border-top: solid 1px #f2f2f2;
      position: relative;
      &:after{
        content:"";
        display: block;
        position: absolute;
        width: 8px;
        height:8px;
        top:50%;
        margin-top: -4px;
        right:15px;
        border-top:solid 1px #aaa;
        border-right:solid 1px #aaa;
        transform: rotate(45deg);
      }
    }
  }
  .wrap{
    padding: 0 15px 10px;
    button{
      margin-bottom: 10px
    }
  }
}
</style>
