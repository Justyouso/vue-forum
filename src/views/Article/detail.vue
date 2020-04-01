<template>
  <div class="content-detail">
    <div class="article-detail">
      <!-- 作者展示 -->
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
        >{{follow ? '取消关注':'关注'}}</el-button>
        <div class="article-info">字数{{article.body_num}} 阅读 {{article.read}}</div>
      </div>
      <!-- 文章展示 -->
      <div class="editor">
        <mavon-editor :boxShadow="false" v-html="article.body_html"></mavon-editor>
      </div>
      <!-- 评论 -->
      <div class='markdown-body comment-warp'>
        <Comment :article="article.id" />
      </div>
    </div>
    <div class="relation_list">
      <template>
        <el-table :data="articles" style="width: 100%">
          <div>
            <el-table-column label="相关文章">
              <template slot-scope="scope">
                <!-- 文章标题 -->
                <router-link tag='a' class="login-register" :to="`/article/detail/${scope.row.id}`" target="_blank">
                  {{scope.row.title}}
                </router-link>
                <!-- 阅读量-->
                <p>阅读 {{scope.row.read}}</p>
              </template>
            </el-table-column>
          </div>
        </el-table>
      </template>

    </div>
    <div v-if="wordCloudData.length>0" class="word_cloud pull-right">
      <wordCloud :data="wordCloudData" :size-range="[10, 30]" />
    </div>
  </div>
</template>

<script>
import { articleDetail,articleNewList,articleWordCloud } from "@/api/article";
import { userFollow } from "@/api/user";
import wordCloud from "@/views/Article/wordCloud";
import Comment from "@/views/Comment/index"

export default {
  name: "articleDetail",
  components: {wordCloud,Comment},
  data() {
    return {
      article: {}, //文章详情
      follow: false,// 是否被关注状态
      userinfo: {}, // 用户信息
      islive: null ,// 用户是否存在
      articles:[], // 作者相关文章列表
      wordCloudData:[],// 词云
    };
  },
  methods: {
    // 初始化数据
    initData() {
      this.getArticleDetail(), 
      this.getWordCloud(),
      this.getUserInfo();
    },
    // 获取词云
    getWordCloud(){
      let requestData = {
        articles:this.articleId
      };
      articleWordCloud(requestData)
        .then(response => {
          this.wordCloudData = response.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 获取文章详情
    getArticleDetail() {
      articleDetail(this.articleId)
        .then(response => {
          this.article = response.data.data;
          // 获取作者是否被用户关注，前置条件是需要文章数据和用户数据
          this.getfollow(this.article.author_id);
          // 获取作者相关文章列表
          this.getArticles(this.article.author_id);
        })
        .catch(error => {
          console.log(error);
        });
      
    },
     // 获取作者相关最新文章列表
    getArticles(author_id){
      let requestData = {
        page:1,
        per_page:5,
        author:author_id
      }
      articleNewList(requestData)
        .then(response => {
          this.articles = response.data.data;
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
    getfollow(author_id) {
      // 判断用户是否存在
      if (this.islive) {
        let requestData = {
          user: this.userinfo.uid,
          author: author_id,
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
@import "@/styles/main.scss";
@import "@/styles/config.scss";
.content-detail{
  // background-color: #fff;
  width: 1000px;
  height: 100%;
  margin: auto;
}
.article-detail {
  height: 100%;
  width: 730px;
  display: inline-block;
  float: left;
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

.relation_list{
  width: 240px;
  padding: 0 0 0 30px;
  float: left;
  a{
    font-size: $medFont;
  }
  p{
    font-size: $minFont;
  }
}
.word_cloud{
  width: 240px;
  padding: 10px 0 0 30px;
}
.comment-warp{
  // padding-top: 10px;
  margin-top: 10px;
  border: 1px solid #f2f6fc;
}
</style>