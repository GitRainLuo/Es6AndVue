<template>
    <!--缓存页面two-->
  <div v-cloak>
    <Alert>{{description}}</Alert>
    <div class="temp">
      <template v-for="item in 5">
        <div>{{item}}</div>
      </template>
    </div>
    <div class="notemp">
      <div v-for="item in 5">
        <div>no+{{item}}</div>
      </div>
    </div>
    <div class="notemp1">
      <div v-for="(i,index) in 5" :key="index">
        <div>{{i}}</div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "AliveTwo",
        data(){
          return{
            description:""
          }
        },
        beforeRouteEnter(to,from,next){
          console.log(from,"f")
          next()
        },
        created(){
          this.description = "这里是页面AliveTwo"
        }
    }
</script>

<style lang="scss" scoped>
[v-cloak]{
  display: none;
}
</style>
