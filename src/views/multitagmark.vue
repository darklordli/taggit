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
  .taggrouplink{
    font-size:12px;
    height:24px;
    line-height:24px;
    font-weight:bold
  }
</style>

<template>
    <div class="layout-header"></div>
      <div class="layout-breadcrumb">
          <Breadcrumb>
              <Breadcrumb-item>首页</Breadcrumb-item>
              <Breadcrumb-item>音频资源管理</Breadcrumb-item>
              <Breadcrumb-item>批量打标签</Breadcrumb-item>
          </Breadcrumb>
      </div>

      <div class="layout-content">
        <div class="layout-content-main">
          <Menu mode="horizontal" :theme="theme1" active-key="1">
              <Menu-item key="1">
                  批量打分类/标签
              </Menu-item>
          </Menu>

          <p class="num_wrapper">共选择 {{tagsData.length}} 条资源</p>

          <Card class="classwrapper cf">
              <p slot="title">分类</p>

              <!-- 分类数据 -->
              <Tree :data="classifylist"
              v-ref:class
              @on-select-change="gettaglist"
              @on-check-change="getcheckclass"
              show-checkbox
              ></Tree>

          </card>

          <Card class="tagwrapper">
            <p slot="title"> <b>{{classname}}</b> 分类的标签：</p>
            <template v-for="item in taglist" v-ref:tagtree>
              <!-- 标签 点击全部勾选这个标签组内的所有标签-->
              <a type="border"
              class ="taggrouplink"
              @click.prevent.stop="checkalltags(item)">
              {{item.title}}
              </a>

                <Card class="cf">
                  <!-- 标签,每一个标签都是一棵树-->
                  <Tree :data="item.children"
                  show-checkbox>
                  </Tree>
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
              //登陆信息
              logininfo:"",
              // 全量分类数据
              classid:"",
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
                    "clevel":null,
                    "userinfo" :{
                      "editor":"",
                      "editor_email":""
                    }
              },
              classspinShow:true,
              tagsspinShow:true,
              classname:""
            }
        },
        ready(){
          this.getlogininfo();
          this.endids();
          this.getclasslist();
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
                    console.log('分类');
                    this.classifylist = res.data.data.children;

                    //展开子分类
                    // util.expandtree(this.classifylist);

                })
                .catch(function(error) {
                    console.error(error);
                });
          },

          //全部勾选某标签组内的所有标签
          checkalltags(item){
            //当前标签组下所有的标签的checked置true
            util.checkedtruetree(item.children);
          },

          //点击了某个分类的逻辑
          gettaglist(node){
          // 如果点击的不是根节点的话，则不产生动作
          if (node[0].pid!=0){
              return false;
          }

          let id=0;
          console.log(node);
          if (node[0].id){
            id = node[0].id
          }
          else if(node[0].tagId){
            id = node[0].tagId
          }

            //取消原本勾选的所有分类
            util.uncheckedtree(this.classifylist);

            //取消原本根分类的选择状态
            util.unselecttree(this.classifylist);

            //这个根分类之外的分类disable
            // util.disableclass(this.classifylist,id);

            //获取某分类的标签组和标签
            let json={
                  "appId":"",
                  "id":id,
                  "type":[1,2]
              };
              util.ajax({
                  method: 'POST',
                  url: util.getUrl('/tag/list'),
                  data:json
                  })
                  .then((res) => {
                      this.classname = res.data.data.title;
                      this.taglist = res.data.data.children;
                  })
                  .catch(function(error) {
                      console.error(error);
                  });

          },

          //把选择的分类添加到tagnew的class 这个key中，value为一个array
          getcheckclass(nodearr){
            // 如果没有选择任何分类，则提示用户至少需要选择一个分类，并且不让提交
            if(nodearr.length == 0){
              this.$Notice.error({
                title: '错误',
                desc: '请至少给资源选择一个大分类或子分类。',
              })
            }
          },

          //勾选某节点
          selectclass(node){
            //首先获取此节点的标签数据
            this.gettaglist(node);
            //取消其他子分类的勾选
            util.checkclass(this.classifylist,node);
          },

          // //把选择的分类添加到changedata
          // getcheckclass(nodearr){
          //   nodearr.forEach((value)=>{
          //     this.changedata.tagnew.push(value.id);
          //   })
          //   console.log(this.changedata.tagnew);
          // },

          //获取一个标签组内已经选中的标签
          // savetags(nodearr){
          //     console.log(nodearr);
          //     nodearr.forEach((value)=>{
          //       this.tmptaglist.id.push(value.id)
          //     })
          // },

          //保存修改
          tosave(){
            this.tmptaglist.clevel=2;
            this.tosend();
          },

          //提交修改
          tosubmit(){
            this.tmptaglist.clevel=3;
            this.tosend();
          },

          tosend(){
            // 将目前的分类放进this.tagnew.class
            let classes = this.$refs.class.getCheckedNodes();
            // 如果没有分类，不让提交
            if (classes.length == 0){
              this.$Message.error("请为资源选择分类～");
              return false;
            }
            else {
              this.tagnew.class=[];
              classes.forEach((value) => {
                this.tagnew.class.push(value.id);
              })
            }
            // 将目前的分类放进this.tagnew.class
            let tagsitem = this.$refs.tagtree;
            tagsitem.forEach((value,index) =>{
                this.tagnew[index]=[]
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
            console.log(this.tagnew);

            //将tagnew里的各个tag遍历进this.changedata
              let item = [];
              for (item in this.tagnew){
                this.tagnew[item].forEach((value)=>{
                   this.tmptaglist.id.push(value);
                })
              }


            this.tmptaglist.userinfo.editor = this.logininfo.loginName;
            this.tmptaglist.userinfo.editor_email = this.logininfo.email;

            // 提交资源的标签和分类信息
            util.ajax({
                method: 'POST',
                url: util.getUrl("/tag/resources"),
                data:this.tmptaglist
                })
                .then((res) => {
                    console.log(res);
                    util.tip(res);
                })
                .catch(function(error) {
                    console.error(error);
                });
          },
        }

    }
</script>
