<template>
    <div>
      <div>
        <Row>
          <Col span="6">
            <Select @on-change="opChange" v-model="op">
              <Option v-for="op in opList" :key="op.code" :value="op.code">{{op.des}}</Option>
            </Select>
          </Col>
          <Col span="6" v-if="isShow">
            <Select  v-model="op1">
              <Option v-for="op1 in op1List" :key="op1.code" :value="op1.code">{{op1.des}}</Option>
            </Select>
          </Col>
          <Col span="6" v-else>
            <Select  v-model="op2" multiple>
              <Option v-for="op2 in op2List" :key="op2.code" :value="op2.code">{{op2.des}}</Option>
            </Select>
          </Col>
        </Row>
      </div>
      <div>
        <Button @click="collapseOrExpand">{{action}}</Button>
        <div ref="content" style="width: 100px;background-color: #fc6700;max-height: 0;overflow: hidden;height: auto">
          这是一段话
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "TestOne",
        data(){
          return{
            isShow:false,
            op:0,
            op1:"yellow",
            op2:[],
            opList:[
              {
                code:0,
                des:"否"
              },
              {
                code:1,
                des:"是"
              }
            ],
            op1List:[
              {
                code:"red",
                des:"红色"
              },
              {
                code:"yellow",
                des:"黄色"
              }
            ],
            op2List:[
              {
                code:"xx",
                des:"xx"
              },
              {
                code:"yy",
                des:"yy"
              }
            ],
            //折叠还是展开  false展开
            collapse:false,
            action:"收"
          }
        },
        mounted(){},
        methods:{
          opChange(val){
            if(val == 1){
              this.isShow = true
              this.op2 = []
            }else{
              this.isShow = false
            }
          },
          collapseOrExpand(){
            let oDiv = this.$refs.content
            this.collapse = !this.collapse
            this.action = this.collapse ? "展" : "收"
            //折叠
            if(this.collapse){
              oDiv.style.maxHeight = 0;
            }else {
              oDiv.style.maxHeight = 200+'px';
            }
            oDiv.style.transition = "all .5s ease"
          },
        }

    }
</script>

<style lang="scss" scoped>

</style>
