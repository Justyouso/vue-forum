(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-727099ee"],{5899:function(t,a){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,a,e){var s=e("1d80"),i=e("5899"),o="["+i+"]",l=RegExp("^"+o+o+"*"),r=RegExp(o+o+"*$"),n=function(t){return function(a){var e=String(s(a));return 1&t&&(e=e.replace(l,"")),2&t&&(e=e.replace(r,"")),e}};t.exports={start:n(1),end:n(2),trim:n(3)}},5917:function(t,a,e){},7156:function(t,a,e){var s=e("861d"),i=e("d2bb");t.exports=function(t,a,e){var o,l;return i&&"function"==typeof(o=a.constructor)&&o!==e&&s(l=o.prototype)&&l!==e.prototype&&i(t,l),t}},"7368a":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"person"},[e("div",{staticClass:"home-page pull-left"},[e("div",{staticClass:"home-head pull-left"},[e("div",{staticClass:"title pull-left"},[e("div",{staticClass:"name"},[t._v(t._s(t.authorData.name))]),e("div",{staticClass:"icon-list"},[e("div",{staticClass:"meta-bolck pull-left"},[e("el-button",{attrs:{type:"text"},on:{click:function(a){return t.handleChild("followed")}}},[e("p",[t._v(t._s(t.authorData.followed))]),t._v("关注 "),e("i",{staticClass:"el-icon-arrow-right"})])],1),e("div",{staticClass:"meta-bolck pull-left"},[e("el-button",{attrs:{type:"text"},on:{click:function(a){return t.handleChild("fans")}}},[e("p",[t._v(t._s(t.authorData.fans))]),t._v("粉丝 "),e("i",{staticClass:"el-icon-arrow-right"})])],1),e("div",{staticClass:"meta-bolck pull-left"},[e("el-button",{attrs:{type:"text"},on:{click:function(a){return t.handleChild("articles")}}},[e("p",[t._v(t._s(t.authorData.articles))]),t._v("文章 "),e("i",{staticClass:"el-icon-arrow-right"})])],1)])]),2!=t.authorInfo.type?e("div",{staticClass:"btn pull-left"},[e("el-button",{class:t.follow?"el-icon-close":"el-icon-plus",attrs:{"native-type":"button",size:"medium",type:t.follow?"":"success",round:""},on:{click:function(a){return t.followed(t.follow)}}},[t._v(t._s(t.follow?"取消关注":"关注"))])],1):t._e()]),e("div",{staticClass:"home-content home-head"},["articles"==t.childFlag?e("div",[e("Articles",{attrs:{user:t.userinfo.uid}})],1):"followed"==t.childFlag?e("div",[e("Follow",{attrs:{active:"first"}})],1):e("div",[e("Follow",{attrs:{active:"second"}})],1)])]),e("div",{staticClass:"user-nav pull-left"},[e("div",{staticClass:"user-summary"},[e("p",[t._v("个人介绍")]),t._v(" "+t._s(t.authorData.about_me)+" ")]),t.wordCloudData.length?e("div",{staticClass:"word-cloud"},[e("wordCloud",{attrs:{data:t.wordCloudData,"size-range":[10,30]}})],1):t._e()])])},i=[],o=e("2423"),l=e("c24f"),r=e("aca9"),n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"follow-content"},[[e("el-tabs",{on:{"tab-click":t.handleClick},model:{value:t.activeName,callback:function(a){t.activeName=a},expression:"activeName"}},[e("el-tab-pane",{attrs:{name:"first"}},[e("span",{staticClass:"icon-title",attrs:{slot:"label"},slot:"label"},[e("svg-icon",{attrs:{iconClass:"articles",className:"articles"}}),t._v(" 文章")],1),e("div",{staticClass:"article-list"},[[e("el-table",{staticStyle:{width:"100%"},attrs:{data:t.articlesData,stripe:"","show-header":!1}},[e("el-table-column",{scopedSlots:t._u([{key:"default",fn:function(a){return[e("div",{staticClass:"title"},[e("router-link",{attrs:{tag:"a",to:"/article/detail/"+a.row.id,target:"_blank"}},[t._v(t._s(a.row.title))]),t.authorId==t.user?e("el-button",{staticClass:"pull-right",attrs:{icon:"el-icon-edit",size:"mini",round:""},on:{click:function(e){return t.articleUpdate(a.row.id)}}}):t._e()],1),e("p",[t._v(t._s(a.row.summary))]),e("div",{staticClass:"article-table-bottom"},[e("svg-icon",{attrs:{iconClass:"read",className:"read"}}),e("span",{staticClass:"author-box"},[t._v(t._s(a.row.read))]),e("svg-icon",{attrs:{iconClass:"like",className:"like"}}),e("span",{staticClass:"author-box"},[t._v(t._s(a.row.comments))]),t._v(" "+t._s(a.row.timestamp)+" ")],1)]}}])})],1)]],2)]),e("el-tab-pane",{attrs:{name:"second"}},[e("span",{staticClass:"icon-title",attrs:{slot:"label"},slot:"label"},[e("svg-icon",{attrs:{iconClass:"hot",className:"hot"}}),t._v(" 热门 ")],1),e("div",{staticClass:"article-list"},[[e("el-table",{staticStyle:{width:"100%"},attrs:{data:t.articlesData,stripe:"","show-header":!1}},[e("el-table-column",{scopedSlots:t._u([{key:"default",fn:function(a){return[e("div",{staticClass:"title"},[e("router-link",{attrs:{tag:"a",to:"/article/detail/"+a.row.id,target:"_blank"}},[t._v(t._s(a.row.title))]),t.authorId==t.user?e("el-button",{staticClass:"pull-right",attrs:{icon:"el-icon-edit",size:"mini",round:""},on:{click:function(e){return t.articleUpdate(a.row.id)}}}):t._e()],1),e("p",[t._v(t._s(a.row.summary))]),e("div",{staticClass:"article-table-bottom"},[e("svg-icon",{attrs:{iconClass:"read",className:"read"}}),e("span",{staticClass:"author-box"},[t._v(t._s(a.row.read))]),e("svg-icon",{attrs:{iconClass:"like",className:"like"}}),e("span",{staticClass:"author-box"},[t._v(t._s(a.row.comments))]),t._v(" "+t._s(a.row.timestamp)+" ")],1)]}}])})],1)]],2)])],1)]],2)},c=[],u=(e("b0c0"),e("a9e3"),{name:"userArticles",props:{user:{type:Number}},data:function(){return{authorId:this.$route.params.userId,activeName:"first",articlesData:[]}},methods:{initData:function(){this.getArticlesData("timestamp")},getArticlesData:function(t){var a=this,e={author:this.authorId,order:t};Object(o["e"])(e).then((function(t){a.articlesData=t.data.data})).catch((function(t){console.log(t)}))},handleClick:function(t,a){"second"==t.name?this.getArticlesData("read"):this.getArticlesData("timestamp")},articleUpdate:function(t){this.$router.push({name:"UserWriting",params:{userId:this.user},query:{articleId:t,type:"update"}}),console.log("编辑文章")}},created:function(){this.initData()}}),d=u,f=(e("9ed0"),e("2877")),h=Object(f["a"])(d,n,c,!1,null,"ab7a61ea",null),v=h.exports,p=e("05d5"),w={name:"userIndex",components:{Follow:r["default"],Articles:v,wordCloud:p["a"]},data:function(){return{childFlag:"articles",authorInfo:{id:this.$route.params.userId,type:this.$route.query.type},follow:!1,authorData:{},wordCloudData:[]}},methods:{initData:function(){this.getUserInfo(),this.getAuthorData(this.authorInfo.id),this.getfollow(this.authorInfo.id),this.getWordCloud("timestamp")},getWordCloud:function(t){var a=this,e={author:this.authorInfo.id,order:t};Object(o["g"])(e).then((function(t){a.wordCloudData=t.data.data})).catch((function(t){console.log(t)}))},getAuthorData:function(t){var a=this;Object(l["c"])(t).then((function(t){a.authorData=t.data.data,console.log(a.authorData)})).catch((function(t){console.log(t)}))},getfollow:function(t){var a=this;if(this.islive){var e={user:this.userinfo.uid,author:t,type:2};Object(l["a"])(e).then((function(t){a.follow=t.data.data})).catch((function(t){console.log(t)}))}},getUserInfo:function(){this.userinfo=this.$store.state.userInfo,this.islive=this.$store.state.isLive,console.log(this.userinfo),this.authorInfo={id:this.$route.params.userId,type:this.$route.query.type}},followed:function(t){var a=this;if(this.checkUser()){var e={user:this.userinfo.uid,author:this.authorInfo.id};e.type=t?0:1,Object(l["a"])(e).then((function(e){a.follow=!t})).catch((function(t){console.log(t)}))}},checkUser:function(){if(this.islive)return console.log(this.islive),!0;console.log(this.islive),this.$router.push({name:"Login"})},handleChild:function(t){this.childFlag=t,console.log(this.childFlag)}},created:function(){this.initData()}},m=w,_=(e("7c83"),Object(f["a"])(m,s,i,!1,null,"18ea1c60",null));a["default"]=_.exports},"7c83":function(t,a,e){"use strict";var s=e("9184"),i=e.n(s);i.a},9184:function(t,a,e){},"9ed0":function(t,a,e){"use strict";var s=e("b5bd"),i=e.n(s);i.a},a6a5:function(t,a,e){"use strict";var s=e("5917"),i=e.n(s);i.a},a9e3:function(t,a,e){"use strict";var s=e("83ab"),i=e("da84"),o=e("94ca"),l=e("6eeb"),r=e("5135"),n=e("c6b6"),c=e("7156"),u=e("c04e"),d=e("d039"),f=e("7c73"),h=e("241c").f,v=e("06cf").f,p=e("9bf2").f,w=e("58a8").trim,m="Number",_=i[m],b=_.prototype,g=n(f(b))==m,C=function(t){var a,e,s,i,o,l,r,n,c=u(t,!1);if("string"==typeof c&&c.length>2)if(c=w(c),a=c.charCodeAt(0),43===a||45===a){if(e=c.charCodeAt(2),88===e||120===e)return NaN}else if(48===a){switch(c.charCodeAt(1)){case 66:case 98:s=2,i=49;break;case 79:case 111:s=8,i=55;break;default:return+c}for(o=c.slice(2),l=o.length,r=0;r<l;r++)if(n=o.charCodeAt(r),n<48||n>i)return NaN;return parseInt(o,s)}return+c};if(o(m,!_(" 0o1")||!_("0b1")||_("+0x1"))){for(var I,k=function(t){var a=arguments.length<1?0:t,e=this;return e instanceof k&&(g?d((function(){b.valueOf.call(e)})):n(e)!=m)?c(new _(C(a)),e,k):C(a)},y=s?h(_):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),D=0;y.length>D;D++)r(_,I=y[D])&&!r(k,I)&&p(k,I,v(_,I));k.prototype=b,b.constructor=k,l(i,m,k)}},aca9:function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"follow-content"},[[e("el-tabs",{on:{"tab-click":t.handleClick},model:{value:t.activeName,callback:function(a){t.activeName=a},expression:"activeName"}},[e("el-tab-pane",{attrs:{label:"关注用户",name:"first"}},[e("div",{staticClass:"author-list"},[[e("el-table",{staticStyle:{width:"100%"},attrs:{data:t.followData,"show-header":!1}},[e("el-table-column",{scopedSlots:t._u([{key:"default",fn:function(a){return[e("div",{staticClass:"follow"},[e("div",{staticClass:"fol-left pull-left"},[e("div",{staticClass:"title"},[e("router-link",{attrs:{tag:"a",to:{path:"/userIndex/"+a.row.id,query:{type:1}},target:"_blank"}},[t._v(" "+t._s(a.row.name)+" ")])],1),e("div",{staticClass:"icon-list"},[e("div",{staticClass:"first meta-bolck pull-left"},[t._v(" 关注 "+t._s(a.row.followed)+" ")]),e("div",{staticClass:"meta-bolck pull-left"},[t._v(" 粉丝 "+t._s(a.row.fans)+" ")]),e("div",{staticClass:"meta-bolck pull-left"},[e("router-link",{attrs:{tag:"a",to:"/userIndexFollow/"}},[t._v("文章 "+t._s(a.row.articles))])],1)])]),e("div",{staticClass:"fol-right pull-right"},[e("el-button",{class:a.row.is_followed?"el-icon-close":"el-icon-plus",attrs:{"native-type":"button",size:"medium",type:a.row.is_followed?"":"success",round:""},on:{click:function(e){return t.followed(a.$index,a.row)}}},[t._v(t._s(a.row.is_followed?"取消关注":"关注"))])],1)])]}}])})],1)]],2)]),e("el-tab-pane",{attrs:{label:"粉丝",name:"second"}},[e("div",{staticClass:"author-list"},[[e("el-table",{staticStyle:{width:"100%"},attrs:{data:t.followData,"show-header":!1}},[e("el-table-column",{scopedSlots:t._u([{key:"default",fn:function(a){return[e("div",{staticClass:"follow"},[e("div",{staticClass:"fol-left pull-left"},[e("div",{staticClass:"title"},[e("router-link",{attrs:{tag:"a",to:{path:"/userIndex/"+a.row.id,query:{type:1}},target:"_blank"}},[t._v(" "+t._s(a.row.name)+" ")])],1),e("div",{staticClass:"icon-list"},[e("div",{staticClass:"first meta-bolck pull-left"},[t._v(" 关注 "+t._s(a.row.followed)+" ")]),e("div",{staticClass:"meta-bolck pull-left"},[t._v(" 粉丝 "+t._s(a.row.fans)+" ")]),e("div",{staticClass:"meta-bolck pull-left"},[e("router-link",{attrs:{tag:"a",to:"/userIndexFollow/"}},[t._v("文章 "+t._s(a.row.articles))])],1)])]),e("div",{staticClass:"fol-right pull-right"},[e("el-button",{class:a.row.is_followed?"el-icon-close":"el-icon-plus",attrs:{"native-type":"button",size:"medium",type:a.row.is_followed?"":"success",round:""},on:{click:function(e){return t.followed(a.$index,a.row)}}},[t._v(t._s(a.row.is_followed?"取消关注":"关注"))])],1)])]}}])})],1)]],2)])],1)]],2)},i=[],o=e("c24f"),l={name:"userFollow",props:{active:String,default:"followed"},data:function(){return{authorId:this.$route.params.userId,activeName:this.active,followData:[]}},methods:{initData:function(){this.getUserInfo(),console.log(this.activeName)},getUserInfo:function(){this.userInfo=this.$store.state.userInfo,this.islive=this.$store.state.isLive,this.authorId=this.$route.params.userId,"first"==this.activeName?this.getFollowData(this.authorId,"followed"):this.getFollowData(this.authorId,"fans")},authorClick:function(t){this.$router.push({name:"UserIndex",params:{userId:t},query:{type:1}})},handleClick:function(t,a){"关注用户"==t.label?this.getFollowData(this.authorId,"followed"):this.getFollowData(this.authorId,"fans")},getFollowData:function(t,a){var e=this,s={author_id:t,type:a,user:this.userInfo.uid};Object(o["d"])(s).then((function(t){e.followData=t.data.data})).catch((function(t){console.log(t)}))},followed:function(t,a){var e=this;if(this.checkUser()){var s={user:this.userInfo.uid,author:a.id};s.type=a.is_followed?0:1,Object(o["a"])(s).then((function(s){a.is_followed=!a.is_followed,e.$set(e.followData,t,a)})).catch((function(t){console.log(t)}))}},checkUser:function(){if(this.islive)return!0;this.$router.push({name:"Login"})}},created:function(){this.initData()},watch:{active:{handler:function(t){this.activeName=t,"first"==this.activeName?this.getFollowData(this.authorId,"followed"):this.getFollowData(this.authorId,"fans")}}}},r=l,n=(e("a6a5"),e("2877")),c=Object(n["a"])(r,s,i,!1,null,"1ddc0903",null);a["default"]=c.exports},b0c0:function(t,a,e){var s=e("83ab"),i=e("9bf2").f,o=Function.prototype,l=o.toString,r=/^\s*function ([^ (]*)/,n="name";!s||n in o||i(o,n,{configurable:!0,get:function(){try{return l.call(this).match(r)[1]}catch(t){return""}}})},b5bd:function(t,a,e){}}]);