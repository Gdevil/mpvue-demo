<template>
  <div class="container">

    <div class="wrap t-c line">
      <div class="list-end">
        <p>有一个add的云函数，输入两个数字试试</p>
        <div class="twoInput">
          <input class="input" type="number" name="" v-model="num1">
          <input class="input" type="number" name="" v-model="num2">
        </div>
        <button @tap="addFun">测试云函数</button>
        <p v-if="result != ''">{{result}}</p>
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
      num1:'',
      num2:'',
      result:''
    };
  },
  computed: {},
  methods: {
    addFun: function(){
      let _this = this;
      console.log(_this.num1)
      console.log(_this.num2)
      wx.cloud.callFunction({
        // 云函数名称
        name: 'add',
        // 传给云函数的参数
        data: {
          a: _this.num1,
          b: _this.num2
        },
        success(res) {
          console.log(res.result)
          if(res){
            _this.result = JSON.stringify(res.result);
          }else{
            _this.$wxComps.toast("错误！");
          }
          
        },
        fail(err) {
          console.log(err)
          _this.$wxComps.toast("调用失败！");
        }
      })
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
.twoInput{
  margin: 5px -5px;
  display: flex;
  align-items: center;
  input{
    flex:1;
    margin: 0 5px;
  }
}
</style>
