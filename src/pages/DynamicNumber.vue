<template>
  <div>
    <div v-for="item in dataList">
      <div class="dynamic column1" :data-old="item.oldNum" :data-new="item.newNum"></div>
    </div>
    <Button @click="getData">刷新数据</Button>
  </div>
</template>

<script>
    export default {
        name: "DynamicNumber",
        data() {
            return {
              oldData:[],
              newData:[
                {
                  id:0,
                  newNum:12
                },
                {
                  id:1,
                  newNum:103
                },
                {
                  id:2,
                  newNum:35
                },
                {
                  id:3,
                  newNum:63
                }
              ],
              dataList:[],
              firstCall:true,
              column1:[],
              dynamicColumn1:[],
              dynamicData:[],
              allColumnData:[]
            }
        },
        created() {
        },
        mounted() {
          // this.runAnimate()
          this.getData()
        },
        methods: {
          getData(){
            let randomIndex = Math.ceil(Math.random()*3)
            this.newData[randomIndex] = {
              newNum:Math.ceil(Math.random()*(100 - 30) + 30)
            }
            this.dataList = []
            for(let i = 0;i<this.newData.length;i++){
              // console.log(JSON.stringify(this.newData),"nnnn")
              let findFlag = false
              for (let j = 0; j < this.oldData.length; j++) {
                // console.log(JSON.stringify(this.oldData),"oooo")
                if(this.newData[i].id == this.oldData[j].id){
                  findFlag = true
                  this.dataList.push({id:this.newData[i].id,oldNum:this.oldData[j].newNum,newNum:this.newData[i].newNum})
                  break
                }
              }
              if(!findFlag){
                if(this.firstCall){
                  this.dataList.push({id:this.newData[i].id,oldNum:this.newData[i].newNum,newNum:this.newData[i].newNum})
                }else {
                  this.dataList.push({id:this.newData[i].id,oldNum:'0',newNum:'0'})
                }
              }
            }
            console.log(JSON.stringify(this.dataList))
            this.$nextTick(()=>{
              this.dynamicData = []
              this.allColumnData = []
              if(this.firstCall){
                this.runAnimate()
              }
              this.loopCallAll()
              this.firstCall = false
            })
            this.oldData = this.newData
          },
          runAnimate(){
            let aAnimates = document.querySelectorAll(".dynamic")
            let _this = this
            aAnimates.forEach((a)=>{
              // console.log("dataset:"+a.dataset.new)
              _this.numberAnimate({num:a.dataset.new, speed:4000},a)
              //old和new不相同
              if(a.dataset.old != a.dataset.new){
                // console.log(JSON.stringify(a.classList),a.classList.contains("column1"))
                if(a.classList.contains("column1")){
                  _this.dynamicColumn1.push(a)
                }
              }
              if(a.classList.contains("column1")){
                _this.column1.push(a)
              }
            })
            this.dynamicData = _this.dynamicColumn1
            this.allColumnData = _this.column1
          },
          numberAnimate(settings,$this){
            // console.log($this,"cur")
            let defaults = {
              speed : 1000,//动画速度
              num : "", //初始化值
              iniAnimate : true, //是否要初始化动画效果
              symbol : '',//默认的分割符号，千，万，千万
              dot : 0 //保留几位小数点
            }
            let setting = Object.assign({},defaults,settings)
            // console.log("配置:"+JSON.stringify(setting))
            if(setting.num == ""){
              alert("must set a num!");
              return;
            }
            let nHtml = `<div class="mt-number-animate-dom" data-num="{{num}}">
              <span class="mt-number-animate-span">0</span>
              <span class="mt-number-animate-span">1</span>
              <span class="mt-number-animate-span">2</span>
              <span class="mt-number-animate-span">3</span>
              <span class="mt-number-animate-span">4</span>
              <span class="mt-number-animate-span">5</span>
              <span class="mt-number-animate-span">6</span>
              <span class="mt-number-animate-span">7</span>
              <span class="mt-number-animate-span">8</span>
              <span class="mt-number-animate-span">9</span>
              <span class="mt-number-animate-span">.</span>
            </div>`
            //数字处理
            let numToArr = function(num){
              let arrStr = []
              num = parseFloat(num).toFixed(setting.dot);
              if(typeof(num) == 'number'){
                arrStr = num.toString().split("");
              }else{
                arrStr = num.split("");
              }
              // console.log(arrStr,"数字数组");
              return arrStr;
            }

            //设置DOM symbol:分割符号
            let setNumDom = function(arrStr){
              let shtml = '<div class="mt-number-animate">';
              for(let i=0,len=arrStr.length; i<len; i++){
                if(i != 0 && (len-i)%3 == 0 && setting.symbol != "" && arrStr[i]!="."){
                  shtml += '<div class="mt-number-animate-dot">'+setting.symbol+'</div>'+nHtml.replace("{{num}}",arrStr[i]);
                }else{
                  shtml += nHtml.replace("{{num}}",arrStr[i]);
                }
              }
              shtml += '</div>';
              return shtml;
            }
            //执行动画
            let runAnimate = function ($this) {
              let dom = $this.querySelectorAll(".mt-number-animate-dom")
              console.log(dom,"ddddom")
              dom.forEach((d)=>{
                let num =d.getAttribute("data-num");
                // console.log("num:"+num)
                // console.log(d,"dddddddd")
                num = (num=="."?10:num);
                let spanHei = d.clientHeight/11; //11为元素个数
                let thisTop = -num*spanHei+"px";
                if(thisTop != d.style.top){
                  if(setting.iniAnimate){
                    //HTML5不支持
                    if(!window.applicationCache){
                      // $(this).animate({
                      //   top : thisTop
                      // }, setting.speed);
                    }else{
                      // $(this).css({
                      //   'transform':'translateY('+thisTop+')',
                      //   '-ms-transform':'translateY('+thisTop+')',   /* IE 9 */
                      //   '-moz-transform':'translateY('+thisTop+')',  /* Firefox */
                      //   '-webkit-transform':'translateY('+thisTop+')', /* Safari 和 Chrome */
                      //   '-o-transform':'translateY('+thisTop+')',
                      //   '-ms-transition':setting.speed/1000+'s',
                      //   '-moz-transition':setting.speed/1000+'s',
                      //   '-webkit-transition':setting.speed/1000+'s',
                      //   '-o-transition':setting.speed/1000+'s',
                      //   'transition':setting.speed/1000+'s'
                      // });
                      d.style.transform = "translateY("+thisTop+")"
                      d.style.transition = setting.speed/1000+'s'
                    }
                  }else{
                    setting.iniAnimate = true;
                    // $(this).css({
                    //   top : thisTop
                    // });
                    d.style.transform = "translateY("+thisTop+")"
                    d.style.style.transition = setting.speed/1000+'s'
                  }
                }
              })
            }

            //初始化
            let init = function($this){
              //初始化
              $this.innerHTML = setNumDom(numToArr(setting.num))
              runAnimate($this);
            };
            init($this)
          },
          loopCallAll: function () {
            let self =this
            let dy = document.querySelectorAll(".dynamic")
            console.log(dy,"ddd")
            dy.classList.remove("dynamicTxt")
            if (this.dynamicData.length != 0) {
              let obj = self.dynamicData.shift()
              self.numberAnimate({num:obj.dataset.new, speed:3000},obj);
              obj.classList.add("dynamicTxt")
            }
          },
        }
    }
</script>

<style lang="scss">
  /*数字滚动插件的CSS可调整样式*/
  .mt-number-animate{ font-family: '微软雅黑'; line-height:25px; height: 25px;/*设置数字显示高度*/; font-size: 13px;/*设置数字大小*/ overflow: hidden; display: inline-block; position: relative; }
  .mt-number-animate .mt-number-animate-dot{ width: 15px;/*设置分割符宽度*/ line-height: 40px; float: left; text-align: center;}
  .mt-number-animate .mt-number-animate-dom{ width: 8px;/*设置单个数字宽度*/ text-align: right; float: left; position: relative; top: 0;}
  .mt-number-animate .mt-number-animate-dom .mt-number-animate-span{ width: 100%; float: left;}
  .dynamicTxt {
    color:chartreuse;
    font-weight:bold;
    font-size: 16px
  }
</style>
