<template>
  <!--神奇的实例的this.$options
   可以获取实例里面的东西 如name,methods等以及额外定义的如:extra
   -->
  <div>
    <Input v-model="want" placeholder="请输入你想获取的" style="width: 150px" @keydown.enter.native="getWhatYouWant"/>
    <Button @click="getWhatYouWant">查询</Button>
    <div style="margin-top: 10px">
      <Input type="textarea" v-model="youWanted" style="width: 300px"/>
    </div>
    <div style="width: 100px;height: 100px" :class="classList">class</div>
  </div>
</template>

<script>
  export default {
    name: "MagicOptions",
    data(){
      return{
        want:"",
        youWanted:"",
        init:"init",
        classes:"color-red,bg-yellow"
      }
    },
    mounted(){
    },
    computed:{
      classList(){
        let classArr = []
        let bindClass = {}
        if(this.classes.indexOf(",") != -1){
          classArr = this.classes.split(",")
        }
        // for (let classArrElement of classArr) {
        //   bindClass[classArrElement]= true
        // }
        return classArr
        // console.log(bindClass)
        // return bindClass
        //return this.classes.replace(/,/gi," ")
      }
    },
    methods:{
      getWhatYouWant(){
        let options = this.$options
        console.log(options[this.want])
        this.youWanted = JSON.stringify(options[this.want])
        if(this.want = "data"){
          options = this.$options.data()
          this.youWanted = JSON.stringify(options)
        }

      }
    },
    extra:"extra"
  }
</script>

<style lang="scss" scoped>
.color-red{
  color: #ff2200;
}
.bg-yellow{
  background-color: #fc6700;
}
</style>
