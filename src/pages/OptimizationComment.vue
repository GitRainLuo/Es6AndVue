<template>
  <div class="container">
    <!--评论内容展示-->
    <div class="comment-list">
      <h3>评论</h3>
      <p v-if="commentList.length==0" class="comment-empty">暂时还没有人发表过评论哦!要来抢个沙发吗,亲</p>
      <ul class="comment-container" v-if="commentList.length>0">
        <li v-for="(item,index) in commentList" :key="item.id" class="comment-i">
          <!--左边个人信息-->
          <div class="comment-user-info">
            <div class="big-img-container">
              <img :src="'http://112.74.45.191/image/'+(index%9+1)+'.jpg'"/>
            </div>
            <div class="name-color">{{item.name}}</div>
            <div :style='{"color":item.levelColor}'>{{item.level}}</div>
          </div>
          <!--右边内容-->
          <div class="comment-content">
            <p style="padding: 5px 10px;font-size: 14px">{{item.content}}</p>
            <div class="comment-time">
              <span>{{item.time}}</span>
              <!--回复发布人-->
              <a href="javascript:;" @click="replyComment(index)" class="ml10">回复</a>
              <a v-if="item.children.length>0" href="javascript:;" @click="collapseComment(index)" class="ml10 show-comment">收起回复</a>
            </div>
            <!--子回复内容-->
            <ul class = "child-comment" v-if="item.children">
              <li v-for="(child,childIndex) in item.children" class="child-list" style="padding:5px 10px">
                <div class="comment-object-container">
                  <div class="small-img-container">
                    <img :src="'http://112.74.45.191/image/'+(childIndex%9+2)+'.jpg'"/>
                  </div>
                  <div class="comment-object">
                    <span class="name-color">{{child.name}}</span>
                    <span>&nbsp;对&nbsp;</span>
                    <span class="name-color">{{child.receiver}}</span>
                    <span>:</span>
                  </div>
                </div>
                <p>{{child.content}}</p>
                <div style="text-align: right">
                  <span>{{child.time}}</span>
                  <!--回复评论人-->
                  <a href="javascript:void(0);" @click="replyComment(index,childIndex)" class="ml10">回复</a>
                </div>
              </li>
            </ul>
            <div class="reply-container" v-show="showReply && curIndex == index">
              <Input v-model="reply" type="textarea" :rows="2" placeholder="输入回复内容" class="reply-content"/>
              <Button @click="submitReply(item,index)">发表</Button>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!--评论框-->
    <div class="comment">
      <h4>发表评论</h4>
      <Input v-model="comment" type="textarea" :rows="3" placeholder="随便说点什么吧!"/>
      <div class="button-group">
        <Button @click="resetComment">清空</Button>
        <Button @click="submitCommit">发表</Button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "OptimizationComment",
    data(){
      return{
        //评论内容
        comment:"",
        //评论列表
        commentList:[
          {
            id:1,
            name:"Jack",
            content:"我就是来抢个沙发的!",
            time:this.$fn.dateFormat(new Date("2019-06-19T14:21:00")),
            // level:"荣耀大师",
            level:randomLevel(),
            levelColor:randomColor(),
            children:[
              {
                id:1,
                name:"Tom",
                receiver:"Jack",
                content: "厉害厉害",
                time:this.$fn.dateFormat(new Date(2019 ,5 ,19 ,14 ,38 , 20)),
              },
              {
                id:2,
                name:"Lily",
                receiver:"Jack",
                content: "二货",
                time:this.$fn.dateFormat(new Date("2019-06-19T18:45:30")),
              }
            ]
          },
          {
            id:2,
            name:"Petter",
            content:"我来打酱油的",
            time:this.$fn.dateFormat(new Date("Jun 19,2019 15:03:21")),
            // level:"菜鸟",
            level:randomLevel(),
            levelColor:randomColor(),
            children:[]
          },
          {
            id:3,
            name:randomName(),
            content:'你再说一句你🐴',
            time:this.$fn.dateFormat(new Date("Jun 20,2019 15:03:21")),
            // level:"绝顶高手",
            level:randomLevel(),
            levelColor:randomColor(),
            children:[]
          }
        ],
        //是否回复的是其他人
        others:false,
        //回复输入框显示
        showReply:false,
        //回复内容
        reply:"",
        //当前index 父回复(发表人数组)
        curIndex:-1,
        //当前子index 子回复
        targetIndex:-1,
        //提示 回复的是谁
        tip:"",
        //是否收起回复
        collapse:false
      }
    },
    methods:{
      //发布评论
      submitCommit(){
        let name = randomName()
        let id = 1
        let comment = this.comment
        let time = this.$fn.dateFormat(new Date())
        let children = []
        let obj = {
          id:id,
          name:name,
          content:comment,
          time:time,
          children:children
        }
        this.commentList.push(obj)
        //清空
        this.comment = ""
      },
      //回复评论
      //index 发布的第index条评论
      //childIndex 点击的第childIndex条子评论
      replyComment(index,childIndex){
        //利用参数个数判断 是回复本人 还是回复评论的人
        //1 本人 2 评论的人
        //targetIndex -1 表示不是点击子评论里面的回复
        if(arguments.length === 2){
          this.targetIndex = childIndex
        }else {
          this.targetIndex = -1
        }
        // alert(this.targetIndex+"xxxxxxx")
        //this.reply = ""
        let receiver = this.targetIndex == -1 ? this.commentList[index].name :this.commentList[index].children[this.targetIndex].name
        this.tip = "回复"+receiver+":"
        this.reply = this.tip
        this.curIndex = index
        this.showReply = true
      },
      //提交回复评论
      submitReply(item,index){
        let content = this.reply.substring(this.tip.length)
        //let content = this.reply
        let id = Math.ceil(Math.random()*100)
        let name = randomName()
        //alert(JSON.stringify(this.commentList[index].children[this.targetIndex]))
        //let receiver = this.commentList[index].children[this.targetIndex].name
        //如果targetIndex 为-1 即点的是发表人后面的那个回复 是回复本人 this.commentList[index].name
        //如若不然就是回复评论里面评论人 得拿到点击的回复的对应的那个人 this.commentList[index].children[this.targetIndex].name
        let receiver = this.targetIndex == -1 ? this.commentList[index].name :this.commentList[index].children[this.targetIndex].name
        //alert(receiver)
        let time = this.$fn.dateFormat(new Date())
        let obj = {
          id:id,
          name:name,
          receiver:receiver,
          time:time,
          content:content
        }
        this.commentList[index].children.push(obj)
        this.showReply = false
        //提交把targetIndex 置回去
        this.targetIndex = -1
      },
      //清空输入内容
      resetComment(){
        this.comment = ""
      },
      //收起回复
      collapseComment(index){
        // this.collapse = !this.collapse
        //取到子评论 dom
        let aUl = document.querySelectorAll(".child-comment")
        this.collapse = !this.collapse
        //更换a标签的名字
        if(this.commentList[index].children.length>0){
          //取到负发布的 评论后面的a标签
          let aLi = document.querySelectorAll(".comment-i")
          let oA = aLi[index].querySelectorAll(".show-comment")[0]
          oA.innerText = this.collapse ? "展开回复" : "收起回复"
        }
        let showOrHide = this.collapse ? "none" : "block"
        aUl[index].style.display = showOrHide
      }
    },
    computed:{
      characterLevel:function () {
        let color = randomColor()
        return color
      }
    }
  }
  //随机生成姓名
  function randomName() {
    //姓氏arr
    let firstNameArr = ["赵", "钱", "孙", "李", "周", "吴", "郑", "王", "冯", "陈",
      "褚", "卫", "蒋", "沈", "韩", "杨", "朱", "秦", "尤", "许",
      "何", "吕", "施", "张", "孔", "曹", "严", "华", "金", "魏",
      "陶", "姜", "戚", "谢", "邹", "喻", "柏", "水", "窦", "章",
      "云", "苏", "潘", "葛", "奚", "范", "彭", "郎", "鲁", "韦",
      "昌", "马", "苗", "凤", "花", "方", "俞", "任", "袁", "柳",
      "酆", "鲍", "史", "唐", "费", "廉", "岑", "薛", "雷", "贺",
      "倪", "汤", "滕", "殷", "罗", "毕", "郝", "邬", "安", "常",
      "乐", "于", "时", "傅", "皮", "卞", "齐", "康", "伍", "余",
      "元", "卜", "顾", "孟", "平", "黄", "和", "穆", "萧", "尹",
      "公皙","南荣","东里","东宫","仲长","万俟","闻人","夏侯","子书",
      "子桑","即墨","达奚","褚师","吴铭欧阳","太史","端木","上官","司马",
      "东方","子车","亓官","司寇","巫马","东郭","南门","羊舌","微生","公西",
      "颛孙","壤驷","公良","漆雕","乐正","宰父","独孤","南宫","诸葛","尉迟","公羊",
      "赫连","澹台","皇甫","宗政","濮阳","公冶","太叔","申屠","公孙","段干","百里",
      "呼延","轩辕","令狐","公仪","梁丘","公户","公玉","慕容","仲孙","钟离","长孙",
      "宇文","司徒","鲜于","司空","闾丘","谷梁","拓跋","夹谷","公仲","公上","公门","公山",
      "公坚","左丘","公伯","西门","公祖","第五","公乘","贯丘"]
    //名arr
    let lastNameArr = ["子璇", "淼", "国栋", "夫子", "瑞堂", "甜", "敏", "尚", "国贤", "贺祥", "晨涛",
      "昊轩", "易轩", "益辰", "益帆", "益冉", "瑾春", "瑾昆", "春齐", "杨", "文昊",
      "东东", "雄霖", "浩晨", "熙涵", "溶溶", "冰枫", "欣欣", "宜豪", "欣慧", "建政",
      "美欣", "淑慧", "文轩", "文杰", "欣源", "忠林", "榕润", "欣汝", "慧嘉", "新建",
      "建林", "亦菲", "林", "冰洁", "佳欣", "涵涵", "禹辰", "淳美", "泽惠", "伟洋",
      "涵越", "润丽", "翔", "淑华", "晶莹", "凌晶", "苒溪", "雨涵", "嘉怡", "佳毅",
      "子辰", "佳琪", "紫轩", "瑞辰", "昕蕊", "萌", "明远", "欣宜", "泽远", "欣怡",
      "佳怡", "佳惠", "晨茜", "晨璐", "运昊", "汝鑫", "淑君", "晶滢", "润莎", "榕汕",
      "佳钰", "佳玉", "晓庆", "一鸣", "语晨", "添池", "添昊", "雨泽", "雅晗", "雅涵",
      "清妍", "诗悦", "嘉乐", "晨涵", "天赫", "玥傲", "佳昊", "天昊", "萌萌", "若萌"]
    let firstName = firstNameArr[Math.floor(Math.random()*(firstNameArr.length))]
    let lastName = lastNameArr[Math.floor(Math.random()*(lastNameArr.length))]
    return firstName+lastName
  }
  //随机生成颜色
  function randomColor(){
    let r = Math.floor(Math.random()*255)
    let g = Math.floor(Math.random()*200)
    let b = Math.floor(Math.random()*255)
    // let a = Math.random().toFixed(2)
    return 'rgba('+r+','+g+','+b+')'
  }
  //随机生成等级名称
  function randomLevel() {
    let levelArr = ["初学乍到","游学四方","有学而志","青年俊才","学长师友","初为人师","师者解惑",
      "为师有道","有智之士","智者达观","仁人明师","仁者无惑","仁者无敌","尊者淡泊","大智若愚",
      "圣心如水","归隐居士","千古圣人","MAX","炽天使","智天使","座天使","主天使","德天使","能天使",
      "力天使","权天使","大天使（天使长）","混沌战神","终极魔神","原初之混沌","混沌魔神","精神魔神",
      "空间魔神","魔神","远古武神","魔法魔神","血之始祖","吸血鬼帝王","吸血鬼亲王","吸血鬼公爵","吸血鬼侯爵",
      "吸血鬼伯爵","吸血鬼子爵","吸血鬼男爵","血之感染者"]
    let level = levelArr[Math.floor(Math.random()*(levelArr.length-1))]
    return level
  }
</script>

<style lang="scss" scoped>
  .container{
    width: 65%;
    margin: 10px auto;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 2px;
    /*评论列表*/
    .comment-list{
      /*标题*/
      h3{
        padding: 10px 0;
        text-align: center;
      }
      /*空的时候显示*/
      .comment-empty{
        padding: 10px 0;
        text-align: center;
      }
      .comment-container{
        list-style: none;
        text-align: left;
        /*评论*/
        .comment-i{
          min-height: 120px;
          /*发表评论的人*/
          .comment-user-info{
            display: inline-block;
            width: 15%;
            margin: 0 auto;
            border-right: 1px solid #ccc;
            border-color: rgba(204,204,204,.5);
            text-align: center;
            vertical-align: top;
            /*头像*/
            .big-img-container{
              width: 40px;
              height: 40px;
              margin: 10px auto
            }
          }
          /*发表的内容*/
          .comment-content{
            display: inline-block;
            width: 83%;
            padding-top: 10px;
            /*时间*/
            .comment-time{
              width: 95%;
              margin: 0 auto;
              padding: 5px 10px;
              text-align: right;
            }
          }
          /*子评论内容*/
          .child-comment{
            list-style: none;
            width: 95%;
            margin: 0 auto;
            text-align: left;
            background-color: rgba(247,248,250,1);
            /*子评论列表*/
            .child-list{
              padding: 6px 0;
              border-bottom: 1px solid rgba(139,69,19,.2);
              word-wrap: break-word;
              /*评论对象*/
              .comment-object-container{
                padding: 5px 0;
                /*评论对象头像*/
                .small-img-container{
                  display: inline-block;
                  width: 25px;
                  height: 25px;
                  vertical-align: middle
                }
                /*谁对谁说*/
                .comment-object{
                  display: inline-block;
                  margin-left: 10px;
                  vertical-align: middle;
                }
              }
            }
          }
          /*回复内容框*/
          .reply-container{
            width: 100%;
            margin: 8px auto;
            .reply-content{
              margin-left: 15px;
              width: 80%;
            }
          }
        }
        /*评论之间内边距*/
        .comment-i+.comment-i{
          padding: 10px 0 0 0;
        }
        /*姓名颜色*/
        .name-color{
          color: rgb(24,100,77);
        }
      }
    }
    /*发表评论框*/
    .comment{
      width: 100%;
      margin: 15px 0;
      border: 1px solid #ccc;
      border-radius: 5px;
      h4{
        padding: 10px 0;
        text-align: left;
        text-indent: 5px;
      }
      .ivu-input-wrapper{
        padding: 0 5px;
      }
      .button-group{
        padding: 5px;
        text-align: right;
      }
      .button-group Button:first-child{
        margin-right: 10px;
      }
    }
    .ml10{
      margin-left: 10px;
    }
    img{
      width: 100%;
      height: 100%;
    }
    .pt5{
      padding-top: 5px;
    }
    .pb5{
      padding-bottom: 5px;
    }
    .pl10{
      padding-left: 10px;
    }
    .pr10{
      padding-right: 10px;
    }
    .mt5{
      margin-top: 5px;
    }
    .mb5{
      margin-bottom: 5px;
    }
    .ml10{
      margin-left: 10px;
    }
    .mr10{
      margin-right: 10px;
    }

  }

</style>
