<template>
  <div class="wrap">
    <div class="waterfall-container" ref="waterfall-container">
      <div v-for="(item,index) in waterfallList"
           :key="index"
           class="waterfall-image-container"
           :style="{width:waterFallWidth+'px'}" @click="clickItem">
        <img :src="item.src" class="waterfall-image" @click="clickImage"/>
        <div @click="clickContent">内容{{index}}</div>
      </div>
    </div>
    <Spin fix v-show="isPreLoading_c">
      <Icon type="load-c" size="30" class="demo-spin-icon-load"></Icon>
      <div>Loading...</div>
    </Spin>
  </div>
</template>

<script>
  export default {
    name: "WaterFallVersion2",
    data() {
      return {
        //容器
        waterfallContainer:null,
        //所有图片  预加载完成后才赋值
        waterfallList:[],
        //已加载的图片数量
        loadedCount:0,
        //只对新图进行预加载
        imageList: [
          {
            src:"../../static/image/1.jpg"
          },
          {
            src:"../../static/image/2.jpg"
          },
          {
            src:"../../static/image/3.jpg"
          },
          {
            src:"../../static/image/4.jpg"
          },
          {
            src:"../../static/image/5.jpg"
          },
          {
            src:"../../static/image/6.jpg"
          },
          {
            src:"../../static/image/7.jpg"
          },
          {
            src:"../../static/image/8.jpg"
          },
          {
            src:"../../static/image/9.jpg"
          },
          {
            src:"../../static/image/10.jpg"
          },
          {
            src:"../../static/image/11.jpg"
          },
          {
            src:"../../static/image/12.jpg"
          }
        ],
        //这里给定列数 后面用来计算宽度
        waterFallColumns:5,
        waterFallTopGap:10,
        waterFallLeftGap:10,
        minHeightArr:[],
        waterFallWidth:0,
        //图片宽度
        imageWidth:0,
        flag:true,
        //是否在预加载
        isPreLoading:true,
        isPreLoading_c:false,
        loadTimeOut:500,
        //是否首次加载
        isFirstLoad:true,
        beginIndex:0
      }
    },
    created() {
    },
    mounted() {
      this.waterfallContainer = this.$refs["waterfall-container"]
      this.calcEveryItemWidth()
      this.$on("preloaded",(e)=>{
        //预加载完成 现在才开始渲染
        this.waterfallList = this.imageList.concat([])
        this.$nextTick(()=>{
          // if(!this.isFirstLoad){
          //   setTimeout(()=>{
          //     this.waterFallItem()
          //   },100)
          // }else {
          //   this.waterFallItem()
          // }
          this.isPreLoading = false
          setTimeout(()=>{
            this.waterFallItem()
          },100)
        })
      })
      window.onscroll = ()=>{
        let waterfallChildren = this.waterfallContainer.children
        if(!waterfallChildren) return
        //console.log(this.getClient().cHeight,this.waterfallContainer.children[this.waterfallContainer.children.length -1]['offsetTop'],7778)
        //监听滚动到最后一行时 就是最后一行任意一个元素的距离顶部距离进入可视区域[可以提前一行的]
        let lastRow = parseInt(this.waterfallList.length / this.waterFallColumns)
        lastRow = lastRow - 1 > 0 ? lastRow - 2 > 0 ? lastRow - 2 : lastRow - 1 : lastRow
        // lastRow = lastRow>1 ? lastRow : lastRow - 1
        // let anyOneLastRowTop = waterfallChildren[lastRow*this.waterFallColumns]['offsetTop']
        // let anyOneClient = waterfallChildren[lastRow*this.waterFallColumns].getBoundingClientRect()
        //console.log("倒数第二排随便一个距离顶部:"+anyOneLastRowTop,lastRow*this.waterFallColumns,"可视区高度:"+this.getClient().cHeight)
        //进入可视区前预加载 减一行就开始预加载
        if(this.checkIsInSight(waterfallChildren[lastRow*this.waterFallColumns])){
          console.log("我要获取数据")
          if(this.flag){
            this.flag = false
            this.getDataList()
          }
        }
      }
    },
    methods: {
      getDataList(){
        this.asyncGetDataList().then((data)=>{
          this.beginIndex = this.imageList.length
          this.imageList = this.imageList.concat(data)
          console.log("开始index:"+this.beginIndex)
          this.isFirstLoad = false
          this.preLoadImage()
          this.flag = true
        })
      },
      //获取数据
      asyncGetDataList(){
        let data = [
          {
            src:"../../static/image/1.jpg"
          },
          {
            src:"../../static/image/2.jpg"
          },
          {
            src:"../../static/image/3.jpg"
          },
          {
            src:"../../static/image/4.jpg"
          },
          {
            src:"../../static/image/5.jpg"
          },
          {
            src:"../../static/image/6.jpg"
          },
          {
            src:"../../static/image/7.jpg"
          },
          {
            src:"../../static/image/8.jpg"
          },
          {
            src:"../../static/image/9.jpg"
          },
          {
            src:"../../static/image/10.jpg"
          },
          {
            src:"../../static/image/11.jpg"
          },
          {
            src:"../../static/image/12.jpg"
          }
        ]
        //模拟异步请求数据
        return new Promise((resolve,reject)=>{
         setTimeout(()=>{
           resolve(data)
         },500)
        })
      },
      //获取可是区域宽高
      getClient() {
        return{
          cWidth: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
          cHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        }
      },
      //计算每个图片(div) 的宽高
      calcEveryItemWidth(){
        //获取container的宽度  也可以用getClient不过获取的是可视区域
        let waterFallConWidth = this.$refs["waterfall-container"].offsetWidth
        //计算宽度
        this.waterFallWidth = (waterFallConWidth - this.waterFallLeftGap*this.waterFallColumns)/this.waterFallColumns
        this.imageWidth = this.waterFallWidth - this.waterFallLeftGap*2
        console.log(this.waterFallWidth,this.imageWidth,7777)
        this.preLoadImage()
      },
      //图片预加载  预加载成功后才通知进行瀑布流布局
      preLoadImage(){
        // console.log(JSON.stringify(this.imageList),this.imageList.length)
        this.isPreLoading = true
        for (let i = 0; i < this.imageList.length; i++) {
          let image = this.imageList[i]
          // if(i < this.loadedCount) break
          //已经加载过的不再加载  beginIndex 作为已经加载的数组的索引
          if(!this.isFirstLoad && i < this.beginIndex){
            //console.log("是不是首次加载:"+this.isFirstLoad,this.beginIndex)
            continue
          }else {
            //console.log("是不是首次加载:"+this.isFirstLoad,this.beginIndex)
            let oImage = new Image()
            oImage.src = image.src
            //用箭头函数 this指向
            oImage.onload = oImage.onerror =(e)=>{
              this.loadedCount++
              //预加载图片 确认图片容器的高
              image._height = this.imageWidth/oImage.width*oImage.height
              if(this.loadedCount == this.imageList.length){
                console.log("加载完成了!!!")
                this.$emit("preloaded")
              }
            }
          }
        }

        // this.imageList.forEach((image,index)=>{
        //   console.log("已经加载了:"+this.loadedCount)
        //   //只对新图进行预加载
        //   if(index < this.loadedCount) return
        //   let oImage = new Image()
        //   oImage.src = image.src
        //   //用箭头函数 this指向
        //   oImage.onload = oImage.onerror =(e)=>{
        //     this.loadedCount++
        //     //预加载图片 确认图片容器的高
        //     this.imageList[index]._height = this.imageWidth/oImage.width*oImage.height
        //     if(this.loadedCount == this.imageList.length){
        //       console.log("加载完成了!!!")
        //       this.$emit("preloaded")
        //     }
        //   }
        // })
      },
      //瀑布流布局
      waterFallItem(){
        let children = this.waterfallContainer.children
        if(!children) return
        for (let i = this.beginIndex; i < children.length; i++) {
          let height = children[i].offsetHeight
          let top = 0
          let left = 0
          if(i < this.waterFallColumns){
            top = 0
            //第一个left不加左间距
            left = i==0 ? i * this.waterFallWidth : i * (this.waterFallWidth + this.waterFallLeftGap)
            this.minHeightArr.push(height)
            //console.log(children[i],"第一行")
          }else {
            //最小高度 使用了Math.min  由于数组没有这个方法我们使用apply 第一个参数时this上下文 这里就使用null
            //也可以用for
            let minHeight = Math.min.apply(null,this.minHeightArr)
            //最小高度索引
            let minIndex = this.minHeightArr.indexOf(minHeight)
            top = minHeight + this.waterFallTopGap
            //每一行第一个不加左间距
            left = ((i+1)%this.waterFallColumns) == 0 && minIndex==0 ? minIndex * this.waterFallWidth : minIndex * (this.waterFallWidth + this.waterFallLeftGap)
            // console.log(children[i],minHeight,minIndex,left,((i+1)%this.waterFallColumns) == 0,"i:"+i)
            //更新数组
            this.minHeightArr[minIndex] = minHeight+height+this.waterFallTopGap
          }
          children[i].style.top = top + 'px'
          children[i].style.left = left + 'px'
        }
      },
      filterMin(){
        const min = Math.min.apply(null, this.minHeightArr);
        return this.minHeightArr.indexOf(min);
      },
      //检查是否进入可视区
      checkIsInSight(el){
        console.log(el,7777,parseInt(this.waterfallList.length / this.waterFallColumns) -1,this.waterfallList.length / this.waterFallColumns)
        let anyOneClient = el.getBoundingClientRect()
        return anyOneClient.top <= this.getClient().cHeight
      },
      clickItem(){
        console.log("clickItem")
      },
      clickImage(){
        console.log("clickImage")
      },
      clickContent(){
        console.log("clickContent")
      }
    },
    watch:{
      isPreLoading(val){
        if(val){
          setTimeout(()=>{
            if(!this.isPreLoading) return
            this.isPreLoading_c = true
            //加载
          },this.loadTimeOut)
        }else {
          this.isPreLoading_c = false
        }
      }
    }
  }
</script>

<style lang="scss">
html{
  height: 101%;
}
body{
  height: 100%;
}
.wrap{
  width: 95%;
  margin: 0 auto;
  .waterfall-container{
    position: relative;
    width: 100%;
    .waterfall-image-container{
      position: absolute;
      .waterfall-image{
        width: 100%;
        height: 100%;
      }
    }
  }
  .demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
}
@keyframes ani-demo-spin {
  from { transform: rotate(0deg);}
  50% { transform: rotate(180deg);}
  to { transform: rotate(360deg);}
}
</style>
