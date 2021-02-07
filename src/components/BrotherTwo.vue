<template>
  <!--兄弟组件之间通过定义一个bus.js中间公共实例来进行传递-->
  <!--bus.$emit 传递-->
  <!--兄弟用bus.$on接收-->
  <div>
    <h3>这是{{$options.name}}组件页面</h3>
    <div style="width: 90%;margin: 10px auto">
      <Input v-model="dataFromBrother" placeholder="这是来自我兄弟的" readonly style="width: 60%"/>
    </div>
  </div>
</template>

<script>
    import bus from '@/utils/bus.js'
    export default {
        name: "BrotherTwo",
        data(){
          return{
            dataFromBrother:""
          }
        },
        created() {
        },
        mounted(){
          console.log(bus,"bustwo")
          bus.$on("transmit",(e)=>{
            console.log(e,777)
            this.dataFromBrother = e.msg
          })
        },
        methods:{
          testChildMethod(){
            alert("调用成功")
          }
        }
    }
</script>

<style lang="scss" scoped>

</style>
