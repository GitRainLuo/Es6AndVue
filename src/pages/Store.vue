<template>
    <div>
      <Button @click="setUserInfo">修改</Button>
      <Button @click="getUserInfo">查看</Button>
      <Button @click="jumpToLook">跳转</Button>
    </div>
</template>

<script>
    export default {
        name: "Store",
        data(){
          return{

          }
        },
        mounted(){},
        methods:{
          setUserInfo(){
            //commit触发 mutations 同步操作
            this.$store.commit("setUserInfo","tom")
            //dispatch触发actions
            this.$store.dispatch("dUserInfo","jenson")
          },
          getUserInfo(){
            alert(JSON.stringify(this.$store.getters.getUserInfo))
          },
          jumpToLook(){
            this.$router.push({path:'/LookInfo'})
          }
        }
    }
</script>

<style lang="scss" scoped>

</style>
