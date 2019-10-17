<template>
    <!--wangeditor 富文本插件-->
  <div class="wang-editor">
    <h3>富文本编辑器</h3>
    <div ref="editorElem" style="text-align:left;"></div>
    <div class="btn-container">
      <Button type="primary" @click="saveContent">保存</Button>
      <Button type="primary" @click="clearContent">清空</Button>
    </div>
  </div>
</template>

<script>
    /*引入wangeditor*/
    import E from "wangeditor"
    export default {
      name: "WangEditor",
      data(){
        return{
          wangEditor:null,
          content:""
        }
      },
      //catchData是一个类似回调函数，来自父组件，当然也可以自己写一个函数，主要是用来获取富文本编辑器中的html内容用来传递给服务端
      /*接收父组件的方法*/
      //props:['editorContent'],
      mounted(){
        this.wangEditor = new E(this.$refs.editorElem)
        //编辑器的事件，每次改变会获取其html内容
        this.wangEditor.customConfig.onchange = (html) =>{
          this.content = html
          //把这个html通过catchData的方法传入父组件
          //console.log(this.content)
          //this.$emit("update:editorContent",html)
        }
        //配置菜单
        //默认的菜单配置
        this.wangEditor.customConfig.menu = [
          'head',  // 标题
          'bold',  // 粗体
          'fontSize',  // 字号
          'fontName',  // 字体
          'italic',  // 斜体
          'underline',  // 下划线
          'strikeThrough',  // 删除线
          'foreColor',  // 文字颜色
          'backColor',  // 背景颜色
          'link',  // 插入链接
          'list',  // 列表
          'justify',  // 对齐方式
          'quote',  // 引用
          'emoticon',  // 表情
          'image',  // 插入图片
          'table',  // 表格
          'video',  // 插入视频
          'code',  // 插入代码
          'undo',  // 撤销
          'redo'  // 重复
        ]
        //配置语言
        this.wangEditor.customConfig.lang = {
          '设置标题':'title',
          '链接':'link',
          '文字颜色':'font-color'
        }
        //粘贴
        //关闭粘贴样式的过滤  保存复制源的样式
        this.wangEditor.customConfig.pasteFilterStyle = false
        // 忽略粘贴内容中的图片
        this.wangEditor.customConfig.pasteIgnoreImg = true

        //插入链接的校验
        this.wangEditor.customConfig.linkCheck = (text,link) =>{
          console.log(text)
          console.log(link)
          //true代表校验通过
          return true
        }

        //焦点
        // this.wangEditor.customConfig.onfocus = function () {
        // }
        // this.wangEditor.customConfig.onblur = function () {
        // }

        //配置表情
        //表情面板可以有多个 tab ，因此要配置成一个数组。数组每个元素代表一个 tab 的配置
        this.wangEditor.customConfig.emotions = [
          //image表情
          {
            title:"默认",
            type:"image",
            content:[
              {
                alt: '[坏笑]',
                src: 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/50/pcmoren_huaixiao_org.png'
              },
              {
                alt: '[舔屏]',
                src: 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/40/pcmoren_tian_org.png'
              }
            ]
          },
          //emoji
          {
            title:"emoji",
            type:"emoji",
            content:[
              "😀","😁","😂","🤣","😃","😄","😅","😆","😉","😊","😋","😎","😍","😘","😗","😙",
              "😚","🙂","🤗","🤔","😐","😑","😶","🙄","😏","😣","😥","😮","🤐","😯","😪","😫",
              "😴","😌","😛","😜","😝","🤤","😒","😓","😔","😕","🙃","🤑","😲","🙁","😖","😞",
              "😞","😟","😤","😭"
            ]
          }
        ]

        //配置字体
        // this.wangEditor.customConfig.fontNames = [
        //   '宋体',
        //   '微软雅黑',
        //   'Arial',
        //   'Tahoma',
        //   'Verdana'
        // ]

        //上传图片
        //使用base64保存图片
        this.wangEditor.customConfig.uploadImgShowBase64 = true
        //this.wangEditor.customConfig.uploadImgServer = '/upload'  // 上传图片到服务器
        //创建wangEditor实例
        this.wangEditor.create()
      },
      methods:{
        //向父组件提交内容
        saveContent(){
          //console.log(this.content,778866)
          this.$emit("update:editorContent",this.content)
        },
        //清空
        clearContent(){
          this.wangEditor.txt.html("")
          this.content = ""
          this.$emit("update:editorContent",this.content)
        }
      }
    }
</script>

<style lang="scss" scoped>
.wang-editor{
  margin: 10px auto;
  width: 95%;
  h3{
    padding: 5px 0 10px 0;
  }
  .btn-container{
    display: inherit;
    padding: 10px 0;
    width: fit-content;
    /*margin-top: 15px;*/
  }
}
</style>
