<template>
  <!--routerProps跳转的目标页面-->
  <div>
    {{name}}---{{sex}}
  </div>
</template>

<script>
  export default {
    name: "RouterTarget",
    data(){
      return{

      }
    },
    props:["name","sex"],
    mounted(){},
    methods:{}
  }
</script>

<style lang="scss" scoped>

</style>
