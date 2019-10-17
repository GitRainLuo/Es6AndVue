<template>
    <!--复制组件-->
  <!--
    父组件通过<copy-content :content="xxx"></copy-content>
    或者
    render:(h)=>{
      return h(CopyContent,{
        props:{
          content:"xxx"
        }
      })
    }
    使用
  -->
  <div>
    <button @click="copyContent" class="copy-btn">复制信息</button>
  </div>
</template>

<script>
    export default {
      name: "CopyContent",
      data(){
        return{

        }
      },
      props:{
        //父组件传递的需要复制的内容
        content:{
          type:String,
          default:""
        }
      },
      methods:{
        copyContent(){
          //document 的execCommand方法 实现copy
          let copy = (e)=>{
            e.preventDefault()
            e.clipboardData.setData('text/plain',this.content)
            //复制到剪切板后移除copy
            //document.removeEventListener('copy',copy)
          }
          //监听copy事件
          document.addEventListener("copy",copy)
          document.execCommand("Copy");
        }
      }

    }
</script>

<style lang="scss" scoped>
.copy-btn{
  padding: 2px 4px;
  line-height: 1.5;
  color: #347bb0;
  border: 1px solid #dddee1;
  border-radius: 3px;
  background-color: #f7f7f7;
  &:hover{
    outline: none;
    border-color: #57a3f3;
    background-color: #fff;
  }
}
</style>
