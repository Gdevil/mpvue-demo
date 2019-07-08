<template>
  <div class="container">

    <div class="wrap t-c line">
      <div class="list-end">
        <button @tap="uploadFile">上传图片</button>
      </div>
      <div v-if="imgPath != ''" @tap="copyPath">云图片路径：{{imgPath}}</div>
      <img  v-if="imgPath != ''" :src="imgPath" mode="widthFix" style="width:120px">
    </div>
    <div class="wrap t-c line">
      <div class="list-end">
        <button @tap="downloadFile">下载图片</button>
      </div>
    </div>
    

    
  </div>
</template>

<script>
import WechatComponents from 'u/wxComps.js'
export default {
  components: {
    
  },
  data() {
    return {
      imgPath:'',
      fileId:''
    };
  },
  computed: {},
  methods: {
    uploadFile: function() {
      let _this = this
      // 选择图片
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {

          wx.showLoading({
            title: '上传中',
          })

          const filePath = res.tempFilePaths[0]
          
          // 上传图片
          let randomStr=new Date().getTime() + Math.floor(Math.random()*10);
          const cloudPath = 'testImg/'+ randomStr + filePath.match(/\.[^.]+?$/)[0]
          
          wx.cloud.uploadFile({
            cloudPath,  //云端文件路径
            filePath,   //临时文件路径
            success: res => {
              //返回的是文件ID，通过fileID再去获取云文件路径
              console.log('[上传文件] 成功：', res)
              _this.$wxComps.toast("上传成功！");
              _this.fileId = res.fileID;
              _this.getFile(res.fileID)
            },
            fail: e => {
              console.error('[上传文件] 失败：', e)
              _this.$wxComps.toast("上传失败！");
            },
            complete: () => {
              wx.hideLoading()
            }
          })

        },
        fail: e => {
          console.error(e)
        }
      })

    },
    getFile(id){
      let _this = this;
      wx.cloud.getTempFileURL({
        fileList: [id],
        success: res => {
          // fileList 是一个有如下结构的对象数组
          // [{
          //    fileID: 'cloud://xxx.png', // 文件 ID
          //    tempFileURL: '', // 临时文件网络链接
          //    maxAge: 120 * 60 * 1000, // 有效期
          // }]
          console.log(res)
          _this.imgPath = res.fileList[0].tempFileURL;
        },
        fail :e=>{
          _this.$wxComps.toast("获取图片失败！");
        }
      })
    },
    downloadFile(){
      let _this = this;
      if(_this.imgPath == ''){
        _this.$wxComps.toast("先上传再下载");
        return;
      }
      WechatComponents.savePic(_this.imgPath,function(res){
        if(res == 1){
          _this.$wxComps.toast("保存成功！");
        }else{
          _this.$wxComps.toast("保存失败！");
        }
      })

      /*
      *通过getTempFileURL与downloadFile获得的path都可以下载！！！！！
      *下面注释的方法也可以
      */

      /*wx.cloud.downloadFile({
        fileID: _this.fileId
      }).then(res => {
        console.log(res)

        let path = res.tempFilePath;
        WechatComponents.savePic(path,function(res){
          if(res == 1){
            _this.$wxComps.toast("保存成功！");
          }else{
            _this.$wxComps.toast("保存失败！");
          }
        })

      }).catch(error => {
        console.log(error)
        _this.$wxComps.toast("下载图片失败！");
      })*/
    },
    copyPath(){
      var _this = this;
      wx.setClipboardData({
       //准备复制的数据
        data: _this.imgPath,
        success: function (res) {
          _this.$wxComps.toast("链接复制成功！");
        }
      });
    }
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
