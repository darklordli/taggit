webpackJsonp([10],{473:function(e,t,i){"use strict";var r=i(474),a=i(477),o=i(476);e.exports={formats:o,parse:a,stringify:r}},474:function(e,t,i){"use strict";var r=i(475),a=i(476),o={brackets:function(e){return e+"[]"},indices:function(e,t){return e+"["+t+"]"},repeat:function(e){return e}},n=Date.prototype.toISOString,s={delimiter:"&",encode:!0,encoder:r.encode,encodeValuesOnly:!1,serializeDate:function(e){return n.call(e)},skipNulls:!1,strictNullHandling:!1},l=function e(t,i,a,o,n,s,l,c,u,d,f,p){var m=t;if("function"==typeof l)m=l(i,m);else if(m instanceof Date)m=d(m);else if(null===m){if(o)return s&&!p?s(i):i;m=""}if("string"==typeof m||"number"==typeof m||"boolean"==typeof m||r.isBuffer(m)){if(s){var h=p?i:s(i);return[f(h)+"="+f(s(m))]}return[f(i)+"="+f(String(m))]}var v=[];if("undefined"==typeof m)return v;var y;if(Array.isArray(l))y=l;else{var g=Object.keys(m);y=c?g.sort(c):g}for(var b=0;b<y.length;++b){var w=y[b];n&&null===m[w]||(v=Array.isArray(m)?v.concat(e(m[w],a(i,w),a,o,n,s,l,c,u,d,f,p)):v.concat(e(m[w],i+(u?"."+w:"["+w+"]"),a,o,n,s,l,c,u,d,f,p)))}return v};e.exports=function(e,t){var i=e,r=t||{};if(null!==r.encoder&&void 0!==r.encoder&&"function"!=typeof r.encoder)throw new TypeError("Encoder has to be a function.");var n="undefined"==typeof r.delimiter?s.delimiter:r.delimiter,c="boolean"==typeof r.strictNullHandling?r.strictNullHandling:s.strictNullHandling,u="boolean"==typeof r.skipNulls?r.skipNulls:s.skipNulls,d="boolean"==typeof r.encode?r.encode:s.encode,f="function"==typeof r.encoder?r.encoder:s.encoder,p="function"==typeof r.sort?r.sort:null,m="undefined"!=typeof r.allowDots&&r.allowDots,h="function"==typeof r.serializeDate?r.serializeDate:s.serializeDate,v="boolean"==typeof r.encodeValuesOnly?r.encodeValuesOnly:s.encodeValuesOnly;if("undefined"==typeof r.format)r.format=a.default;else if(!Object.prototype.hasOwnProperty.call(a.formatters,r.format))throw new TypeError("Unknown format option provided.");var y,g,b=a.formatters[r.format];"function"==typeof r.filter?(g=r.filter,i=g("",i)):Array.isArray(r.filter)&&(g=r.filter,y=g);var w=[];if("object"!=typeof i||null===i)return"";var _;_=r.arrayFormat in o?r.arrayFormat:"indices"in r?r.indices?"indices":"repeat":"indices";var x=o[_];y||(y=Object.keys(i)),p&&y.sort(p);for(var k=0;k<y.length;++k){var j=y[k];u&&null===i[j]||(w=w.concat(l(i[j],j,x,c,u,d?f:null,g,p,m,h,b,v)))}return w.join(n)}},475:function(e,t){"use strict";var i=Object.prototype.hasOwnProperty,r=function(){for(var e=[],t=0;t<256;++t)e.push("%"+((t<16?"0":"")+t.toString(16)).toUpperCase());return e}();t.arrayToObject=function(e,t){for(var i=t&&t.plainObjects?Object.create(null):{},r=0;r<e.length;++r)"undefined"!=typeof e[r]&&(i[r]=e[r]);return i},t.merge=function(e,r,a){if(!r)return e;if("object"!=typeof r){if(Array.isArray(e))e.push(r);else{if("object"!=typeof e)return[e,r];(a.plainObjects||a.allowPrototypes||!i.call(Object.prototype,r))&&(e[r]=!0)}return e}if("object"!=typeof e)return[e].concat(r);var o=e;return Array.isArray(e)&&!Array.isArray(r)&&(o=t.arrayToObject(e,a)),Array.isArray(e)&&Array.isArray(r)?(r.forEach(function(r,o){i.call(e,o)?e[o]&&"object"==typeof e[o]?e[o]=t.merge(e[o],r,a):e.push(r):e[o]=r}),e):Object.keys(r).reduce(function(e,i){var o=r[i];return Object.prototype.hasOwnProperty.call(e,i)?e[i]=t.merge(e[i],o,a):e[i]=o,e},o)},t.decode=function(e){try{return decodeURIComponent(e.replace(/\+/g," "))}catch(t){return e}},t.encode=function(e){if(0===e.length)return e;for(var t="string"==typeof e?e:String(e),i="",a=0;a<t.length;++a){var o=t.charCodeAt(a);45===o||46===o||95===o||126===o||o>=48&&o<=57||o>=65&&o<=90||o>=97&&o<=122?i+=t.charAt(a):o<128?i+=r[o]:o<2048?i+=r[192|o>>6]+r[128|63&o]:o<55296||o>=57344?i+=r[224|o>>12]+r[128|o>>6&63]+r[128|63&o]:(a+=1,o=65536+((1023&o)<<10|1023&t.charCodeAt(a)),i+=r[240|o>>18]+r[128|o>>12&63]+r[128|o>>6&63]+r[128|63&o])}return i},t.compact=function(e,i){if("object"!=typeof e||null===e)return e;var r=i||[],a=r.indexOf(e);if(a!==-1)return r[a];if(r.push(e),Array.isArray(e)){for(var o=[],n=0;n<e.length;++n)e[n]&&"object"==typeof e[n]?o.push(t.compact(e[n],r)):"undefined"!=typeof e[n]&&o.push(e[n]);return o}var s=Object.keys(e);return s.forEach(function(i){e[i]=t.compact(e[i],r)}),e},t.isRegExp=function(e){return"[object RegExp]"===Object.prototype.toString.call(e)},t.isBuffer=function(e){return null!==e&&"undefined"!=typeof e&&!!(e.constructor&&e.constructor.isBuffer&&e.constructor.isBuffer(e))}},476:function(e,t){"use strict";var i=String.prototype.replace,r=/%20/g;e.exports={default:"RFC3986",formatters:{RFC1738:function(e){return i.call(e,r,"+")},RFC3986:function(e){return e}},RFC1738:"RFC1738",RFC3986:"RFC3986"}},477:function(e,t,i){"use strict";var r=i(475),a=Object.prototype.hasOwnProperty,o={allowDots:!1,allowPrototypes:!1,arrayLimit:20,decoder:r.decode,delimiter:"&",depth:5,parameterLimit:1e3,plainObjects:!1,strictNullHandling:!1},n=function(e,t){for(var i={},r=e.split(t.delimiter,t.parameterLimit===1/0?void 0:t.parameterLimit),o=0;o<r.length;++o){var n,s,l=r[o],c=l.indexOf("]=")===-1?l.indexOf("="):l.indexOf("]=")+1;c===-1?(n=t.decoder(l),s=t.strictNullHandling?null:""):(n=t.decoder(l.slice(0,c)),s=t.decoder(l.slice(c+1))),a.call(i,n)?i[n]=[].concat(i[n]).concat(s):i[n]=s}return i},s=function(e,t,i){if(!e.length)return t;var r,a=e.shift();if("[]"===a)r=[],r=r.concat(s(e,t,i));else{r=i.plainObjects?Object.create(null):{};var o="["===a.charAt(0)&&"]"===a.charAt(a.length-1)?a.slice(1,-1):a,n=parseInt(o,10);!isNaN(n)&&a!==o&&String(n)===o&&n>=0&&i.parseArrays&&n<=i.arrayLimit?(r=[],r[n]=s(e,t,i)):r[o]=s(e,t,i)}return r},l=function(e,t,i){if(e){var r=i.allowDots?e.replace(/\.([^.[]+)/g,"[$1]"):e,o=/(\[[^[\]]*])/,n=/(\[[^[\]]*])/g,l=o.exec(r),c=l?r.slice(0,l.index):r,u=[];if(c){if(!i.plainObjects&&a.call(Object.prototype,c)&&!i.allowPrototypes)return;u.push(c)}for(var d=0;null!==(l=n.exec(r))&&d<i.depth;){if(d+=1,!i.plainObjects&&a.call(Object.prototype,l[1].slice(1,-1))&&!i.allowPrototypes)return;u.push(l[1])}return l&&u.push("["+r.slice(l.index)+"]"),s(u,t,i)}};e.exports=function(e,t){var i=t||{};if(null!==i.decoder&&void 0!==i.decoder&&"function"!=typeof i.decoder)throw new TypeError("Decoder has to be a function.");if(i.delimiter="string"==typeof i.delimiter||r.isRegExp(i.delimiter)?i.delimiter:o.delimiter,i.depth="number"==typeof i.depth?i.depth:o.depth,i.arrayLimit="number"==typeof i.arrayLimit?i.arrayLimit:o.arrayLimit,i.parseArrays=i.parseArrays!==!1,i.decoder="function"==typeof i.decoder?i.decoder:o.decoder,i.allowDots="boolean"==typeof i.allowDots?i.allowDots:o.allowDots,i.plainObjects="boolean"==typeof i.plainObjects?i.plainObjects:o.plainObjects,i.allowPrototypes="boolean"==typeof i.allowPrototypes?i.allowPrototypes:o.allowPrototypes,i.parameterLimit="number"==typeof i.parameterLimit?i.parameterLimit:o.parameterLimit,i.strictNullHandling="boolean"==typeof i.strictNullHandling?i.strictNullHandling:o.strictNullHandling,""===e||null===e||"undefined"==typeof e)return i.plainObjects?Object.create(null):{};for(var a="string"==typeof e?n(e,i):e,s=i.plainObjects?Object.create(null):{},c=Object.keys(a),u=0;u<c.length;++u){var d=c[u],f=l(d,a[d],i);s=r.merge(s,f,i)}return r.compact(s)}},544:function(e,t,i){var r,a;i(545),r=i(546),a=i(548),e.exports=r||{},e.exports.__esModule&&(e.exports=e.exports.default),a&&(("function"==typeof e.exports?e.exports.options:e.exports).template=a)},545:function(e,t){},546:function(e,t,i){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=i(6),o=r(a),n=i(9),s=r(n),l=i(11),c=r(l),u=i(473),d=r(u),f=i(547),p=[{value:-2,text:"已删除"},{value:-1,text:"不处理"},{value:0,text:"已下架"},{value:1,text:"未提交"},{value:2,text:"编辑中"},{value:3,text:"待审核"},{value:4,text:"待上架"},{value:5,text:"已上架"}];t.default={name:"editoraudit",data:function(){var e=function(e,t,i){return t?i():i(new Error("分类不能为空"))};return{spinShow:!0,upUrl:"",verifyStatus:p,self:this,showbox:!1,ikeywords:"",searchData:[],pageTotal:0,pageCurr:1,playStatus:[],catsArr:[],sourceArr:[],lock:!1,selectTableData:[],reviewed:{begintime:"",endtime:""},editor:{begintime:"",endtime:""},iname:"",iid:"",formItem:{type:1,offset:0,count:50,userinfo:{reviewer:"",reviewed_at:[],editor:"",edited_at:[]}},columns:[{type:"selection",width:40,align:"center"},{title:"ID",key:"id",align:"center",width:100},{title:"资源名称",key:"name",sortable:!0,ellipsis:!0,width:180,render:function(e,t,i){return'<i-button type="ghost" shape="circle" :icon="playStatus['+i+'].status" size="small" @click="playPause('+i+')"></i-button>\n                        <audio id="audio'+i+'" preload="none">\n                        <source src="'+e.content+'" type="audio/mpeg"></audio>\n                        <a v-link="{name:\'resouredetail\', params:{id:'+e.id+'}, query: {action: \'detail\'}}" target="_blank">'+e.name+"</a>"}},{title:"分类",key:"category",align:"center",width:100},{title:"来源",key:"source",align:"center",width:100},{title:"审核状态",key:"clevel",align:"center",width:120,render:function(e){var t=c.default.getResouceStatus(e.clevel);return t}},{title:"作者/歌手",key:"artist",align:"center",width:100},{title:"编辑人",key:"userinfo.editor",align:"center",width:80},{title:"编辑时间",align:"center",key:"userinfo.edited_at",width:160,render:function(e,t,i){return c.default.dataformat(e.userinfo.edited_at)}},{title:"审核人",key:"userinfo.reviewer",align:"center",width:100},{title:"审核时间",key:"userinfo.reviewer_at",align:"center",width:160,render:function(e,t,i){return c.default.dataformat(e.userinfo.reviewed_at)}},{title:"操作",key:"action",width:250,align:"center",fixed:"right",render:function(e,t,i){var r=!1,a=!1,o=!1,n=!1;return 5==e.clevel?(r=!0,a=!0,o=!0,n=!0):4==e.clevel?(r=!0,o=!0,n=!0):0==e.clevel?n=!0:1==e.clevel?(a=!0,n=!0):2==e.clevel?a=!0:e.clevel==-1?(a=!0,n=!0):3==e.clevel?(r=!0,o=!0):e.clevel==-2?(r=!0,a=!0,o=!0,n=!0):(r=!0,a=!0,o=!0,n=!0),"<a v-link=\"{name:'resouredetail', params:{id:"+e.id+'}, query: {action: \'edit\'}}" target="_blank"><i-button :disabled="'+o+'" type="primary"size="small">编辑</i-button></a>\n                        <a v-link="{name:\'resouredetail\', params:{id:'+e.id+'}, query: {action: \'verify\'}}" target="_blank"><i-button :disabled="'+n+'" type="primary" size="small">审核</i-button></a>\n                        <i-button :disabled="'+a+'" type="warning" size="small"\n                        @click="upShelves('+i+')">直接上架</i-button>\n                        <i-button :disabled="'+r+'" type="error" size="small" @click="removeItem('+i+')">删除</i-button>\n                        '}}],ruleCustom:{tagnew:[{validator:e,trigger:"change"}]},tag:{value:[],data:[],show:!0}}},ready:function(){this.getCats(),this.getSource(),this.searchQuery(0),this.getTagList(),this.upUrl=s.default.ajaxUrl+"/fileinput"},vuex:{actions:{setTags:f.setTags}},methods:{getTagList:function(){var e=this,t={type:0};c.default.ajax({method:"POST",url:c.default.getUrl("/tag/list"),data:t}).then(function(t){var i=t.data;0==i.result?(console.log(i.data.children),e.$set("tag.data",i.data.children)):e.$Message.warning(i.desc)}).catch(function(e){console.error(e)})},handleSuccess:function(e,t){this.$Message.success(e.msg)},handleFormatError:function(e){this.$Notice.warning({title:"文件格式不正确",desc:"文件 "+e.name+" 格式不正确，请上传 excel 或 csv 格式的文件。"})},handleMaxSize:function(e){this.$Notice.warning({title:"超出文件大小限制",desc:"文件 "+e.name+" 太大，不能超过 10M。"})},showHighSearch:function(){this.showbox=!this.showbox},getSource:function(){this.sourceArr=c.default.getSource},getCats:function(){var e=this,t={appId:"",id:0,type:0,depth:2};c.default.ajax({method:"POST",url:c.default.getUrl("/tag/list2"),data:t}).then(function(t){var i=t.data;0==i.result?e.catsArr=i.data:e.$Message.warning(i.desc)}).catch(function(e){console.error(e)})},parseTime:function(e){return Date.parse(new Date(e))/1e3},handleReset:function(e){this.$refs[e].resetFields(),this.editor={begintime:"",endtime:""},this.reviewed={begintime:"",endtime:""},this.ikeywords="",this.iname="",this.iid="",this.tag.show=!this.tag.show},searchQuery:function(e){var t=this;""!==this.reviewed.begintime?this.formItem.userinfo.reviewed_at[0]=this.parseTime(this.reviewed.begintime):this.formItem.userinfo.reviewed_at[0]=0,""!==this.reviewed.endtime?this.formItem.userinfo.reviewed_at[1]=this.parseTime(this.reviewed.endtime):this.formItem.userinfo.reviewed_at[1]=0,""!==this.editor.begintime?this.formItem.userinfo.edited_at[0]=this.parseTime(this.editor.begintime):this.formItem.userinfo.edited_at[0]=0,""!==this.editor.endtime?this.formItem.userinfo.edited_at[1]=this.parseTime(this.editor.endtime):this.formItem.userinfo.edited_at[1]=0,this.pageCurr=1,this.formItem.offset=e,""!==this.ikeywords?this.formItem.keywords=this.ikeywords.split(/[,，]/):this.formItem.keywords=null,""!==this.iname?this.formItem.name=this.iname.split(";"):this.formItem.name=null,""!==this.iid?this.formItem.id=this.iid.split(" "):this.formItem.id=null,console.log(this.formItem),this.$Loading.start(),c.default.ajax({method:"post",url:s.default.ajaxUrl+"/airesources/query",data:this.formItem}).then(function(e){var i=e.data;0==i.result?(t.$Loading.finish(),t.spinShow=!1,t.lock=!0,t.searchData=i.data.resources,t.pageTotal=i.data.total,t.searchData.forEach(function(e,i,r){t.playStatus.$set(i,{status:"play"})})):t.$Message.warning(i.desc)}).catch(function(e){t.$Loading.error(),t.spinShow=!1,console.log(e)})},selectChange:function(e){this.selectTableData=e},changePage:function(e){this.searchQuery(e),this.pageCurr=e},pageSizeChange:function(e){this.formItem.count=e,this.searchQuery(0)},linkDetail:function(e){this.$router.go({name:"resouredetail",params:{id:this.searchData[e].id},query:{action:"detail"}})},editItem:function(e){this.$router.go({name:"resouredetail",params:{id:this.searchData[e].id},query:{action:"edit"}})},verifyItem:function(e){this.$router.go({name:"resouredetail",params:{id:this.searchData[e].id},query:{action:"verify"}})},upShelves:function(e){var t=this;this.searchData[e].clevel=5;var i={json:(0,o.default)(this.searchData[e])};c.default.ajax({method:"post",url:s.default.ajaxUrl+"/airesources/"+this.searchData[e].id,data:d.default.stringify(i)}).then(function(e){var i=e.data;0==i.result?t.$Message.success(i.msg):t.$Message.warning(i.desc)}).catch(function(e){console.log(e)})},removeItem:function(e){var t=this;this.searchData[e].clevel=-2;var i={json:(0,o.default)(this.searchData[e])};c.default.ajax({method:"post",url:s.default.ajaxUrl+"/airesources/"+this.searchData[e].id,data:d.default.stringify(i)}).then(function(i){var r=i.data;0==r.result?(t.$Message.success(r.msg),t.searchData.splice(e,1)):t.$Message.warning(r.desc)}).catch(function(e){console.log(e)})},vuexData:function(){var e=[];this.selectTableData.forEach(function(t,i,r){e.$set(i,{id:t.id})}),this.setTags(e)},markTags:function(){this.vuexData(),this.$router.go({name:"multitagmark"})},addTags:function(){var e=this;this.vuexData(),this.$refs.formItem.validateField("tagnew",function(t){if(console.log(t),t)e.$Message.error("请选择分类检索!"),e.showbox=!0,e.lock=!1;else{if(!e.lock)return e.$Message.error("请点击搜索按钮检索!"),!1;e.$router.go({name:"multitagadd"})}})},vuexData2:function(){var e=[];this.selectTableData.forEach(function(t,i,r){e.$set(i,{id:t.id,name:t.name,artist:t.artist,category:t.category,source:t.source})}),this.setTags(e)},removeTags:function(){this.vuexData2(),this.$router.go({name:"multitagclean"})},verifyAll:function(){var e=this,t=this;t.$Modal.confirm({title:"",content:"<p>确认批量审核通过？</p>",onOk:function(){var i={res_db:"aires",resources:[]};e.selectTableData.forEach(function(e,t,r){i.resources.$set(t,{id:e.id,clevel:4,userinfo:e.userinfo})}),c.default.ajax({method:"post",url:s.default.ajaxUrl+"/airesources/batch",data:i}).then(function(i){var r=i.data;0==r.result?(e.$Message.success(r.msg),setTimeout(function(){t.searchQuery(0)},1e3)):e.$Message.warning(r.desc)}).catch(function(e){console.log(e)})},onCancel:function(){return!1}})},playPause:function(e){var t=this,i=(event.target,document.getElementById("audio"+e));i.paused?(this.playStatus.forEach(function(i,r,a){if(r!==e){var o=document.getElementById("audio"+r);t.playStatus[r].status="play",o.currentTime=0,o.pause()}}),this.playStatus[e].status="pause",setTimeout(function(){i.play()},150)):(this.playStatus[e].status="play",i.pause())}},filters:{toInt:function(e){return parseInt(e)}},route:{data:function(e){e.next()}}}},547:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.setTags=function(e,t){var i=e.dispatch;i("TAGSDATA",t)}},548:function(e,t){e.exports=' <div class=layout-header _v-6281e460=""> </div> <div class=layout-breadcrumb _v-6281e460=""> <breadcrumb _v-6281e460=""> <breadcrumb-item _v-6281e460="">首页</breadcrumb-item> <breadcrumb-item _v-6281e460="">资源编辑审核</breadcrumb-item> </breadcrumb> </div> <div class=layout-content _v-6281e460=""> <div class=layout-content-main _v-6281e460=""> <div class=resource-update _v-6281e460=""> <div class=update-btn _v-6281e460=""> <a v-link="{name:\'voicesupload\'}" style="display:inline-block;vertical-align: top" _v-6281e460=""> <i-button type=primary _v-6281e460="">上传资源</i-button> </a> <div style=display:inline-block _v-6281e460=""> <upload :format="[\'xls\', \'xlsx\', \'csv\']" :on-format-error=handleFormatError :max-size=10240 :on-exceeded-size=handleMaxSize :on-success=handleSuccess multiple="" :action=upUrl _v-6281e460=""> <i-button type=primary icon=refresh _v-6281e460=""> 批量更新 </i-button> </upload> </div> </div> </div> <div class=resource-search _v-6281e460=""> <div class=normal-search _v-6281e460=""> <row _v-6281e460=""> <i-col span=12 _v-6281e460=""> <i-input :value.sync=formItem.search placeholder=模糊搜索关键词 @on-enter=searchQuery(0) _v-6281e460=""> <i-button slot=append icon=ios-search @click=searchQuery(0) _v-6281e460=""> </i-button> </i-input> </i-col> <i-col span=12 _v-6281e460=""> <div class=high-btn _v-6281e460=""> <i-button type=primary @click=showHighSearch _v-6281e460="">高级检索</i-button> </div> </i-col> </row> </div> <div class=high-search v-show=showbox _v-6281e460=""> <i-form v-ref:form-item="" :model=formItem :rules=ruleCustom :label-width=80 inline="" _v-6281e460=""> <form-item label=资源名称： _v-6281e460=""> <i-input :value.sync=iname placeholder=请输入 _v-6281e460=""> </i-input> </form-item> <form-item label=ID： _v-6281e460=""> <i-input :value.sync=iid placeholder=请输入 _v-6281e460=""> </i-input> </form-item> <form-item label=作者/歌手： prop=artist _v-6281e460=""> <i-input :value.sync=formItem.artist placeholder=请输入 _v-6281e460=""> </i-input> </form-item> <form-item label=分类： prop=tagnew _v-6281e460=""> <cascader v-if=tag.show :data=tag.data :value.sync=formItem.tagnew change-on-select="" _v-6281e460=""></cascader> <cascader v-else="" :data=tag.data :value.sync=formItem.tagnew change-on-select="" _v-6281e460=""></cascader> </form-item> <form-item label=来源： prop=source _v-6281e460=""> <i-select :model.sync=formItem.source placeholder=请选择 style=width:166px _v-6281e460=""> <template v-for="item in sourceArr" _v-6281e460=""> <i-option :value=item _v-6281e460="">{{item}}</i-option> </template> </i-select> </form-item> <form-item label=关键词： _v-6281e460=""> <i-input :value.sync=ikeywords placeholder=请输入 _v-6281e460=""> </i-input> </form-item> <form-item label=编辑人： prop=userinfo.reviewer _v-6281e460=""> <i-input :value.sync=formItem.userinfo.reviewer placeholder=请输入 _v-6281e460=""></i-input> </form-item> <form-item label=编辑时间： _v-6281e460=""> <row _v-6281e460=""> <i-col span=11 _v-6281e460=""> <date-picker type=date placeholder=开始时间 :value.sync=reviewed.begintime style="width: 166px" _v-6281e460=""></date-picker> </i-col> <i-col span=2 _v-6281e460=""> <div class=center-line _v-6281e460=""> - </div> </i-col> <i-col span=11 _v-6281e460=""> <date-picker type=date placeholder=结束时间 :value.sync=reviewed.endtime style="width: 166px" _v-6281e460=""></date-picker> </i-col> </row> </form-item> <form-item label=审核人： prop=userinfo.editor _v-6281e460=""> <i-input :value.sync=formItem.userinfo.editor placeholder=请输入 _v-6281e460=""></i-input> </form-item> <form-item label=审核时间： _v-6281e460=""> <row _v-6281e460=""> <i-col span=11 _v-6281e460=""> <date-picker type=date placeholder=开始时间 :value.sync=editor.begintime style="width: 166px" _v-6281e460=""></date-picker> </i-col> <i-col span=2 _v-6281e460=""> <div class=center-line _v-6281e460=""> - </div> </i-col> <i-col span=11 _v-6281e460=""> <date-picker type=date placeholder=结束时间 :value.sync=editor.endtime style="width: 166px" _v-6281e460=""></date-picker> </i-col> </row> </form-item> <form-item label=审核状态： prop=clevel _v-6281e460=""> <i-select :model.sync=formItem.clevel placeholder=请选择 style=width:166px _v-6281e460=""> <template v-for="item in verifyStatus" _v-6281e460=""> <i-option :value="item.value | toInt " _v-6281e460="">{{item.text}}</i-option> </template> </i-select> </form-item> <form-item :label-width=10 _v-6281e460=""> <i-button type=primary @click=searchQuery(0) _v-6281e460="">搜索</i-button> <i-button type=ghost @click="handleReset(\'formItem\')" style="margin-left: 5px" _v-6281e460="">重置</i-button> </form-item> </i-form> </div> </div> <div v-if=spinShow class=spin-box _v-6281e460=""> <spin size=large fix="" _v-6281e460=""></spin> </div> <div v-else="" class=search-data _v-6281e460=""> <i-table style=max-width:1490px :content=self size=small stripe="" :columns=columns :data=searchData @on-selection-change=selectChange _v-6281e460=""> </i-table> <div class=batch-action _v-6281e460=""> <i-button type=ghost @click.stop.prevent=markTags() _v-6281e460=""> 批量打分类/标签 </i-button> <i-button type=ghost @click.stop.prevent=addTags() _v-6281e460=""> 批量添加标签 </i-button> <i-button type=ghost @click.stop.prevent=removeTags() _v-6281e460=""> 批量清除标签 </i-button> <i-button type=ghost @click.stop.prevent=verifyAll() _v-6281e460=""> 批量审核通过 </i-button> </div> <div class=paging-box _v-6281e460=""> <div class=paging-container _v-6281e460=""> <page :total=pageTotal :page-size=formItem.count :page-size-opts=[50,100,200] show-total="" :current=pageCurr show-sizer="" @on-change=changePage @on-page-size-change=pageSizeChange show-elevator="" _v-6281e460=""></page> </div> </div> </div> </div> </div> '}});