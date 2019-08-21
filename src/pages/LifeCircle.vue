<template>
    <div>
      <div>{{cd}}</div>
      <div>
        <span v-for="item in list" :key="item.index">{{titleAndSubTitle(item)}}</span>
      </div>
    </div>
</template>

<script>
  // created>computed>mounted>watch
    export default {
        name: "LifeCircle",
        data(){
          return{
            test:"1",
            list:[
              {
                title:"title",
                subTitle:"subTitle",
                content:""
              }
            ]
          }
        },
        created() {
          //alert("created:"+this.test)
        },
        mounted() {
          //alert("mounted:"+this.test)
        },
        computed:{
          cd(){
            //alert("computed")
            this.test = "fff"
            return this.test
          },
          titleAndSubTitle(){
            return function (item) {
              let str = ""
              str =  item.title
              if(item.subTitle){
                str += "-"+item.subTitle
              }
              return str
            }
          }
        },
        watch:{
          test(val,old){
            //alert("watch:"+val)
          }
        }
    }
</script>

<style lang="scss" scoped>

</style>
