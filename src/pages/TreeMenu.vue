<template>
    <div>
      <menu>
        <template v-for="menu in menuList">
          <menu-item :key="menu.title" v-if="!menu.children">{{menu.title}}</menu-item>
          <!--如果有孩子节点则会循环这部分操作-->
          <!--        <sub-menu v-else>-->
          <!--          <template #title>{{menu.title}}</template>-->
          <!--          <template v-for="child in menu.children">-->
          <!--            <menu-item>{{child.title}}</menu-item>-->
          <!--          </template>-->
          <!--        </sub-menu>-->
          <re-sub-menu :key="menu.title" v-else :data="menu"></re-sub-menu>
        </template>
      </menu>
    </div>
</template>

<script>
    import Menu from '@/components/Menu'
    import MenuItem from '@/components/MenuItem'
    import SubMenu from '@/components/SubMenu'
    import ReSubMenu from "../components/ReSubMenu"
    export default {
        name: "TreeMenu",
        components:{
          ReSubMenu,
          Menu,
          MenuItem,
          SubMenu
        },
        data(){
          return{
            menuList:[
              {
                title:'菜单1',
                children:[
                  {
                    title:'菜单1-1',
                    children:[
                      {title:'菜单1-1-1'},
                      {title:'菜单1-1-2'},
                      {title:'菜单1-1-3'}
                    ]
                  },
                  {title:'菜单1-2'},
                  {title:'菜单1-3'}
                ]
              },
              {title:'菜单2'},
              {title:'菜单3'}
            ]
          }
        }
    }
</script>

<style lang="scss" scoped>

</style>
