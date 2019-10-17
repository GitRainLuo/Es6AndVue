<template>
    <div>
      <wang-editor :editorContent.sync="editorContent"></wang-editor>
<!--      <div>-->
<!--        <Button @click.native="lookInfoData">查看</Button>-->
<!--      </div>-->
      <!--显示内容-->
      <div id="content"></div>
    </div>
</template>

<script>
    //引入组件
    import WangEditor from '@/components/WangEditor'
    export default {
      name: "Editor",
      components:{
        WangEditor
      },
      data(){
        return{
          editorContent:"",
          domContent:""
        }
      },
      mounted(){
        this.domContent = document.getElementById("content")
      },
      methods:{
        lookInfoData(){
          console.log(this.editorContent)
        },
        //dom字符串转dom对象
        parseToDOM(str) {
          let div = document.createElement("div");
          if (typeof str == "string")
            div.innerHTML = str;
          return div.childNodes;
        }
      },
      watch:{
        editorContent:{
          handler:(dom)=>{
            document.getElementById("content").innerHTML = dom
          },
          immediate:false
        }
      }
    }
</script>

<style lang="scss" scoped>

</style>
