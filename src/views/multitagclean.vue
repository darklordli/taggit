<style scoped>
  .fr{float: right;}
  .layout-breadcrumb {
      padding: 10px 15px 0;
  }
  .num_wrapper{font-size:18px;padding:10px;}
  .classwrapper .ivu-tree li{float: left;width:200px}
  .tagwrapper .ivu-tree li{float: left;margin: 0px 40px 10px 0px}
  .cf{display:inline-block;zoom:1;width: 100%}
  .cf:after{content:".";display:block;clear:both;visibility:hidden;line-height:0;height:0}
  html[xmlns] .clearfix{display:block}
</style>
<template>
    <div class="layout-header"></div>
      <div class="layout-breadcrumb">
          <Breadcrumb>
              <Breadcrumb-item>首页</Breadcrumb-item>
              <Breadcrumb-item>音频资源管理</Breadcrumb-item>
              <Breadcrumb-item>批量清除标签</Breadcrumb-item>
          </Breadcrumb>
      </div>

      <div class="layout-content">
        <div class="layout-content-main">
          <Menu mode="horizontal" :theme="theme1" active-key="1">
              <Menu-item key="1">
                  批量清除标签
              </Menu-item>
          </Menu>

          <p class="num_wrapper">共选择 {{tagsData.length}} 条资源，请选择需要清除的标签，分类不清除</p>

          <Card class="classwrapper cf">
              <p slot="title">分类</p>

              <!-- 分类数据 -->
              <Tree :data="classifylist"
              @on-select-change="gettaglist">
              </Tree>

          </card>

          <Card class="tagwrapper">
            <p slot="title"><b>{{classname}}</b> 分类的标签：</p>

            <template v-for="item in taglist" v-ref:tagtree>
              <!-- 标签 点击全部勾选这个标签组内的所有标签-->
              <a type="border"
              class ="taggrouplink"
              @click.prevent.stop="checkalltags(item)">
              {{item.title}}
              </a>

                <Card class="cf">

                  <Tree :data="item.children"
                    show-checkbox>
                  </Tree>

                  <!--加载中 -->
                  <Spin size="large" v-if="tagsspinShow"></Spin>
                </card>

            </template>
          </card>

          <p class="btn_wrapper">
            <i-button type="warning"
            icon="ios-compose"
            size="large"
            v-on:click.stop.prevent="tosave()"
            >批量保存</i-button>

            <i-button type="success"
            icon="checkmark-round"
            size="large"
            v-on:click.stop.prevent="tosubmit()"
            >批量提交</i-button>
          </p>

         </div>
      </div>
</template>

<script>
import config from '../config/config';
import util from '../libs/util';
import { getTags } from '../store/getters'

    export default {
        data() {
            return {
              // tagsData:[579017,579018],
              //登陆信息
              logininfo:"",
              // 全量分类数据
              classid:null,
              // 全量分类数据
              classifylist:[],
              //某分类下的标签组和标签数据
              taglist:[],
              //临时存放新打的标签数据，key 为标签组ID，value为标签id的数组
              tagnew:{},
              //临时分类和标签数据
              tmptaglist:{
                    "id":[],
                    "append":0,
                    "data":[
                        {
                            "res_db":"aires",
                            "resources" : []
                        }
                        ],
                    "clevel":"",
                    "userinfo" :{
                      "editor":"",
                      "editor_email":""
                    }
              },
            }
        },
        ready(){
          this.getlogininfo();
          this.endids();
          this.getclass();
        },
        vuex: {
            getters: {
                tagsData: getTags
            }
        },
        methods:{
          // 拿登陆信息
          getlogininfo(){
            this.logininfo = util.getCookie('CURRENT_USER')
            this.logininfo=JSON.parse(JSON.parse(this.logininfo));
          },
          // 保存id数组
          endids(){
            this.tagsData.forEach((value)=>{
              this.tmptaglist.data[0].resources.push(value.id)
            })
          },

          // 获取第一个资源的大分类和子分类
          getclass(){
            let url= `/airesources/${this.tagsData[0].id}?tags=1&userinfo=1&tagnew=1&tagtree=1`;
            util.ajax({
                method: 'GET',
                url: util.getUrl(url)
                })
                .then((res) => {
                  this.getclasslist();
                })
                .catch(function(error) {
                    console.error(error);
                });
          },
          //获取全量分类数据
          getclasslist(){
            let json={
                  "appId":"",
                  "id":0,
                  "type":0
              };

            util.ajax({
                method: 'POST',
                url: util.getUrl('/tag/list'),
                data:json
                })
                .then((res) => {
                    this.classifylist = res.data.data.children;
                    //隐藏spin
                    this.classspinShow = false;

                })
                .catch(function(error) {
                    console.error(error);
                });
          },


          //获取分类的标签数据
          // 参数为为分类id
          gettaglist(nodearr){
            let json={
                  "appId":"",
                  "id":nodearr[0].id,
              };
              util.ajax({
                  method: 'POST',
                  url: util.getUrl('/tag/list'),
                  data:json
                  })
                  .then((res) => {
                      this.taglist = res.data.data.children;
                      this.classname = res.data.data.title;
                      this.tagnew = {};
                      //隐藏spin
                      this.tagsspinShow = false;
                  })
                  .catch((error) => {
                      console.error(error);
                  });
          },

          // //获取一个标签组内已经选中的标签
          // savetags(nodearr){
          //     console.log(nodearr);
          //     nodearr.forEach((value)=>{
          //       this.tmptaglist.id.push(value.id);
          //     })
          // },

          //全部勾选某标签组内的所有标签
          checkalltags(item){
            //当前标签组下所有的标签的checked置true
            util.checkedtruetree(item.children);
          },

          //全部勾选某标签组内的所有标签
          tosave(){
            this.tmptaglist.clevel=2;
            this.$Modal.confirm({
                title: '确认批量清除这些标签？',
                onOk: () => {
                    this.tosend();
                },
                onCancel: () => {
                    return false;
                }
            });
          },

          tosubmit(){
            this.tmptaglist.clevel=3;
            this.$Modal.confirm({
                title: '确认批量清除这些标签？',
                onOk: () => {
                    this.tosend();
                },
                onCancel: () => {
                    return false;
                }
            });
          },



          tosend(){
            // 不管是否存在改变，都把目前已经打的标签id放在 this.tagnew 对象中，
            //然后将tagnew里的各个tag遍历进this.changedata
            let tagsitem = this.$refs.tagtree;
            tagsitem.forEach((value,index) =>{
                this.tagnew[index]=[];
                //每个标签组依次获取已经checked标签
                let tagsarr=value.$children[0].getCheckedNodes();
                tagsarr.forEach((tagsvalue)=>{
                  if (tagsvalue.id){
                    this.tagnew[index].push(tagsvalue.id)
                  }
                  else{
                    this.tagnew[index].push(tagsvalue.tagId)
                  }
                })
            })

            //将tagnew里的各个tag遍历进this.tmptaglist.id
              let item = [];
              for (item in this.tagnew){
                this.tagnew[item].forEach((value)=>{
                   this.tmptaglist.id.push(value);
                })
              }

            this.tmptaglist.userinfo.editor = this.logininfo.loginName;
            this.tmptaglist.userinfo.editor_email = this.logininfo.email;

            //提交资源的标签和分类信息
            util.ajax({
                method: 'POST',
                url: util.getUrl("/tag/resources/unset"),
                data:this.tmptaglist
                })
                .then((res) => {
                    if (res.data.result == -4){
                      this.$Notice.error({
                          title: '操作失败',
                          desc: "您选择的标签均没有与资源有关联～"
                      });
                      return false;
                    }
                    else{
                      util.tip(res);
                    }

                })
                .catch(function(error) {
                    console.error(error);
                });
          },
        }

    }
</script>
