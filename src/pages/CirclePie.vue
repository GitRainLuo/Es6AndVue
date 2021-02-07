<template>
  <div class="pie-wrap">
    <c-pie :percent="31.6"></c-pie>
    <c-pie :percent="22.5"></c-pie>
    <c-pie :percent="45"></c-pie>
  </div>
</template>

<script>
  import cPie from "@/components/Pie"
  export default {
    name: 'CirclePie',
    components:{
      cPie
    },
    data () {
      return {
        num: 0
      }
    },

    mounted () {
    },
    methods: {

    }
  }
</script>

<style lang='scss' scoped>

</style>
