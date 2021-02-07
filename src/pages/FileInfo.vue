<template>
    <!--文件操作-->
    <div>
      <a style="position: relative;display: block;width: 100px;height: 30px;margin: 0 auto">选择文件
        <input type="file" id="file" multiple @change="uploadFile($event)" style="position:absolute;width: 100px;height: 30px;left: 0;top: 0;opacity: 0;z-index: 10"/>
      </a>
      <!--<button @click="uploadFile">上传</button>-->
      <div class="fileContainer">
        <ul>
          <li v-for="(item,index) in fileList">
            <span>{{item.name}}</span>
            <span @click="delFile(index)">删除</span>
            <span>下载</span>
          </li>
        </ul>
      </div>
      <!--<div id="txt">这里是内容</div>-->
      <button @click="upload">上传</button>
      <input type="file" id="imgMsg">
      <button id="privateImg" @click="sendImage">发送图片</button>
    </div>
</template>

<script>
    export default{
        name:"FileInfo",
        data () {
            return {
              fileList:[],
            }
        },
        methods:{
            sendImage(){
              let input = document.getElementById("imgMsg")
              console.log(input,898878)
            },
            uploadFile(event){
              console.log(event.target.files[0], 7788)
                let _this = this
                let file = document.querySelector("input")
                let oDiv = document.getElementById("txt")
                //files是一个fileList
                console.log(file.files,file)
              console.log("图片上传")
                if(file.files.length>0){
                  let fileInfo = file.files[0]
                  //fileInfo包含有 name size  type
                  console.log(fileInfo, 'file')
                  let reader = new FileReader()
                  //reader的onload 处理文件的load事件  在文件读取操作完成触发
                  //onloadstart 读取操作开始
                  //onloadend 读取操作结束
                  //onprogress 读取blob触发
                  reader.onload = function (ev) {
                      _this.fileList.push(fileInfo)
                      console.log(_this.fileList, 666)
                      console.log(ev.target, 'ev.target')
//                    let _this = this
//                    let param = new FormData()
//                    param.append("name","xx")
//                    param.append("file",fileInfo)
//                    console.log(param.get("file"),666666)
//                    let xhr = new XMLHttpRequest()
//                    xhr.open("post","http://127.0.0.1:443/file/uploadFiles")
////                xhr.setRequestHeader("Content-Type","multipart/form-data")
//                    xhr.onload = function (res) {
//                      console.log(res,777)
//                    }
//                    xhr.send(param)
//                      let result = event.target.result
//                      oDiv.innerHTML = typeof result == "Object" ? JSON.stringify(result) : result
                  }
                  // readAsText() 返回读取的内容  result属性中将包含一个字符串以表示所读取的文件内容。
                  // reader.readAsText(fileInfo,'UTF-8')
                  //readAsArrayBuffer() 读取指定的 Blob中的内容, 一旦完成, result 属性中保存的将是被读取文件的 ArrayBuffer 数据对象
                  //reader.readAsArrayBuffer(fileInfo)
                  //readAsBinaryString() 开始读取指定的Blob中的内容。一旦完成，result属性中将包含所读取文件的原始二进制数据
                  //reader.readAsBinaryString(fileInfo)
                  //readAsDataURL() 一旦完成，result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容。
                  //reader.readAsDataURL(fileInfo)
                  //reader.readAsDataURL(event.target.files[0])  //将文件读取为 DataURL,也就是base64编码
                  // reader.readAsArrayBuffer(event.target.files[0])
                  reader.readAsText(event.target.files[0], 'utf-8')
                  console.log(reader, 'fileReader')
                }else {
                    this.$Message.warning("请选择文件!")
                }
            },
            delFile(index){
                this.fileList.splice(index,1)
            },
//            upload(){
//                let _this = this
//                let param = new FormData()
//                _this.fileList.forEach(item=>param.append("file",item))
////                param.append("file",_this.fileList[0])
//                //console.log(param.getAll("file"),7788)
//                let xhr = new XMLHttpRequest()
//                xhr.open("post","http://127.0.0.1:443/file/uploadFiles")
//                //xhr.open("post","http://112.74.45.191:8081/file/uploadFiles")
////                xhr.setRequestHeader("Content-Type","multipart/form-data")
//                xhr.onload = function (res) {
//                  console.log(res,777)
//                  console.log(res.currentTarget.responseText,66666)
//                }
//                xhr.send(param)
//            },
            upload(){
              let param = new FormData()
              this.fileList.forEach(item=>param.append("file",item))
  //                param.append("file",_this.fileList[0])
              //console.log(param.getAll("file"),7788)
              this.$Http.post("/file/uploadFiles",param).then((res)=>{
                  console.log(res)
              })
            }
        }
    }
</script>

<style lang="scss" scoped>
.fileContainer{
  width: 80%;
  margin: 0 auto;
  ul{
    list-style: none;
  }
}
</style>
