<template>
  <!--路由里面使用props属性-->
  <div>
    <Button @click="jumpRouterTarget('get')">get跳转</Button>
    <Button @click="jumpRouterTarget('post')">post跳转</Button>
  </div>
</template>

<script>
  export default {
    name: "RouterProps",
    data() {
      return {}
    },
    mounted(){},
    methods:{
      jumpRouterTarget(type){
        if(type == 'get'){
          this.$router.push({path:"/RouterTarget",query:{name:"我是getname",sex:"1"}})
        }else {
          this.$router.push({name:"RouterTargetPost",params:{name:"我是postname",sex:"1"}})
        }
      }
    }

  }
</script>

<style lang="scss" scoped>

</style>
