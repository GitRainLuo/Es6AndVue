<template>
  <div class="count-wrapper">
    <div>
      <v-count-to prefix="￥" :startVal='0' :endVal='1000' :duration='1000'></v-count-to>
    </div>
    <div>
      ￥<v-count-to :startVal='0' :endVal='100000' :duration='2000'></v-count-to>
    </div>
    <div>
      <!--不要分隔符-->
      <v-count-to prefix="￥" :startVal='0' :endVal='2000000' :duration='1000' separator=""></v-count-to>
    </div>
    <div class="numbers-wrapper">
      <ul class="numbers-container">
        <li class="numbers" v-for="(item,index) in numberList">
          <v-count-to :startVal="0" :endVal="+item" :duration='2000' separator=""></v-count-to>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    import VCountTo from 'vue-count-to';
    export default {
        name: "CountTo",
        components: { VCountTo },
        data() {
            return {
              countNumber: 3456789,
              numberList: []
            }
        },
        created() {
        },
        mounted() {
          if (this.countNumber) {
            this.numberList = this.countNumber.toString().split("")
          }
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
.count-wrapper{
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  padding: 0 20px;
  font-size: 20px;
  .numbers-wrapper{
    margin:  0 auto;
    width: 400px;
    height: 70px;
    background-color: #0C132B;
    border: 1px solid #2d8cf0;
    .numbers-container{
      display: flex;
      list-style: none;
      box-sizing: border-box;
      width: 90%;
      height: 100%;
      margin: 0 auto;
      padding: 10px 0;
      justify-content: space-between;
      align-items: center;
      /*&:after{*/
      /*  content: "";*/
      /*  display: block;*/
      /*  visibility: hidden;*/
      /*  width: 0;*/
      /*  height: 0;*/
      /*  clear: both;*/
      /*}*/
      /*.numbers{*/
      /*  float: left;*/
      /*  width: 10%;*/
      /*  height: 50px;*/
      /*  line-height: 50px;*/
      /*  text-align: center;*/
      /*  background-color: #2866EA;*/
      /*  &+.numbers{*/
      /*    margin-left: 10px;*/
      /*  }*/
      /*}*/
      .numbers{
        width: 10%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: #ffffff;
        background-color: #2866EA;
        border-radius: 5px;
      }
    }
  }
}
</style>
