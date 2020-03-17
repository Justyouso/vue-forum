<template>
  <div class="person">
    <div class="home-page pull-left">
      <!-- 头部 -->
      <div class="home-head pull-left">
        <div class="title pull-left">
          <div class="name">{{authorData.name}}</div>
          <div class="icon-list">
            <div class="meta-bolck pull-left">
              <router-link tag="a" :to="`/userIndexFollow/${authorInfo.id}`">
                <p>{{authorData.followed}}</p>关注
                <i class="el-icon-arrow-right"></i>
              </router-link>
            </div>
            <div class="meta-bolck pull-left">
              <router-link tag="a" :to="`/userIndexFollow/${authorInfo.id}`">
                <p>{{authorData.fans}}</p>粉丝
                <i class="el-icon-arrow-right"></i>
              </router-link>
            </div>
            <div class="meta-bolck pull-left">
              <router-link tag="a" :to="`/userIndexFollow/${authorInfo.id}`">
                <p>{{authorData.articles}}</p>文章
                <i class="el-icon-arrow-right"></i>
              </router-link>
            </div>
          </div>
        </div>
        <div class="btn pull-left" v-if="authorInfo.type==1">
          <el-button
          native-type="button"
          :class="follow?'el-icon-close':'el-icon-plus'"
          size="medium"
          :type="follow ? '':'success'"
          round
          @click="followed(follow)"
        >{{follow ? '取消关注':'关注'}}</el-button>
        </div>
      </div>
      <!-- 展现主体 -->
      <div class="home-content home-head">
        <router-view :key="$route.fullPath"/>
      </div>
    </div>
    <!-- 右侧展示 -->
    <div class="user-nav pull-left">
      <div class = "user-summary">
        <p>个人介绍</p>
          {{authorData.about_me}}
      </div>
    </div>
  </div>
</template>

<script>
import { articleDetail,articleNewList } from "@/api/article";
import { userFollow,userIndex } from "@/api/user";
export default {
  name: "userIndex",
  data() {
    return {
      authorInfo: {
        id: this.$route.params.userId,
        type: this.$route.query.type
      },
      follow:false,
      authorData:{},
    };
  },
  methods: {
    // 初始化数据
    initData() {
      this.getUserInfo(), this.getAuthorData(this.authorInfo.id);
      // this.getfollow(this.authorInfo.id);
    },
    // 获取作者数据
    getAuthorData(author_id) {
      userIndex(author_id)
        .then(response => {
         this.authorData = response.data.data
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
        console.log(this.islive);
        
      // 作者信息
      this.authorInfo = {
        id: this.$route.params.userId,
        type: this.$route.query.type
      };
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
        console.log(this.islive);
        
        return true;
      } else {
        console.log(this.islive);
        this.$router.push({
          name: "Login"
        });
      }
    }

  },
  created(){
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
  
  .user-summary{
    border-bottom: 1px solid #ededed;
    padding-bottom:10px;
  }
  p{
    padding: 10px 0 10px 0;
    color: #969696;
  }
}
</style>