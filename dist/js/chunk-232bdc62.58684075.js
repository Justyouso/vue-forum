(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-232bdc62"],{1925:function(t,e,s){"use strict";s.d(e,"a",(function(){return r})),s.d(e,"b",(function(){return i}));var a=s("b775");function r(t){return a["a"].request({method:"get",url:"/article/search",params:t})}function i(t){return a["a"].request({method:"get",url:"/user/search",params:t})}},4185:function(t,e,s){"use strict";var a=s("d2a8"),r=s.n(a);r.a},"79ce":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"search"},[s("div",{staticClass:"nav-left pull-left"},[s("el-row",{staticClass:"tac"},[s("el-col",{attrs:{span:20}},[s("el-menu",{staticClass:"el-menu-vertical-demo",attrs:{"default-active":"1"}},[s("el-menu-item",{attrs:{index:"1"},on:{click:function(e){return t.getArticles(1)}}},[s("i",{staticClass:"el-icon-s-order icon"}),s("span",{attrs:{slot:"title"},slot:"title"},[t._v("文章")])]),s("el-menu-item",{attrs:{index:"2"},on:{click:function(e){return t.getUsers(1)}}},[s("i",{staticClass:"el-icon-user-solid icon"}),s("span",{attrs:{slot:"title"},slot:"title"},[t._v("用户")])])],1)],1)],1)],1),s("div",{staticClass:"nav-right pull-left"},["articles"==t.flag?s("div",{staticClass:"article-list"},[[s("el-table",{staticStyle:{width:"100%"},attrs:{data:t.articlesData,stripe:"","show-header":!1}},[s("div",[s("el-table-column",{scopedSlots:t._u([{key:"default",fn:function(e){return[s("router-link",{staticClass:"title",attrs:{tag:"a",to:"/article/detail/"+e.row.id}},[t._v(t._s(e.row.title))]),s("p",[t._v(t._s(e.row.summary))]),s("div",{staticClass:"article-table-bottom"},[s("router-link",{staticClass:"author-box",attrs:{tag:"a",to:"/userIndex/"+e.row.author_id}},[t._v(t._s(e.row.author))]),s("svg-icon",{attrs:{iconClass:"read",className:"read"}}),s("span",{staticClass:"author-box"},[t._v(t._s(e.row.read))]),s("svg-icon",{attrs:{iconClass:"like",className:"like"}}),s("span",{staticClass:"author-box"},[t._v(t._s(e.row.comments))])],1)]}}],null,!1,3632999265)})],1)])]],2):s("div",{staticClass:"author-list"},[[s("el-table",{staticStyle:{width:"100%"},attrs:{data:t.usersData,"show-header":!1}},[s("el-table-column",{scopedSlots:t._u([{key:"default",fn:function(e){return[s("div",{staticClass:"follow"},[s("div",{staticClass:"fol-left pull-left"},[s("div",{staticClass:"title"},[s("router-link",{attrs:{tag:"a",to:{path:"/userIndex/"+e.row.id,query:{type:1}}}},[t._v(" "+t._s(e.row.name)+" ")])],1),s("span",{staticClass:"about-me"},[t._v(t._s(e.row.about_me))]),s("div",{staticClass:"icon-list"},[s("div",{staticClass:"first meta-bolck pull-left"},[t._v(" 关注 "+t._s(e.row.followed)+" ")]),s("div",{staticClass:"meta-bolck pull-left"},[t._v(" 粉丝 "+t._s(e.row.fans)+" ")]),s("div",{staticClass:"meta-bolck pull-left"},[t._v(" 文章 "+t._s(e.row.articles)+" ")])])]),s("div",{staticClass:"fol-right pull-right"},[s("el-button",{class:e.row.is_followed?"el-icon-close":"el-icon-plus",attrs:{"native-type":"button",size:"medium",type:e.row.is_followed?"":"success",round:""},on:{click:function(s){return t.followed(e.$index,e.row)}}},[t._v(t._s(e.row.is_followed?"取消":"关注"))])],1)])]}}])})],1)]],2),s("div",{staticClass:"pull-right pageination"},[s("el-pagination",{attrs:{background:"","current-page":t.currentPage,"page-size":10,layout:"total, prev, pager, next",total:t.totalpage},on:{"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e},"update:total":function(e){t.totalpage=e}}})],1)])])},r=[],i=s("1925"),n=s("c24f"),o={data:function(){return{currentPage:1,totalpage:0,keywords:this.$route.query.keywords,flag:"articles",articlesData:[],usersData:[]}},methods:{getUserInfo:function(){this.userInfo=this.$store.state.userInfo,this.islive=this.$store.state.isLive},getArticles:function(t){var e=this;this.flag="articles";var s={keywords:this.keywords,page:t};Object(i["a"])(s).then((function(t){e.articlesData=t.data.data,e.totalpage=t.data.total})).catch((function(t){console.log(t)}))},getUsers:function(t){var e=this;this.flag="users";var s={keywords:this.keywords,page:t,user:this.userInfo.uid};Object(i["b"])(s).then((function(t){e.usersData=t.data.data,e.totalpage=t.data.total})).catch((function(t){console.log(t)}))},handleCurrentChange:function(t){"articles"==this.flag?this.getArticles(t):this.getUsers(t)},followed:function(t,e){var s=this;if(this.checkUser()){var a={user:this.userInfo.uid,author:e.id};a.type=e.is_followed?0:1,Object(n["a"])(a).then((function(a){e.is_followed=!e.is_followed,s.$set(s.usersData,t,e)})).catch((function(t){console.log(t)}))}},checkUser:function(){if(this.islive)return!0;this.$router.push({name:"Login"})}},created:function(){this.keywords=this.$route.query.keywords,this.getArticles(this.currentPage),this.getUserInfo()},watch:{"$route.query.keywords":function(t,e){this.keywords=this.$route.query.keywords,this.currentPage=1,"articles"==this.flag?this.getArticles(this.currentPage):this.getUsers(this.currentPage)}}},l=o,u=(s("4185"),s("2877")),c=Object(u["a"])(l,a,r,!1,null,"1688e1a0",null);e["default"]=c.exports},c24f:function(t,e,s){"use strict";s.d(e,"e",(function(){return r})),s.d(e,"a",(function(){return i})),s.d(e,"c",(function(){return n})),s.d(e,"f",(function(){return o})),s.d(e,"d",(function(){return l})),s.d(e,"b",(function(){return u}));var a=s("b775");function r(t){return a["a"].request({method:"get",url:"/user/new/list",params:t})}function i(t){return a["a"].request({method:"get",url:"/user/follow",params:t})}function n(t){return a["a"].request({method:"get",url:"/user/index/".concat(t)})}function o(t){return a["a"].request({method:"put",url:"/user/index/".concat(t.id),data:t})}function l(t){return a["a"].request({method:"get",url:"/user/index/follows/".concat(t.author_id),params:t})}function u(t){return a["a"].request({method:"get",url:"/user/hot/list",params:t})}},d2a8:function(t,e,s){}}]);