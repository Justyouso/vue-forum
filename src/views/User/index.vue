<template>
  <div class="person">
    <div class="home-page pull-left">
      <!-- 头部 -->
      <div class="home-head pull-left">
        <div class="title pull-left">
          <div class="name">{{authorData.name}}</div>
          <div class="icon-list">
            <div class="meta-bolck pull-left">
              <el-button type="text" @click="handleChild('followed')">
                <p>{{authorData.followed}}</p>关注
                <i class="el-icon-arrow-right"></i>
              </el-button>
            </div>
            <div class="meta-bolck pull-left">
              <el-button type="text" @click="handleChild('fans')">
                <p>{{authorData.fans}}</p>粉丝
                <i class="el-icon-arrow-right"></i>
              </el-button>
            </div>
            <div class="meta-bolck pull-left">
              <el-button type="text" @click="handleChild('articles')">
                <p>{{authorData.articles}}</p>文章
                <i class="el-icon-arrow-right"></i>
              </el-button>
            </div>
          </div>
        </div>
        <div class="btn pull-left" v-if="userId!=userinfo.uid">
          <el-button
            native-type="button"
            :class="follow?'el-icon-close':'el-icon-plus'"
            size="medium"
            :type="follow ? '':'success'"
            round
            @click="followed(follow)"
          >{{follow ? '取消':'关注'}}</el-button>
        </div>
      </div>
      <!-- 展现主体 -->
      <div class="home-content home-head">
        <div v-if="childFlag == 'articles'">
          <Articles :user="userinfo.uid" />
        </div>
        <div v-else-if="childFlag=='followed'">
          <Follow active="first" />
        </div>
        <div v-else>
          <Follow active="second" />
        </div>
        <!-- <Follow :active="childFlag=='followed'?'first':'second'"/> -->
      </div>
    </div>
    <!-- 右侧展示 -->
    <div class="user-nav pull-left">
      <div class="user-summary">
        <p>个人介绍</p>
        {{authorData.about_me}}
      </div>
       <!-- 词云 -->
      <div v-if="wordCloudData.length" class="word-cloud">
        <wordCloud :data="wordCloudData" :size-range="[10, 30]" />
      </div>
    </div>
   
  </div>
</template>

<script>
import { articleDetail, articleNewList,articleWordCloud } from "@/api/article";
import { userFollow, userIndex } from "@/api/user";
import Follow from "./Index/follow";
import Articles from './Index/articles'
import wordCloud from "@/views/Article/wordCloud";
export default {
  name: "userIndex",
  components: { Follow,Articles, wordCloud },
  data() {
    return {
      childFlag: "articles",
      userId:this.$route.params.userId,
      // authorInfo: {
      //   id: this.$route.params.userId,
      // },
      follow: false,
      authorData: {},
      wordCloudData:[]// 词云
    };
  },
  methods: {
    // 初始化数据
    initData() {
      this.getUserInfo(), this.getAuthorData(this.userId);
      this.getfollow(this.userId),
      this.getWordCloud("timestamp")
    },
     // 获取词云
    getWordCloud(order){
      let requestData = {
        author:this.userId,
        order:order
      };
      articleWordCloud(requestData)
        .then(response => {
          this.wordCloudData = response.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 获取作者数据
    getAuthorData(author_id) {
      userIndex(author_id)
        .then(response => {
          this.authorData = response.data.data;
          console.log(this.authorData);
        })
        .catch(error => {
          console.log(error);
        });
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
    // 获取用户数据
    getUserInfo() {
      // 用户数据
      (this.userinfo = this.$store.state.userInfo),
        (this.islive = this.$store.state.isLive);
      console.log(this.userinfo);

      // 作者信息
      this.userId = this.$route.params.userId
    },
    // 关注和取消关注
    followed(follow) {
      // 先判断是否登录
      if (this.checkUser()) {
        let requestData = {
          user: this.userinfo.uid,
          // author: this.article.author_id
          author: this.userId
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
    },
    handleChild(flag) {
      this.childFlag = flag;
    }
  },
  created() {
    this.initData();
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";
@import "@/styles/config.scss";
.person {
  width: 920px;
  height: 100%;
  margin: auto;
}
.home-page {
  width: 640px;
  height: 100%;
  display: inline-block;
}
.home-head {
  width: 625px;
  padding-bottom: 30px;
  display: inline-block;
  padding-left: 15px;
  .title {
    width: 420px;
    display: inline-block;
    .name {
      font-size: 21px;
      font-weight: bold;
      padding: 0 0 0 2px;
    }
    .icon-list {
      padding-top: 10px;
      .meta-bolck {
        display: inline-block;
        padding: 0 10px 0 2px;
        border-right: 1px solid #ededed;
        font-size: $minFont;
        p {
          font-size: $medFont;
          color: #333;
        }
        a {
          color: #969696;
        }
        .el-button{
          padding: 0;
        }
      }
    }
  }
  .btn {
    padding-left: 10px;
  }
}
.user-nav {
  width: 250px;
  padding-left: 30px;
  font-size: 14px;

  .user-summary {
    border-bottom: 1px solid #ededed;
    padding-bottom: 10px;
  }
  p {
    padding: 10px 0 10px 0;
    color: #969696;
  }
}
.word-cloud {
  width: 250px;
  float: right;
  padding: 10px 0 0 30px;
}
</style>