<template>
    <!--表格导出-->
    <div>
      <Table :data="table.data" :columns="table.columns" border stripe></Table>
      <Button @click="exportExcel">导出</Button>
      <div>{{Math.random()}}</div>
      <Button @click="refresh">刷新</Button>
      <div>通过注入Inject获取父级provide的:{{injected}}</div>
      <Button @click="one">看看</Button>
    </div>
</template>

<script>
  import Vue from 'vue'
    export default{
        name:"TableExport",
        //注入reload
        inject:["reload","name"],
        data () {
            let _this = this
            return {
              one:function(){
                console.log(_this,"看看data函数里面的这个this(其实就是Vue的实例)")
              },
              table:{
                data:[
                  {
                    name:"Petter",
                    age:15,
                    sex:"男",
                    birth:this.$fn.dateFormat(new Date())
                  },
                  {
                    name:"Alen",
                    age:16,
                    sex:"男",
                    birth:this.$fn.dateFormat(new Date())
                  },
                  {
                    name:"Lily",
                    age:18,
                    sex:"女",
                    birth:this.$fn.dateFormat(new Date())
                  },
                  {
                    name:"Lisa",
                    age:20,
                    sex:"女",
                    birth:this.$fn.dateFormat(new Date())
                  }
                ],
                columns:[
                  {
                    type:"index",
                    title:"编号",
                    width:70
                  },
                  {
                    key:"name",
                    title:"姓名",
                    align:"center"
                  },
                  {
                    key:"age",
                    title:"年龄",
                    align:"center"
                  },
                  {
                    key:"sex",
                    title:"性别",
                    align:"center"
                  },
                  {
                    key:"birth",
                    title:"出生日期",
                    align:"center"
                  }
                ]
              },
              //注入 使用父的provide
              injected:this.name
            }
        },
        mounted(){
//            console.log(this,"this")
//          console.log(this.__proto__,"this.__proto__")
//          console.log(new Vue(),12)
        },
        methods:{
          exportExcel(){
            let data = this.table.data
            console.log(data)
            let key = []
            let title = []
            //筛选出key
            this.table.columns.forEach((item)=>{
              if(item["key"]){
                key.push(item["key"])
              }
            })
            //筛选出与key对应的title
            key.forEach((value,index)=>{
              this.table.columns.forEach(v=>{
                if(value === v.key){
                  title.push(v.title)
                }
              })
            })
            let param = {}
            param.data = data
            param.key = key
            param.title = title
            console.log(param,7777778888)
            let url = "/file/export"
//            let xhr = new XMLHttpRequest()
//            xhr.open("post",url)
//            xhr.setRequestHeader("Content-Type","application/json")
//            xhr.onload = (res)=>{
//              console.log(res,5566)
//              console.log(res.currentTarget.responseText,654321)
//              console.log(eval('('+res.currentTarget.responseText+')'));
//              console.log(JSON.parse(res.currentTarget.responseText))
//            }
//            xhr.send(JSON.stringify(param))
            this.$Http.post(url,JSON.stringify(param),{headers:{"Content-Type":"application/json;charset=utf-8"}}).then((res)=>{
                console.log(res,"信息返回")
              console.log(res.data)
            })
          },
          removeKey(data,key){
            for(let i = 0;i < data.length;i++){
              if(data[i][key] === key){
                data.splice(i,1)
                break
              }
            }
            return data
          },
          //页面刷新
          refresh(){
            this.reload()
          }
        }
    }
</script>

<style>

</style>
