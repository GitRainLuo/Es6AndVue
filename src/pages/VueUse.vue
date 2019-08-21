<template>
    <div class="container">
      <!--input输入框输入 修饰符-->
      <div>
        <!--lazy修饰符-->
        <input v-number-letter-only v-model.lazy="msg" @change="showChange" placeholder="lazy"/>
        <p>{{msg}}</p>
      </div>
      <div>
        <!--输入限制-->
        <input v-model="validateData" @input="validateInput" placeholder="numberAndCharOnly"/>
        <p>{{validateData}}</p>
      </div>
      <div>
        <Input v-number-letter-symbol-space-only placeholder="numberLetterSymbolSpaceOnly" style="width: 35%;margin: 0 auto"/>
      </div>
      <!---测试局部注册指令-->
      <div>
        <p>测试获取焦点</p>
        <input v-focus placeholder="一来就让我获取焦点"/>
        <!--<input v-focus v-bg-red="bgColor"/>-->
      </div>
      <div>
        <p>测试update 更新时改变背景颜色</p>
        <input v-change-bgcolor v-model="text" placeholder="输入的时候我会改变背景颜色"/>
      </div>
      <div>
        <Input type="text" v-model="info.name" placeholder="name"/>
        <Input type="text" v-model="info.pwd" placeholder="pwd"/>
      </div>
    </div>
</template>

<script>
    import Vue from "vue"
    /*局部注册获取焦点指令 v-focus*/
    Vue.directive('focus',{
      inserted:function (el) {
        el.focus()
      }
    })
    /*局部注册 高边背景颜色*/
    Vue.directive('bg-red',function (el,binding) {
      console.log(binding)
      el.style.backgroundColor = binding.value
    })

    /*局部注册 update钩子函数  directive参数以对象形式*/
    Vue.directive('change-bgcolor',{
      update:function (el) {
        //el就是被绑定的元素
        let r = Math.ceil(Math.random()*255)
        let g = Math.ceil(Math.random()*255)
        let b = Math.ceil(Math.random()*255)
        console.log('rgb('+r+','+g+','+b+')')
        if(el.tagName === 'INPUT'){
          //原生的input
          el.style.backgroundColor = 'rgb('+r+','+g+','+b+')'
        }else {
          //iview UI组件
          el.getElementsByTagName('input')[0].style.backgroundColor = 'rgb('+r+','+g+','+b+')'
        }
      }
    })

    export default {
        name: "VueUse",
        data(){
          return{
            msg:"",
            validateData:"",
            content:"测试",
            // bgColor:"red",
            text:"",
            info:{
              name:"",
              pwd:""
            }
          }
        },
        mounted(){
          let inp = document.querySelectorAll('input')
          inp[0]
          console.log(inp[0])
        },
        methods:{
          showChange(){
            console.log(this.msg)
          },
          validateInput(e){
            console.log(e)
          },
        },
        computed:{
          bgColor(){
            return "red"
          }
        },
        watch:{
          info:{
            handler:function (val,old) {
              console.log("---cur---"+JSON.stringify(val)+"---old--"+JSON.stringify(old))
            },
            deep:true,
            immediate:true
          }
        }
    }
</script>

<style lang="scss" scoped>
.container{
  width: 90%;
  margin: 0 auto;
  div+div{
    margin-top: 10px;
  }
}
</style>
