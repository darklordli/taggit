webpackJsonp([13,19],{557:function(t,e,a){var i,s;a(558),i=a(559),s=a(560),t.exports=i||{},t.exports.__esModule&&(t.exports=t.exports.default),s&&(("function"==typeof t.exports?t.exports.options:t.exports).template=s)},558:function(t,e){},559:function(t,e,a){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var s=a(6),r=i(s),o=a(11),n=i(o),l=a(9);i(l);e.default={name:"resoureedit",data:function(){return{logininfo:"",resouredata:{userinfo:""},detailtreedata:[],showtreedata:[],detailtaglist:[],taglist:[],classifylist:[],tagnew:{},classname:"",changedata:{keywords:[],clevel:"",artist:"",nickname:"",userinfo:{editor:"",editor_email:""}},classspinShow:!0,tagsspinShow:!0}},computed:{clevel:function(){return n.default.getResouceStatus(this.resouredata.clevel)},id:function(){return this.$route.params.id},dataformat:function(){return n.default.dataformat(this.resouredata.userinfo.edited_at)}},ready:function(){this.getlogininfo(),this.getresoure()},methods:{getlogininfo:function(){this.logininfo=n.default.getCookie("CURRENT_USER"),this.logininfo=JSON.parse(JSON.parse(this.logininfo))},getresoure:function(){var t=this,e="/airesources/"+this.$route.params.id+"?tags=1&userinfo=1&tagnew=1&tagtree=1";n.default.ajax({method:"GET",url:n.default.getUrl(e)}).then(function(e){t.resouredata=e.data.data,t.resouredata.length=n.default.formatSeconds(t.resouredata.length),t.resouredata.size=n.default.formatFileSize(t.resouredata.size),t.resouredata.keywords=t.resouredata.keywords.join(","),t.classname=t.resouredata.category,t.edittree(),t.getclasslist()}).catch(function(t){console.error(t)})},edittree:function(){this.detailtreedata.push(this.resouredata.tagnew),this.detailtaglist=n.default.gettaglist(this.detailtreedata),this.showtreedata.push(this.resouredata.tagtree),this.taglist=n.default.gettaglist(this.showtreedata),this.tagsspinShow=!1},getclasslist:function(){var t=this,e={appId:"",id:0,type:0};n.default.ajax({method:"POST",url:n.default.getUrl("/tag/list"),data:e}).then(function(e){t.classifylist=e.data.data.children,n.default.checkclass(t.classifylist,t.resouredata.tagnewIds),t.classspinShow=!1})},gettaglist:function(t){var e=this;if(0!=t[0].pid)return!1;var a=0;if(console.log(t),t[0].id?a=t[0].id:t[0].tagId&&(a=t[0].tagId),a==this.resouredata.catearr.id)return this.taglist=n.default.gettaglist(this.showtreedata),!1;n.default.uncheckedtree(this.classifylist),n.default.unselecttree(this.classifylist);var i={appId:"",id:a,type:[1,2]};n.default.ajax({method:"POST",url:n.default.getUrl("/tag/list"),data:i}).then(function(t){e.classname=t.data.data.title,e.taglist=t.data.data.children}).catch(function(t){console.error(t)}),this.changedata.tagnew=[],this.changedata.tagnew[0]=a},getcheckclass:function(t){0==t.length&&this.$Notice.error({title:"错误",desc:"请至少给资源选择一个大分类或子分类。"})},selectclass:function(t){this.gettaglist(t),n.default.checkclass(this.classifylist,t)},checkalltags:function(t){t.id?this.tagnew[t.id]=[]:t.tagId&&(this.tagnew[t.tagId]=[]),n.default.checkedtruetree(t.children)},cleartags:function(t){t.id?this.tagnew[t.id]=[]:t.tagId&&(this.tagnew[t.tagId]=[]),n.default.checkedfalsetree(t.children)},todetail:function(){this.$router.go({name:"resouredetail",params:{id:this.$route.params.id},query:{action:"detail"}})},tosave:function(){this.changedata.clevel=2,this.tosend()},tosubmit:function(){this.changedata.clevel=3,this.tosend()},tosend:function(){var t=this,e=this.$refs.class.getCheckedNodes();if(0==e.length)return this.$Message.error("请为资源选择分类～"),!1;this.tagnew.class=[],e.forEach(function(e){t.tagnew.class.push(e.id)});var a=this.$refs.tagtree;a.forEach(function(e,a){t.tagnew[a]=[];var i=e.$children[0].getCheckedNodes();i.forEach(function(e){e.id?t.tagnew[a].push(e.id):t.tagnew[a].push(e.tagId)})}),console.log(this.tagnew);var i=[];this.changedata.tagnew=[];for(i in this.tagnew)this.tagnew[i].forEach(function(e){t.changedata.tagnew.push(e)});this.changedata.keywords=this.resouredata.keywords.split(","),this.changedata.artist=this.resouredata.artist,this.changedata.nickname=this.resouredata.nickname,this.changedata.userinfo.editor=this.logininfo.loginName,this.changedata.userinfo.editor_email=this.logininfo.email;var s=new FormData;s.append("json",(0,r.default)(this.changedata));var o="/airesources/"+this.$route.params.id;n.default.ajax({method:"POST",url:n.default.getUrl(o),data:s}).then(function(e){n.default.tip(e),t.detailtreedata=[],t.showtreedata=[],t.detailtaglist=[],t.getresoure()}).catch(function(t){console.error(t)})}}}},560:function(t,e){t.exports=' <div class=layout-header></div> <div class=layout-breadcrumb> <breadcrumb> <breadcrumb-item>首页</breadcrumb-item> <breadcrumb-item>音频资源管理</breadcrumb-item> <breadcrumb-item>编辑资源</breadcrumb-item> </breadcrumb> </div> <div class=layout-content> <div class=layout-content-main> <card style=height:380px> <p slot=title style=height:35px> <icon type=ios-paper></icon> 基本信息 ( id: <tag color=blue>{{resouredata.id}}</tag> ) <tag type=dot color=yellow>{{{clevel}}}</tag> </p> <p slot=extra> 操作人：<span>{{resouredata.userinfo.editor}} ({{resouredata.userinfo.reviewer_email}})</span>， 操作时间：<span>{{dataformat}}</span> <i-button type=primary icon=backspace v-on:click.stop.prevent=todetail()> 返回查看 </i-button> </p> <i-col span=12> <i-form :label-width=120> <form-item label=资源名称：> {{resouredata.name}} </form-item> <form-item label=作者/歌手：> <i-input :value.sync=resouredata.artist> </i-input> </form-item> <form-item label=类型：>{{resouredata.type}}</form-item> <form-item label=时长：>{{resouredata.length}}</form-item> <form-item label=音频：> <audio :src=resouredata.content controls=controls> </audio> </form-item> </i-form> </i-col> <i-col span=12> <i-form :label-width=120> <form-item label=别名：> <i-input :value.sync=resouredata.nickname> </i-input> </form-item> <form-item label=来源：> {{resouredata.srcname}} </form-item> <form-item label=大小：> {{resouredata.size}} </form-item> </i-form> </i-col> </card> <card> <p slot=title> <icon type=ios-paper></icon>关键词列表 </p> <i-form :label-width=120> <form-item label=预制关键词：> <i-input :value.sync=resouredata.keywords> </i-input> </form-item> </i-form> </card> <card> <p slot=title> <icon type=ios-paper></icon>分类/标签列表 </p> <card class="classwrapper cf"> <p slot=title>分类：</p> <tree :data=classifylist v-ref:class @on-select-change=gettaglist @on-check-change=getcheckclass show-checkbox> </tree> <spin size=large fix v-if=classspinShow></spin> </card> <card class=tagwrapper> <p slot=title> <b>{{classname}}</b> 分类的标签：</p> <template v-for="item in taglist" v-ref:tagtree> <a type=border class=taggrouplink @click.prevent.stop=checkalltags(item)> {{item.title}} </a> <card class=cf> <spin size=large v-if=tagsspinShow></spin> <tree :data=item.children show-checkbox> </tree> </card> </template> </card> </card> <div class=wrapper_editor> <icon type=person></icon> 操作人： <span>{{resouredata.userinfo.editor}} (<icon type=email></icon> {{resouredata.userinfo.editor_email}}) </span>， <icon type=clock></icon> 操作时间： <span>{{dataformat}}</span> </div> <p class=error_wrapper v-if=resouredata.check_info> <icon type=android-close></icon> 不合格原因：{{resouredata.check_info}} </p> <p class=btn_wrapper> <i-button type=warning icon=ios-compose size=large :disabled="this.resouredata.clevel === 3" v-on:click.stop.prevent=tosave()>保存</i-button> <i-button type=success icon=checkmark-round size=large :disabled="this.resouredata.clevel === 3" v-on:click.stop.prevent=tosubmit()>提交</i-button> </p> </div> </div> '}});