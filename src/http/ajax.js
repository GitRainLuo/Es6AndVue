/**
 * @Auther: hmj
 * @Description:
 * @Date: 2020/3/31 11:00
 * @Version:1.0
 */
let xhr = null
//判断浏览器是否支持XMLHttpRequest IE5 6不支持
//ie5 6 使用ActiveXObject
xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP")
let methodType = "GET"
let url = ""
//是否异步 默认 true
let isAsync = true
xhr.open(methodType,url,isAsync)
//post 的时候传递的data
let data = null
//send前 可以设置请求头 post
xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8")
xhr.send(data)

//监听状态的变化   0:未初始化 1:(未发送)调用open 2:(已获取响应头)调用send 3:(交互)正在下载响应体 4:处理完成
xhr.onreadystatechange = function () {
  //成功 200
  if(xhr.readyState == 4 && xhr.status == 200){
    let res = ""
    //返回的
    res = xhr.responseText
  }
}
