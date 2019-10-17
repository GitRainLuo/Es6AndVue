<template>
    <!-- $forceUpdate
      vue 提供的强制vue实例重新渲染 即强制更新数据和视图 触发updated钩子
      作用于 实例本身和插入插槽内容的子组件 (并不是所有的子组件)
    -->
  <div>
    <ul>
      <li v-for="(item,index) in addrList" :key="index" :value="item.code">{{item.name}}</li>
    </ul>
    <Button @click="changeList">改变list</Button>
  </div>
</template>

<script>
    export default {
        name: "ForceUpdate",
        data(){
          return {
            addrList:[
              {
                code:"BJ",
                name:"北京"
              },
              {
                code:"TJ",
                name:"天津"
              },
              {
                code:"SH",
                name:"上海"
              }
            ],
            fruitList:[
              {
                code:"banana",
                name:"香蕉"
              },
              {
                code:"apple",
                name:"苹果"
              },
              {
                code:"watermelon",
                name:"西瓜"
              }
            ]
          }
        },
        mounted(){
          // let o1 = [1,2,3]
          // let o2 = [1,2,3]
          let o1  = {
            name:"xx",
            age:11,
            hobby:[
              {
                code:"pp",
                name:"乒乓"
              },
              {
                code:"ym",
                name:"羽毛球"
              }
            ]
          }
          let o2  = {
            name:"xx",
            age:11,
            hobby:[
              {
                code:"pp",
                name:"乒乓"
              },
              {
                code:"ym",
                name:"羽毛球"
              }
            ]
          }
          console.log(this.$fn.isEqual(o1,o2))
        },
        updated(){
          console.log("我更新了")
        },
        methods:{
          changeList(){
            this.addrList = this.fruitList
            console.log(this.addrList)
            this.$forceUpdate()
          }
        }
    }
</script>

<style lang="scss" scoped>

</style>
