<template>
    <div v-cloak>
      <Button @click="lookInfos">查看</Button>
      <Input v-model="userInfo.name"></Input>
      <p v-html="testHtml"></p>
    </div>
</template>

<script>
  //引入mapState辅助函数
  import {mapState,mapGetters} from 'vuex'
    export default {
        name: "LookInfo",
        data(){
          return{
            //testHtml:"<span class='text-color'>这是测试v-html带class</span>"
          }
        },
        mounted(){
        },
        methods:{
          lookInfos(){
            // alert(JSON.stringify(this.$store.getters.getUserInfo))
            alert(JSON.stringify(this.userInfo))
          }
        },
        computed:{
          ...mapGetters(['getUserInfo']),
          ...mapState(['userInfo']),
          // ...mapState({
          //   userInfo :state =>state.userInfo
          // }),
          // userInfo(){
          //   //return this.$store.state.userInfo
          //   return this.$store.getters.getUserInfo
          // }
          testHtml(){
            let htmlStr = `
            <span class="text-color">这是测试v-html带class,有颜色</span>
            <p>这个是一些内容</p>
            <h4>这是h4标签</h4>
            `
            return htmlStr
          }
        }
    }
</script>

<style lang="scss" scoped>
/*scoped是应用当前组件 v-html渲染出来的内容可以理解是子组件的 并不能加上对应的属性*/
/*方法1  scoped*/
/*
方法2 vue的深度作用选择器   希望 scoped 样式中的一个选择器能够作用得“更深”可以影响到子组件
一般情况 在对应class 前加>>>  如>>> .class
像sass这些不能正确解析>>> 则在class前加/deeep/ 如/deep/ .class
*/
[v-cloak]{
  display: none;
}
/deep/ .text-color{
  color: #fc6700;
}
</style>
