<template>
  <!--组件2-->
  <div>
    组件2
  </div>
</template>

<script>
  export default {
    name: "component2",
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
