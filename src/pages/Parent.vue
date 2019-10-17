<template>
    <div>
      <child>
        <!--具名插槽 // 作用域插槽-->
<!--        <template slot-scope="slotObj" slot="slotName">-->
<!--          <p>所有的传递过来的是一个对象:{{slotObj}}</p>-->
<!--          <p>msg:{{slotObj.msg}}</p>-->
<!--          <p>msg1:{{slotObj.msg1}}</p>-->
<!--        </template>-->
        <!--#是v-slot:的缩写-->
        <template  #slotName="slotObj">
          <p>所有的传递过来的是一个对象:{{slotObj}}</p>
          <p>msg:{{slotObj.msg}}</p>
          <p>msg1:{{slotObj.msg1}}</p>
        </template>
        <!--具名插槽-->
        <!-- <template slot="menu"> -->
        <!--<template v-slot:menu> -->
        <template #menu>
          <div class="menu">
            <span>菜单1</span>
            <span>菜单2</span>
            <span>菜单3</span>
            <span>菜单4</span>
            <span>菜单5</span>
            <span>菜单6</span>
          </div>
        </template>
        <!--匿名插槽-->
        <template>
          <div class="menu">
            <span>菜单1</span>
            <span>菜单2</span>
            <span>菜单3</span>
            <span>菜单4</span>
            <span>菜单5</span>
            <span>菜单6</span>
          </div>
        </template>
      </child>
    </div>
</template>

<script>
    import Child from '@/components/Child'
    export default {
        name: "Parent",
        components:{
          Child
        },
        mounted(){
        },
        data(){
          return{

          }
        }
    }
</script>

<style lang="scss" scoped>
/*深入改变子组件的样式*/
/*深度作用选择器   >>> 或者 /deep/*/
.menu{
  padding: 10px 0;
  span{
    display: inline-block;
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc
  }
  span+span{
    margin-left: 10px;
  }
}
</style>
