<template>
  <div>
    <Alert>带数据的具名插槽/作用域插槽</Alert>
    <slot :msg="msg" name="slotName" :msg1="msg1"></slot>
    <Alert>不带数据的具名插槽</Alert>
    <slot name="menu"></slot>
    <Alert>匿名插槽</Alert>
    <slot></slot>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <slot name="todoList" :todo="todo"></slot>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "Child",
    data() {
      return {
        msg: {
          message: "子slot传值"
        },
        msg1: "msg1"
      }
    },
    props: {
      todos: {
        type: Array
      }
    },
    mounted() {
      console.log(this.$parent)
    }
  }
</script>

<style lang="scss" scoped>

</style>
