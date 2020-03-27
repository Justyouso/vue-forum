<template>
  <div class="search">
    <div class="nav-left pull-left">
      <el-row class="tac">
        <el-col :span="20">
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo">
              <el-menu-item index="1" @click="getArticles()">
                <i class="el-icon-s-order icon"></i>
                <span slot="title">文章</span>
              </el-menu-item>
              <el-menu-item index="2" @click="getUsers()">
                <i class="el-icon-user-solid icon"></i>
                <span slot="title">用户</span>
              </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <div class="nav-right pull-left">
      <div v-if="flag=='articles'" class="article-list">
        <template>
          <el-table :data="articlesData" stripe style="width: 100%" :show-header="false">
            <div>
              <el-table-column>
                <template slot-scope="scope">
                  <router-link
                    tag="a"
                    class="title"
                    :to="`/article/detail/${scope.row.id}`"
                    target="_blank"
                  >{{scope.row.title}}</router-link>
                  <p>{{scope.row.summary}}</p>
                  <div class="article-table-bottom">
                    <router-link
                      tag="a"
                      class="author-box"
                      :to="`/userIndex/${scope.row.author_id}`"
                    >{{scope.row.author}}</router-link>
                    <svg-icon iconClass="read" className="read" />
                    <span class="author-box">{{scope.row.read}}</span>
                    <svg-icon iconClass="like" className="like" />
                    <span class="author-box">{{scope.row.comments}}</span>
                  </div>
                </template>
              </el-table-column>
            </div>
          </el-table>
        </template>
      </div>
      <div v-else class="author-list">
        <!-- 作者列表 -->
        <template>
          <el-table :data="usersData" style="width: 100%" :show-header="false">
            <el-table-column>
              <template slot-scope="scope">
                <div class="follow">
                  <div class="fol-left pull-left">
                    <div class="title">
                      <router-link tag="a" :to="{path:`/userIndex/${scope.row.id}`,query:{type:1}}" target="_blank">
                        {{scope.row.name}}
                      </router-link>
                    </div>
                    <span class="about-me">{{scope.row.about_me}}</span>
                    <div class="icon-list">
                      <div class="first meta-bolck pull-left">
                        关注 {{scope.row.followed}}
                      </div>
                      <div class="meta-bolck pull-left">
                        粉丝 {{scope.row.fans}}
                      </div>
                      <div class="meta-bolck pull-left">
                        <router-link tag="a" :to="`/userIndexFollow/`">文章 {{scope.row.articles}}</router-link>
                      </div>
                    </div>
                  </div>
                  <div class="fol-right pull-right">
                    <el-button
                      native-type="button"
                      :class="scope.row.is_followed?'el-icon-close':'el-icon-plus'"
                      size="medium"
                      :type="scope.row.is_followed ? '':'success'"
                      round
                      @click="followed(scope.$index,scope.row)"
                    >{{scope.row.is_followed ? '取消关注':'关注'}}</el-button>
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
      <div class="pull-right pageination">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="1000">
          </el-pagination>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        keywords: this.$route.params.keywords,
        flag:"articles",
        articlesData:[
          {
            author:"justyouso",
            author_id: 8,
            comments: 0,
            id: "29",
            read: 7,
            summary: "你好我是测试es",
            title: "测试提交es",
          },
          {
            author:"justyouso",
            author_id: 8,
            comments: 0,
            id: "29",
            read: 7,
            summary: "你好我是测试es",
            title: "测试提交es",
          }
        ],
        usersData:[
          {
            articles: 0,
            fans: 2,
            followed: 0,
            id: 10,
            is_followed: true,
            name: "wc",
            about_me:"楚虽三户，亡秦必楚"
          }
        ]
      }
    },
    methods: {
      getArticles(){
        this.flag="articles"
        console.log("文章");
        console.log(this.keywords);
        
      },
      getUsers(){
        this.flag="users"
        console.log("用户");
        console.log(this.keywords);
      }
    },
    created(){
      this.keywords= this.$route.params.keywords,
      this.getArticles()
    }
  }

</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";
@import "@/styles/config.scss";

.search {
  height: 100%;
  width: 960px;
  margin: auto;
}
.nav-left{
  width: 280px;
  .icon{
    font-size: 30px;
    padding: 0 30px 0 0;
  }
  span{
    font-size: 18px;
    font-weight: bold;
  }
  
}

.nav-right{
  width: 680px;
}
.article-list {
  width: 623px;
  display: inline-block;
  padding: 0 0 0 17px;
  .title {
    font-size: 18px;
    height: 30px;
    display: block;
    padding: 0 0 5px 0;
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
.pageination{
  padding:20px 35px 0 0;
}
.author-list {
  width: 623px;
  display: inline-block;
  padding: 0 0 0 17px;
  .fol-left {
    display: inline-block;
    .title {
      font-size: 18px;
      font-weight: bold;
    }
    .icon-list {
      padding-top: 5px;

      .meta-bolck {
        // display: inline-block;
        padding: 0 10px 0 10px;
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
      .first {
        padding: 0 10px 0 0;
      }
    }
    .about-me{
       font-size: $listContent;
    }
  }
}
</style>