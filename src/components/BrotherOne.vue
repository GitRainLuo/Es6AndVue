<template>
  <!--兄弟组件之间通过定义一个bus.js中间公共实例来进行传递-->
  <!--bus.$emit 传递-->
  <!--兄弟用bus.$on接收-->
    <div>
      <h3>这是{{$options.name}}组件页面</h3>
      <div style="width: 90%;margin: 10px auto">
        <Input v-model="transmitData.msg" placeholder="向兄弟组件传递的值" style="width: 60%"/>
      </div>
      <Button @click="transmitInfo">向我的Brother传值</Button>
    </div>
</template>

<script>
    import bus from '@/utils/bus.js'
    export default {
        name: "BrotherOne",
        data(){
          return{
            transmitData:{
              msg:""
            }
          }
        },
        mounted(){
          console.log(bus,"busone")
        },
        methods:{
          transmitInfo(){
            bus.$emit("transmit",this.transmitData)
          }
        }
    }
</script>

<style lang="scss" scoped>

</style>
