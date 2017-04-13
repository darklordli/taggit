webpackJsonp([7],{498:function(a,t,e){var s,i;e(499),s=e(500),i=e(501),a.exports=s||{},a.exports.__esModule&&(a.exports=a.exports.default),i&&(("function"==typeof a.exports?a.exports.options:a.exports).template=i)},499:function(a,t){},500:function(a,t,e){"use strict";function s(a){return a&&a.__esModule?a:{default:a}}Object.defineProperty(t,"__esModule",{value:!0});var i=e(9),o=s(i),n=e(11),l=s(n);t.default={data:function(){return{self:this,selectData:[],globalId:0,pageTotal:0,songlistdata:{name:"",childname:"",type:"",playtype:"",img_large:"",img_small:""},columns:[{type:"selection",width:50,align:"center"},{title:"ID",key:"rid",align:"center",sortable:!0},{title:"资源名称",key:"rname",sortable:!0,ellipsis:!0},{title:"APP名称",key:"nick_name",render:function(a,t,e){return'<i-input placeholder="" :value="resList['+e+'].nick_name" @on-enter="saveItemEdit('+e+", '"+t.key+"')\"></i-input>"}},{title:"集数",key:"sort",align:"center",render:function(a,t,e){return'<i-input class="number-input" number placeholder="" :value="resList['+e+'].sort" @on-enter="saveItemEdit('+e+", '"+t.key+"')\"></i-input>"}},{title:"分类",key:"category",align:"center"},{title:"状态",key:"clevel",align:"center",render:function(a,t,e){switch(a.clevel){case 0:return"新增资源";case 5:return"资源上架";default:return"xxx状态"}}},{title:"操作",key:"action",width:150,align:"center",render:function(a,t,e){return'<i-button type="error" size="small" @click="removeItem('+e+')">删除</i-button>'}}],resList:[]}},ready:function(){this.getSongInfo(0)},methods:{showEdit:function(){},getSongInfo:function(a){var t=this;l.default.ajax({method:"get",url:o.default.ajaxUrl+"/album/"+this.globalId,params:{from:a,offset:20}}).then(function(a){var e=a.data;0==e.result?(t.songlistdata=e.data,t.resList=e.data.rids,t.pageTotal=e.data.total):t.$Message.warning(e.desc)}).catch(function(a){console.log(a)})},selectChange:function(a){this.selectData=a},removeAll:function(){var a=this,t=this,e={res_db:"ai",rids:[]};t.selectData.forEach(function(a,t,s){e.rids.push(a.rid)}),console.log(e),l.default.ajax({method:"post",url:o.default.ajaxUrl+"/album/resources/unset/"+this.globalId,data:e}).then(function(e){var s=e.data;0==s.result?(a.$Message.success(s.msg),t.selectData.forEach(function(a,e,s){t.resList.forEach(function(e,s,i){e.id===a.id&&t.resList.splice(s,1)})})):a.$Message.warning(s.desc)}).catch(function(a){console.log(a)})},removeItem:function(a){var t=this,e=this.resList[a].rid,s={res_db:"ai",rids:[e]};l.default.ajax({method:"post",url:o.default.ajaxUrl+"/album/resources/unset/"+this.globalId,data:s}).then(function(e){var s=e.data;0==s.result?(t.$Message.success(s.msg),t.resList.splice(a,1)):t.$Message.warning(s.desc)}).catch(function(a){console.log(a)})},mockTableData:function(){return this.resList},changePage:function(a){this.getSongInfo(a)},saveItemEdit:function(a,t){var e=this,s=event.target;console.log(t);var i=(this.resList[a].id,this.resList[a].rid);"nick_name"==t&&(this.resList[a].nick_name=s.value),"sort"==t&&(this.resList[a].sort=s.value);var n={nick_name:this.resList[a].nick_name,sort:this.resList[a].sort};l.default.ajax({method:"post",url:o.default.ajaxUrl+"/album/resources/"+this.globalId+"/"+i+"?res_db=aires",data:n}).then(function(a){var t=a.data;0==t.result?e.$Message.success(t.msg):e.$Message.warning(t.desc)}).catch(function(a){console.log(a)})},outItem:function(){},importInfo:function(){},createdFinish:function(){this.$router.go({name:"categorylist"})},handleFormatError:function(a){this.$Notice.warning({title:"文件格式不正确",desc:"文件 "+a.name+" 格式不正确，请上传 txt 或 csv 格式的图片。"})},handleMaxSize:function(a){this.$Notice.warning({title:"超出文件大小限制",desc:"文件 "+a.name+" 太大，不能超过 10M。"})},handleSuccess:function(a,t){}},route:{data:function(a){this.globalId=a.to.params.listid,a.next()}}}},501:function(a,t){a.exports=' <div class=layout-header _v-3aa76698=""> </div> <div class=layout-breadcrumb _v-3aa76698=""> <breadcrumb _v-3aa76698=""> <breadcrumb-item _v-3aa76698="">首页</breadcrumb-item> <breadcrumb-item _v-3aa76698="">歌单管理</breadcrumb-item> <breadcrumb-item _v-3aa76698="">歌单列表</breadcrumb-item> </breadcrumb> </div> <div class=layout-content _v-3aa76698=""> <div class=layout-content-main _v-3aa76698=""> <row _v-3aa76698=""> <steps :current=2 _v-3aa76698=""> <step title=编辑专辑 content=专辑内容编辑.. _v-3aa76698=""></step> <step title=添加资源 content=歌单内容编辑.. _v-3aa76698=""></step> <step title=资源整理 content=整理已添加的资源.. _v-3aa76698=""></step> </steps> </row> <div class=file-upload _v-3aa76698=""> <div _v-3aa76698=""> <upload :format="[\'txt\',\'csv\']" :on-format-error=handleFormatError :max-size=10240 :on-exceeded-size=handleMaxSize :on-success=handleSuccess multiple="" action=//jsonplaceholder.typicode.com/posts/ _v-3aa76698=""> <i-button type=primary icon=ios-cloud-upload-outline _v-3aa76698="">批量导入信息</i-button> </upload> </div> </div> <row type=flex justify=start align=middle _v-3aa76698=""> <i-col span=12 _v-3aa76698=""> <row class=detail-row _v-3aa76698=""> <i-col span=5 class=col-right _v-3aa76698="">专辑名称：</i-col> <i-col span=5 class=col-left _v-3aa76698="">{{songlistdata.name}}</i-col> </row> <row class=detail-row _v-3aa76698=""> <i-col span=5 class=col-right _v-3aa76698="">子专辑名称：</i-col> <i-col span=5 class=col-left _v-3aa76698="">{{songlistdata.childname}}</i-col> </row> <row class=detail-row _v-3aa76698=""> <i-col span=5 class=col-right _v-3aa76698="">类型：</i-col> <i-col span=5 class=col-left _v-3aa76698="">{{songlistdata.type}}</i-col> </row> <row class=detail-row _v-3aa76698=""> <i-col span=5 class=col-right _v-3aa76698="">播放形式：</i-col> <i-col span=5 class=col-left _v-3aa76698="">{{songlistdata.playtype}}</i-col> </row> </i-col> <i-col span=6 _v-3aa76698=""> <img :src=songlistdata.img_large alt=小图 _v-3aa76698=""> </i-col> <i-col span=6 _v-3aa76698=""> <img :src=songlistdata.img_small alt=大图 _v-3aa76698=""> </i-col> </row> <div class=main-hd _v-3aa76698=""> 资源列表 </div> <div class=main-table _v-3aa76698=""> <i-table :content=self :columns=columns :data=resList @on-selection-change=selectChange _v-3aa76698=""></i-table> <div style="margin: 10px;overflow: hidden" _v-3aa76698=""> <div class="" _v-3aa76698=""> <i-button type=error @click=removeAll _v-3aa76698="">批量删除</i-button> </div> <div style="float: right" _v-3aa76698=""> <page :total=pageTotal :page-size=20 show-total="" :current=1 show-sizer="" @on-change=changePage show-elevator="" _v-3aa76698=""></page> </div> </div> </div> <div class=btn-box _v-3aa76698=""> <i-button type=success @click=createdFinish _v-3aa76698="">完成</i-button> </div> </div> </div> '}});