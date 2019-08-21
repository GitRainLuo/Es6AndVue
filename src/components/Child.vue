<template>
    <div>
      <Alert>带数据的具名插槽/作用域插槽</Alert>
      <slot :msg="msg" name="slotName" :msg1="msg1"></slot>
      <Alert>不带数据的具名插槽</Alert>
      <slot name="menu"></slot>
      <Alert>匿名插槽</Alert>
      <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "Child",
        data(){
          return{
            msg:{
              message:"子slot传值"
            },
            msg1:"msg1"
          }
        }
    }
</script>

<style lang="scss" scoped>

</style>
