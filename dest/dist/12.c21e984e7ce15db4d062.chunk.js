webpackJsonp([12],{553:function(e,t,a){var r,o;a(554),r=a(555),o=a(556),e.exports=r||{},e.exports.__esModule&&(e.exports=e.exports.default),o&&(("function"==typeof e.exports?e.exports.options:e.exports).template=o)},554:function(e,t){},555:function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=a(11),i=r(o),s=a(9);r(s);t.default={name:"resouredetail",data:function(){return{logininfo:"",resouredata:{userinfo:""},detailtreedata:[],showtreedata:[],detailtaglist:[]}},computed:{editdisable:function(){if(5===this.resouredata.clevel||3===this.resouredata.clevel||4===this.resouredata.clevel)return!0},clevel:function(){return i.default.getResouceStatus(this.resouredata.clevel)},id:function(){return this.$route.params.id},dataformat:function(){return i.default.dataformat(this.resouredata.userinfo.edited_at)}},ready:function(){this.getlogininfo(),this.getresoure()},methods:{getlogininfo:function(){this.logininfo=i.default.getCookie("CURRENT_USER"),this.logininfo=JSON.parse(JSON.parse(this.logininfo))},getresoure:function(){var e=this,t="/airesources/"+this.$route.params.id+"?tags=1&userinfo=1&tagnew=1&tagtree=1";i.default.ajax({method:"GET",url:i.default.getUrl(t)}).then(function(t){e.resouredata=t.data.data,e.resouredata.length=i.default.formatSeconds(e.resouredata.length),e.resouredata.size=i.default.formatFileSize(e.resouredata.size),e.resouredata.keywords=e.resouredata.keywords.join(","),e.edittree()}).catch(function(e){console.error(e)})},edittree:function(){this.detailtreedata.push(this.resouredata.tagnew),this.detailtaglist=i.default.gettaglist(this.detailtreedata)},toedit:function(){this.$router.go({name:"resoureedit",params:{id:this.$route.params.id}})}}}},556:function(e,t){e.exports=' <div class=layout-header></div> <div class=layout-breadcrumb> <breadcrumb> <breadcrumb-item>首页</breadcrumb-item> <breadcrumb-item>音频资源管理</breadcrumb-item> <breadcrumb-item>资源详情</breadcrumb-item> </breadcrumb> </div> <div class=layout-content> <div class=layout-content-main> <card style=height:380px> <p slot=title style=height:35px> <icon type=ios-paper></icon> 基本信息 ( id: <tag color=blue>{{resouredata.id}}</tag> ) <tag type=dot color=yellow>{{{clevel}}}</tag> </p> <p slot=extra> 操作人：<span>{{resouredata.userinfo.editor}} ({{resouredata.userinfo.reviewer_email}})</span>， 操作时间：<span>{{dataformat}}</span> <i-button type=primary :disabled=editdisable icon=edit v-on:click.stop.prevent=toedit()> 编辑资源 </i-button> </p> <i-col span=12> <i-form :label-width=120> <form-item label=资源名称：> {{resouredata.name}} </form-item> <form-item label=作者/歌手：> {{resouredata.artist}} </form-item> <form-item label=类型：> {{resouredata.type}} </form-item> <form-item label=时长：> {{resouredata.length}} </form-item> <form-item label=音频：> <audio :src=resouredata.content controls=controls> </audio> </form-item> </i-form> </i-col> <i-col span=12> <i-form :label-width=120> <form-item label=别名：> {{resouredata.nickname}} </form-item> <form-item label=来源：> {{resouredata.srcname}} </form-item> <form-item label=大小：> {{resouredata.size}} </form-item> </i-form> </i-col> </card> <card> <p slot=title> <icon type=ios-paper></icon>关键词列表 </p> <i-form :label-width=120> <form-item label=预制关键词：> {{resouredata.keywords}} </form-item> </i-form> </card> <card class=tagwrapper> <p slot=title> <icon type=ios-paper></icon>分类/标签列表 </p> <i-form :label-width=60> <form-item label=分类：> <tree :data=detailtreedata></tree> </form-item> <form-item label=标签：> <p v-for="item in detailtaglist"> <tag type=dot color=red style=float:left;clear:both>{{item.title}}:</tag> <tree :data=item.children class=cf></tree> </p> </form-item> </i-form> </card> <div class=wrapper_editor> <icon type=person></icon> 操作人： <span>{{resouredata.userinfo.editor}} (<icon type=email></icon> {{resouredata.userinfo.editor_email}}) </span>， <icon type=clock></icon> 操作时间： <span>{{dataformat}}</span> </div> </div> </div> '}});