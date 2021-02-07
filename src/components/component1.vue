<template>
  <!--组件1-->
  <div>
    组件1
  </div>
</template>

<script>
  export default {
    name: "component1",
    data() {
      return {}
    },
    created() {
      console.log("created:" + this.$options.name)
    },
    mounted() {
      console.log("mounted:" + this.$options.name)
    },
    methods: {},
    beforeDestroy() {
      console.log("beforeDestroy:" + this.$options.name )
    },
    destroyed(){
      console.log("destroyed:" + this.$options.name )
    }
  }
</script>

<style lang="scss" scoped>

</style>
