<template>
    <!--常见的vue Api-->
    <div>
      <!--vue.set  响应式更新视图-->
      <div>
        <Alert>$set增加/修改元素 $delete删除元素</Alert>
        <Button @click="addItem">新增</Button>
        <Button @click="updateItem">修改</Button>
        <Button @click="deleteItem">删除</Button>
        <ul>
          <li v-for="item in setArr" :value="item.code">{{item.name}}</li>
        </ul>
      </div>
      <!--directive指令-->
      <div>
        <Alert>directive定义指令</Alert>
        <!--元素的input可以利用::-webkit-input-placeholder修改placeholder的样式-->
        <!--<input v-change-color v-model="text" style="width: 60%;margin: 0 auto" placeholder="输入文字时文字会改变颜色哦"/>-->
        <Input v-change-color v-model="text" class="input" placeholder="输入文字时文字会改变颜色哦"/>
      </div>
      <!--filter过滤器-->
      <div>
        <Alert>filter过滤器</Alert>
        <span>{{filterStr | str-filter}}</span>
      </div>
      <!--extend创建一个子类-->
      <div>
        <Alert>extend创建一个子类</Alert>
        <!--这里要用id  下面自定义的子类挂载需要-->
        <div id="myExtend"></div>
      </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    //自定义指令
    Vue.directive('change-color',{
      //绑定
      bind(){},
      //插入
      inserted(){},
      //更新
      update(el){
        //输入的时候改变字体颜色吧
        //获取到标签名 判断是原生input还是iview的
        if(el.tagName == "INPUT"){
          //原生
          el.style.color = 'rgb('+randomColor()+','+randomColor()+','+randomColor()+')'
        }else{
          //iview
          el.getElementsByTagName("input")[0].style.color = 'rgb('+randomColor()+','+randomColor()+','+randomColor()+')'
        }
      },
      //组件更新
      componentUpdated(){},
      //解绑
      unbind(){}
    })
    function randomColor() {
      return Math.floor(Math.random()*256)
    }

    //过滤器
    Vue.filter('str-filter',function (val) {
      let str = ""
      if(val){
        str = val+".0000"
      }else {
        str = val
      }
      return str
    })

    //extend创建一个子类
    //参数是一个包含组件选项的对象
    let MountExtendClass = Vue.extend({
      template:`<div>
                  <p>我是来测试extend创建子类的</p>
                  <p>{{firstName}}{{secondName}}</p>
                </div>
              `,
      data(){
        return{
          firstName:"上官",
          secondName:"飞燕"
        }
      }
    })

    // const state = Vue.observable({ count: 0 })
    //
    // const Demo = {
    //   render(h) {
    //     return h('button', {
    //       on: { click: () => { state.count++ }}
    //     }, `count is: ${state.count}`)
    //   }
    // }
    export default {
        name: "VueApi",
        data(){
          return{
            setArr:[
              {
                name:"北京",
                code:'BJ'
              },
              {
                name:"天津",
                code:"TJ"
              },
              {
                name:"上海",
                code:"SH"
              }
            ],
            text:"",
            filterStr:"test"
          }
        },
        created(){},
        mounted(){
          //创建实例 挂载到myExtend上
          new MountExtendClass().$mount("#myExtend")
        },
        methods:{
          addItem(){
            //set(target,index,value)
            let cityArr = [
              {
                name:"成都",
                code:"CD"
              },
              {
                name:"绵阳",
                code:"MY"
              },
              {
                name:"德阳",
                code:"DY"
              },
              {
                name:"雅安",
                code:"YA"
              },
              {
                name:"重庆",
                code:"CQ"
              },
              {
                name:"香港",
                code:"XG"
              }
            ]
            //this.$set(this.setArr,0,item)
            this.$set(this.setArr,this.setArr.length,cityArr[Math.floor(Math.random()*(cityArr.length-1))])
            console.log(JSON.stringify(this.setArr))
          },
          updateItem(){
            //修改第一个
            let item = {
              name:"广州",
              code:"GZ"
            }
            this.$set(this.setArr,0,item)
          },
          deleteItem(){
            this.$delete(this.setArr,0)
          }
        }
    }
</script>

<style lang="scss" scoped>
li{
  list-style: none;
}
::-webkit-input-placeholder{
  color: red;
}
.input{
  width: 60%;
  margin: 0 auto;
}
</style>
