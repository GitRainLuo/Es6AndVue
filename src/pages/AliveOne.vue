<template>
    <!--缓存页面One-->
  <div>
    <div v-if="desOne">
      <Alert>{{desOne}}</Alert>
    </div>
    <div style="margin-bottom: 300px">
      <!--设置capture为true 下拉菜单展开是 点击跳转(或者是其他操作) 先收回下拉菜单 其他操作不会生效
        capture 为false  其他操作立即生效
        如果组件未设置 则会读取全局的iview配置
       -->
      <Select v-model="fruit" :capture="true">
        <Option v-for="item in fruitList" :value="item.code" :key="item.code">{{item.name}}</Option>
      </Select>
    </div>
    <Button @click="jumpToPageTwo">跳转Two页面</Button>
    <div style="height: 999px;width: 0"></div>
    <div style="width: 100%;height: 30px;background-color: #fc6700"></div>
  </div>
</template>

<script>
    export default {
        name: "AliveOne",
        data(){
          return{
            target:{},
            desOne:"",
            fruit:"",
            fruitList:[
              {
                code:"banana",
                name:"香蕉"
              },
              {
                code:"watermelon",
                name:"西瓜"
              },
              {
                code:"strawberry",
                name:"草莓"
              },
              {
                code:"mango",
                name:"芒果"
              }
            ],
            date:this.$fn.dateFormat(new Date(),"yyyyMMdd hh:mm:ss")
          }
        },
        beforeRouteEnter(to,from,next){
          if(from.name === "KeepAlive"){
            to.meta.isCache = true
          }
          next()
        },
        created(){
          alert(1)
          this.desOne = "创建了页面AliveOne"
        },
        mounted(){
        },
        methods:{
          jumpToPageTwo(){
            this.$router.push({path:"/AliveTwo"})
          }
        },
        activated(){
          // this.$route.meta.isAlive = false
          if(!this.$route.meta.isCache){
            alert("获取数据")
          }
          this.$route.meta.isCache = false
        },
        deactivated() {
        },
        // updated(){
        //   console.log(this.fruit)
        // },
        beforeRouteLeave(to,from,next){
          if(to.name === "AliveTwo"){
            from.meta.isAlive = true
          }
          next()
        }
    }
</script>

<style lang="scss" scoped>

</style>
