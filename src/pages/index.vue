<template>
    <div>
      <div class="container">
        <ul v-for="item in itemList">
          <li v-for="child in item" @click="jump(child)">{{child.title}}</li>
        </ul>
      </div>
      <!--<a href="http://www.baidu.com">百度一下</a>-->
    </div>
</template>

<script>
    export default{
        name:"index",
        data () {
            return {
                itemList:[
//                    {
//                      name:"通信",
//                      path:"/ChildAndParent"
//                    },
//                    {
//                      name:"水果",
//                      path:"/SelectOptions"
//                    },
//                    {
//                      name:"文件",
//                      path:"/FileInfo"
//                    },
//                    {
//                      name:"表格",
//                      path:"/TableExport"
//                    },
//                    {
//                      name:"异步",
//                      path:"/AsyncAwait"
//                    }
                ]
            }
        },
        created(){
//          console.log(this.$router.options.routes)
          //正则验证 是不是 path为"/"和"*"的 过滤掉
          let regExp = /^(\/|\*)$/
          let routes = this.$router.options.routes.filter(item =>item.path ? !regExp.test(item.path) : true)
          routes = routes.filter(item=>item.title ? true :false)
          this.itemList = this.divideArr(routes)
//          this.itemList = this.divideArr(this.itemList)
        },
        mounted(){
        },
        methods:{
          divideArr(arr){
//              let index = 0
              //向上取整 取得行数为+1
              let index = Math.ceil(arr.length / 5)
              console.log("index(行):"+index)
              //行数循环
              //利用slice截取 返回的新数组
              let newArr = []
              for(let i = 0;i < index;i++){
                  newArr[i] = arr.slice(5*i,5*(i+1))
              }
//              if(arr.length <= 5){
//                  let array = []
//                  for(let i = 0;i < arr.length;i++){
//                      array.push(arr[i])
//                  }
//                  //清空
//                  arr = []
//                  arr[index] = array
//              }
              console.log(newArr)
              return newArr
          },
          jump(item){
              console.log(item)
              this.$router.push({path:item.path})
          }
        },
    }
</script>

<style lang="scss" scoped>
*{
  margin: 0;
  padding: 0;
}
  .container{
    width: 90%;
    margin: 0 auto;
    ul{
      height: 30px;
    }
    ul + ul{
      margin-top: 10px;
    }
    ul li{
      list-style: none;
      float: left;
      width: 19%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border: 1px solid #ccc;
      background-color: #f0faff;
      cursor: pointer;
    }
    li+li{
      margin-left: 1%;
    }
    li:hover{
      border: 1px solid transparent;
      background-color: #666666;
      color: #fff;
    }
  }
a:link{color:#000000;}
a:visited{color:#f5f733;}
a:hover{color:#00ff00;}
a:active{color:#ff0000;}
</style>
