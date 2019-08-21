<template>
    <div>
      <Button @click="refreshResultData">笑话</Button>
      <Button @click="refreshResultData">观音灵签</Button>
      <Button @click="refreshResultData">月老灵签</Button>
      <Button @click="refreshResultData">财神爷灵签</Button>
      <Button @click="openModel($event,'cy')" data-code="cy" ref="cy">成语接龙</Button>
      <Button @click="openModel($event,'sjh')" data-code="sjh" ref="sjh">手机号码查询</Button>
      <Button @click="openModel($event,'sfz')" data-code="sfz" ref="sfz">身份证号码</Button>
      <Button @click="openModel($event,'tq')" data-code="tq" ref="tq">查询天气</Button>
      <template v-if="typeName == '笑话'">
        <div style="width: 90%;margin: 10px auto">
          <h2>{{resultData.title}}</h2>
          <div style="width: 100%;margin: 10px auto;text-align: left;text-indent: 32px;font-size: 16px">{{resultData.content}}</div>
        </div>
      </template>
      <template v-if="typeName == '观音灵签' || typeName == '月老灵签'|| typeName == '财神爷灵签'">
        <div style="width: 90%;margin: 10px auto;font-size: 16px">
          <h3>{{typeName}}</h3>
          <div style="width: 70%;margin: 0 auto;text-align: center">
            <div><span style="text-decoration: underline">签号:</span>{{resultData.number1}}</div>
            <div v-if="resultData.haohua"><span style="text-decoration: underline">签类:</span>{{resultData.haohua}}</div>
            <div><span style="text-decoration: underline">签语:</span>{{resultData.jieqian}}</div>
            <div v-if="resultData.zhushi"><span style="text-decoration: underline">注释:</span>{{resultData.zhushi}}</div>
            <div v-if="resultData.baihua"><span style="text-decoration: underline">释义:</span>{{resultData.baihua}}</div>
            <div v-if="resultData.jieshuo"><span style="text-decoration: underline">解说:</span>{{resultData.jieshuo}}</div>
            <div v-if="resultData.jieguo"><span style="text-decoration: underline">结果:</span>{{resultData.jieguo}}</div>
            <div v-if="resultData.hunyin"><span style="text-decoration: underline">婚姻:</span>{{resultData.hunyin}}</div>
            <div v-if="resultData.shiye"><span style="text-decoration: underline">事业:</span>{{resultData.shiye}}</div>
            <div v-if="resultData.gongming"><span style="text-decoration: underline">功名:</span>{{resultData.gongming}}</div>
            <div v-if="resultData.shiwu"><span style="text-decoration: underline">失物:</span>{{resultData.shiwu}}</div>
            <div v-if="resultData.cwyj"><span style="text-decoration: underline">出外移居:</span>{{resultData.cwyj}}</div>
            <div v-if="resultData.liujia"><span style="text-decoration: underline">六甲:</span>{{resultData.liujia}}</div>
            <div v-if="resultData.qiucai"><span style="text-decoration: underline">求财:</span>{{resultData.qiucai}}</div>
            <div v-if="resultData.jiaoyi"><span style="text-decoration: underline">交易:</span>{{resultData.jiaoyi}}</div>
            <div v-if="resultData.jibin"><span style="text-decoration: underline">疾病:</span>{{resultData.jibin}}</div>
            <div v-if="resultData.susong"><span style="text-decoration: underline">诉讼:</span>{{resultData.susong}}</div>
            <div v-if="resultData.yuntu"><span style="text-decoration: underline">运途:</span>{{resultData.yuntu}}</div>
            <div v-if="resultData.moushi"><span style="text-decoration: underline">谋事:</span>{{resultData.moushi}}</div>
            <div v-if="resultData.hhzsy"><span style="text-decoration: underline">合伙做生意:</span>{{resultData.hhzsy}}</div>
          </div>
        </div>
      </template>
      <!--mask-closable 禁用点击遮罩层关闭-->
      <Modal :title="modalTitle" v-model="showModal" :style="{top: '20px'}" :mask-closable="false">
        <div>
          <Input v-if="inputNumberLimit" v-model="searchData" :placeholder="placeholder" style="width: 70%" v-number-only :maxlength="maxlength"/>
          <Input v-else v-model="searchData" :placeholder="placeholder" style="width: 70%" />
          <Button @click="searchInfoData">查询</Button>
        </div>
        <div style="margin: 10px auto">
          <Input type="textarea" :autosize="{minRows:1}" readonly v-model="searchResult" style="width: 70%;"/>
        </div>
        <div slot="footer">
          <Button @click="closeModal">关闭</Button>
        </div>
      </Modal>
    </div>
</template>

<script>
    import Vue from 'vue'
    Vue.directive("number-only",{
      bind:function (el) {
        el.handler = function (e) {
          let input = null
          if(el.tagName == "INPUT"){
            input = el
          }else{
            input = document.getElementsByTagName("input")[0] || document.getElementsByTagName("textarea")[0]
          }
          let reg = /[^0-9]+/
          input.value = input.value.replace(reg,"")
        }
        el.addEventListener("input",el.handler,true)
      },
      unbind:function (el) {
        let input = el.tagName == "INPUT" ? el : el.getElementsByTagName("input")[0] || el.getElementsByTagName("textarea")[0]
        el.removeEventListener("input",el.handler,true)
      }
    })
    // Vue.directive("chinese-only",{
    //   bind:function (el) {
    //     el.handler = function (e) {
    //       let input = el.tagName == "INPUT" ? el : el.getElementsByTagName("input")[0] || el.getElementByTagName("textarea")[0]
    //       let reg = /[^a-z\u4e00-\u9fa5]+/
    //       input.value = input.value.replace(reg,"")
    //     }
    //     el.addEventListener("input",el.handler,true)
    //   },
    //   unbind:function (el) {
    //     let input = el.tagName == "INPUT" ? el : el.getElementsByTagName("input")[0] || el.getElementByTagName("textarea")[0]
    //     el.removeEventListener("input",el.handler,true)
    //   }
    // })
    // const validateInput = function (name,reg) {
    //   Vue.directive(name,{
    //     bind:function (el) {
    //       el.handler = function (e) {
    //         let input = el.tagName == "INPUT" ? el : el.getElementsByTagName("input")[0] || el.getElementsByTagName("textarea")[0]
    //         input.value = input.value.replace(reg,"")
    //       }
    //       el.addEventListener("input",el.handler,true)
    //     },
    //     unbind:function (el) {
    //       let input = el.tagName == "INPUT" ? el : el.getElementsByTagName("input")[0] || el.getElementsByTagName("textarea")[0]
    //       el.removeEventListener("input",el.handler,true)
    //     }
    //   })
    // }
    // const numberOnly = validateInput("number-only",/[^0-9]+/)
    // const chineseLetterOnly = validateInput("chinese-letter-only",/[^a-z\u4e00-\u9fa5]/)
    export default {
        name: "RobotApi",
        data(){
          return{
            //接口返回数据
            resultData:{},
            //选择的type
            typeName:"笑话",
            //是否打开对话框
            showModal:false,
            //对话框title
            modalTitle:"",
            //输入查询数据
            searchData:"",
            //@后面跟的参数 成语接龙 手机号码 身份证用
            searchFlag:"",
            //查询返回结果
            searchResult:"",
            //input占位符
            placeholder:"",
            //限制只能输入数字
            inputNumberLimit:false,
            maxlength:100
          }
        },
        mounted() {
          this.refreshResultData()
        },
        methods:{
          refreshResultData(e){
            let _this = this
            if(e){
              _this.typeName = e.target.innerText
            }
            let xhr = null
            if(window.XMLHttpRequest){
              xhr = new XMLHttpRequest()
            }else {
              xhr = new ActiveXObject("Microsoft.XMLHTTP")
            }
            xhr.open("get","http://i.itpk.cn/api.php?question="+_this.typeName)
            // xhr.onreadystatechange = function(){
            //   console.log(xhr.status+"--"+xhr.readyState,87654)
            //   if(xhr.status == 200 && xhr.readyState == 4){
            //     console.log(xhr.responseText,6666)
            //   }
            // }
            //onload 是在readyState == 4是才会调用一次
            xhr.onload = function (res) {
              //console.log(xhr.readyState,"onload")
              let response = xhr.responseText
              // console.log(response)
              let jsonTxt = JSON.parse(_this.decodeUnicode(response).replace(/rn/g,"").replace(/&.+;/g,""))
              // switch (_this.typeName) {
              //   case "笑话":
              //     _this.resultData = jsonTxt
              //     break
              //   case "观音灵签":
              //     _this.resultData = jsonTxt
              //     break
              //   case "月老灵签":
              //     _this.resultData = jsonTxt
              //     break
              // }
              _this.resultData = jsonTxt
            }
            xhr.send()
          },
          //将unicode转化为中文
          decodeUnicode(str){
            //斜杠替换成百分号
            str = str.replace(/\\/g,"%")
            //转换中文
            str = unescape(str)
            //将其他受影响的转换回来
            str = str.replace(/%/g,"\\")
            //对网页链接处理
            str = str.replace(/\\/g,"")
            return str
          },
          //加密
          encodeUnicode(str){
            let res = []
            for (let i = 0;i < str.length;i++){
              res[i] = ("00"+str.charCodeAt(i).toString(16)).slice(-4)
            }
            return "\\u"+res.join("\\u")
          },
          openModel(e,ref){
            console.log(e,77777)
            console.log(ref)
            //方法一
            console.log(this.$refs[ref].$el.dataset.code)
            //方法二
            // console.log(e.target.getAttribute("data-code"))
            if(e){
              this.modalTitle = e.target.innerText
              this.searchFlag = this.$refs[ref].$el.dataset.code
            }
            this.inputNumberLimit = false
            switch (this.searchFlag) {
              case "cy":
                this.placeholder = "请随便输入一个成语..."
                break
              case "sjh":
                this.placeholder = "请输入需要查询的手机号码..."
                this.inputNumberLimit = true
                this.maxlength = 11
                break
              case "sfz":
                this.placeholder = "请输入需要查询的身份证号码..."
                this.inputNumberLimit = true
                this.maxlength = 18
                break
              case "tq":
                this.placeholder = "请输入地区+天气查询天气..."
                break
              default:
                this.placeholder = ""
            }
            //清掉数据
            this.searchData = ""
            this.searchResult = ""
            this.showModal = true
          },
          //查询
          searchInfoData(){
            let _this = this
            let xhr = null
            if(window.XMLHttpRequest){
              xhr = new XMLHttpRequest()
            }else {
              xhr = new ActiveXObject("Microsoft.XMLHTTP")
            }
            let url = ""
            if(_this.searchFlag == 'tq'){
              url = "http://i.itpk.cn/api.php?question="+_this.searchData
            }else{
              url = "http://i.itpk.cn/api.php?question=@"+_this.searchFlag+_this.searchData
            }
            console.log(url)
            xhr.open("get",url)
            xhr.onload = function (res) {
              let response = xhr.responseText
              _this.searchResult = response
            }
            xhr.send()
          },
          //关闭modal
          closeModal(){
            this.showModal = false
            this.searchData = ""
            this.searchResult = ""
          }
        },
        watch:{
        }
    }
</script>

<style lang="scss">
.ivu-input::-webkit-input-placeholder{
  color: #D2691E;
}
</style>
