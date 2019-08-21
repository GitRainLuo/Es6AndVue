<template>
  <div class="main">
    <div class="container">
      <div class="col-md-9 rightBox" id="comment">
        <commemt-content v-bind:comment="comment" v-on:change="changCommmer"></commemt-content>
        <comment-textarea v-bind:type="type" v-bind:name="oldComment" v-on:submit="addComment"
                          v-on:canel="canelCommit"></comment-textarea>
      </div>
      <Button @click="look">查看</Button>
    </div>
  </div>
</template>

<script>
    import Vue from 'vue'
    Vue.component('commemt-content', {
      template: `
     <div class="commentBox">
        <p v-if="comment.length==0">暂无评论，我来发表第一篇评论！</p>
        <div v-else>
           <div class="comment weui-comment-item" style="padding-left: 65px;" v-for="(item,index) in comment" v-bind:index="index" >
              <div class="weui-comment-li follow_click dynamic">
                <img style="width: 25px;height: 25px"class="follow_zan "src=""alt="">
              </div>
              <div class="userinfo">
                 <strong class="nickname">{{item.name}}</strong>
                 <img class="avatar"style="width: 50px;height: 50px;border-radius:50px;border: 1px solid #999999"src="">
              </div>
            <span class="time" style="padding-top: 0.625em;font-size: 14px">{{item.time}}</span>
            <span style="margin-left: 5px;font-size: 14px" class="follow_clickcolor" @click="changeCommenter(reply.responder,index)">回复</span>
            <div class="comment" @click="changeCommenter(item.name,index)">{{item.content}}</div>
              <div v-if="item.reply.length > 0">
                  <div class="comment-list reply" v-for="reply in item.reply">
                      <div class="comment" user="self">
                          <div class="comment-right">
                             <div class="comment-text">
                               <span class="user">{{reply.responder}}<span style="color: #333333">回复</span>{{reply.reviewers}}:</span>
                               <span @click="changeCommenter(reply.responder,index)" style="color: #333333">{{reply.content}}</span>
                             </div>
                          </div>
                      </div>
                  </div>
              </div>
            </div>
           </div>
        </div>
     </div>`,
      props: ['comment'],
      methods: {
        changeCommenter: function (name, index) {
          this.$emit("change", name, index);
        }
      }
    });

    Vue.component('commentTextarea', {
      template: `
   <div class="commentBox">

       <div class="comment_input" style="background-color: #FFFFFF">
       <b v-if="type">你回复&nbsp;{{name}}</b>
        <input type="text" v-model="commentText" placeholder="请输入你想说的话...">
        <button class="btn" style="margin-bottom: 0"  @click="addComment">发送</button>
        </div>
   </div>`,
      props: ['type', 'name'],
      data: function () {
        return {commentText: ""}
      },
      methods: {
        addComment: function () {
          this.$emit("submit", this.commentText);
          this.commentText = "";
        },
        canelComment: function () {
          this.$emit("canel");
          this.commentText = "";
        }
      }
    });
    export default {
        name: "testComment",
        data(){
          return{
            commenter: "session",   //评论人
            type: 0,                //0为评论作者1为评论别人的评论2为评论别人的别人
            oldComment: null,
            chosedIndex: -1,        //被选中的评论的index

            comment: [
              {
                name: "有毒的黄同学",
                time: "2016-08-17",
                content: "好,讲得非常好，good",
                reply: [
                  {
                    responder: "有毒的黄同学",
                    reviewers: "傲娇的",
                    time: "2016-09-05",
                    content: "你说得对"
                  },
                  {
                    responder: "傲娇的",
                    reviewers: "有毒的黄同学",
                    time: "2016-09-05",
                    content: "很强"
                  }
                ]
              },
              {
                name: "Freedom小黄",
                time: "2016-08-17",
                content: "好,讲得非常好，good",
                reply: []
              }
            ]
          }
        },
        methods: {
          look(){
            console.log(this.comment)
          },
          addComment: function (data) {
            alert(this.type)
            if (this.type == 0) {
              this.comment.push({
                name: 'session',
                time: getTime(),
                content: data,
                reply: []
              });
              //服务器端变
            } else if (this.type == 1) {
              this.comment[this.chosedIndex].reply.push({
                responder: 'session',
                reviewers: this.comment[this.chosedIndex].name,
                time: getTime(),
                content: data
              });
              this.type = 0;
            }
          },
          changCommmer: function (name, index) {
            this.oldComment = name;
            this.chosedIndex = index;
            this.type = 1;
          },
          canelCommit: function () {
            this.type = 0;
          }
        }
    }
    function getTime() {
      let now = new Date();
      let year = now.getFullYear();
      let month = now.getMonth() + 1;
      let day = now.getDate();
      month.length < 2 ? "0" + month : month;
      day.length < 2 ? "0" + day : day;
      return year + "-" + month + "-" + day;
    }
</script>

<style lang="scss" scoped>
  * {
    padding: 0;
    margin: 0;
  }
  .comment_input {
    padding: 10px 15px;
    text-align: center;
    background-color: #ededed;
    border-top: solid 1px #e1e1e1;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .comment_input input {
    width: 70%;
    height: 30px;
    border: 1px solid rgba(102, 102, 102, 0.8);
    border-radius: 30px;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 0 10px;
  }

  .comment_input p {
    padding: 5px 10px;
    color: #fc6700;
    line-height: 30px;
    display: inline-block;
  }

  .follow_clickcolor:not(.weui_btn_disabled):active {
    background-color: #e1e1e1;
  }

  /*回复*/
  .good a {
    float: right;
    color: #808080;
  }
  .comment:after {
    clear: both;
    content: '';
    display: block;
    width: 0;
    height: 0;
    visibility: hidden;
  }
  .comment {
    *zoom: 1;
    padding: 5px 0;
    border-top: 1px solid #eee;
  }



  .comment-left img {
    width: 30px;
    height: 30px;
  }

  .comment-right {
    float: left;
    width: 100%;
  }

  .comment-text {
    line-height: 18px;
  }

  .comment-text span {
    color: #eb7350;
  }
</style>
