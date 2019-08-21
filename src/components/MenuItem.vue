<template>
    <!--没有子节点 要展示的标题-->
    <li>
      <slot></slot>
    </li>
</template>

<script>
    export default {
        name: "MenuItem"
    }
</script>

<style lang="scss" scoped>
li{
  list-style: none;
  /*text-align: left;*/
}
</style>
