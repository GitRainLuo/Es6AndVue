<template>
  <div>
    <!--注意:bus.$on监听 应在bus.$emit之前
    所有这里有跳转路由的话 应该在beforeDestroy钩子函数触发emit
    在跳转的路由的beforeCreated on监听 mounted赋值
    -->
    <h3>这里是{{$options.name}}页面</h3>
    <Input v-model="dataFromPageA"/>
  </div>
</template>

<script>
  import bus from "../utils/bus"

  export default {
    name: "PageB",
    data() {
      return {
        dataFromPageA: ""
      }
    },
    //在beforeCreated()钩子监听 mounted赋值
    beforeCreate() {
      //console.group("%c%s", "color:green", "beforeCreated 创建前状态========PageB","on",)
      bus.$on("dataInfo", (data) => {
        bus.dataFromPageA = data
        console.log("data:"+data+"将data赋值给bus:"+bus.dataFromPageA)
      })
      console.group("%c%s", "color:green", "beforeCreated 创建前状态========PageB","on",bus.dataFromPageA+"---data:"+this.dataFromPageA)
    },
    created() {
      console.group("%c%s", "color:green", "created 创建完成状态========PageB")
    },
    beforeMount() {
      console.group("%c%s", "color:green", "beforeMount 挂载前状态========PageB","bus:"+bus.dataFromPageA+"--"+this.dataFromPageA)
    },
    mounted() {
      this.dataFromPageA = bus.dataFromPageA
      console.group("%c%s", "color:green", "mounted 挂载完成状态========PageB","赋值前bus:"+bus.dataFromPageA+"---赋值后:"+this.dataFromPageA)
    },
    methods: {},
    // beforeUpdate() {
    //   console.group("%c%s", "color:green", "beforeUpdate 更新前状态========PageB")
    // },
    // updated() {
    //   console.group("%c%s", "color:green", "updated 更新完成状态========PageB")
    // },
    beforeDestroy() {
      console.group("%c%s", "color:green", "beforeDestroy 组件销毁前状态========PageB")
    },
    destroyed() {
      //手动销毁bus总线 防止多次触发
      bus.$off("dataInfo")
      console.group("%c%s", "color:green", "destroyed 组件销毁完成状态========PageB")
    }
  }
</script>

<style lang="scss" scoped>

</style>
