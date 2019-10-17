<template>
    <div>
      <div>{{$t('hello')}}</div>
      <Button @click="changeLanguage">{{language.name}}</Button>
    </div>
</template>

<script>
    import vue from "vue"
    export default {
        name: "Language",
        data(){
          return{
            language:{
              code: "zh-CN",
              name: "中文"
            }
          }
        },
        mounted(){
          console.log(vue.config.lang,77766)
          this.language.code = navigator.language
          this.addCurrying()
          this.checkIsNumber("string")
        },
        computed:{},
        methods:{
          changeLanguage(){
            if(this.language.code === "zh-CN"){
              this.language.code = "en-US"
              this.language.name = "english"
              vue.config.lang = this.language.code
            }else {
              this.language.code = "zh-CN"
              this.language.name = "中文"
              vue.config.lang = this.language.code
            }
          },
          sum(a,b,c){
            return a+b+c
          },
          addCurrying(){
            let add = this.$fn.currying(this.sum)
            console.log(add(1)(2)(3))
          },
          checkNumber(val){
            let reg = /^\d+$/
            return reg.test(val)
          },
          checkIsNumber(val){
            let isNumber = this.$fn.currying(this.checkNumber)
            console.log(isNumber(val))
          }
        },
    }
</script>

<style lang="scss" scoped>

</style>
