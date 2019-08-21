<template>
    <!--递归组件-->
    <sub-menu>
      <template #title>
        {{data.title}}
      </template>
      <template v-for="child in data.children">
        <menu-item :key="child.title" v-if="!child.children">{{child.title}}</menu-item>
        <ReSubMenu v-else :key="child.title" :data="child"></ReSubMenu>
      </template>
    </sub-menu>
</template>

<script>
    import SubMenu from './SubMenu'
    import MenuItem from './MenuItem'
    export default {
        name: "ReSubMenu",
        components:{
          SubMenu,
          MenuItem
        },
        props:{
          data:{
            type:Object,
            default:()=>({})
          }
        },
        data(){
          return{

          }
        }
    }
</script>

<style lang="scss" scoped>

</style>
