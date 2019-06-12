/**
 * @Auther: hmj
 * @Description:
 * @Date: 2019/5/27 14:54
 * @Version:1.0
 */
const fn = {}
fn.log = function () {
  //apply第一个参数 console使得this指向console
  //arguments  用于不确定参数
  console.log.apply(console,arguments)
}

fn.dateFormat = function (date,format = "yyyy-MM-dd hh:mm:ss") {
  let o = {
    'M+': date.getMonth() + 1,//月
    'd+': date.getDate(),//日
    'h+': date.getHours(),//时
    'm+': date.getMinutes(),//分
    's+': date.getSeconds(),//秒
    'q+': Math.floor((date.getMonth()+3)/3),//季度
    'S+': date.getMilliseconds()//毫秒
  }
  //年  分组
  if(/(y+)/.test(format)){
    //确保年的位数正确 yy 2位  yyyy4位
    format = format.replace(RegExp.$1,(date.getFullYear()+'').substring(4 - RegExp.$1.length))
  }
  for (let i in o){
    if(new RegExp('('+i+')').test(format)){
      // console.log(RegExp.$1,i)
      format = format.replace(RegExp.$1,RegExp.$1.length == 1 ? o[i] : ('00' + o[i]).substring((''+o[i]).length))
    }
  }
  return format
}
export default fn
