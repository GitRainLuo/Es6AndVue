<template>
    <!--反馈评星-->
    <div class="container">
      <div class="feedback-container">
        <h4>反馈意见</h4>
        <Input type="textarea" :rows="3" placeholder="说说你的意见吧!" class="feedback" v-model="feedData.feedBack"/>
        <div class="rate">
          <Rate v-model="feedData.rate"></Rate>
        </div>
        <Button class="button" @click="submitFeedBack">提交</Button>
      </div>
    </div>
</template>

<script>
    export default {
        name: "FeedBackAndRate",
        data(){
          return{
            feedData:{
              feedBack:"",
              rate:0
            }
          }
        },
        methods:{
          //提交
          submitFeedBack(){
            alert("你提交的是:"+JSON.stringify(this.feedData))
          }
        }
    }
</script>

<style lang="scss" scoped>
.container{
  width: 50%;
  margin: 10px auto;
  border: 1px solid #ccc;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  .feedback-container{
    width: 70%;
    h4{
      padding: 10px;
      text-indent: 2px;
      text-align: left;
    }
    .feedback{
      width: 100%;
      padding-left: 10px;
    }
    .rate{
      padding: 5px 0;
    }
    .button{
      margin: 5px 0;
    }
  }
}
</style>
