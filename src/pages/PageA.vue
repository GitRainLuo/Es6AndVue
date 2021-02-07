<template>
  <div>
    <!--注意:bus.$on监听 应在bus.$emit之前
    所有这里有跳转路由的话 应该在beforeDestroy钩子函数触发emit
    在跳转的路由的beforeCreated on监听 mounted赋值
    -->
    <h3>这里是{{$options.name}}页面</h3>
    <Input v-model="dataToPageB"/>
    <Button @click="toPageB">跳转B页面并传值</Button>
<!--    <image-preview :imageUrl="url" :isShow = true></image-preview>-->
<!--    <Modal v-model="showBigImageModal" title="图片预览">-->
<!--      <img :src="url" style="width: 100%"/>-->
<!--    </Modal>-->
  </div>
</template>

<script>
  import ImagePreview  from "@/components/ImagePreview"
  import bus from "../utils/bus"

  export default {
    name: "PageA",
    data() {
      return {
        dataToPageB: "",
        url:"http://isr-prod.oss-cn-shenzhen.aliyuncs.com/laserTv/1569484496676128408.jpeg",
        showBigImageModal:true
      }
    },
    components:{ImagePreview},
    beforeRouteEnter(to,from,next){
      console.group("%c%s", "color:red", "beforeRouteEnter========PageA")
      next()
    },
    beforeRouteLeave(to,from,next){
      console.group("%c%s", "color:red", "beforeRouteLeave========PageA")
      next()
    },
    beforeCreate() {
      console.group("%c%s", "color:red", "beforeCreate 创建前状态========PageA")
    },
    created() {
      console.group("%c%s", "color:red", "created 创建完毕状态========PageA")
    },
    beforeMount() {
      console.group("%c%s", "color:red", "beforeMount 挂载前状态========PageA")
    },
    mounted() {
      console.group("%c%s", "color:red", "mounted 挂载完成状态========PageA")
    },
    // beforeUpdate() {
    //   console.group("%c%s", "color:red", "beforeUpdate 更新前状态========PageA")
    // },
    // updated() {
    //   console.group("%c%s", "color:red", "updated 更新完成状态========PageA")
    // },
    methods: {
      toPageB() {
        this.$router.push({path: "/PageB"})
      }
    },
    beforeDestroy() {
      console.group("%c%s", "color:red", "beforeDestroy 组件销毁前状态========PageA","emit")
      //需要跳转路由的 在页面销毁前传递
      console.log("在这里传递值:"+this.dataToPageB)
      bus.$emit("dataInfo", this.dataToPageB)
    },
    destroyed() {
      bus.$off("dataInfo")
      console.group("%c%s", "color:red", "destroyed 组件销毁完成状态========PageA")
    }
  }
</script>

<style lang="scss" scoped>

</style>
