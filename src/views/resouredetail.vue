<style lang="less">
.layout-breadcrumb {
    padding: 10px 15px 0;
}
  .fr{float: right;}
  .classwrapper .ivu-tree li{float: left;width:200px}
  .tagwrapper .ivu-tree li{float: left;margin: 0px 40px 10px 0px}
  .cf{display:inline-block;zoom:1;width: 100%}
  .cf:after{content:".";display:block;clear:both;visibility:hidden;line-height:0;height:0}
  html[xmlns] .clearfix{display:block}

  .wrapper_editor{
    padding: 20px 0px 20px 10px;
    border-bottom:1px solid #ccc;
    font-weight:bold;
    font-size:14px;
  }
  .btn_wrapper{
    padding:10px;
    a{
      margin:10px
    }
  }
  .error_wrapper{
    color:red;
    font-weight:bolder;
    font-size:14px;
    padding: 20px 0px 20px 10px;
  }
</style>

<template>
    <div class="layout-header"></div>
      <div class="layout-breadcrumb">
          <Breadcrumb>
              <Breadcrumb-item>首页</Breadcrumb-item>
              <Breadcrumb-item>音频资源管理</Breadcrumb-item>
              <Breadcrumb-item>资源详情</Breadcrumb-item>
          </Breadcrumb>
      </div>

      <div class="layout-content">
        <div class="layout-content-main">

          <!-- 资源基本信息-->
          <Card style="height:380px">
            <p slot="title" style="height:35px">
              <Icon type="ios-paper"></Icon>
              基本信息
              ( id: <Tag color="blue">{{resouredata.id}}</Tag> )
              <Tag type="dot" color="yellow">{{{clevel}}}</Tag>
            </p>

            <p slot="extra">
              操作人：<span>{{resouredata.userinfo.editor}}
                ({{resouredata.userinfo.reviewer_email}})</span>，
              操作时间：<span>{{dataformat}}</span>

              <i-button
                type="primary"
                :disabled = editdisable
                icon="edit"
                v-on:click.stop.prevent="toedit()">
                编辑资源
              </i-button>
            </p>
            <i-col span="12">
              <i-form
              :label-width="120"
              >
                  <Form-item label="资源名称：">
                      {{resouredata.name}}
                  </Form-item>

                  <Form-item label="作者/歌手：">
                      {{resouredata.artist}}
                  </Form-item>

                  <Form-item label="类型：">
                    {{resouredata.type}}
                  </Form-item>

                  <Form-item label="时长：">
                    {{resouredata.length}}
                  </Form-item>

                  <Form-item label="音频：">
                    <audio :src="resouredata.content"
                      controls="controls">
                    </audio>
                  </Form-item>

                  </i-form>
            </i-col>

            <i-col span="12">
              <i-form
              :label-width="120"
              >
                  <Form-item label="别名：">
                    {{resouredata.nickname}}
                  </Form-item>

                  <!-- <Form-item label="系列名称：">
                      {{resouredata.source}}
                  </Form-item> -->

                  <Form-item label="来源：">
                    {{resouredata.srcname}}
                  </Form-item>

                  <Form-item label="大小：">
                    {{resouredata.size}}
                  </Form-item>

                  </i-form>
            </i-col>
          </card>

          <!-- 关键词列表-->
          <Card>
            <p slot="title">
            <Icon type="ios-paper"></Icon>关键词列表
            </p>
            <i-form :label-width="120">
                <Form-item label="预制关键词：">
                    {{resouredata.keywords}}
                </Form-item>
            </i-form>
          </card>

          <!-- 详情状态的分类/标签列表-->
          <Card class="tagwrapper">
            <p slot="title">
            <Icon type="ios-paper"></Icon>分类/标签列表
            </p>
            <i-form
            :label-width="60"
            >
                <Form-item label="分类：">
                  <Tree :data="detailtreedata"></Tree>
                </Form-item>

                <Form-item label="标签：">
                  <p v-for="item in detailtaglist">
                    <Tag type="dot"
                    color="red"
                    style="float:left;clear:both">{{item.title}}:</Tag>

                    <!-- 标签,每一个标签都是一棵树-->
                    <Tree :data="item.children" class="cf"></Tree>

                  </p>
                </Form-item>
            </i-form>
          </card>

          <div class="wrapper_editor">
            <Icon type="person"></Icon> 操作人：
              <span>{{resouredata.userinfo.editor}}
                (<Icon type="email"></Icon>
                {{resouredata.userinfo.editor_email}})
              </span>，
            <Icon type="clock"></Icon> 操作时间：
              <span>{{dataformat}}</span>
          </div>

         </div>
      </div>
</template>

<script>
//标签类型（0分类、1标签组、2标签）
import util from '../libs/util';
import config from '../config/config';
    export default {
        name:"resouredetail",
        data() {
            return {
              //登陆信息
              logininfo:"",
              //资源详情数据
              resouredata:{
                userinfo:""
              },
              detailtreedata:[],
              // 整合好的某资源的标签树的数据
              showtreedata:[],
              detailtaglist:[]
            }
        },
        computed:{
          editdisable(){
            if (this.resouredata.clevel === 5||this.resouredata.clevel === 3||this.resouredata.clevel === 4){
              return true
            }
          },
          clevel(){
            return util.getResouceStatus(this.resouredata.clevel);
          },
          id(){
            return this.$route.params.id
          },
          dataformat(){
            return util.dataformat(this.resouredata.userinfo.edited_at);
          }
        },
        ready(){
          this.getlogininfo();
          this.getresoure();
        },
        methods:{
          // 拿登陆信息
          getlogininfo(){
            this.logininfo = util.getCookie('CURRENT_USER')
            this.logininfo=JSON.parse(JSON.parse(this.logininfo));
          },
          //获取资源详情
          getresoure(){
            let url= `/airesources/${this.$route.params.id}?tags=1&userinfo=1&tagnew=1&tagtree=1`;
            util.ajax({
                method: 'GET',
                url: util.getUrl(url)
                })
                .then((res) => {
                    this.resouredata = res.data.data;

                    //时长处理
                    this.resouredata.length = util.formatSeconds(this.resouredata.length)

                    //体积处理
                    this.resouredata.size = util.formatFileSize(this.resouredata.size)

                    //处理预制关键词
                    this.resouredata.keywords = this.resouredata.keywords.join(",");

                    //整合标签页数据，供页面显示
                    this.edittree();
                })
                .catch(function(error) {
                    console.error(error);
                });
          },

          //整合标签页数据，供页面显示
          edittree(){

            // 详情用
            this.detailtreedata.push(this.resouredata.tagnew);
            this.detailtaglist=util.gettaglist(this.detailtreedata);

            //展开子分类
            // util.expandtree(this.detailtreedata);

          },

          //转到编辑模式
          toedit(){
            this.$router.go({
              name: "resoureedit",
              params:{
                id:this.$route.params.id
              }
            })
          }
        }
    }
</script>
