<template>
    <div class="container">
      <!--评论内容展示-->
      <div class="comment-list">
        <h3>评论列表</h3>
        <p v-if="commentList.length==0" class="comment-empty">暂时还没有人发表过评论哦!要来抢个沙发吗,亲</p>
        <ul class="comment-container" v-if="commentList.length>0">
          <li v-for="(item,index) in commentList" :key="item.id" class="comment-i">
            <span class="name-color">{{item.name}}:</span>
            <span>{{item.content}}</span>
            <span class="ml10">{{item.time}}</span>
            <!--回复发布人-->
            <a href="javascript:;" @click="replyComment(index)" class="ml10">回复</a>
            <ul class = "child-comment" v-if="item.children">
              <li v-for="(child,childIndex) in item.children" class="child-list">
<!--                <span v-if="others">-->
<!--                  &lt;!&ndash;回复其他人&ndash;&gt;-->
<!--                  <span class="name-color">{{child.name}}</span>&nbsp;对<span class="name-color">{{item.children[i].name}}</span>&nbsp;:-->
<!--                </span>-->
<!--                <span v-else>-->
<!--                  &lt;!&ndash;回复发表人&ndash;&gt;-->
<!--                  <span class="name-color">{{child.name}}</span>&nbsp;对<span class="name-color">{{item.name}}</span>&nbsp;:-->
<!--                </span>-->
<!--                <span v-if="targetIndex == -1">-->
<!--                  <span class="name-color">{{child.name}}</span>&nbsp;对<span class="name-color">{{item.name}}</span>&nbsp;:-->
<!--                </span>-->
<!--                <span v-else>-->
                  <span class="name-color">{{child.name}}</span>&nbsp;对<span class="name-color">{{child.receiver}}</span>&nbsp;:
<!--                </span>-->
                <span>{{child.content}}</span>
                <span class="ml10">{{child.time}}</span>
                <!--回复评论人-->
                <a href="javascript:void(0);" @click="replyComment(index,childIndex)" class="ml10">回复</a>
              </li>
            </ul>
            <div class="reply-container" v-show="showReply && curIndex == index">
              <Input v-model="reply" type="textarea" :rows="2" placeholder="输入回复内容" class="reply-content"/>
              <Button @click="submitReply(item,index)">发表</Button>
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
        name: "Comment",
        data(){
          return{
            //评论内容
            comment:"",
            //评论列表
            commentList:[
              {
                id:1,
                name:"Jack",
                content:"comment",
                time:this.$fn.dateFormat(new Date("2019-06-19T14:21:00")),
                children:[
                  {
                    id:1,
                    name:"Tom",
                    receiver:"Jack",
                    content: "ss",
                    time:this.$fn.dateFormat(new Date(2019 ,5 ,19 ,14 ,38 , 20)),
                  },
                  {
                    id:2,
                    name:"Lily",
                    receiver:"Jack",
                    content: "saasdw",
                    time:this.$fn.dateFormat(new Date("2019-06-19T18:45:30")),
                  }
                ]
              },
              {
                id:2,
                name:"Petter",
                content:"我来打酱油的",
                time:this.$fn.dateFormat(new Date("Jun 19,2019 15:03:21")),
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
            tip:""
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
          }
        },
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
</script>

<style lang="scss" scoped>
.container{
  width: 65%;
  margin: 10px auto;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 2px;
  .comment-list{
    h3{
      padding: 10px 0;
      text-align: center;
    }
    .comment-empty{
      padding: 10px 0;
      text-align: center;
    }
    .comment-container{
      list-style: none;
      text-align: left;
      .comment-i{
        .child-comment{
          list-style: none;
          margin-left: 15px;
          text-align: left;
          .child-list{
            padding: 6px 0;
            border-bottom: 1px solid rgba(139,69,19,.5);
            word-wrap: break-word;
          }
        }
        .reply-container{
          width: 100%;
          margin: 8px auto;
          .reply-content{
            margin-left: 15px;
            width: 80%;
          }
        }
      }
      .comment-i+.comment-i{
        padding: 10px 0 0 0;
      }
      .name-color{
        color: rgb(24,100,77);
      }
    }
  }
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
}

</style>
