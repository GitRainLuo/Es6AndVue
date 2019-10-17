<template>
    <!--组件缓存 实现前进刷新 后退不刷新
      router meta设置isActive true
      activated和deactivated keep-alive组件激活和停用时调用
      第一次触发 created->mounted->...>activated->deactivated
      再次进入触发 activated->deactivated
    -->
  <div>
        <div v-if="des">
          <Alert>{{des}}</Alert>
        </div>
    <div>
      <Select v-model="address">
        <Option v-for="item in addressList" :value="item.code" :key="item.code">{{item.name}}</Option>
      </Select>
    </div>
    <Button @click="jumpToPageOne">跳转One页面</Button>
    <div style="height: 999px;width: 0"></div>
    <div style="width: 100%;height: 30px;background-color: #fc6700"></div>
  </div>
</template>

<script>
    export default {
        name: "KeepAlive",
        data(){
          return {
            des:"",
            address:"",
            addressList:[
              {
                code:"BJ",
                name:"北京"
              },
              {
                code:"TJ",
                name:"天津"
              },
              {
                code:"SH",
                name:"上海"
              },
              {
                code:"SZ",
                name:"深圳"
              }
            ]
          }
        },
        created(){
          this.des = "创建了页面KeepAlive"
        },
        mounted(){
        },
        methods:{
          jumpToPageOne(){
            this.$router.push({path:"/AliveOne"})
          }
        },
        activated(){
          if(!this.$route.meta.isActive){

          }
        },
        deactivated() {
        },
        beforeRouteLeave(to,from,next){
          // if(to.name === "AliveOne"){
          //   from.meta.isAlive = true
          // }
          // console.log(this.$route.meta.isAlive)
          next()
        }
    }
</script>

<style lang="scss" scoped>

</style>
