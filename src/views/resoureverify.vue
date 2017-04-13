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
              <Breadcrumb-item>审核资源</Breadcrumb-item>
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
            <p slot="title"><Icon type="ios-paper"></Icon>关键词列表</p>

            <i-form
            :label-width="120"
            >
                <Form-item label="预制关键词：">
                    {{resouredata.keywords}}
                </Form-item>
            </i-form>
          </card>

          <!-- 审核状态的分类/标签列表-->
          <Card>
              <p slot="title">
              <Icon type="ios-paper"></Icon>分类/标签列表
              </p>

              <Card class="classwrapper cf">
                  <p slot="title">分类</p>

                  <!-- 分类数据 -->
                  <Tree :data="classifylist"
                  show-checkbox>
                  </Tree>
                  <!--加载中 -->
                  <Spin size="large" fix v-if="classspinShow"></Spin>
              </card>

              <Card class="tagwrapper">
                <p slot="title">标签</p>
                <template v-for="item in taglist">
                  <Tag type="border" color="blue">{{item.title}}</Tag>
                    <Card class="cf">
                      <!--加载中 -->
                      <Spin size="large" v-if="tagsspinShow"></Spin>

                      <!-- 标签数据 -->
                      <Tree :data="item.children"
                      show-checkbox>
                      </Tree>
                    </card>
                </template>
              </card>
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

          <!-- 如果是审核状态 -->
            <p class="error_wrapper">
              <Icon type="android-close"></Icon>
              不合格原因：
                <i-input type="textarea"
                style="width:500px"
                :value.sync="verifydata.check_info"
                :autosize="true"
                placeholder="请输入...">
                </i-input>
            </p>

            <div class="wrapper_editor">
              <Icon type="person"></Icon> 审核人：
              <span>{{resouredata.userinfo.reviewer}}
                (<Icon type="email"></Icon>
                {{resouredata.userinfo.reviewer_email}})
              </span>
              <Icon type="clock"></Icon> 审核时间：
              <span>{{resouredata.userinfo.reviewed_at}}</span>
            </div>

            <div class="btn_wrapper">
            <i-button
            type="success"
            size="large"
            icon="thumbsup"
            :disabled = "!verifydata.check_info == ''"
            v-on:click.stop.prevent="verifysuc()">
              审核通过
            </i-button>

            <i-button type="error"
            icon="thumbsdown"
            size="large"
            :disabled = '!verifydata.check_info'
            v-on:click.stop.prevent="verifyfail()">
              审核未通过
            </i-button>
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
              detailtaglist:[],
              //某分类下的标签组和标签数据
              taglist:[] ,
              // 全量分类数据(编辑用)
              classifylist:[],
              // 全量分类数据(审核用)
              classifylistdisabled:[],
              // 某资源的标签数据(审核用)
              taglistdisabled:[],
              verifytreedata:[],
              // 审核的资源数据
              verifydata:{
                  "clevel" :"",
                  "check_info":"",
                  "userinfo" : {
                    "reviewer" :"",
                    "reviewer_email":""
                  }
              },
              classspinShow:true,
              tagsspinShow:true
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
          //页面状态：detail/edit/verify
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

                    //取得全量分类数据，共页面展示
                    this.getclasslist();

                })
                .catch(function(error) {
                    console.error(error);
                });
          },

          //整合标签页数据，供页面显示
          edittree(){
            // 审核查看用标签数据
            this.showtreedata.push(this.resouredata.tagtree);
            this.taglist=util.gettaglist(this.showtreedata);
            //隐藏spin
            this.tagsspinShow = false;
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
                    // 编辑用全量分类数据
                    this.classifylist = res.data.data.children;

                    // 展开所有分类的所有子分类
                    // util.expandtree(this.detailtreedata);

                    // 针对资源的分类tagnewIds，在全量分类这个tree中所有节点匹配，如果
                    // 相同则给分类节点打勾
                    util.checkclass(this.classifylist,this.resouredata.tagnewIds);

                    //隐藏spin
                    this.classspinShow = false;

                })
          },

          //审核通过
          verifysuc(){
            // 1	审核通过（开发和联调环境可用）
            this.verifydata.clevel=4;
            this.tosendverify();
          },
          //审核未通过
          verifyfail(){
            // -3	审核失败
            this.verifydata.clevel=2;
            this.tosendverify();
          },
          //发送审核信息
          tosendverify(){
            this.verifydata.userinfo.reviewer=this.logininfo.loginName;
            this.verifydata.userinfo.reviewer_email=this.logininfo.email;

            let formdata = new FormData();
            formdata.append("json",JSON.stringify(this.verifydata));
            let url=`/airesources/${this.$route.params.id}`;
            util.ajax({
                method: 'POST',
                url: util.getUrl(url),
                data:formdata
                })
                .then((res) => {
                  util.tip(res);
                  // 审核后再取一遍资源详情
                  this.getresoure();
                })
                .catch(function(error) {
                    console.error(error);
                });
          },
        }

    }
</script>
