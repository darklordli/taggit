webpackJsonp([3],{482:function(e,t,a){var r,o;a(483),r=a(484),o=a(485),e.exports=r||{},e.exports.__esModule&&(e.exports=e.exports.default),o&&(("function"==typeof e.exports?e.exports.options:e.exports).template=o)},483:function(e,t){},484:function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=a(9),i=(r(o),a(11)),n=r(i);t.default={data:function(){return{resouretable:[{title:"ID",key:"id",align:"center",sortable:"custom",render:function(e,t,a){return'<a href="http://ecp.roobo.com/resources/operation/voice/toDetail?id='+e.id+'" >'+e.id+"</a>"}},{title:"资源名称",key:"name",align:"center",sortable:"custom"},{title:"类型",key:"tag"},{title:"来源",key:"source",sortable:"custom"},{title:"状态",key:"clevel",sortable:"custom",render:function(e){var t=n.default.getResouceStatus(e.clevel);return t}}],resouredata:[],current:1,searchParams:{offset:1,count:15,sort:null,tagnew:0},pager:{total:0}}},ready:function(){this.searchParams.tagnew=this.$route.params.id,this.initTable()},methods:{initTable:function(){var e=this;this.searchParams.offset=(this.current-1)*this.searchParams.count,n.default.ajax({method:"POST",url:n.default.getUrl("/airesources/query"),data:this.searchParams}).then(function(t){var a=t.data.data;a.resources.length?(e.resouredata=a.resources,e.pager.total=a.total):e.$Notice.warning({title:"此标签下没有资源"})}).catch(function(e){console.error(e)})},onpaging:function(e){this.current=e,this.initTable()},pageSizeChange:function(e){this.searchParams.offset=e,this.initTable()},onTableSortting:function(e){if("normal"!==e.order){var t=e.key+","+e.order;this.searchParams.sort=t,this.initTable()}},goback:function(){this.$router.go({name:"tagmanger"})}}}},485:function(e,t){e.exports=' <div class=layout-header _v-4939d85c=""></div> <div class=layout-breadcrumb _v-4939d85c=""> <breadcrumb _v-4939d85c=""> <breadcrumb-item _v-4939d85c="">首页</breadcrumb-item> <breadcrumb-item _v-4939d85c="">标签管理</breadcrumb-item> <breadcrumb-item href=# v-link="{name:\'tagmanger\'}" _v-4939d85c="">分类标签列表</breadcrumb-item> <breadcrumb-item _v-4939d85c="">分类标签资源</breadcrumb-item> </breadcrumb> </div> <div class=layout-content _v-4939d85c=""> <div class=layout-content-main _v-4939d85c=""> <row type=flex align=middle _v-4939d85c=""> <i-col :gutter=16 span=20 _v-4939d85c=""> <h3 _v-4939d85c="">标签资源列表（安全、哄睡、1-3岁）</h3> </i-col> <i-col span=3 offset=1 _v-4939d85c=""> <i-button type=info icon=ios-download _v-4939d85c="">导出列表</i-button> </i-col> </row> <div _v-4939d85c="">&nbsp;</div> <div class=main-table _v-4939d85c=""> <i-table stripe="" :columns=resouretable :data=resouredata @on-sort-change=onTableSortting _v-4939d85c=""> </i-table> </div> <div style="float: right;margin-bottom:10px" _v-4939d85c=""> <page :total=pager.total :page-size=searchParams.count :page-size-opts=[15,50,100] @on-page-size-change=pageSizeChange show-sizer="" show-total="" show-elevator="" @on-change=onpaging _v-4939d85c=""> </page> </div> <div _v-4939d85c=""> <i-button type=dashed @click=goback long="" _v-4939d85c="">返回</i-button> </div> </div> </div> '}});