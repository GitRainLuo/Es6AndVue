<template>
  <div id="app">
    <router-view v-if="isRouterActive"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  //利用 provide 和 inject实现 单页面刷新
  //在需要刷新的页面通过inject注入reload 如:inject:["reload"]
  provide(){
    return {
      reload: this.reload,
      name:"provider"
    };
  },
  data() {
    return {
      isRouterActive:true
    }
  },
  methods:{
    //页面刷新
    reload(){
      //先将isRouterActive置为false
      this.isRouterActive = false
      //下次DOM更新完成后执行的回调 数据修改后 获取更新后的DOM
      this.$nextTick(()=>{
        this.isRouterActive = true
      })
    }
  }
}
</script>

<style lang="scss">
  /*引入图标icon  https://icomoon.io/app/#/select挑选生成*/
@import "styles/style.css";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*::-webkit-scrollbar{*/
    /*height: 10px;*/
  /*}*/
  /*margin-top: 60px;*/
}
</style>
