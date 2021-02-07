<template>
    <!--data里面调用methods里面的方法-->
  <div>
    {{aa}}{{bb}}
  </div>
</template>

<script>
    export default {
      name: "DataMethods",
      data() {
        let self = this
        return {
          aa:this.test(),
          bb:"初始化"
        }
      },
      created() {
      },
      mounted() {
      },
      methods: {
        test(){
          console.log(11111)
          // setTimeout(()=>{
          //   this.bb = "改变了"
          // },0)
          this.$nextTick(()=>{
            this.bb = "改变了"
          })
          return "aaa"
        }
      }
    }
</script>

<style lang="scss" scoped>

</style>
