<template>
  <div>
    <v-count-to prefix="￥" :startVal='0' :endVal='1000' :duration='1000'></v-count-to>
    ￥<v-count-to :startVal='0' :endVal='100000' :duration='2000'></v-count-to>
    <v-count-to prefix="￥" :startVal='0' :endVal='2000000' :duration='1000'></v-count-to>
  </div>
</template>

<script>
    import VCountTo from 'vue-count-to';
    export default {
        name: "CountTo",
        components: { VCountTo },
        data() {
            return {}
        },
        created() {
        },
        mounted() {
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>

</style>
