<template>
    <div>
      <div>{{cd}}</div>
      <marquee width=400 scrollamount=8 direction="left" hspace=20 vspace=20>
        <a href=http://www.taobaojp5.tk><FONT face=楷体_GB2312 color=#ff0000 size=3><STRONG>带有超链接的跑马灯!点我试试？</STRONG></FONT></a>　
        <a href=http://954872988.qzone.qq.com><FONT face=楷体_GB2312 color=#ff0000 size=3><STRONG>还有一条呢!点我试试?</STRONG></FONT></a>
      </marquee>
    </div>
</template>

<script>
  // created>computed>mounted>watch
    export default {
        name: "LifeCircle",
        data(){
          return{
            test:"1"
          }
        },
        created() {
          //alert("created:"+this.test)
        },
        mounted() {
          //alert("mounted:"+this.test)
        },
        computed:{
          cd(){
            //alert("computed")
            this.test = "fff"
            return this.test
          }
        },
        watch:{
          test(val,old){
            //alert("watch:"+val)
          }
        }
    }
</script>

<style lang="scss" scoped>

</style>
