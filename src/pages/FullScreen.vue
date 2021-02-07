<template>
  <!--全屏-->
  <div>
    <Button @click="callFullScreen(element)">全屏显示</Button>
    <Button @click="exitFullScreen">退出全屏</Button>
    <Button @click="toggleFullScreen($event)">转换</Button>
    <span style="font-size: 1rem">看一下</span>
  </div>
</template>

<script>
  // let isFull = false
  // document.onfullscreenchange = function () {
  //   isFull = document.isFullScreen || document.webkitIsFullScreen || document.mozIsFullScreen
  // }
  export default {
    name: "FullScreen",
    data(){
      return{
        element:document.documentElement,
        //默认没有全屏
        isFullScreen:false
        //isFullScreen: document.isFullScreen || document.webkitIsFullScreen || document.mozIsFullScreen,
      }
    },
    mounted(){
      //页面改变判断是否全屏
      let _this = this
      // window.onresize = function () {
      //   _this.isFullScreen = _this.checkIsFull()
      // }
      document.onfullscreenchange = function () {
        _this.isFullScreen = _this.checkIsFull()
      }
    },
    methods:{
      // showFullScreen(){
      //   this.callFullScreen(document.documentElement)
      // },
      callFullScreen(element){
        element.requestFullscreen()
        //做兼容
        // if(element.requestFullscreen){
        //   element.requestFullScreen()
        // }else if(element.mozRequestFullScreen){
        //   element.mozRequestFullScreen()
        // }else if(element.webkitRequestFullScreen){
        //   element.webkitRequestFullScreen()
        // }
      },
      exitFullScreen() {
        if(document.cancelFullScreen){
          document.cancelFullScreen()
        }else if(document.mozCancelFullScreen){
          document.mozCancelFullScreen()
        }else if(document.webkitCancelFullScreen){
          document.webkitCancelFullScreen()
        }
      },
      //全屏非全屏切换
      toggleFullScreen(e){
        // let el = e.target || e.srcElement
        this.isFullScreen = !this.isFullScreen
        if(this.isFullScreen){
          //退出全屏
          this.exitFullScreen()
        }else{
          //全屏
          // this.callFullScreen(el)
          this.callFullScreen(this.element)
        }
      },
      //判断是否是全屏
      checkIsFull(){
        let isFull = document.isFullScreen || document.webkitIsFullScreen || document.mozIsFullScreen || false
        console.log("我改变了:"+isFull)
        return isFull
      }
    },
    watch:{
      //这里写可以监听是否全屏的变化 做一下操作
      isFullScreen:{
        handler:function (val) {
          console.log("我是不是全屏啊:"+val)
          let html = document.querySelector("html")
          if(val){
            //全屏
            console.log(html.style)
            html.style.fontSize = '24px'
          }else {
            html.style.fontSize = '12px'
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
