<template>
    <!--
      const timer = setInterval(() =>{
          // 某些定时器操作
      }, 500);
      // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
      this.$once('hook:beforeDestroy', () => {
          clearInterval(timer);
      })
    -->
  <div>
    <Button @click="startInterval">开始定时器</Button>
    <Button @click="startIntervalAnother">不推荐的清除定时器</Button>
    <Button @click="$router.push({path:'/LookInfo'})">跳转</Button>
  </div>

</template>

<script>
    export default {
        name: "RemoveInterval",
        data() {
            return {
              timerAnother:null
            }
        },
        created() {
        },
        mounted() {
          console.log("这个页面用于看看在beforeDestroy时清除定时器")
        },
        methods: {
          startInterval(){
            console.log("准备开始走定时器了")
            let i = 0
            let timer = setInterval(function () {
              console.log(i++)
            },1000)
            this.$once("hook:beforeDestroy",()=>{
              clearInterval(timer)
            })
          },
          startIntervalAnother(){
            let i = 0
            this.timerAnother = setInterval(function () {
              console.log(i++)
            },1000)
          },
        },
        beforeDestroy(){
          console.log("销毁前,调用了清除定时器")

          //不推荐的缺点 这个需要在组件实例保存 其实这个并没有什么用
          clearInterval(this.timerAnother)
          this.timerAnother = null
        }
    }
</script>

<style lang="scss" scoped>

</style>
