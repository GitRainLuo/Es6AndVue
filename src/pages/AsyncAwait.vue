<template>
    <!--异步 async await-->
    <!--异步 Promise.all-->
    <div>
      <Button @click="asyncRequest">请求(async await)</Button>
      <Button @click="promiseAll">Promise.all</Button>
    </div>
</template>

<script>
    export default{
        name:"AsyncAwait",
        data () {
            return {}
        },
        methods:{
          async asyncRequest(){
            console.log(1)
            let param = {
                name:"test"
            }
//            let res = await this.$Http.get("/file/data").then((res)=>{
//              if(res.status == 200 && res.data.code == 0){
//                return res.data.msg
//              }else {
//                return "error"
//              }
//            })
            let res = await this.test()
//            let re = await this.$Http.post("/file/test",param,{headers:{"Content-Type":"application/json"}}).then((res)=>{
//                if(res.status == 200){
//                    return res.data
//                }else {
//                    return "fail"
//                }
//            })
            let re = await this.test2()
            console.log(2)
            console.log(res)
            console.log(re)
            console.log(3)
          },
          getData(){

          },
          test(){
            let _this = this
            return Promise.resolve(
              _this.$Http.get("/file/data").then((res)=>{
                if(res.status == 200 && res.data.code == 0){
                  return res.data.msg
                }else {
                  return "error"
                }
              })
            )
//              let xhr = new XMLHttpRequest()
//              xhr.open("get","http://127.0.0.1:443/file/data")
//              xhr.onload = function (res) {
//                return res
//              }
//              xhr.send()
          },
          test2(){
              let _this = this
              let param = {
                name:"jack"
              }
              return Promise.resolve(
                _this.$Http.post("/file/test",param,{headers:{"Content-Type":"application/json"}}).then((res)=>{
                  if(res.status == 200){
                    return res.data
                  }else {
                    return "fail"
                  }
                })
              )
          },
//          promiseAll(){
//              let _this = this
//              let param = {
//                  name:"jack"
//              }
//              let p1 = new Promise((resolve,reject)=>{
//                  resolve(
//                    _this.$Http.get("/file/data").then((res)=>{
//                      if(res.status == 200 && res.data.code == 0){
//                        return res.data.msg
//                      }else {
//                        return "error"
//                      }
//                    })
//                  )
//              })
//              let p2 = new Promise((resolve, reject)=>{
//                  resolve(
//                    this.$Http.post("/file/test",param,{headers:{"Content-Type":"application/json"}}).then((res)=>{
//                      if(res.status == 200){
//                        return res.data
//                      }else {
//                        return "fail"
//                      }
//                    })
//                  )
//              })
//              console.log(1)
//              Promise.all([p1,p2]).then((values)=>{
//                  console.log(values)
//              })
//              console.log(2)
//          },
          promiseAll2(){
              let _this = this
              let param = {
                  name:"jack"
              }
              let p1 = Promise.resolve(
                _this.$Http.get("/file/data").then((res)=>{
                  if(res.status == 200 && res.data.code == 0){
                    return res.data.msg
                  }else {
                    return "error"
                  }
                })
              )
              let p2 = Promise.resolve(
                _this.$Http.post("/file/test",param,{headers:{"Content-Type":"application/json"}}).then((res)=>{
                  if(res.status == 200){
                    return res.data
                  }else {
                    return "fail"
                  }
                })
              )
              console.log(1)
              Promise.all([p1,p2]).then((values)=>{
                  console.log(values,"values")
              })
              console.log(2)
          },
          promiseAll(){
              Promise.all([this.test(),this.test2()]).then((values)=>{
                  console.log(values,"v")
              })
          }
        }
    }
</script>

<style>

</style>
