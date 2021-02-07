<template>
  <!--组件3-->
  <div>
    组件3
  </div>
</template>

<script>
  export default {
    name: "component3",
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
