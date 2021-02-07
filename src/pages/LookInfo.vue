<template>
  <div v-cloak>
    <Button @click="lookInfos">查看</Button>
    <Input v-model="userInfo.name"></Input>
    <p v-html="testHtml"></p>
    <Button @click="getVerificationCodeImg">获取验证码</Button>
    <img :src="verificationCodeImg"/>
    <ul id="cl">
      <li>1</li>
      <li>2</li>
      <li>3</li>
    </ul>
    <Input v-model="dynamicKey"/>
    <span>{{dynamicObj}}</span>
  </div>
</template>

<script>
  //引入mapState辅助函数
  import {mapState, mapGetters} from 'vuex'

  let dynamic = "dynamic"
  export default {
    name: "LookInfo",
    data() {
      return {
        //testHtml:"<span class='text-color'>这是测试v-html带class</span>",
        verificationCodeImg: "",
        dynamicKey: "dynamic",
        dynamicObj: {
          name: "Jone",
          [dynamic]: "aa"
        }
      }
    },
    created() {
      console.log("created")
    },
    mounted() {
      console.log("mounted")
      let cl = document.getElementById("cl")
      cl.addEventListener('click', function (e) {
        console.log(e.target)
        console.log(e.currentTarget)
      })
    },
    methods: {
      lookInfos() {
        // alert(JSON.stringify(this.$store.getters.getUserInfo))
        alert(JSON.stringify(this.userInfo))
      },
      getVerificationCodeImg() {
        // this.$Http.get("/document/verificationCode").then((data)=>{
        //   console.log(JSON.stringify(data))
        //   // this.verificationCodeImg = "data:image/png;base64," + data.verificationCodeImg;
        // })
        let code = "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"
        this.verificationCodeImg = "data:image/png;base64," + code;
      }
    },
    computed: {
      ...mapGetters(['getUserInfo']),
      ...mapState(['userInfo']),
      // ...mapState({
      //   userInfo :state =>state.userInfo
      // }),
      // userInfo(){
      //   //return this.$store.state.userInfo
      //   return this.$store.getters.getUserInfo
      // }
      testHtml() {
        console.log("computed")
        let htmlStr = `
            <span class="text-color">这是测试v-html带class,有颜色</span>
            <p>这个是一些内容</p>
            <h4>这是h4标签</h4>
            `
        return htmlStr
      }
    }
  }
</script>

<style lang="scss" scoped>
  /*scoped是应用当前组件 v-html渲染出来的内容可以理解是子组件的 并不能加上对应的属性*/
  /*方法1  scoped*/
  /*
  方法2 vue的深度作用选择器   希望 scoped 样式中的一个选择器能够作用得“更深”可以影响到子组件
  一般情况 在对应class 前加>>>  如>>> .class
  像sass这些不能正确解析>>> 则在class前加/deeep/ 如/deep/ .class
  */
  [v-cloak] {
    display: none;
  }

  /deep/ .text-color {
    color: #fc6700;
  }
</style>
