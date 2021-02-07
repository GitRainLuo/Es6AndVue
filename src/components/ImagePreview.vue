<template>
  <!--图片预览组件-->
  <div v-if="isShow">
    <div>
      <img :src="imageUrl"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ImagePreview",
    props:{
      imageUrl:{
        required:true,
        type:String,
        default:""
      },
      isShow:{
        type:Boolean,
        default:false
      }
    },
    data(){
      return{
        show:true
      }
    },
    mounted(){
      let temImage = this.$refs["temImage"]
    }
  }
</script>

<style lang="scss" scoped>

</style>
