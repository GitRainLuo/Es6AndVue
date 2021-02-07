<template>
    <!--优势:不像通过props传值一样 如果传给后代的后代 需要多次重复传值
    通过$attrs后代可以直接取值
    $attrs 包含了父作用域中不作为 prop 被识别 (且获取) 的特性绑定
    利用$attrs 可以获取没有用props绑定传递的值  没有绑定可以获取到祖(父)传的所有值
    -->
  <child :name="name" :age="age"></child>
</template>

<script>
    export default {
        name: "CommunicationAttrs",
        data(){
          return{
            name:"parent",
            age:20
          }
        },
        // inheritAttrs: false,
        created(){
          console.log(this.$attrs)
        },
        components:{
          "child":{
            template:`<div>
<!--                  <div>我是子组件{{$attrs.name}}</div>-->
                  <div>我是子组件{{name}}</div>
                  <grand v-bind="$attrs"></grand>
            </div>`,
            data(){
              return {}
            },
            props:["name"],
            //默认 组件内未被注册的属性将作为普通html元素属性被渲染
            //false 没有在props里面的属性不渲染成html元素属性但是可以获取到
            inheritAttrs: false,
            created(){
              console.log(this.$attrs,"子组件")
            },
            components:{
              "grand":{
                template: `<div>
                      <div>我是孙子组件{{$attrs.age}}</div>
                </div>`,
                inheritAttrs: false,
                created(){
                  console.log(this.$attrs,"孙子组件")
                },
              }
            }
          }
        }
    }
</script>

<style lang="scss" scoped>

</style>
