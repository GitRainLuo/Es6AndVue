<template>
    <div class="wrap">
      <Button @click="getDataList">获取数据</Button>
      <div class="box" ref="box" v-if="dataList.length"></div>
    </div>
</template>

<script>
    export default {
        name: "WaterFall",
        data() {
            return {
              tempDataList:[],
              dataList:[]
            }
        },
        created() {
        },
        mounted() {
          this.getDataList()
          let _this = this
          //监听窗口size变化
          window.onresize = function () {
            _this.createWaterFallEle(_this.dataList)
            _this.$nextTick(()=>{
              _this.waterFall(_this.$refs["box"].children)
            })
          }
        },
        methods: {
          getDataList(){
            // console.log(this.$refs["box"].children[0].offsetHeight,666)
            setTimeout(()=>{
              this.dataList = [
                "../../static/image/11.jpg",
                "../../static/image/12.jpg",
                "../../static/image/1.jpg",
                "../../static/image/2.jpg",
                "../../static/image/3.jpg",
                "../../static/image/4.jpg",
                "../../static/image/5.jpg",
                "../../static/image/6.jpg",
                "../../static/image/7.jpg",
                "../../static/image/8.jpg",
                "../../static/image/9.jpg",
                "../../static/image/10.jpg"
              ]
            },300)
          },
          //创建图片
          createImage(data){
            let imageArr = []
            for (let i = 0; i < data.length; i++) {
              let img = new Image()
              img.src = data[i]
              img.onload = (e)=>{
                imageArr.push(img.src)
              }
            }
            this.createWaterFallEle(imageArr)
          },
          //创建元素
          createWaterFallEle(data){
            let oBox = this.$refs["box"]
            for (let i = 0; i < data.length; i++) {
              let oDiv = document.createElement("div")
              let oImg = document.createElement("img")
              oImg.src = data[i]
              oDiv.appendChild(oImg)
              oDiv.className = "image-container"
              oBox.appendChild(oDiv)
            }
          },
          //items 是dom元素数组
          waterFall(items){
            console.log(items,items[0].offsetHeight,77777)
            let gap = 10
            let pageWidth = this.getClient().width
            let itemWidth = items[0].offsetWidth
            //确认一行多少列
            let columns = parseInt(pageWidth/(itemWidth + gap))
            let arr = []
            //确定行 以及行的最小高度
            for (let i = 0; i < items.length; i++) {
              if(i < columns){
                //确定第一行
                items[i].style.top = 0
                items[i].style.left = (itemWidth + gap) * i + 'px'
                //用于作为下一行确定上一行最小高度的数组
                arr.push(items[i].offsetHeight)
              }else {
                if(arr.length){
                  //找出上一行最小高度
                  let minHeight = arr[0]
                  let index = 0
                  for (let j = 0; j < arr.length; j++) {
                    if(minHeight > arr[j]){
                      minHeight = arr[j]
                      //取得最小的数组下标
                      index = j
                    }
                  }
                  //设置下一行的第一个盒子的位置
                  items[i].style.top = arr[index] + gap + 'px'
                  //left值就是最小列距离左边的距离
                  items[i].style.left = items[index].offsetLeft + 'px'
                  //修改最小列高度
                  //最小列的高度 = 当前自己的高度 + 拼接过来的高度 + 间隙的高度
                  //又当作下一行的找最小高度数组
                  arr[index] = arr[index] + items[i].offsetHeight + gap
                }
              }
            }
          },
          getClient(){
            return{
              width:window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
              height:window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
            }
          }
        },
        watch:{
          dataList(val){
            if(val.length>0){
              this.createWaterFallEle(this.dataList)
              this.$nextTick(()=>{
                this.waterFall(this.$refs["box"].children)
              })
            }
          }
        }
    }
</script>

<style lang="scss">
.wrap{
  width: 96%;
  margin: 0 auto;
  .box{
    position: relative;
    .image-container{
      position: absolute;
      box-shadow: 2px 2px 2px #999;
      img{
        display: block;
        width: 220px;
      }
    }
  }
}
</style>
