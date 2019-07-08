<template>
  <div class="container">

    <div class="wrap t-c line">
      <div class="list-end">
        <input class="input" type="text" name="" maxlength="10" v-model="setVal" placeholder="输入内容">
        <button @tap="setdata">点击插入数据</button>
      </div>
    </div>
    <div class="wrap t-c line">
      <div class="list-end">
        <button @tap="getdata">查询最新20条数据</button>
      </div>
      <div class="dataBox">
        <div class="dataLis" v-for="item in getVal">
          <span>{{item.value}}</span>
          <span>{{item.timeVal}}</span>
        </div>
      </div>
    </div>
    

    
  </div>
</template>

<script>
import user from '@/service/user'

export default {
  components: {
    
  },
  data() {
    return {
      db: wx.cloud.database(),
      setVal:'',
      getVal:[]
    };
  },
  computed: {},
  methods: {
    setdata: function() {
      let _this = this;
      if(_this.setVal == ''){_this.$wxComps.toast("请先输入内容");return;}

      const todos = _this.db.collection('todos');
      todos.add({
        data:{
          description: 'Test insert database',
          time: new Date(),
          value: _this.setVal
        },
        success(res) {
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          _this.setVal = ''
          _this.$wxComps.toast("操作成功！");
        },
        fail(){
          _this.$wxComps.toast("操作失败！");
        }
      })
    },
    getdata: function() {
      let _this = this;
      const todos = _this.db.collection('todos');

      //查询description为"Test insert database"的所有数据；
      //orderBy：排序；order 只能取 asc 或 desc；
      todos.where({
        description: 'Test insert database'
      }).orderBy('time','desc').get().then(res => {
        _this.getVal = res.data;

        // 转换时间戳 tsFormatTime
        _this.getVal.map((res,ind) => {
          res.timeVal = user.tsFormatTime(res.time,'Y-M-D h:m:s')
        })
        _this.$wxComps.toast("操作成功！");
      }).catch(err => {
        _this.$wxComps.toast("操作失败！");
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
input{
  margin: 0 0 5px;
  text-align: left;
}
.dataBox{
  overflow: auto;
  max-height: 180px;
  .dataLis{
    display: flex;
    padding: 3px 0;
    border-top:solid 1px #f2f2f2;
    span{
      flex:1;
      text-align: center;
      font-size: 12px;
      line-height: 20px;
    }
  }
}
</style>
