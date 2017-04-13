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
              <Breadcrumb-item>批量添加标签</Breadcrumb-item>
          </Breadcrumb>
      </div>

      <div class="layout-content">
        <div class="layout-content-main">
          <Menu mode="horizontal" :theme="theme1" active-key="1">
              <Menu-item key="1">
                  批量添加标签
              </Menu-item>
          </Menu>

          <p class="num_wrapper">共选择 {{tagsData.length}} 条资源，
            所在分类:{{classname}}</p>

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
              // 资源共有的分类id
              classid:null,
              //某分类下的标签组和标签数据
              taglist:[],
              //临时存放新打的标签数据，key 为标签组ID，value为标签id的数组
              tagnew:{},
              //临时分类和标签数据
              tmptaglist:{
                    "id":[],
                    "append":1,
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
            this.logininfo = util.getCookie('CURRENT_USER');
            this.logininfo=JSON.parse(JSON.parse(this.logininfo));
          },
          // 保存id数组
          endids(){
            this.tagsData.forEach((value)=>{
              this.tmptaglist.data[0].resources.push(value.id)
            })
          },
          // 获取第一个资源的分类
          getclass(){
            let url= `/airesources/${this.tagsData[0].id}`;
            util.ajax({
                method: 'GET',
                url: util.getUrl(url)
                })
                .then((res) => {
                  this.classid = res.data.data.catearr.id;
                  this.classname = res.data.data.catearr.name;
                  this.gettaglist(this.classid);
                })
                .catch(function(error) {
                    console.error(error);
                });
          },

          //获取资源所在分类的标签数据
          // 参数为为分类id
          gettaglist(id){
            let json={
                  "appId":"",
                  "id":id,
              };
              util.ajax({
                  method: 'POST',
                  url: util.getUrl('/tag/list'),
                  data:json
                  })
                  .then((res) => {
                      this.taglist = res.data.data.children;
                      console.log(this.taglist)
                  })
                  .catch((error) => {
                      console.error(error);
                  });
          },
          //全部勾选某标签组内的所有标签
          checkalltags(item){
            //当前标签组下所有的标签的checked置true
            util.checkedtruetree(item.children);
          },

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

            // 提交资源的标签和分类信息
            util.ajax({
                method: 'POST',
                url: util.getUrl("/tag/resources"),
                data:this.tmptaglist
                })
                .then((res) => {
                  util.tip(res)
                })
                .catch(function(error) {
                    console.error(error);
                });
          }

        }

    }
</script>
