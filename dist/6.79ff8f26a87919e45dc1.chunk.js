webpackJsonp([6,19],{494:function(t,a,e){var i,s;e(495),i=e(496),s=e(497),t.exports=i||{},t.exports.__esModule&&(t.exports=t.exports.default),s&&(("function"==typeof t.exports?t.exports.options:t.exports).template=s)},495:function(t,a){},496:function(t,a,e){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(a,"__esModule",{value:!0});var s=e(9),r=(i(s),e(11)),d=i(r);a.default={data:function(){return{albumId:0,mulitadddata:[],mulitdeldata:[],currentLeft:1,paraNameLeft:"id",paraValueLeft:"",searchParamsLeft:{offset:1,count:10,id:"",keywords:[],sort:null,name:[]},pagerLeft:{total:0},serachtable:[{type:"selection",width:40,align:"center"},{title:"资源ID",key:"id",width:100,align:"center",sortable:"custom",render:function(t,a,e){return'<a target="_black" href="/operation/voice/toDetail?id='+t.id+'">'+t.id+"</a>"}},{title:"资源名",key:"name",align:"center"},{title:"关键词",key:"keywords",width:120}],serachdata:[],addedtable:[{type:"selection",width:40,align:"center"},{title:"资源ID",key:"rid",width:100,align:"center",sortable:"custom",render:function(t,a,e){return'<a target="_black" href="/operation/voice/toDetail?id='+t.rid+'">'+t.rid+"</a>"}},{title:"资源名",key:"nick_name",align:"center"},{title:"状态",key:"clevel",width:120,render:function(t){var a=d.default.getResouceStatus(t.clevel);return a}}],currentRight:1,paraNameRight:"id",paraValueRight:"",searchParamsRight:{from:1,offset:10},pagerRight:{total:0},addeddata:[]}},ready:function(){this.albumId=this.$route.params.listid,this.searchLeft(1),this.searchRigth()},methods:{searchLeft:function(t){var a=this;if(this.currentLeft=t,this.searchParamsLeft.offset=(this.currentLeft-1)*this.searchParamsLeft.count,""!==this.paraValueLeft)if("id"===this.paraNameLeft){var e=this.paraValueLeft.split(" ");this.searchParamsLeft.id=e,this.searchParamsLeft.keywords=[],this.searchParamsLeft.name=[]}else if("name"===this.paraNameLeft){var i=this.paraValueLeft.split(";");this.searchParamsLeft.id=null,this.searchParamsLeft.keywords=[],this.searchParamsLeft.name=i}else{var s=this.paraValueLeft.split(";");this.searchParamsLeft.keywords=s,this.searchParamsLeft.id=null,this.searchParamsLeft.name=[]}else this.searchParamsLeft.id="",this.searchParamsLeft.keywords=[],this.searchParamsLeft.name=[];d.default.ajax({method:"POST",url:d.default.getUrl("/airesources/query"),data:this.searchParamsLeft}).then(function(t){var e=t.data.data;a.serachdata=e.resources,a.pagerLeft.total=e.total}).catch(function(t){console.error(t)})},lefttablesort:function(t){if("normal"!==t.order){var a=t.key+","+t.order;this.searchParamsLeft.sort=a,this.searchLeft(1)}},onpagingLeft:function(t){this.searchLeft(t)},searchRigth:function(){var t=this;if(this.searchParamsRight.from=(this.currentRight-1)*this.searchParamsRight.offset,""!==this.paraValueRight)if("id"===this.paraNameRight)this.searchParamsRight.id=this.paraValueRight;else{var a=[];a.push(this.paraValueRight),this.searchParamsRight.keywords=a}else this.searchParamsRight.id="",this.searchParamsRight.keywords=[];var e=d.default.getUrl("/album/"+this.albumId+"?from="+this.searchParamsRight.from+"&offset="+this.searchParamsRight.offset);d.default.ajax({method:"GET",url:e}).then(function(a){var e=a.data.data;t.addeddata=e.rids,t.pagerRight.total=e.total}).catch(function(t){console.log(t)})},righttablesort:function(t){if("normal"!==t.order){var a=t.key+","+t.order;this.searchParamsRight.sort=a,this.searchRigth()}},onpagingRight:function(t){this.currentRight=t,this.searchRigth()},addmulti:function(){var t=this,a={res_db:"aires",rids:[],append:1};if(this.mulitadddata&&0===this.mulitadddata.length)return void this.warning("至少选择一项数据!");this.mulitadddata.forEach(function(t,e,i){var s={rid:t.id,nick_name:t.name,sort:e};a.rids.push(s)});var e=this;d.default.ajax({method:"POST",url:d.default.getUrl("/album/resources/"+this.albumId),data:a}).then(function(a){return 0!==a.data.result?(t.$Notice.error({title:"添加失败!",desc:a.data.desc}),void console.log(t.mulitadddata)):(t.success("添加成功!"),void setTimeout(function(){e.searchLeft(),e.searchRigth()},500))}).catch(function(t){console.log(t)})},success:function(t){this.$Notice.success({title:t,desc:""})},goBack:function(){this.$router.go({name:"newliststep1",params:{id:this.albumId}})},goNext:function(){this.$router.go({name:"newliststep4",params:{id:this.albumId}})},warning:function(t){this.$Notice.warning({title:t,desc:""})},delmulti:function(){var t=this,a={res_db:"aires",rids:[]};if(this.mulitdeldata&&0===this.mulitdeldata.length)return void this.warning("至少选择一项数据!");this.mulitdeldata.forEach(function(t,e,i){a.rids.push(t.rid)});var e=this;d.default.ajax({method:"POST",url:d.default.getUrl("/album/resources/unset/"+this.albumId),data:a}).then(function(a){t.success("删除成功!"),setTimeout(function(){e.searchLeft(),e.searchRigth()},500)}).catch(function(t){console.error(t)})},addselection:function(t){this.mulitadddata=t},delselection:function(t){this.mulitdeldata=t}}}},497:function(t,a){t.exports=' <div class=layout-header _v-308daaf6=""></div> <div class=layout-breadcrumb _v-308daaf6=""> <breadcrumb _v-308daaf6=""> <breadcrumb-item _v-308daaf6="">首页</breadcrumb-item> <breadcrumb-item _v-308daaf6="">歌单管理</breadcrumb-item> <breadcrumb-item _v-308daaf6="">新建歌单</breadcrumb-item> </breadcrumb> </div> <div class=layout-content _v-308daaf6=""> <div class=layout-content-main _v-308daaf6=""> <row _v-308daaf6=""> <steps :current=1 _v-308daaf6=""> <step title=新建专辑 content=专辑内容编辑.. _v-308daaf6=""></step> <step title=添加资源 content=歌单内容编辑.. _v-308daaf6=""></step> <step title=资源整理 content=整理已添加的资源.. _v-308daaf6=""></step> </steps> </row> <div class=div-split _v-308daaf6="">&nbsp;</div> <div class=div-left _v-308daaf6=""> <div class=btn-batch _v-308daaf6=""> <i-input :value.sync=paraValueLeft _v-308daaf6=""> <i-select :model.sync=paraNameLeft slot=prepend style="width: 80px" _v-308daaf6=""> <i-option value=id _v-308daaf6="">资源ID</i-option> <i-option value=name _v-308daaf6="">资源名称</i-option> <i-option value=keyword _v-308daaf6="">关键字</i-option> </i-select> <i-button type=primary slot=append icon=ios-search @click=searchLeft(1) _v-308daaf6=""></i-button> </i-input> </div> <i-table size=small border="" stripe="" :columns=serachtable :data=serachdata @on-selection-change=addselection @on-sort-change=lefttablesort no-data-text=没有可显示的数据.. highlight-row="" _v-308daaf6=""> </i-table> <div style="margin-top:5px; float: right" _v-308daaf6=""> <page :total=pagerLeft.total :page-size=searchParamsLeft.count :current=currentLeft simple="" @on-change=onpagingLeft _v-308daaf6=""></page> </div> </div> <div class="div-left div-splitop" _v-308daaf6=""> <i-button type=info @click.stop.prevent=addmulti() class=btn-batch icon=arrow-right-a _v-308daaf6="">添加</i-button><br _v-308daaf6=""> <i-button type=error @click.stop.prevent=delmulti() class=btn-batch icon=arrow-left-a _v-308daaf6="">删除</i-button> </div> <div class="div-left div-right2" _v-308daaf6=""> <div class=btn-batch _v-308daaf6=""> <i-input :value.sync=paraValueRight disabled="" _v-308daaf6=""> <i-select :model.sync=paraNameRight slot=prepend style="width: 80px" _v-308daaf6=""> <i-option value=id _v-308daaf6="">资源ID</i-option> <i-option value=name _v-308daaf6="">资源名称</i-option> <i-option value=keyword _v-308daaf6="">关键字</i-option> </i-select> <i-button type=primary slot=append icon=ios-search _v-308daaf6=""></i-button> </i-input> </div> <i-table size=small border="" stripe="" :columns=addedtable :data=addeddata @on-selection-change=delselection @on-sort-change=righttablesort no-data-text=没有可显示的数据.. highlight-row="" _v-308daaf6=""></i-table> <div style="margin-top:5px; float: right" _v-308daaf6=""> <page :total=pagerRight.total :page-size=searchParamsRight.offset simple="" @on-change=onpagingRight _v-308daaf6=""></page> </div> </div> <div class=div-ops _v-308daaf6=""> <i-button type=ghost @click=goBack _v-308daaf6="">返回</i-button>&nbsp; <i-button type=primary @click=goNext _v-308daaf6="">下一步</i-button> </div> </div> </div> '}});