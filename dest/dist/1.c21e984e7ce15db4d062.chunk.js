webpackJsonp([1],{470:function(t,e,i){var a,r;i(471),a=i(472),r=i(478),t.exports=a||{},t.exports.__esModule&&(t.exports=t.exports.default),r&&(("function"==typeof t.exports?t.exports.options:t.exports).template=r)},471:function(t,e){},472:function(t,e,i){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=i(6),o=a(r),n=i(11),l=a(n),c=i(473),s=a(c);e.default={data:function(){var t=function(t,e,i){""===e?i(new Error("必填项不能为空!")):i()};return{basicModel:{title:"abc",show:!1,action:"newCategory"},toggle:{state:!1,name:"展开全部"},tableColumns:[{title:"分类名称",key:"title",width:250,render:function(t,e,i){var a="";a=t.open?'<Icon type="chevron-down" @click.stop.prevent="close('+i+","+t.depth+')"></Icon>':'<Icon type="chevron-right" @click.stop.prevent="open('+i+","+t.depth+')"></Icon>';var r=20*t.depth,n='<span style="display: inline-block;width:'+r+'px">&nbsp;</span>',l=(0,o.default)(t),c='<span style="display:none;">'+l+"</span>";return 0===t.childrenCount?""+n+t.title+"("+t.res_count+")"+c:""+n+a+" "+t.title+"("+t.res_count+")"+c}},{title:"语义",align:"center",width:150,render:function(t,e,i){var a="";return a=t.nickname[0]?'<Poptip trigger="hover" title="'+t.nickname.length+'个规约词" placement="bottom">\n                                    <tag color="blue" @click="editWord('+t.id+',\'nickname\');">规约词</tag>\n                                    <div slot="content">\n                                        <ul><li v-for="item in treedata['+i+'].nickname" style="text-align: center;padding: 4px">{{ item }}</li></ul>\n                                    </div>\n                                </Poptip>':'<Tag color="blue" @click="editWord('+t.id+",'nickname');\">规约词</Tag>",a+=t.directname[0]?'<Poptip trigger="hover" title="'+t.directname.length+'个直达词" placement="bottom">\n                                    <tag color="green" @click="editWord('+t.id+',\'directname\');">直达词</tag>\n                                    <div slot="content">\n                                        <ul><li v-for="item in treedata['+i+'].directname" style="text-align: center;padding: 4px">{{ item }}</li></ul>\n                                    </div>\n                                </Poptip>':'<Tag color="green" @click="editWord('+t.id+",'directname');\">直达词</Tag>"}},{title:"所属类别",key:"type",align:"center",width:100,render:function(t){switch(t.type){case 1:return"标签组";case 2:return"标签";case 0:default:return"分类"}}},{title:"资源",key:"id",align:"center",width:100,render:function(t){var e='<a href="###" @click.stop.prevent="showDetail('+t.id+');">查看资源</a>';return e}},{title:"编辑人",key:"editor",align:"center",width:120},{title:"编辑时间",key:"updated_at",align:"center",width:350,render:function(t){return""}},{title:"操作1",key:"action",align:"center",width:280,fixed:"right",render:function(t){var e="",i='<i-button type="info" '+e+' size="small" @click="newChild('+t.id+',0);">添加子分类</i-button>&nbsp;&nbsp;';return i+='<i-button type="info" '+e+' size="small" @click="newChild('+t.id+',1);">添加标签组</i-button>&nbsp;&nbsp;',i+='<i-button type="info" '+e+' size="small" @click="newChild('+t.id+',2);">添加子标签</i-button>'}},{title:"操作2",key:"action",align:"center",width:140,fixed:"right",render:function(t){var e="";return e+='<i-button type="primary" size="small" @click="goEdit('+t.id+');">编辑</i-button>&nbsp;&nbsp;',e+='<i-button type="error" size="small" @click="del('+t.id+');">删除</i-button>'}}],tabledata:[],treedata:[],searchParams:{from:1,offset:10,pids2:0,res_total:1},formCustom:{title:"",id:0,type:0},ruleCustom:{title:[{validator:t,trigger:"blur"}]}}},ready:function(){this.loadData()},methods:{loadData:function(){var t=this;this.$Loading.start(),l.default.ajax({method:"POST",url:l.default.getUrl("/tag/list"),data:[]}).then(function(e){if(0!==e.data.result)return t.$Notice.error({title:e.data.msg,desc:e.data.desc,duration:0}),void t.$Loading.error();for(var i=e.data.data,a=i.children,r=0;r<a.length;r++)a[r].open=!1,a[r].depth=0,a[r].parentId=0,a[r].childrenCount=a[r].children.length;t.treedata=a,t.$Loading.finish()}).catch(function(t){console.error(t)})},changePage:function(t){this.currentPage=t,this.loadData()},toggleTreeGrid:function(){this.toggle.state?(this.collapseAll(),this.toggle.name="展开全部"):(this.expandAll(),this.toggle.name="折叠全部"),this.toggle.state=!this.toggle.state},expandAll:function(){for(var t=0;t<this.treedata.length;t++)this.open(t,this.treedata[t].depth)},collapseAll:function(){for(var t=0;t<this.treedata.length;t++)this.close(t)},open:function(t,e){e++;var i=this.treedata[t];i.open=!0;for(var a=i.children,r=0;r<a.length;r++){var o=a[r];o.depth=e,o.open=!1,o.parentId=i.id,o.childrenCount=o.children.length,this.treedata.splice(t+1,0,o)}},showDetail:function(t){this.$router.go({name:"tagsongs",params:{id:t}})},close:function(t){var e=this.treedata[t];e.open=!1,this.removeData(e.id)},removeData:function(t){for(var e=0,i=!0,a=this.treedata.length;e<a;i?e++:e)this.treedata[e]&&this.treedata[e].parentId===t?(this.treedata[e].childrenCount>0&&this.removeData(this.treedata[e].id),this.treedata.splice(e,1),i=!1):i=!0},changeOnline:function(t,e){var i=this,a=0===e?"确认切换至【下线】?":"确认切换至【上线】?";if(window.confirm(a)){var r=0===e?1:0,n={json:(0,o.default)({online:r})};l.default.ajax({method:"post",url:l.default.getUrl("/album/"+t),data:s.default.stringify(n)}).then(function(e){var a=e.data;0==a.result?(i.$Notice.success({title:"状态切换成功!"}),i.updateTableData(t,"online",r)):i.$$Notice.warning(a.desc)}).catch(function(t){console.log(t)})}},del:function(t){var e=this;if(window.confirm("确认删除?")){var i={id:[t],editor:"aiai"};l.default.ajax({method:"POST",url:l.default.getUrl("/tag/unset"),data:i}).then(function(t){return 0!==t.data.result?void e.$Notice.warning({title:"删除失败!",desc:t.data.desc}):(e.$Notice.success({title:"删除成功!"}),void e.loadData())}).catch(function(t){console.error(t)})}},goEdit:function(t){this.basicModel.title="编辑分类",this.basicModel.show=!0,this.basicModel.action="editCategory",this.formCustom.id=t,this.formCustom.title=this.getTableData(t,"title")},editWord:function(t,e){"nickname"===e?(this.basicModel.title="编辑规约词",this.basicModel.action="editNickname"):"directname"===e&&(this.basicModel.title="编辑直达词",this.basicModel.action="editDirectname"),this.basicModel.show=!0,this.formCustom.id=t;var i=this.getTableData(t,e);i instanceof Array&&(i=i.join(",")),this.formCustom.title=i},newCategory:function(){this.basicModel.title="添加分类",this.basicModel.show=!0,this.basicModel.action="newCategory"},newChild:function(t,e){"childTagGroup"===e?this.basicModel.title="添加标签组":"childTag"===e?this.basicModel.title="添加子标签":this.basicModel.title="添加子分类",this.basicModel.show=!0,this.basicModel.action="newCategory",this.formCustom.id=t,this.formCustom.title="",this.formCustom.type=e},saveCateogry:function(t){var e=this,i=function(t,i){l.default.ajax({method:"POST",url:l.default.getUrl("/tag/modify"),data:t}).then(function(t){return 0!==t.data.result?void e.$Notice.warning({title:"操作失败!",desc:t.data.desc}):(e.$Notice.success({title:"操作成功!"}),e.basicModel.show=!1,void(i&&i()))}).catch(function(t){console.error(t)})};this.$refs[t].validate(function(t){if(t){var a=e;if("newCategory"===e.basicModel.action){var r={appId:"roobo",pid:e.formCustom.id,name:e.formCustom.title,type:e.formCustom.type};l.default.ajax({method:"POST",url:l.default.getUrl("/tag/new"),data:r}).then(function(t){return 0!==t.data.result?void e.$Notice.warning({title:"添加失败!",desc:t.data.desc}):(e.$Notice.success({title:"添加成功!"}),e.basicModel.show=!1,void e.loadData())}).catch(function(t){console.error(t)})}else if("editCategory"===e.basicModel.action){var o={id:e.formCustom.id,name:e.formCustom.title};i(o,function(){a.updateTableData(o.id,"title",o.name)})}else if("editNickname"===e.basicModel.action){var n=e.formCustom.title.split(","),c={id:e.formCustom.id,nickname:n};i(c,function(){a.updateTableData(c.id,"nickname",n)})}else if("editDirectname"===e.basicModel.action){var s=e.formCustom.title.split(","),d={id:e.formCustom.id,directname:s};i(d,function(){a.updateTableData(d.id,"directname",s)})}}})},cancel:function(){},getTableData:function(t,e){for(var i="",a=0;a<this.treedata.length;a++)if(this.treedata[a].id===t){i=this.treedata[a][e];break}return i},updateTableData:function(t,e,i){for(var a=0;a<this.treedata.length;a++)if(this.treedata[a].id===t){this.treedata[a][e]=i;break}}}}},473:function(t,e,i){"use strict";var a=i(474),r=i(477),o=i(476);t.exports={formats:o,parse:r,stringify:a}},474:function(t,e,i){"use strict";var a=i(475),r=i(476),o={brackets:function(t){return t+"[]"},indices:function(t,e){return t+"["+e+"]"},repeat:function(t){return t}},n=Date.prototype.toISOString,l={delimiter:"&",encode:!0,encoder:a.encode,encodeValuesOnly:!1,serializeDate:function(t){return n.call(t)},skipNulls:!1,strictNullHandling:!1},c=function t(e,i,r,o,n,l,c,s,d,u,f,p){var h=e;if("function"==typeof c)h=c(i,h);else if(h instanceof Date)h=u(h);else if(null===h){if(o)return l&&!p?l(i):i;h=""}if("string"==typeof h||"number"==typeof h||"boolean"==typeof h||a.isBuffer(h)){if(l){var m=p?i:l(i);return[f(m)+"="+f(l(h))]}return[f(i)+"="+f(String(h))]}var y=[];if("undefined"==typeof h)return y;var b;if(Array.isArray(c))b=c;else{var v=Object.keys(h);b=s?v.sort(s):v}for(var g=0;g<b.length;++g){var w=b[g];n&&null===h[w]||(y=Array.isArray(h)?y.concat(t(h[w],r(i,w),r,o,n,l,c,s,d,u,f,p)):y.concat(t(h[w],i+(d?"."+w:"["+w+"]"),r,o,n,l,c,s,d,u,f,p)))}return y};t.exports=function(t,e){var i=t,a=e||{};if(null!==a.encoder&&void 0!==a.encoder&&"function"!=typeof a.encoder)throw new TypeError("Encoder has to be a function.");var n="undefined"==typeof a.delimiter?l.delimiter:a.delimiter,s="boolean"==typeof a.strictNullHandling?a.strictNullHandling:l.strictNullHandling,d="boolean"==typeof a.skipNulls?a.skipNulls:l.skipNulls,u="boolean"==typeof a.encode?a.encode:l.encode,f="function"==typeof a.encoder?a.encoder:l.encoder,p="function"==typeof a.sort?a.sort:null,h="undefined"!=typeof a.allowDots&&a.allowDots,m="function"==typeof a.serializeDate?a.serializeDate:l.serializeDate,y="boolean"==typeof a.encodeValuesOnly?a.encodeValuesOnly:l.encodeValuesOnly;if("undefined"==typeof a.format)a.format=r.default;else if(!Object.prototype.hasOwnProperty.call(r.formatters,a.format))throw new TypeError("Unknown format option provided.");var b,v,g=r.formatters[a.format];"function"==typeof a.filter?(v=a.filter,i=v("",i)):Array.isArray(a.filter)&&(v=a.filter,b=v);var w=[];if("object"!=typeof i||null===i)return"";var C;C=a.arrayFormat in o?a.arrayFormat:"indices"in a?a.indices?"indices":"repeat":"indices";var O=o[C];b||(b=Object.keys(i)),p&&b.sort(p);for(var j=0;j<b.length;++j){var k=b[j];d&&null===i[k]||(w=w.concat(c(i[k],k,O,s,d,u?f:null,v,p,h,m,g,y)))}return w.join(n)}},475:function(t,e){"use strict";var i=Object.prototype.hasOwnProperty,a=function(){for(var t=[],e=0;e<256;++e)t.push("%"+((e<16?"0":"")+e.toString(16)).toUpperCase());return t}();e.arrayToObject=function(t,e){for(var i=e&&e.plainObjects?Object.create(null):{},a=0;a<t.length;++a)"undefined"!=typeof t[a]&&(i[a]=t[a]);return i},e.merge=function(t,a,r){if(!a)return t;if("object"!=typeof a){if(Array.isArray(t))t.push(a);else{if("object"!=typeof t)return[t,a];(r.plainObjects||r.allowPrototypes||!i.call(Object.prototype,a))&&(t[a]=!0)}return t}if("object"!=typeof t)return[t].concat(a);var o=t;return Array.isArray(t)&&!Array.isArray(a)&&(o=e.arrayToObject(t,r)),Array.isArray(t)&&Array.isArray(a)?(a.forEach(function(a,o){i.call(t,o)?t[o]&&"object"==typeof t[o]?t[o]=e.merge(t[o],a,r):t.push(a):t[o]=a}),t):Object.keys(a).reduce(function(t,i){var o=a[i];return Object.prototype.hasOwnProperty.call(t,i)?t[i]=e.merge(t[i],o,r):t[i]=o,t},o)},e.decode=function(t){try{return decodeURIComponent(t.replace(/\+/g," "))}catch(e){return t}},e.encode=function(t){if(0===t.length)return t;for(var e="string"==typeof t?t:String(t),i="",r=0;r<e.length;++r){var o=e.charCodeAt(r);45===o||46===o||95===o||126===o||o>=48&&o<=57||o>=65&&o<=90||o>=97&&o<=122?i+=e.charAt(r):o<128?i+=a[o]:o<2048?i+=a[192|o>>6]+a[128|63&o]:o<55296||o>=57344?i+=a[224|o>>12]+a[128|o>>6&63]+a[128|63&o]:(r+=1,o=65536+((1023&o)<<10|1023&e.charCodeAt(r)),i+=a[240|o>>18]+a[128|o>>12&63]+a[128|o>>6&63]+a[128|63&o])}return i},e.compact=function(t,i){if("object"!=typeof t||null===t)return t;var a=i||[],r=a.indexOf(t);if(r!==-1)return a[r];if(a.push(t),Array.isArray(t)){for(var o=[],n=0;n<t.length;++n)t[n]&&"object"==typeof t[n]?o.push(e.compact(t[n],a)):"undefined"!=typeof t[n]&&o.push(t[n]);return o}var l=Object.keys(t);return l.forEach(function(i){t[i]=e.compact(t[i],a)}),t},e.isRegExp=function(t){return"[object RegExp]"===Object.prototype.toString.call(t)},e.isBuffer=function(t){return null!==t&&"undefined"!=typeof t&&!!(t.constructor&&t.constructor.isBuffer&&t.constructor.isBuffer(t))}},476:function(t,e){"use strict";var i=String.prototype.replace,a=/%20/g;t.exports={default:"RFC3986",formatters:{RFC1738:function(t){return i.call(t,a,"+")},RFC3986:function(t){return t}},RFC1738:"RFC1738",RFC3986:"RFC3986"}},477:function(t,e,i){"use strict";var a=i(475),r=Object.prototype.hasOwnProperty,o={allowDots:!1,allowPrototypes:!1,arrayLimit:20,decoder:a.decode,delimiter:"&",depth:5,parameterLimit:1e3,plainObjects:!1,strictNullHandling:!1},n=function(t,e){for(var i={},a=t.split(e.delimiter,e.parameterLimit===1/0?void 0:e.parameterLimit),o=0;o<a.length;++o){var n,l,c=a[o],s=c.indexOf("]=")===-1?c.indexOf("="):c.indexOf("]=")+1;s===-1?(n=e.decoder(c),l=e.strictNullHandling?null:""):(n=e.decoder(c.slice(0,s)),l=e.decoder(c.slice(s+1))),r.call(i,n)?i[n]=[].concat(i[n]).concat(l):i[n]=l}return i},l=function(t,e,i){if(!t.length)return e;var a,r=t.shift();if("[]"===r)a=[],a=a.concat(l(t,e,i));else{a=i.plainObjects?Object.create(null):{};var o="["===r.charAt(0)&&"]"===r.charAt(r.length-1)?r.slice(1,-1):r,n=parseInt(o,10);!isNaN(n)&&r!==o&&String(n)===o&&n>=0&&i.parseArrays&&n<=i.arrayLimit?(a=[],a[n]=l(t,e,i)):a[o]=l(t,e,i)}return a},c=function(t,e,i){if(t){var a=i.allowDots?t.replace(/\.([^.[]+)/g,"[$1]"):t,o=/(\[[^[\]]*])/,n=/(\[[^[\]]*])/g,c=o.exec(a),s=c?a.slice(0,c.index):a,d=[];if(s){if(!i.plainObjects&&r.call(Object.prototype,s)&&!i.allowPrototypes)return;d.push(s)}for(var u=0;null!==(c=n.exec(a))&&u<i.depth;){if(u+=1,!i.plainObjects&&r.call(Object.prototype,c[1].slice(1,-1))&&!i.allowPrototypes)return;d.push(c[1])}return c&&d.push("["+a.slice(c.index)+"]"),l(d,e,i)}};t.exports=function(t,e){var i=e||{};if(null!==i.decoder&&void 0!==i.decoder&&"function"!=typeof i.decoder)throw new TypeError("Decoder has to be a function.");if(i.delimiter="string"==typeof i.delimiter||a.isRegExp(i.delimiter)?i.delimiter:o.delimiter,i.depth="number"==typeof i.depth?i.depth:o.depth,i.arrayLimit="number"==typeof i.arrayLimit?i.arrayLimit:o.arrayLimit,i.parseArrays=i.parseArrays!==!1,i.decoder="function"==typeof i.decoder?i.decoder:o.decoder,i.allowDots="boolean"==typeof i.allowDots?i.allowDots:o.allowDots,i.plainObjects="boolean"==typeof i.plainObjects?i.plainObjects:o.plainObjects,i.allowPrototypes="boolean"==typeof i.allowPrototypes?i.allowPrototypes:o.allowPrototypes,i.parameterLimit="number"==typeof i.parameterLimit?i.parameterLimit:o.parameterLimit,i.strictNullHandling="boolean"==typeof i.strictNullHandling?i.strictNullHandling:o.strictNullHandling,""===t||null===t||"undefined"==typeof t)return i.plainObjects?Object.create(null):{};for(var r="string"==typeof t?n(t,i):t,l=i.plainObjects?Object.create(null):{},s=Object.keys(r),d=0;d<s.length;++d){var u=s[d],f=c(u,r[u],i);l=a.merge(l,f,i)}return a.compact(l)}},478:function(t,e){t.exports=' <div class=layout-header _v-0aa3a717=""></div> <div class=layout-breadcrumb _v-0aa3a717=""> <breadcrumb _v-0aa3a717=""> <breadcrumb-item _v-0aa3a717="">首页</breadcrumb-item> <breadcrumb-item _v-0aa3a717="">标签管理</breadcrumb-item> <breadcrumb-item _v-0aa3a717="">分类标签列表</breadcrumb-item> </breadcrumb> </div> <div class=layout-content _v-0aa3a717=""> <div class=layout-content-main _v-0aa3a717=""> <div class=resource-update _v-0aa3a717=""> <div class=update-btn _v-0aa3a717=""> <i-button type=primary icon=plus @click=newCategory _v-0aa3a717="">添加分类</i-button> <i-button type=ghost @click=toggleTreeGrid _v-0aa3a717="">{{toggle.name}}</i-button> </div> </div> <div class=resource-search _v-0aa3a717=""> <div class=normal-search _v-0aa3a717=""> <row _v-0aa3a717=""> <i-col span=12 _v-0aa3a717=""> <div class=high-btn _v-0aa3a717=""> </div> </i-col> </row> </div> </div> <i-table style=max-width:1490px border="" size=small stripe="" :columns=tableColumns :data=treedata _v-0aa3a717=""></i-table> </div> </div> <modal :visible.sync=basicModel.show :title.sync=basicModel.title _v-0aa3a717=""> <i-form v-ref:form-custom="" :model=formCustom :rules=ruleCustom :label-width=80 _v-0aa3a717=""> <form-item label=名称： prop=title _v-0aa3a717=""> <i-input type=text :value.sync=formCustom.title _v-0aa3a717=""></i-input> </form-item> </i-form> <div slot=footer _v-0aa3a717=""> <i-button type=ghost @click="basicModel.show=false" _v-0aa3a717="">取消</i-button> <i-button type=primary @click="saveCateogry(\'formCustom\');" _v-0aa3a717="">确定</i-button> </div> </modal> '}});