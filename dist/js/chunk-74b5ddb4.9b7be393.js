(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-74b5ddb4"],{2423:function(t,e,n){"use strict";n.d(e,"f",(function(){return c})),n.d(e,"a",(function(){return a})),n.d(e,"g",(function(){return o})),n.d(e,"c",(function(){return u})),n.d(e,"b",(function(){return i})),n.d(e,"h",(function(){return s})),n.d(e,"d",(function(){return d})),n.d(e,"e",(function(){return l}));var r=n("b775");function c(t){return r["a"].request({method:"get",url:"/article/new/list",params:t})}function a(t){return r["a"].request({method:"post",url:"/article/create",data:t})}function o(t){return r["a"].request({method:"put",url:"/article/".concat(t.article_id),data:t})}function u(t){return r["a"].request({method:"get",url:"/article/".concat(t)})}function i(t){return r["a"].request({method:"delete",url:"/article/".concat(t.articleId),params:t})}function s(t){return r["a"].request({method:"get",url:"/article/wordcloud",params:t})}function d(t){return r["a"].request({method:"get",url:"/article/hot/list",params:t})}function l(t){return r["a"].request({method:"get",url:"/article/hot/wordcloud",params:t})}},c03d8:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("mavon-editor",{ref:"editor",on:{save:t.saveDoc,change:t.updateDoc},model:{value:t.doc,callback:function(e){t.doc=e},expression:"doc"}})],1)},c=[],a=n("2423"),o={name:"userWriting",data:function(){return{doc:"",uid:"",aritcleInfo:{articleId:this.$route.query.articleId,type:this.$route.query.type}}},methods:{initData:function(){this.uid=this.$store.state.userInfo.uid,"update"==this.aritcleInfo.type&&this.getArticleDetail(this.aritcleInfo.articleId)},getArticleDetail:function(t){var e=this;Object(a["c"])(t).then((function(t){e.doc=t.data.data.body_md})).catch((function(t){console.log(t)}))},updateDoc:function(t,e){console.log("markdown内容: "+t),console.log("html内容:"+t)},saveDoc:function(t,e){var n=this,r={body_md:t,body_html:e,author_id:this.uid,article_id:this.aritcleInfo.articleId};"update"!=this.aritcleInfo.type?Object(a["a"])(r).then((function(t){var e=t.data;n.$message({message:e.message,type:"success"})})).catch((function(t){console.log(t)})):Object(a["g"])(r).then((function(t){var e=t.data;n.$message({message:e.message,type:"success"})})).catch((function(t){console.log(t)}))}},created:function(){this.initData()}},u=o,i=n("2877"),s=Object(i["a"])(u,r,c,!1,null,"f6c79e42",null);e["default"]=s.exports}}]);