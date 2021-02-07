<template>
  <div>
    <water-fall-comp :imageList="waterfallList" @getDataTemp="getDataList" :beginIndex="beginIndex"></water-fall-comp>
  </div>
</template>

<script>
  import WaterFallComp from "@/components/WaterFallComp"
  export default {
    name: "WaterFallVersion3",
    components:{
      WaterFallComp
    },
    data() {
      return {
        waterfallList: [
          {
            src: "../../static/image/1.jpg"
          },
          {
            src: "../../static/image/2.jpg"
          },
          {
            src: "../../static/image/3.jpg"
          },
          {
            src: "../../static/image/4.jpg"
          },
          {
            src: "../../static/image/5.jpg"
          },
          {
            src: "../../static/image/6.jpg"
          },
          {
            src: "../../static/image/7.jpg"
          },
          {
            src: "../../static/image/8.jpg"
          },
          {
            src: "../../static/image/9.jpg"
          },
          {
            src: "../../static/image/10.jpg"
          },
          {
            src: "../../static/image/11.jpg"
          },
          {
            src: "../../static/image/12.jpg"
          }
        ],
        beginIndex:0
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
      getDataList(){
        // this.asyncGetDataList().then((data)=>{
        //   this.beginIndex = this.waterfallList.length
        //   this.waterfallList = this.waterfallList.concat(data)
        //   console.log("开始index:"+this.beginIndex)
        //   this.isFirstLoad = false
        //   this.preLoadImage()
        //   this.flag = true
        // })
        this.asyncGetDataList().then((data)=>{
          this.beginIndex = this.waterfallList.length
          this.waterfallList = this.waterfallList.concat(data)
          // console.log("开始index:"+this.beginIndex)
          // this.isFirstLoad = false
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
    }
  }
</script>

<style lang="scss" scoped>
  .wrap {
    width: 95%;

    .waterfall-container {
      position: relative;
      width: 100%;

      .waterfall-image-container {
        position: absolute;

        .waterfall-image {
          width: 150px;
        }
      }
    }
  }
</style>
