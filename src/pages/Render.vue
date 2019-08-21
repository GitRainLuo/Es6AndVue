<!--使用template创建html比render优先级高
  使用render不使用template
-->
<!--<template>-->

<!--</template>-->

<script>
    export default {
        name: "Render",
        data(){
          return{
            contentList:[
              {
                title:"title1",
                content:"内容1"
              },
              {
                title:"title2",
                content:"内容2"
              },
              {
                title:"title3",
                content:"内容3"
              },
              {
                title:"title4",
                content:"内容4"
              },
              {
                title:"title5",
                content:"内容5"
              },
            ]
          }
        },
        methods:{

        },
        render(h){
          /*h()可以是3个参数 第一个参数标签 第二个参数object 标签属性 第三个参数一个数组
          * 三个参数 第一个参数 标签 第二个参数object 标签属性 第三个参数 内容
          * h或者是createElement 返回值是一个VNode 即虚拟DOM节点
          * */
          return h("div",[
            h("div",{class:"clear"},[
              h("ul",{
                style:{
                  width:"95%",
                  height:"30px",
                  margin:"0 auto"
                }
              },[
                h("li",
                  {
                    class:"listyle",
                  },
                  "卡卡罗特"
                ),
                h("li",
                  {
                    class:"listyle"
                  },
                  "贝吉塔"
                ),
                h("li",
                  {
                    class:"listyle"
                  },
                  "布玛"
                ),
                h("li",
                  {
                    class:"listyle"
                  },
                  "琪琪"
                ),
                h("li",
                  {
                    class:"listyle"
                  },
                  "比鲁斯"
                ),
              ])
            ]),
            // h("div",{
            //   style:{
            //     height:0,
            //     clear:"both",
            //     visibility:"hidden"
            //   }
            // }),
            h("p",{
              style:{
                textDecoration:"underline",
                font:"italic"
              },
              props:{},
              attr:{},
              class:"pstyle"
            }, "这是一段话"),

            //循环生成多个 利用Array map方法
            Array.apply(null,{length:5}).map((item,index)=>{
              return h("p","这是"+(index+1)+"个")
            }),

            //循环生个多个 list.map
            h("div",
              this.contentList.map((item,index)=>{
                return h("div",{class:"contentcontainer"},[
                  h("h4",{
                    style:{
                      height:"30px",
                      lineHeight:"30px",
                      borderBottom:"1px solid #fff"
                    }
                  },item.title),
                  h("div",{
                    style:{
                      padding:"5px",
                      height:"50px",
                    }
                  },item.content)
                ])
              })
            )
          ])
        }
      /*template优先级比render高 template存在时render不生效*/
      // render(h){
      //   return h('div',
      //     Array.apply(null, { length: 20 }).map(function () {
      //       return h('p', 'hi')
      //     })
      //   )
      // },
      // render: function (createElement) {
      //   return createElement('div',
      //     Array.apply(null, { length: 20 }).map(function () {
      //       return createElement('p', 'hi')
      //     })
      //   )
      // },
      // render(createElement, context) {
      //   return createElement()
      // }
    }
</script>

<style lang="scss" scoped>
.clear{
  zoom: 1;
}
.clear::after{
  content: "";
  display: block;
  clear: both;
  height: 0;
  visibility: hidden;
  overflow: hidden;
}
.pstyle{
  height: 30px;
  text-align: center;
  line-height: 30px;
  color: #fc6700;
}
.listyle{
  float: left;
  list-style: none;
  width: 19%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border: 1px solid #999;
}
.listyle+.listyle{
  margin-left: 1%;
}

.contentcontainer{
  margin: 0 auto 10px auto;
  width: 30%;
  background-color: #999;
}
</style>
