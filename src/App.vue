<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="isRouterActive && $route.meta.isAlive"/>
    </keep-alive>
    <router-view v-if="isRouterActive && !$route.meta.isAlive"/>
  </div>
</template>

<script>
export default {
  //建议书写顺序 components props data computed created mounted methods filters watch
  name: 'App',
  //利用 provide 和 inject实现 单页面刷新
  //在需要刷新的页面通过inject注入reload 如:inject:["reload"]
  provide(){
    return {
      reload: this.reload,
      name:"provider",
      //这样写 改变后子组件注入的值也不会改变
      changeData:this.changeData,
      //我们可以写成调用一个函数 返回最新的数据 这样子组件就能获取到最新的数据
      myChangeData:this.getMyChangeData
    };
  },
  data() {
    return {
      isRouterActive:true,
      changeData:"我是默认值"
    }
  },
  created(){
    console.log("根页面创建")
    setTimeout(()=>{
      this.changeData = "三秒后我改变默认值了"
    },3000)
    //解决Vue刷新页面vuex state保存的状态消失问题
    //页面加载的时候加载sessionStorage或者localStorage里面的状态信息
    //replaceState 替换 store 的根状态，仅用状态合并或时光旅行调试
    if(sessionStorage.getItem("store")){
      let sessionObj = JSON.parse(sessionStorage.getItem("store"))
      console.log("s---"+JSON.stringify(sessionObj))
      this.$store.replaceState(Object.assign({},this.$store.state,sessionObj))
    }
    //页面刷新时将vuex的状态信息保存到sessionStorage或者localStorage
    window.addEventListener("beforeunload",()=>{
      console.log(JSON.stringify(this.$store.state))
      sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    })
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
    },
    //这里写成函数 获取这个值 子组件掉这个函数就能获取最新的值
    getMyChangeData(){
      return this.changeData
    }
  }
}
</script>

<style lang="scss">
  /*引入图标icon  https://icomoon.io/app/#/select挑选生成*/
@import "styles/style.css";
@import "styles/base";
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
