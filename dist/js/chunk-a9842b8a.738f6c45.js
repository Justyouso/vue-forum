(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a9842b8a"],{"3a2a":function(t,e,a){},8418:function(t,e,a){"use strict";var o=a("c04e"),s=a("9bf2"),i=a("5c6c");t.exports=function(t,e,a){var l=o(e);l in t?s.f(t,l,i(0,a)):t[l]=a}},"950a":function(t,e,a){"use strict";var o=a("3a2a"),s=a.n(o);s.a},"99af":function(t,e,a){"use strict";var o=a("23e7"),s=a("d039"),i=a("e8b5"),l=a("861d"),r=a("7b0b"),n=a("50c4"),c=a("8418"),u=a("65f0"),f=a("1dde"),d=a("b622"),h=a("2d00"),w=d("isConcatSpreadable"),v=9007199254740991,p="Maximum allowed index exceeded",g=h>=51||!s((function(){var t=[];return t[w]=!1,t.concat()[0]!==t})),m=f("concat"),_=function(t){if(!l(t))return!1;var e=t[w];return void 0!==e?!!e:i(t)},b=!g||!m;o({target:"Array",proto:!0,forced:b},{concat:function(t){var e,a,o,s,i,l=r(this),f=u(l,0),d=0;for(e=-1,o=arguments.length;e<o;e++)if(i=-1===e?l:arguments[e],_(i)){if(s=n(i.length),d+s>v)throw TypeError(p);for(a=0;a<s;a++,d++)a in i&&c(f,d,i[a])}else{if(d>=v)throw TypeError(p);c(f,d++,i)}return f.length=d,f}})},aca9:function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"follow-content"},[[a("el-tabs",{on:{"tab-click":t.handleClick},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"关注用户",name:"first"}},[a("div",{staticClass:"author-list"},[[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.followData,"show-header":!1}},[a("el-table-column",{scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"follow"},[a("div",{staticClass:"fol-left pull-left"},[a("div",{staticClass:"title"},[a("router-link",{attrs:{tag:"a",to:"/userIndex/"+e.row.id,target:"_blank"}},[t._v(" "+t._s(e.row.name)+" ")])],1),a("div",{staticClass:"icon-list"},[a("div",{staticClass:"first meta-bolck pull-left"},[t._v(" 关注 "+t._s(e.row.followed)+" ")]),a("div",{staticClass:"meta-bolck pull-left"},[t._v(" 粉丝 "+t._s(e.row.fans)+" ")]),a("div",{staticClass:"meta-bolck pull-left"},[a("router-link",{attrs:{tag:"a",to:"/userIndexFollow/"}},[t._v("文章 "+t._s(e.row.articles))])],1)])]),a("div",{staticClass:"fol-right pull-right"},[a("el-button",{class:e.row.is_followed?"el-icon-close":"el-icon-plus",attrs:{"native-type":"button",size:"medium",type:e.row.is_followed?"":"success",round:""},on:{click:function(a){return t.followed(e.$index,e.row)}}},[t._v(t._s(e.row.is_followed?"取消":"关注"))])],1)])]}}])})],1)],a("div",{staticClass:"more"},[a("el-button",{staticStyle:{width:"100%"},attrs:{type:"info",round:""},on:{click:function(e){return t.onMore("followed")}}},[t._v("阅读更多")])],1)],2)]),a("el-tab-pane",{attrs:{label:"粉丝",name:"second"}},[a("div",{staticClass:"author-list"},[[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.followData,"show-header":!1}},[a("el-table-column",{scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"follow"},[a("div",{staticClass:"fol-left pull-left"},[a("div",{staticClass:"title"},[a("router-link",{attrs:{tag:"a",to:"/userIndex/"+e.row.id,target:"_blank"}},[t._v(" "+t._s(e.row.name)+" ")])],1),a("div",{staticClass:"icon-list"},[a("div",{staticClass:"first meta-bolck pull-left"},[t._v(" 关注 "+t._s(e.row.followed)+" ")]),a("div",{staticClass:"meta-bolck pull-left"},[t._v(" 粉丝 "+t._s(e.row.fans)+" ")]),a("div",{staticClass:"meta-bolck pull-left"},[a("router-link",{attrs:{tag:"a",to:"/userIndexFollow/"}},[t._v("文章 "+t._s(e.row.articles))])],1)])]),a("div",{staticClass:"fol-right pull-right"},[a("el-button",{class:e.row.is_followed?"el-icon-close":"el-icon-plus",attrs:{"native-type":"button",size:"medium",type:e.row.is_followed?"":"success",round:""},on:{click:function(a){return t.followed(e.$index,e.row)}}},[t._v(t._s(e.row.is_followed?"取消":"关注"))])],1)])]}}])})],1)],a("div",{staticClass:"more"},[a("el-button",{staticStyle:{width:"100%"},attrs:{type:"info",round:""},on:{click:function(e){return t.onMore("fans")}}},[t._v("阅读更多")])],1)],2)])],1)]],2)},s=[],i=(a("99af"),a("c24f")),l={name:"userFollow",props:{active:String,default:"followed"},data:function(){return{page:1,per_page:5,authorId:this.$route.params.userId,activeName:this.active,followData:[]}},methods:{initData:function(){this.getUserInfo()},getUserInfo:function(){this.userInfo=this.$store.state.userInfo,this.islive=this.$store.state.isLive,this.authorId=this.$route.params.userId,"first"==this.activeName?this.getFollowData(1,this.authorId,"followed"):this.getFollowData(1,this.authorId,"fans")},authorClick:function(t){this.$router.push({name:"UserIndex",params:{userId:t}})},handleClick:function(t,e){this.page=1,this.followData=[],"关注用户"==t.label?this.getFollowData(1,this.authorId,"followed"):this.getFollowData(1,this.authorId,"fans")},getFollowData:function(t,e,a){var o=this,s={page:t,per_page:this.per_page,author_id:e,type:a,user:this.userInfo.uid};Object(i["d"])(s).then((function(t){t.data.data.length?o.followData=o.followData.concat(t.data.data):o.$message({message:"无更多数据",type:"warning"})})).catch((function(t){console.log(t)}))},followed:function(t,e){var a=this;if(this.checkUser()){var o={user:this.userInfo.uid,author:e.id};o.type=e.is_followed?0:1,Object(i["a"])(o).then((function(o){e.is_followed=!e.is_followed,a.$set(a.followData,t,e)})).catch((function(t){console.log(t)}))}},checkUser:function(){if(this.islive)return!0;this.$router.push({name:"Login"})},onMore:function(t){this.page=this.page+1,this.getFollowData(this.page,this.authorId,t)}},created:function(){this.initData()},watch:{active:{handler:function(t){this.activeName=t,this.page=1,this.followData=[],"first"==this.activeName?this.getFollowData(1,this.authorId,"followed"):this.getFollowData(1,this.authorId,"fans")}}}},r=l,n=(a("950a"),a("2877")),c=Object(n["a"])(r,o,s,!1,null,"3f177455",null);e["default"]=c.exports},c24f:function(t,e,a){"use strict";a.d(e,"e",(function(){return s})),a.d(e,"a",(function(){return i})),a.d(e,"c",(function(){return l})),a.d(e,"d",(function(){return r})),a.d(e,"b",(function(){return n}));var o=a("b775");function s(t){return o["a"].request({method:"get",url:"/user/new/list",params:t})}function i(t){return o["a"].request({method:"get",url:"/user/follow",params:t})}function l(t){return o["a"].request({method:"get",url:"/user/index/".concat(t)})}function r(t){return o["a"].request({method:"get",url:"/user/index/follows/".concat(t.author_id),params:t})}function n(t){return o["a"].request({method:"get",url:"/user/hot/list",params:t})}}}]);