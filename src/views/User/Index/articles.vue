<template>
  <div class="follow-content">
    <template>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!-- <el-tab-pane label=" el-icon-tickets 文章" name="first">
           -->
        <!-- 文章 -->
        <el-tab-pane name="first">
          <span class="icon-title" slot="label"><svg-icon iconClass="articles" className="articles" /> 文章</span>
          <div class="article-list">
            <template>
              <el-table :data="articlesData" stripe style="width: 100%" :show-header="false">
                  <el-table-column>
                    <template slot-scope="scope">
                      <router-link
                        tag="a"
                        class="title"
                        :to="`/article/detail/${scope.row.id}`" target="_blank"
                      >{{scope.row.title}}</router-link>
                      <p>{{scope.row.summary}}</p>
                      <div class="article-table-bottom">
                        <svg-icon iconClass="read" className="read" />
                        <span class="author-box">{{scope.row.read}}</span>
                        <svg-icon iconClass="like" className="like" />
                        <span class="author-box">{{scope.row.comments}}</span>
                        {{scope.row.timestamp}}
                      </div>
                    </template>
                  </el-table-column>
              </el-table>
            </template>
          </div>
        </el-tab-pane>
        <!-- 热门 -->
         <el-tab-pane name="second">
          <span class="icon-title" slot="label">
            <svg-icon iconClass="hot" className="hot" /> 热门
            </span>
          <div class="article-list">
            <template>
              <el-table :data="articlesData" stripe style="width: 100%" :show-header="false">
                  <el-table-column>
                    <template slot-scope="scope">
                      <router-link
                        tag="a"
                        class="title"
                        :to="`/article/detail/${scope.row.id}`" target="_blank"
                      >{{scope.row.title}}</router-link>
                      <p>{{scope.row.summary}}</p>
                      <div class="article-table-bottom">
                        <svg-icon iconClass="read" className="read" />
                        <span class="author-box">{{scope.row.read}}</span>
                        <svg-icon iconClass="like" className="like" />
                        <span class="author-box">{{scope.row.comments}}</span>
                        {{scope.row.timestamp}}
                      </div>
                    </template>
                  </el-table-column>
              </el-table>
            </template>
          </div>
        </el-tab-pane>
      </el-tabs>
    </template>
  </div>
</template>

<script>
// import { userFollow, userIndexFollows } from "@/api/user";
import { articleDetail,articleNewList } from "@/api/article";
export default {
  name: "userArticles",
  data() {
    return {
      authorId: this.$route.params.userId,
      activeName :"first",
      articlesData: [],
    };
  },
  methods: {
    initData() {
      this.getArticlesData("timestamp")
    },
    // 获取文章文章列表
    getArticlesData(sortFields) {
      let requestData = {
        author:this.authorId,
        order:sortFields
      };
    // 初始化文章列表
    articleNewList(requestData)
      .then(response => {
        this.articlesData = response.data.data;
      })
      .catch(error => {
        console.log(error);
      });
    },
    handleClick(tab, event) {
      console.log(tab);
      // 热门根据阅读量排序
      if (tab.name=="second"){
        this.getArticlesData("read")
      }else{
        this.getArticlesData("timestamp")
      }
      // this.getFollowData(this.author_id,"f")
      // console.log(tab.label, event);
    },
    // // 获取用户和作者基础
    // getUserInfo() {
    //   // 用户数据
    //   (this.userInfo = this.$store.state.userInfo),
    //     (this.islive = this.$store.state.isLive);

    //   // 作者ID
    //   this.authorId = this.$route.params.userId;
    //   // this.activeName = this.$route.query.activeName

    //   // 获取作者关注或粉丝数据
    //   if (this.activeName == "first"){
    //     this.getArticlesData(this.authorId,"followed")
    //   }else{
    //      this.getArticlesData(this.authorId,"fans")
    //   }
    // },
    // articleClick(articleId){
    //   this.$router.push({
    //   name:"ArticleDetail",
    //   params:{
    //     articleId:articleId
    //   },
    // });
    // },
    // handleClick(tab, event) {
    //   if (tab.label =="关注用户"){
    //     this.getArticlesData(this.authorId,"followed")
    //   }else{
    //     this.getArticlesData(this.authorId,"fans")
    //   }
    //   // this.getFollowData(this.author_id,"f")
    //   // console.log(tab.label, event);
    // },
    // // 获取作者关注或粉丝数据
    // getArticlesData(articleId, type) {
    //   let requestData = {
    //     author_id: articleId,
    //     type: type,
    //     user: this.userInfo.uid
    //   };
    //   userIndexFollows(requestData)
    //     .then(response => {
    //       this.followData = response.data.data;
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // },
    // // 关注和取消关注
    // followed(index, author) {
    //   // 先判断是否登录
    //   if (this.checkUser()) {
    //     let requestData = {
    //       user: this.userInfo.uid,
    //       author: author.id
    //     };
        
    //     // follow=true时，说明用户已关注该作者，所以type=0，做取消关注操作
    //     requestData.type = author.is_followed ? 0 : 1;
    //     userFollow(requestData)
    //       .then(response => {
    //         // follow=true，说明请求做的是取消关注操作，说明此时页面上应该显示‘关注’，则改变follow的值为false
    //         author.is_followed = author.is_followed ? false : true;
    //         // 修改数组中的值
    //         this.$set(this.followData, index, author);
            
    //       })
    //       .catch(error => {
    //         console.log(error);
    //       });
    //   }
    // },
    // // 检查用户是否登录
    // checkUser() {
    //   if (this.islive) {
    //     return true;
    //   } else {
    //     this.$router.push({
    //       name: "Login"
    //     });
    //   }
    // },
  },
  created(){
    this.initData()
    console.log(this.activeName);
  },
  // watch: {
  //   // 监听从父组件中传来的值
  //   active: {
  //     // immediate: true, // 很重要！！！
  //     handler (val) {
  //       this.activeName = val
  //       // 获取作者关注或粉丝数据
  //       if (this.activeName == "first"){
  //         this.getFollowData(this.authorId,"followed")
  //       }else{
  //         this.getFollowData(this.authorId,"fans")
  //       }
        
  //       // console.log('action Value:', val, this.levelPersonal)
  //     }
  //   }
  // },
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";
@import "@/styles/config.scss";

.icon-title{
  font-size: 15px;
  font-weight: bold;
}
.article-list {
  width: 623px;
  display: inline-block;
  float: left;
  // padding: 0 0 0 17px;
  // padding: 100px 100px;
  .title {
    font-size: 18px;
    height: 30px;
    display: block;
    padding: 0 0 5px 0;
    font-weight: 700;
  }
  p {
    font-size: $listContent;
  }
}
.article-table-bottom {
  font-size: 13px;
  .author-box {
    display: inline-block;
    padding: 5px 10px 0 0;
  }
}
// 设置svg大小
svg {
  font-size: 16px;
  margin-bottom: -3px;
}

// .fol-left {
//   display: inline-block;
//   .title {
//     font-size: 15px;
//     font-weight: bold;
//   }
//   .icon-list {
//     padding-top: 5px;

//     .meta-bolck {
//       // display: inline-block;
//       padding: 0 10px 0 10px;
//       border-right: 1px solid #ededed;
//       font-size: $minFont;
//       p {
//         font-size: $medFont;
//         color: #333;
//       }
//       a {
//         color: #969696;
//       }
//     }
//     .first {
//       padding: 0 10px 0 0;
//     }
//   }
// }
</style>