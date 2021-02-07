<template>
    <!--动态组件-->
  <div class="wrapper">
    <ul class="component-list">
      <li v-for="(item,index) in componentList" :key="index" class="component" @click="changeCom(item)">{{item.componentName}}</li>
    </ul>
    <div class="content">
      <component :is="curComponent"></component>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DynamicComponents",
    data() {
      return {
        curComponent: () => import('@/components/component1'),
        componentList:[
          {
            component: () => import('@/components/component1'),
            componentName: "component1"
          },
          {
            component: () => import('@/components/component2'),
            componentName: "component2"
          },
          {
            component: () => import('@/components/component3'),
            componentName: "component3"
          }
        ]
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
      changeCom(item) {
        this.curComponent = item.component
      }
    }
  }
</script>

<style lang="scss" scoped>
.wrapper{
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  padding: 0 20px;
  .component-list{
    list-style: none;
    margin: 0 auto;
    width: 100%;
    height: 30px;
    &:after{
      content: "";
      display: block;
      visibility: hidden;
      width: 0;
      height: 0;
      clear: bottom;
    }
    .component{
      float: left;
      width: 20%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border: 1px solid #2d8cf0;
      &+.component{
        border-left: none;
      }
    }
  }
  .content{
    box-sizing: border-box;
    margin-top: 10px;
    width: 100%;
    height: calc(100vh - 45px);
    border: 1px solid #f5a623;
  }
}
</style>
