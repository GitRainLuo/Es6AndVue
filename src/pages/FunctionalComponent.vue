<template>
    <div>
      <!--函数化组件-->
<!--      <functional-component :data="data"></functional-component>-->
      <smart-component :data="data"></smart-component>
      <div>
        <Button @click="changeType('img')">图片组件</Button>
        <Button @click="changeType('video')">视频组件</Button>
        <Button @click="changeType('text')">文本组件</Button>
      </div>
    </div>
</template>

<script>
    // import Vue from 'vue'
    import SmartComponent from '../components/SmartComponent'
    // //图片组件
    // let imgOption = {
    //   props:['data'],
    //   render:function (createElement) {
    //     return createElement("div",{},[
    //       createElement("p",{},"图片组件"),
    //       createElement("img",{
    //         attrs:{
    //           src:this.data.url,
    //           width:400,
    //           height:300
    //         }
    //       })
    //     ])
    //   }
    // }
    // //视频组件
    // let videoOption = {
    //   props: ['data'],
    //   render:h=>{
    //     return h("div",{},[
    //       h("p",{},"视频组件"),
    //       h("video",{
    //         attrs:{
    //           src:this.data.url,
    //           controls:'controls',
    //           autoplay:'autoplay'
    //         }
    //       })
    //     ])
    //   }
    // }
    // //文本组件
    // let textOption = {
    //   props: ['data'],
    //   render:h=>{
    //     return h("div",{},[
    //       h("p",{},"文本组件"),
    //       h("p",this.data.content)
    //     ])
    //   }
    // }
    // //注册组件
    // Vue.component('smart-component',{
    //   //设置函数化组件
    //   functional:true,
    //   render(createElement, context) {
    //     function check() {
    //       let data = context.props.data
    //       console.log("smart-component/type:" + data.type)
    //       //判断是哪一类型的组件
    //       switch (data.type) {
    //         case "img":
    //           return imgOption
    //         case "video":
    //           return videoOption
    //         case "text":
    //           return textOption
    //         default:
    //           console.log("data类型不合法:"+data.type)
    //       }
    //     }
    //     return createElement(
    //       check(),
    //       {
    //         props:{
    //           data:context.props.data
    //         }
    //       },
    //       context.children
    //     )
    //   }
    // })
    export default {
        name: "FunctionalComponent",
        components:{
          SmartComponent
        },
        data(){
          return {
            data:{}
          }
        },
        created(){
          //默认为图片组件
          this.changeType("img")
        },
        methods:{
          changeType(type){
            console.log("type类型为:"+type)
            switch (type) {
              case "img":
                this.data = {
                  type:"img",
                  url:"http://pic-bucket.ws.126.net/photo/0001/2019-02-07/E7D8PON900AO0001NOS.jpg",
                  content:"图片"
                }
                break
              case "video":
                this.data = {
                  type:"video",
                  url:"http://wxapp.cp31.ott.cibntv.net/6773887A7F94A71DF718E212C/03002002005B836E73A0C5708529E09C1952A1-1FCF-4289-875D-AEE23D77530D.mp4?ccode=0517&duration=393&expire=18000&psid=bbd36054f9dd2b21efc4121e320f05a0&ups_client_netip=65600b48&ups_ts=1549519607&ups_userid=21780671&utid=eWrCEmi2cFsCAWoLI41wnWhW&vid=XMzc5OTM0OTAyMA&vkey=A1b479ba34ca90bcc61e3d6c3b2da5a8e&iv=1&sp=",
                  content:"视频"
                }
                break
              case "text":
                this.data = {
                  type:"text",
                  content:"《流浪地球》中的科学：太阳何时吞并地球？科学家已经给出时间表"
                }
                break
              default:
                console.log("default")
            }
          }
        }
    }
</script>

<style lang="scss" scoped>

</style>
