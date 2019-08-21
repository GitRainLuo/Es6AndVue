<!--template的优先级比render高 vue单文件是没有render这个的 要使用render得把template去掉-->
<!--<template functional>-->
<!--    -->
<!--</template>-->

<script>
    //图片组件
    let imgOption = {
      props:['data'],
      render:function (createElement) {
        console.log(this)
        return createElement("div",
          {
            class:'container'
          },[
          createElement("p",{},"图片组件"),
          createElement("img",{
            attrs:{
              src:this.data.url,
              width:400,
              height:300
            }
          })
        ])
      }
    }
    //视频组件
    let videoOption = {
      props: ['data'],
      // render:h=>{
      //   return h("div",{},[
      //     h("p",{},"视频组件"),
      //     h("video",{
      //       attrs:{
      //         src:this.data.url,
      //         controls:'controls',
      //         autoplay:'autoplay'
      //       }
      //     })
      //   ])
      // }
      render:function (createElement) {
        return createElement("div",{
          class:'container'
        },[
          createElement("p",{},"视频"),
          createElement("video",{
            attrs:{
              src:this.data.url,
              controls:'controls',
              autoplay:'autoplay'
            }
          })
        ])
      }
    }
    //文本组件
    let textOption = {
      props: ['data'],
      // render:h=>{
      //   return h("div",{},[
      //     h("p",{},"文本组件"),
      //     h("p",this.data.content)
      //   ])
      // }
      render:function (createElement) {
        return createElement("div",{
          class:'container'
        },[
          createElement("p",{},"文本组件"),
          createElement("p",this.data.content)
        ])
      }
    }
    export default {
        name: "SmartComponent",
        data(){
          return{
          }
        },
        functional:true,
        render(createElement, context) {
          function check() {
            let data = context.props.data
            console.log("smart-component/type:" + data.type)
            //判断是哪一类型的组件
            switch (data.type) {
              case "img":
                return imgOption
              case "video":
                return videoOption
              case "text":
                return textOption
              default:
                console.log("data类型不合法:"+data.type)
            }
          }
          //return createElement的三个参数 标签 context.data context.children
          return createElement(
            check(),
            {
              props:{
                data:context.props.data
              }
            },
            context.children
          )
        }
    }
</script>

<style lang="scss" scoped>
.container{
  width: 400px;
  height: 300px;
  margin: 0 auto 25px auto;
  img,video{
    width: 100%;
    height: 100%;
  }
}
</style>
