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
              <Breadcrumb-item>编辑资源</Breadcrumb-item>
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
                icon="backspace"
                v-on:click.stop.prevent="todetail()">
                返回查看
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
                      <i-input
                      :value.sync="resouredata.artist">
                      </i-input>
                  </Form-item>

                  <Form-item label="类型：">{{resouredata.type}}</Form-item>

                  <Form-item label="时长：">{{resouredata.length}}</Form-item>

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
                    <i-input
                    :value.sync="resouredata.nickname">
                    </i-input>
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
            <i-form
            :label-width="120"
            >
                <Form-item label="预制关键词：">
                  <i-input
                  :value.sync="resouredata.keywords">
                  </i-input>
                </Form-item>
            </i-form>
          </card>

          <!-- 编辑状态的分类/标签列表-->
          <Card>
            <p slot="title">
              <Icon type="ios-paper"></Icon>分类/标签列表
            </p>

            <Card class="classwrapper cf">
                <p slot="title">分类：</p>
                <!-- 分类数据 -->
                <Tree
                :data="classifylist"
                v-ref:class
                @on-select-change="gettaglist"
                @on-check-change="getcheckclass"
                show-checkbox>
                </Tree>
                <!--加载中 -->
                <Spin size="large" fix v-if="classspinShow"></Spin>
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

                <!-- <i-button
                type="error"
                size="small"
                @click.prevent.stop="cleartags(item)"
                >
                清空标签
                </i-button> -->

                <Card class="cf">
                  <!--加载中 -->
                  <Spin size="large" v-if="tagsspinShow"></Spin>

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

          <!-- 如果是编辑状态 -->
          <p class="error_wrapper"
            v-if="resouredata.check_info">
              <Icon type="android-close"></Icon>
              不合格原因：{{resouredata.check_info}}
          </p>

          <p class="btn_wrapper">
            <i-button type="warning"
            icon="ios-compose"
            size="large"
            :disabled="this.resouredata.clevel === 3"
            v-on:click.stop.prevent="tosave()"
            >保存</i-button>

            <i-button type="success"
            icon="checkmark-round"
            size="large"
            :disabled="this.resouredata.clevel === 3"
            v-on:click.stop.prevent="tosubmit()"
            >提交</i-button>
          </p>
         </div>
      </div>
</template>

<script>
//标签类型（0分类、1标签组、2标签）
import util from '../libs/util';
import config from '../config/config';
    export default {
        name:"resoureedit",
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
              //临时存放新打的标签数据，key 为标签组ID，value为标签id的数组
              tagnew:{},
              //跟分类名
              classname:"",
              //修改的资源数据
              changedata:{
                  "keywords" : [],
                  "clevel" :"",
                  "artist": "",
                  "nickname":"",
                  "userinfo" : {
                    "editor" : "",
                    "editor_email":""
                  }
              },
              classspinShow:true,
              tagsspinShow:true
              }
        },
        computed:{
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

                    this.classname=this.resouredata.category;
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

            // 详情用
            this.detailtreedata.push(this.resouredata.tagnew);
            this.detailtaglist=util.gettaglist(this.detailtreedata);

            // 编辑用
            this.showtreedata.push(this.resouredata.tagtree);
            this.taglist=util.gettaglist(this.showtreedata);

            //展开子分类
            // util.expandtree(this.detailtreedata);
            //隐藏spin
            this.tagsspinShow = false;
          },

          //获取全量分类数据，并匹配
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

          // 如果选择的是资源原有的分类，则显示已经打的标签
          if (id == this.resouredata.catearr.id){
            this.taglist=util.gettaglist(this.showtreedata);
            return false;
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

              //保存当前选择的分类,清楚已选择标签
              this.changedata.tagnew=[];
              this.changedata.tagnew[0]=id;


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

          //全部勾选某标签组内的所有标签
          checkalltags(item){
            if (item.id){
              this.tagnew[item.id]=[];
            }
            else if (item.tagId){
              this.tagnew[item.tagId]=[];
            }
            //当前标签组下所有的标签的checked置true
            util.checkedtruetree(item.children);
          },

          //取消勾选某标签组内的所有标签
          cleartags(item){
            if (item.id){
              this.tagnew[item.id]=[];
            }
            else if (item.tagId){
              this.tagnew[item.tagId]=[];
            }
            //当前标签组下所有的标签的checked置false
            util.checkedfalsetree(item.children);
          },

          //转到查看模式
          todetail(){
            this.$router.go({
              name: "resouredetail",
              params:{
                id:this.$route.params.id
              },
              query:{
                action:'detail'
              }
            });
          },

          //保存修改
          tosave(){
            this.changedata.clevel=2;
            this.tosend();
          },

          //提交修改
          tosubmit(){
            this.changedata.clevel=3;
            this.tosend();
          },

          // //获取一个标签组已经选中的标签,放在tagnew这个数据的已标签组id为key的 value内
          // //每一个value是一个array
          // getchecktags(nodearr){
          //     if (nodearr[0].id){
          //       this.tagnew[nodearr[0].pid]=[];
          //       nodearr.forEach((value)=>{
          //         this.tagnew[nodearr[0].pid].push(value.id)
          //       })
          //     }
          //     else if (nodearr[0].tagId){
          //       //如果是在原有的分类的基础上修改标签，
          //       //则需要把原有的标签数据置于this.tagnew中
          //       this.detailtaglist.forEach((value)=>{
          //         this.tagnew[value.tagId]=[];
          //         value.children.forEach((childvalue)=>{
          //           this.tagnew[value.tagId].push(childvalue.tagId);
          //         })
          //       })
          //       //再进行标签的编辑
          //       this.tagnew[nodearr[0].pid]=[];
          //       nodearr.forEach((value)=>{
          //         this.tagnew[nodearr[0].pid].push(value.tagId)
          //       })
          //       console.log("tagnew");
          //       console.log(this.tagnew);
          //     }
          // },
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


            // 如果this.tagnew里面有标签,则说明对标签有所修改
            // this.changedata中需要包含tagnew字段，否则不要有tagnew字段，说明对标签数据没有修改过
            // 废除以上逻辑

            // 不管是否存在改变，都把目前已经打的标签id放在 this.tagnew 对象中，
            //然后将tagnew里的各个tag遍历进this.changedata
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
              this.changedata.tagnew = [];
              for (item in this.tagnew){
                this.tagnew[item].forEach((value)=>{
                  this.changedata.tagnew.push(value)
                })
              }

            this.changedata.keywords=this.resouredata.keywords.split(",");
            this.changedata.artist=this.resouredata.artist;
            this.changedata.nickname=this.resouredata.nickname;
            this.changedata.userinfo.editor=this.logininfo.loginName;
            this.changedata.userinfo.editor_email=this.logininfo.email;

            let formdata = new FormData();
            formdata.append("json",JSON.stringify(this.changedata));
            // 提交资源本身信息
            let url=`/airesources/${this.$route.params.id}`;

            util.ajax({
                method: 'POST',
                url: util.getUrl(url),
                data:formdata
                })
                .then((res) => {
                  util.tip(res);
                  // 提交后各个临时数据清零，重新请求资源
                  this.detailtreedata=[];
                  this.showtreedata=[];
                  this.detailtaglist=[];
                  this.getresoure();
                })
                .catch(function(error) {
                    console.error(error);
                });
          }
        }

    }
</script>
