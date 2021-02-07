<template>
  <div>
    <Input v-model="message" placeholder="请输入传给服务器的消息" style="width: 350px"/>
    <Button @click="websocketSendData">发送</Button>
  </div>
</template>

<script>
    let socket
    export default {
        name: "WebSocketTest",
        data() {
            return {
              websocket:null,
              message:"",
              sid:1
            }
        },
        created() {
          this.initWebsocket()
        },
        mounted() {
        },
        methods: {
          //初始化websocket
          initWebsocket(){
            //连接 ws协议  wss
            // let socket
            if(typeof(WebSocket) == "undefined") {
              console.log("您的浏览器不支持WebSocket");
            }else{
              console.log("您的浏览器支持WebSocket");
              //实现化WebSocket对象，指定要连接的服务器地址与端口 建立连接
              this.websocket = new WebSocket("ws://localhost:8082/websocket/"+this.sid);
              //保存当前vue实例 this指向
              let _this = this
              this.websocket.onopen = function () {
                _this.websocketOpen()
              }
              //使用箭头函数保证this作用域指向vue实例
              this.websocket.onmessage = (msg)=>{
                this.websocketMessage(msg)
              }
              this.websocket.onerror = (e)=>{
                this.websocketError()
              }
              this.websocket.onclose = (e)=>{
                this.websocketClose()
              }
              //打开事件
              // socket.onopen = function() {
              //   console.log("Socket 已打开");
              //   socket.send("这是来自客户端的消息" + location.href + new Date());
              // };
              // //获得消息事件
              // socket.onmessage = function(msg) {
              //   //console.log(msg,"服务器返回的消息");
              //   console.log(msg.data,"服务器返回的消息");
              //   //发现消息进入  开始处理前端触发逻辑
              // };
              // //关闭事件
              // socket.onclose = function() {
              //   console.log("Socket已关闭");
              // };
              // //发生了错误事件
              // socket.onerror = function() {
              //   alert("Socket发生了错误");
              //   //此时可以尝试刷新页面
              // }
              //离开页面时，关闭socket
              //jquery1.8中已经被废弃，3.0中已经移除
              // $(window).unload(function(){
              //   socket.close();
              //});
            }
          },
          //打开
          websocketOpen(){
            console.log("Socket 已打开");
            //this.websocket.send("这是来自客户端的消息" + location.href + new Date());
          },
          //消息 数据接收
          websocketMessage(msg){
            console.log(msg.data);
            //发现消息进入  开始处理前端触发逻辑
          },
          //发送数据
          websocketSendData(){
            // this.websocket.send("这是来自客户端的消息" + location.href + new Date()+Math.random());
            this.websocket.send("客户端:"+this.$fn.dateFormat(new Date())+" "+ this.message);
          },
          //链接错误
          websocketError(e){
            alert("Socket发生了错误");
            //重连
            //this.initWebsocket()
          },
          //关闭连接
          websocketClose(e){
            console.log("Socket已关闭");
          }
        },
        destroyed(){
          //关闭链接
          this.websocketClose()
        }
    }
</script>

<style lang="scss" scoped>

</style>
