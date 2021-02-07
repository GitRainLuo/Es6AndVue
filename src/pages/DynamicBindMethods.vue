<template>
  <!--动态绑定方法  利用到实例的this.$options.methods获取实例的所有方法
    如v-for生成多个标签每个标签绑定点击事件方法不一样
    只需要传方法名的字符串就行了
   -->
  <div>
    <div class="container">
      <ul class="ul-container">
        <li v-for="item in methodsList" @click="computedMethod(item.methodName,item.extraParam)"  :class="computedClass('xx')">{{computedData(item.description)}}</li>
      </ul>
    </div>
    <div>
      <Button @click="changeValue1">改变值</Button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DynamicBindMethods",
    data(){
      return{
        jumpOneD:0,
        jumpTwoD:2,
        methodsList:[
          {
            description:"jumpOneD",
            methodName:"jumpOne",
            extraParam:""
          },
          {
            description:"jumpTwoD",
            methodName:"jumpTwo",
            extraParam:""
          },
          {
            description:"jumpThree",
            methodName:"jumpThree",
            extraParam:"MagicOptions"
          },
          {
            description:"jumpTwo",
            methodName:"jumpTwo",
            extraParam:""
          },
          {
            description:"jumpOne",
            methodName:"jumpOne",
            extraParam:""
          }
        ]
      }
    },
    mounted(){
      setTimeout(()=>{
        this.jumpOneD = 3
      },3000)
    },
    computed:{
      computedClass(v){
        //v ==> this
        return function (val) {
          //val ==> xx
          return "li-box"
        }
      }
    },
    methods:{
      //中转计算要调用那个方法
      computedMethod(methodName,extra){
        let methods = this.$options.methods
        //methods就是实例所有的方法 是一个对象
        //methodName就为对象的key 来调用方法
        // console.log(this)
        //会导致调用方法里的this指向改变(this指向的是methods) 所以将this传递过去
        methods[methodName](extra,this)
      },
      computedData(dataName){
        // let data = this.$options.data()[dataName]
        let data = this.$data[dataName]
        console.log(data,7777)
        if (data == undefined){
          data = dataName
        }
        return data
      },
      jumpOne(){
        alert("jumpOne:"+arguments)
      },
      jumpTwo(){
        alert("jumpTwo")
      },
      jumpThree(extra,that){
        that.$router.push({path:"/MagicOptions"})
      },
      changeValue1(){
        this.jumpOneD = 3
        console.log(this.jumpOneD)
        console.log(this.$data['jumpOneD'],111111)
        let data = this.$options.data()
        console.log(data,66)
        console.log(this.$data,777778)
      }
    }
  }
</script>

<style lang="scss" scoped>
$color: #ff6600;
.container{
  width: 98%;
  margin: 10px auto;
  .ul-container{
    width: 100%;
    .li-box{
      width: 19%;
      height: 100px;
      display: inline-block;
      text-align: center;
      line-height: 100px;
      background-color: $color;
    }
    .li-box+.li-box{
      margin-left: 1%;
    }
  }
}

</style>
