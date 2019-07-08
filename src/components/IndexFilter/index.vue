<template>
    <div class="filterBox">
			<div class="filterTip" v-if="showTip">{{nowLetter == "hot"?"热门":nowLetter}}</div>
        <div class="filterLeft">
					<!-- scroll-with-animation -->
					<scroll-view scroll-y style='width:100%;height:100%;padding-bottom: 30px;box-sizing: border-box;' :scroll-into-view='ListId'>
              <div class="filterSec" v-for="(item , index) in filterData" :key="index" :id="item.index">
								<h2>{{item.index == 'hot'? '热门':item.index}}</h2>
								<ul>
									<li v-for="(ite , ind) in item" v-if="ite.brand || ite.brand_name || ite.model" @tap="selectOption(ite.brand || ite.brand_name || ite.model,ite.brand_id )">{{ite.brand || ite.brand_name || ite.model}}</li>
								</ul>
							</div>
          </scroll-view>
				</div>
				<div class="filterRight">
					<ul :class="className">
						<li v-for="(item , index) in filterData" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend" style="line-height: 20px;">{{item.index == 'hot'? '热门':item.index}}</li>
					</ul>
				</div>
    </div>
</template>

<script>

// 使用时最好禁止父级页面scroll
export default {
  name: "index-filter",
	props: ['filterData'],
  data() {
    return {
			ListId:'',
			listData:[],
			
			ulTop:0,
			liHeight:20,
			className:'c_' + new Date().getTime() + Math.floor(Math.random()*10),
			nowLetter:'',
			showTip:false
    }
  },
	computed:{
		
	},
  methods: {
		selectOption(str,id){
			this.$emit("selFun",str,id)
		},
		scrollTo(str){
			this.ListId = str;
		},
		touchstart(e){
			console.log("touchstart")
			
			let _this = this;
			// let pageY = e.touches[0].pageY;
			let clientY = e.touches[0].clientY
			this.showTip = true;
			
			const query = wx.createSelectorQuery()
			query.select('.'+_this.className).boundingClientRect()
			query.selectViewport().scrollOffset()
			query.exec(function (res) {
				// console.log(res)
				_this.ulTop = res[0].top;
				
				let num = parseInt((clientY - _this.ulTop)/_this.liHeight);
				let id = _this.filterData[num].index
				
				_this.nowLetter = id;
				_this.scrollTo(id)
			})
			
			// console.log(this.filterData)
			
		},
		touchmove(e){
			let clientY = e.touches[0].clientY
			let num = parseInt((clientY - this.ulTop)/this.liHeight)
			// console.log(clientY +" & "+this.ulTop +" & "+this.liHeight)
			let id = this.filterData[num].index
			this.nowLetter = id;
			
			/*
				* 当touch选中的元素和当前ListId不相等的时候才震动一下
				* 微信震动事件
			*/
			if( id !== this.ListId ){
					wx.vibrateShort();
			}
			
			this.scrollTo(id)
		},
		touchend(e){
			console.log("touchend")
			this.showTip = false;
		}
  },
	onLoad(){
		
	},
	onShow(){
		
	}
};
</script>

<style scoped lang="scss">
.filterBox {
  display: flex;
  align-items: center;
  justify-content:center;
  width: 100%;
	background: #fff;
	min-width:270px;
	height:100%;


	.filterTip{
		position:absolute;
		width:50px;
		height:50px;
		color:#fff;
		text-align:center;
		line-height:50px;
		font-size:16px;
		background:rgba(0,0,0,0.6);
		opacity:0.5;
		top:50%;
		left:50%;
		transform:translate(-50%,-50%);
		z-index:2;
		border-radius:8px;
	}
	.filterLeft{
		flex:1;
		height:100%;

		.filterSec{
			h2{
				padding:0 10px;
				font-size:14px;
				line-height:20px;
				background:#eee;
				color:#000;

			}
			ul{
				li{
					font-size:14px;
					line-height:22px;
					color:#333;
					padding:18px 10px;
					border-bottom:solid 1px #f2f2f2;

				}
			}
		}
	}
	.filterRight{
		ul{
			li{
				font-size:14px;
				line-height:18px;
				color:#333;
				min-width:20px;
				white-space: nowrap;
				text-align:center;
			}
		}
	}
}

</style>
