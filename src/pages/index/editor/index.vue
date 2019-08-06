<template>
  <div class="page-body">
    <div class='toolbar' @tap="format">
      <i class="iconfont icon-zitijiacu" :class="formats.bold ? 'ql-active' : ''" data-name="bold"></i>
      <i class="iconfont icon-zitixieti" :class="formats.italic ? 'ql-active' : ''" data-name="italic"></i>
      <i class="iconfont icon-zitixiahuaxian" :class="formats.underline ? 'ql-active' : ''" data-name="underline"></i>
      <i class="iconfont icon-zitishanchuxian" :class="formats.strike ? 'ql-active' : ''" data-name="strike"></i>
      <i class="iconfont icon-zuoduiqi" :class="formats.align === 'left' ? 'ql-active' : ''" data-name="align" data-value="left"></i>
      <i class="iconfont icon-juzhongduiqi" :class="formats.align === 'center' ? 'ql-active' : ''" data-name="align" data-value="center"></i>
      <i class="iconfont icon-youduiqi" :class="formats.align === 'right' ? 'ql-active' : ''" data-name="align" data-value="right"></i>
      <i class="iconfont icon-zuoyouduiqi" :class="formats.align === 'justify' ? 'ql-active' : ''" data-name="align" data-value="justify"></i>
      <i class="iconfont icon-line-height" :class="formats.lineHeight ? 'ql-active' : ''" data-name="lineHeight" data-value="2"></i>
      <i class="iconfont icon-Character-Spacing" :class="formats.letterSpacing ? 'ql-active' : ''" data-name="letterSpacing" data-value="2em"></i>
      <i class="iconfont icon-722bianjiqi_duanqianju" :class="formats.marginTop ? 'ql-active' : ''" data-name="marginTop" data-value="20px"></i>
      <i class="iconfont icon-723bianjiqi_duanhouju" :class="formats.micon-previewarginBottom ? 'ql-active' : ''" data-name="marginBottom" data-value="20px"></i>
      
      <i class="iconfont icon-font" :class="formats.fontFamily ? 'ql-active' : ''" data-name="fontFamily" data-value="Pacifico"></i>
      <i class="iconfont icon-fontsize" :class="formats.fontSize === '24px' ? 'ql-active' : ''" data-name="fontSize" data-value="24px"></i>

      <i class="iconfont icon-text_color" :class="formats.color === '#0000ff' ? 'ql-active' : ''" data-name="color" data-value="#0000ff"></i>
      <i class="iconfont icon-fontbgcolor" :class="formats.backgroundColor === '#00ff00' ? 'ql-active' : ''" data-name="backgroundColor" data-value="#00ff00"></i>
      <i class="iconfont icon-date" @tap="insertDate"></i>
      <i class="iconfont icon--checklist" data-name="list" data-value="check"></i>
      <i class="iconfont icon-youxupailie" :class="formats.list === 'ordered' ? 'ql-active' : ''" data-name="list" data-value="ordered"></i>
      <i class="iconfont icon-wuxupailie" :class="formats.list === 'bullet' ? 'ql-active' : ''" data-name="list" data-value="bullet"></i>

      <i class="iconfont icon-clearedformat" @tap="removeFormat"></i>
      <i class="iconfont icon-charutupian" @tap="insertImage"></i>
      <i class="iconfont icon-undo" @tap="undo"></i>
      <i class="iconfont icon-redo" @tap="redo"></i>

      <i class="iconfont icon-outdent" data-name="indent" data-value="-1"></i>
      <i class="iconfont icon-indent" data-name="indent" data-value="+1"></i>
      <i class="iconfont icon-fengexian" @tap="insertDivider"></i>
      <i class="iconfont icon-format-header-1" :class="formats.header === 1 ? 'ql-active' : ''" data-name="header" :data-value="1"></i>

      <i class="iconfont icon-zitixiabiao" :class="formats.script === 'sub' ? 'ql-active' : ''" data-name="script" data-value="sub"></i>
      <i class="iconfont icon-zitishangbiao" :class="formats.script === 'super' ? 'ql-active' : ''" data-name="script" data-value="super"></i>
      <i class="iconfont icon-shanchu" @tap="clear"></i>
      <i class="iconfont icon-direction-rtl" :class="formats.direction === 'rtl' ? 'ql-active' : ''" data-name="direction" data-value="rtl"></i>

    </div>
    <editor 
      id="editor" 
      class="ql-container" 
      :placeholder="placeholder" 
      showImgSize 
      showImgToolbar 
      showImgResize 
      @statuschange="onStatusChange"  
      :read-only="readOnly" 
      @input="inputEditor"
      @ready="onEditorReady">
      </editor>
  </div>
</template>

<script>

import tools from '@/utils/index.js';

export default {
  components: {
    
  },
  data() {
    return {
      formats: {},
      content:null,
      bottom: 0,
      readOnly: false,
      placeholder: '开始输入...',
      // editorCtx:{}
    };
  },
  computed: {},
  methods: {
    readOnlyChange() {
      this.readOnly = !this.data.readOnly
    },
    inputEditor(e) {
      this.content = e.mp.detail;
      // console.log(this.content)
    },
    onEditorReady() {
      const that = this
      wx.createSelectorQuery().select('#editor').context(function (res) {
        that.editorCtx = res.context
      }).exec()
    },
    undo() {
      this.editorCtx.undo()
    },
    redo() {
      this.editorCtx.redo()
    },
    format(e) {
      if (!this.canUse) return
      const {name, value} = e.mp.target.dataset
      if (!name) return
      // console.log('format', name, value)
      this.editorCtx.format(name, value)
    },
    onStatusChange(e) {
      const formats = e.mp.detail
      this.formats = formats
    },
    insertDivider() {
      this.editorCtx.insertDivider({
        success() {
          console.log('insert divider success')
        }
      })
    },
    clear() {
      this.editorCtx.clear({
        success() {
          console.log('clear success')
        }
      })
    },
    removeFormat() {
      this.editorCtx.removeFormat()
    },
    insertDate() {
      const date = new Date()
      const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
      this.editorCtx.insertText({
        text: formatDate
      })
    },
    insertImage() {
      const that = this
      wx.chooseImage({
        count: 1,
        success() {
          that.editorCtx.insertImage({
            src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543767268337&di=5a3bbfaeb30149b2afd33a3c7aaa4ead&imgtype=0&src=http%3A%2F%2Fimg02.tooopen.com%2Fimages%2F20151031%2Ftooopen_sy_147004931368.jpg',
            data: {
              id: 'abcd',
              role: 'god'
            },
            success() {
              console.log('insert image success')
            }
          })
        }
      })
    }

    
  },
  onLoad(option) {
    const that = this
    
    this.canUse = true
    wx.loadFontFace({
      family: 'Pacifico',
      source: 'url("https://sungd.github.io/Pacifico.ttf")',
      success: console.log
    })
    const {SDKVersion} = wx.getSystemInfoSync()
    
    if (tools.compareVersion(SDKVersion, '2.7.0') >= 0) {
      //
    } else {
      this.canUse = false
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      this.$wxComps.warn("当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。");
      
    }
  },
  onReady(){
    this.onEditorReady();
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
/*@import "./css/common";*/
.iconfont {
  display: inline-block;
  padding: 8px 8px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  font-size: 20px;
}
.ql-active {
  color: #0000FF;
}
.toolbar {
  box-sizing: border-box;
  /* border: 1px solid #ccc; */
  border-bottom: 0;
  font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
}


.ql-container {
  box-sizing: border-box;
  padding: 12px 15px;
  width: 100%;
  min-height: 30vh;
  height: auto;
  /* border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc; */
  background: #fff;
  margin-top: 20px;
  font-size: 16px;
  line-height: 1.5;
}

</style>
