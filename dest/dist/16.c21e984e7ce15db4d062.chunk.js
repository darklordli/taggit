webpackJsonp([16],{569:function(t,e,a){var s,i;a(570),s=a(571),i=a(573),t.exports=s||{},t.exports.__esModule&&(t.exports=t.exports.default),i&&(("function"==typeof t.exports?t.exports.options:t.exports).template=i)},570:function(t,e){},571:function(t,e,a){"use strict";function s(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var i=a(9),c=(s(i),a(11)),n=s(c),o=a(572);e.default={data:function(){return{logininfo:"",classid:"",classifylist:[],taglist:[],tagnew:{},tmptaglist:{id:[],append:0,data:[{res_db:"aires",resources:[]}],clevel:null,userinfo:{editor:"",editor_email:""}},classspinShow:!0,tagsspinShow:!0,classname:""}},ready:function(){this.getlogininfo(),this.endids(),this.getclasslist()},vuex:{getters:{tagsData:o.getTags}},methods:{getlogininfo:function(){this.logininfo=n.default.getCookie("CURRENT_USER"),this.logininfo=JSON.parse(JSON.parse(this.logininfo))},endids:function(){var t=this;this.tagsData.forEach(function(e){t.tmptaglist.data[0].resources.push(e.id)})},getclasslist:function(){var t=this,e={appId:"",id:0,type:0};n.default.ajax({method:"POST",url:n.default.getUrl("/tag/list"),data:e}).then(function(e){console.log("分类"),t.classifylist=e.data.data.children}).catch(function(t){console.error(t)})},checkalltags:function(t){n.default.checkedtruetree(t.children)},gettaglist:function(t){var e=this;if(0!=t[0].pid)return!1;var a=0;console.log(t),t[0].id?a=t[0].id:t[0].tagId&&(a=t[0].tagId),n.default.uncheckedtree(this.classifylist),n.default.unselecttree(this.classifylist);var s={appId:"",id:a,type:[1,2]};n.default.ajax({method:"POST",url:n.default.getUrl("/tag/list"),data:s}).then(function(t){e.classname=t.data.data.title,e.taglist=t.data.data.children}).catch(function(t){console.error(t)})},getcheckclass:function(t){0==t.length&&this.$Notice.error({title:"错误",desc:"请至少给资源选择一个大分类或子分类。"})},selectclass:function(t){this.gettaglist(t),n.default.checkclass(this.classifylist,t)},tosave:function(){this.tmptaglist.clevel=2,this.tosend()},tosubmit:function(){this.tmptaglist.clevel=3,this.tosend()},tosend:function(){var t=this,e=this.$refs.class.getCheckedNodes();if(0==e.length)return this.$Message.error("请为资源选择分类～"),!1;this.tagnew.class=[],e.forEach(function(e){t.tagnew.class.push(e.id)});var a=this.$refs.tagtree;a.forEach(function(e,a){t.tagnew[a]=[];var s=e.$children[0].getCheckedNodes();s.forEach(function(e){e.id?t.tagnew[a].push(e.id):t.tagnew[a].push(e.tagId)})}),console.log(this.tagnew);var s=[];for(s in this.tagnew)this.tagnew[s].forEach(function(e){t.tmptaglist.id.push(e)});this.tmptaglist.userinfo.editor=this.logininfo.loginName,this.tmptaglist.userinfo.editor_email=this.logininfo.email,n.default.ajax({method:"POST",url:n.default.getUrl("/tag/resources"),data:this.tmptaglist}).then(function(t){console.log(t),n.default.tip(t)}).catch(function(t){console.error(t)})}}}},572:function(t,e){"use strict";function a(t){return t.selectTableData}Object.defineProperty(e,"__esModule",{value:!0}),e.getTags=a},573:function(t,e){t.exports=' <div class=layout-header _v-ef8679ca=""></div> <div class=layout-breadcrumb _v-ef8679ca=""> <breadcrumb _v-ef8679ca=""> <breadcrumb-item _v-ef8679ca="">首页</breadcrumb-item> <breadcrumb-item _v-ef8679ca="">音频资源管理</breadcrumb-item> <breadcrumb-item _v-ef8679ca="">批量打标签</breadcrumb-item> </breadcrumb> </div> <div class=layout-content _v-ef8679ca=""> <div class=layout-content-main _v-ef8679ca=""> <menu mode=horizontal :theme=theme1 active-key=1 _v-ef8679ca=""> <menu-item key=1 _v-ef8679ca=""> 批量打分类/标签 </menu-item> </menu> <p class=num_wrapper _v-ef8679ca="">共选择 {{tagsData.length}} 条资源</p> <card class="classwrapper cf" _v-ef8679ca=""> <p slot=title _v-ef8679ca="">分类</p> <tree :data=classifylist v-ref:class="" @on-select-change=gettaglist @on-check-change=getcheckclass show-checkbox="" _v-ef8679ca=""></tree> </card> <card class=tagwrapper _v-ef8679ca=""> <p slot=title _v-ef8679ca=""> <b _v-ef8679ca="">{{classname}}</b> 分类的标签：</p> <template v-for="item in taglist" v-ref:tagtree="" _v-ef8679ca=""> <a type=border class=taggrouplink @click.prevent.stop=checkalltags(item) _v-ef8679ca=""> {{item.title}} </a> <card class=cf _v-ef8679ca=""> <tree :data=item.children show-checkbox="" _v-ef8679ca=""> </tree> </card> </template> </card> <p class=btn_wrapper _v-ef8679ca=""> <i-button type=warning icon=ios-compose size=large v-on:click.stop.prevent=tosave() _v-ef8679ca="">批量保存</i-button> <i-button type=success icon=checkmark-round size=large v-on:click.stop.prevent=tosubmit() _v-ef8679ca="">批量提交</i-button> </p> </div> </div> '}});