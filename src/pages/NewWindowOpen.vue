<template>
  <!--vue的新窗口打开-->
  <div>
    <Button @click="openInNewWindow">在新窗口打开</Button>
  </div>
</template>

<script>
  export default {
    name: "NewWindowOpen",
    data(){
      return{

      }
    },
    methods:{
      openInNewWindow(){
        // this.$router.resolve
        let route = this.$router.resolve({name:"RouterTargetPost",params:{name:"xx",sex:"1"}})
        //得用route.href
        //打开新窗口
        window.open(route.href,"_blank")
        //当前窗口
        //window.open(route.href,"_self")

        //或者
        // let blankWindow = window.open("_blank")
        // blankWindow.location.href = route.href
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>
