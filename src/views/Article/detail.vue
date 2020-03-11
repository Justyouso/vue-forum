<template>
  <div class="article-detail">
    <div class="markdown-body author-detail">
      <!-- 作者 -->
      <div class="author">{{article.author}}</div>
      <!-- 关注 -->
      <el-button
        native-type="button"
        class="like"
        size="mini"
        :type="follow ? '':'danger'"
        round
        @click="followed(follow)"
      >{{follow ? '已关注':'关注'}}</el-button>
      <div class="article-info">字数{{article.body_num}} 阅读 {{article.read}}</div>
    </div>
    <!-- 文章展示 -->
    <div class="editor">
      <mavon-editor :boxShadow="false" v-html="article.body_html"></mavon-editor>
    </div>
  </div>
</template>

<script>
import { articleDetail } from "@/api/article";
import { userFollow } from "@/api/user";

export default {
  name: "articleDetail",
  // components: {mavonEditor},
  data() {
    return {
      article: {}, //文章
      follow: false,// 是否被关注状态
      userinfo: {}, // 用户信息
      islive: null // 用户是否存在
    };
  },
  methods: {
    // 初始化数据
    initData() {
      this.getArticle(), this.getUserInfo();
    },
    // 获取文章详情
    getArticle() {
      articleDetail(this.articleId)
        .then(response => {
          this.article = response.data.data;
          // 获取作者是否被用户关注，前置条件是需要文章数据和用户数据
          this.getfollow();
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 获取基础信息
    getUserInfo() {
      this.userinfo = this.$store.state.userInfo,
      this.islive = this.$store.state.isLive;
    },
    // 获取作者是否被关注
    getfollow() {
      // 判断用户是否存在
      if (this.islive) {
        let requestData = {
          user: this.userinfo.uid,
          author: this.article.author_id,
          type: 2
        };
        userFollow(requestData)
          .then(response => {
            // 更改关注状态
            this.follow = response.data.data;
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    // 关注和取消关注
    followed(follow) {
      // 先判断是否登录
      if (this.checkUser()) {
        let requestData = {
          user: this.userinfo.uid,
          author: this.article.author_id
        };
        // follow=true时，说明用户已关注该作者，所以type=0，做取消关注操作
        requestData.type = follow ? 0 : 1;
        userFollow(requestData)
          .then(response => {
            // follow=true，说明请求做的是取消关注操作，说明此时页面上应该显示‘关注’，则改变follow的值为false
            this.follow = follow ? false : true;
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    // 检查用户是否登录
    checkUser() {
      if (this.islive) {
        return true;
      } else {
        this.$router.push({
          name: "Login"
        });
      }
    }
  },
  computed: {
    // 获取路径参数ArticleId
    articleId: function() {
      return this.$route.params.articleId;
    }
  },
  created() {
    this.initData();
  },
  mounted() {
  }
};
</script>

<style lang="scss" scoped>
.article-detail {
  height: 100%;
  width: 920px;
  margin: auto;
  border: green;
}
.markdown-body {
  padding: 20px 30px;
}
.v-note-wrapper {
  border-top: 0;
}
.author-detail {
  // height: 30px;
  border: 1px solid #f2f6fc;
  border-bottom: 0;
  border-radius: 4px;
  .author {
    padding: 0 10px 0 0;
    display: inline;
  }
  .like {
    font-size: 14px;
  }
  .article-info {
    font-size: 13px;
  }
}
</style>