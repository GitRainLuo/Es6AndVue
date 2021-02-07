<template>
    <div>
      <template style="width: 100%">
        <div style="width: 100%;border-bottom: 1px dashed #ccc;padding: 2px 0">
          <span>账号:{{expandData.account}}</span>
          <span>姓名:{{expandData.name}}</span>
          <span>年龄:{{expandData.age}}</span>
        </div>
        <template v-for="item in expandData.info">
          <Row class="expand-row">
<!--            <div :style="{width:columnData['info']+'px'}">-->
<!--              <Col>-->
<!--                <span class="expand-key">职业:</span>-->
<!--                <span class="expand-value">{{item.job}}</span>-->
<!--              </Col>-->
<!--              <Col span="7">-->
<!--                <span>手机号码:</span>-->
<!--                <span>{{item.phone}}</span>-->
<!--              </Col>-->
<!--            </div>-->
            <Col span="4">
              <span class="expand-key">职业:</span>
              <span class="expand-value">{{item.job}}</span>
            </Col>
            <Col span="7">
              <span>手机号码:</span>
              <span>{{item.phone}}</span>
            </Col>
            <Col span="5">
              <span>薪水:</span>
              <span>￥{{item.salary}}</span>
            </Col>
            <Col span="3">
              <span>经验:</span>
              <span>{{item.experience}}年</span>
            </Col>
            <Col span="5">
              <span>擅长:</span>
              <span>{{item.goodness}}</span>
            </Col>
          </Row>
        </template>
      </template>
    </div>
</template>

<script>
    export default {
      name: "ExpandComp",
      props:{
        expandData:{
          type: Object,
          required: true,
          default:{}
        },
        columnData:{
          type: Object,
          required: true,
          default: {}
        }
      },
      data() {
          return {}
      },
      created() {
      },
      mounted() {
      },
      methods: {
      }
    }
</script>

<style lang="scss">
  td.ivu-table-expanded-cell{
    padding:10px;
  }
</style>
