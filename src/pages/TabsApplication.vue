<template>
    <div>
      <Tabs type="card" size="small">
        <TabPane v-for="item in tabList" :label="labels(item)" :key="item.code">{{item.name}}</TabPane>
      </Tabs>

      <Tabs type="card" size="small">
        <TabPane v-for="i in 20" :label="'标签'+i" :key="i"></TabPane>
      </Tabs>

    </div>
</template>

<script>
    export default {
        name: "TabsApplication",
        data(){
          return{
            tabList:[
              {
                code: "bq1",
                name: "标签1"
              },
              {
                code: "bq2",
                name: "标签2"
              },
              {
                code: "bq3",
                name: "标签3"
              }
            ],
            labels:(p)=>{
              return (h)=>{
                switch (p.code) {
                  case "bq1":
                    return h("div",
                      {
                        // props:{
                        //   icon: "logo-apple"
                        // },
                        on:{
                          click: ()=>{
                            alert(p.name)
                          }
                        }
                      }
                      ,p.name
                    )
                    break
                  case "bq2":
                    return h("div",
                      {
                        on:{
                          click: ()=>{
                            alert(p.name)
                          }
                        }
                      },
                      p.name
                    )
                    break
                  case "bq3":
                    return h("div",
                      {},
                      [
                        h("span",{},p.name),
                        h("Badge",{
                          props:{
                            count: 1000,
                            overflowCount:999,
                            // text: "hot",
                            className: "demo-badge-alone"
                          }
                        })
                    ]
                    )
                }
              }
            }
          }
        },
        mounted(){},
        computed:{},
        methods:{},
    }
</script>

<style lang="scss">
  .demo-badge-alone{
    background-color: #5cb85c !important;
  }
  .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab{
    margin-right: 3px;
    outline: none;
    border-radius: 13px 13px 0 0;
  }
</style>
