<template>
  <div>
    <my-checkbox inline-template>
      <div @click="check">{{title}}</div>
    </my-checkbox>
    <div>{{dataTest}}</div>
    <my-another-checkbox></my-another-checkbox>
    <Button @click="test">扩展</Button>
  </div>
</template>


<script>
  //可以通过这个_this 在该实例对象创建后赋值可以使混入组件的this指向该实例对象
  let _this = {}
  import Vue from 'vue'
  /*引入混入mixin*/
  import {mixin1,mixin2} from '../utils/mixin'

  //使用内联模板 inline-template
  Vue.component('my-checkbox',{
    // template:'checkbox-template',
    data(){
      return{
        checked:false,
        title:"checked me!"
      }
    },
    methods:{
      check(){
        console.log(this,77777)
        this.checked = !this.checked
        //获取不到 是两个实例
        console.log(this.dataTest,111)
        console.log(_this.dataTest,222) //通过_this可以获取
        this.dataTest = "zzzzz"
      }
    }
  })
  //使用render
  Vue.component('my-another-checkbox',{
    data(){
      return{
        anotherChecked:false,
        anotherTitle:"ttttt"
      }
    },
    methods:{
      anotherCheck(){
        this.anotherChecked = !this.anotherChecked
        console.log("我选中了这个框,哈哈哈!")
      }
    },
    render(h){
      return h('div',{
       attrs:{},
       on:{
         click:()=>{
           this.anotherCheck()
         }
       }
      },[
        h('span',{},[this.anotherTitle])
      ])
    }
  })
  let extend = Vue.extend({
    methods:{
      extendAMethod(){
        console.log("我说我是扩展的方法")
        this.dataTest = "zzzzzz"
        console.log(this.dataTest)
      }
    }
  })
  export default {
    name: "VueMixin",
    data(){
      return{
        dataTest:"yyyyy"
      }
    },
    created(){
      _this = this
      console.log("我是这个页面本来的")
    },
    mounted(){
      console.log("xxxxxxxxxx")
      console.log(this,88888)
    },
    methods:{
      test(){
        console.log(11111)
        this.extendAMethod()
      },
    },
    extend:extend,
    //先调用哪个mixin对象就先执行哪个
    //混入的created优先于本页面的created
    mixins:[mixin1,mixin2]
  }
</script>
<style lang="scss" scoped>

</style>
