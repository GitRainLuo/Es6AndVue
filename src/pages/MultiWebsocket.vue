<template>
    <div>
      <Row>
        <Col span="11">
          <Button @click="createSocket(0,12)">创建连接</Button>
          <Input placeholder="请输入点东西" v-model="socketInput[0]" style="width: 200px"/>
          <Button @click="sendMessage(0)">发送消息</Button>
          <Input type="textarea" v-model="serviceMessage[0]"/>
        </Col>
        <Col span="2">
          <div style="width: 100%;height: 1px;visibility: hidden"></div>
        </Col>
        <Col span="11">
          <Button @click="createSocket(1,13)">创建连接</Button>
          <Input placeholder="请输入点东西" v-model="socketInput[1]" style="width: 200px"/>
          <Button @click="sendMessage(1)">发送消息</Button>
          <Input type="textarea" v-model="serviceMessage[1]"/>
        </Col>
      </Row>
    </div>
</template>

<script>
    const socketUrl = 'ws://localhost:8082/websocket'
    export default {
        name: "MultiWebsocket",
        data() {
            return {
              socketInput:["",""],
              websocketList:[],
              serviceMessage:["",""]
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {
          //初始化websocket
          initWebsocket(index,sid){
            if(typeof(WebSocket) == "undefined") {
              console.log("您的浏览器不支持WebSocket")
              this.$Message.error("您的浏览器不支持WebSocket")
            }else {
              console.log("您的浏览器支持WebSocket")
              this.$Message.success("您的浏览器支持WebSocket")
              if(index > 0){
                if(!this.websocketList[index - 1]){
                  this.$Message.warn("请先连接第一个websocket!")
                  return
                }
              }
              this.websocketList[index] = new WebSocket(socketUrl+"/"+sid)
              this.websocketList[index].onopen = ()=>{
                //箭头函数 this指向实例
                this.websocketOpen(index)
              }
              this.websocketList[index].onmessage = (msg)=>{
                this.websocketMessage(msg,index)
              }
              this.websocketList[index].onerror = ()=>{
                this.websocketError(index)
              }
              this.websocketList[index].onclose = ()=>{
                this.websocketClose(index)
              }
            }
          },
          //onOpen
          websocketOpen(index){
            console.log("Socket"+index+"已打开");
          },
          //onMessage 服务器回来的消息
          websocketMessage(msg,index){
            console.log("我是第"+index+"个")
            console.log(msg.data)
            //拷贝一份
            let copyMessage = JSON.parse(JSON.stringify(this.serviceMessage))
            this.$set(this.serviceMessage,index,copyMessage[index]+"服务端:"+ msg.data)
            console.log(this.serviceMessage[index],8888)
          },
          //onError
          websocketError(){
            alert("Socket发生了错误")
          },
          //onClose
          websocketClose(index){
            console.log("Socket"+index+"已关闭")
          },
          createSocket(index,sid){
            this.initWebsocket(index,sid)
          },
          sendMessage(index){
            let message = this.socketInput[index]
            if(!message){
              this.$Message.warning("发送消息不能为空!")
              return
            }
            this.websocketList[index].send(message)
            //拷贝一份
            let copyMessage = JSON.parse(JSON.stringify(this.serviceMessage))
            console.log("我是:"+index)
            this.$set(this.serviceMessage,index,copyMessage[index]+"客户端:"+message)
          }
        }
    }
</script>

<style lang="scss" scoped>

</style>
