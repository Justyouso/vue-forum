<template>
  <div class="new">
    <!-- 文章列表 -->
    <div class="article-list">
      <template>
        <el-table :data="articleData" stripe style="width: 100%" :show-header="false">
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
    <!-- 作者列表 -->
    <div class="author-list">
      <!-- 推荐作者 -->
      <template>
        <el-table :data="authorLabel" style="width: 100%" :show-header="false">
          <div class="author-label">
            <el-table-column>
              <template slot-scope="scope">
                {{scope.row.label}}
                <el-button class="pull-right icon-like" type="text" @click="changeAuthor()">
                  <div
                    :class="[rotate? 'el-icon-refresh rotate-start': 'el-icon-refresh rotate-end']"
                  ></div>
                  <div class="pull-right">{{scope.row.operation}}</div>
                </el-button>
                <el-button class="author-wrap" type="text">{{scope.row.username}}</el-button>
              </template>
            </el-table-column>
          </div>
        </el-table>
      </template>
      <!-- 作者列表 -->
      <template>
        <el-table :data="authorData" style="width: 100%" :show-header="false">
          <div>
            <el-table-column>
              <template slot-scope="scope">
                <!-- 作者名称 -->
                <!-- <el-button class="author-wrap" type="text">{{scope.row.username}}</el-button> -->
                <router-link
                    tag="a"
                    class="author-wrap"
                    :to="`/userIndex/${scope.row.id}`"
                >{{scope.row.username}}</router-link>
                <!-- 关注 -->
                <el-button
                  v-if="scope.row.follow"
                  class="pull-right icon-like el-icon-close"
                  type="text"
                  @click="followed(scope.$index,scope.row)"
                >取消关注</el-button>
                <el-button
                  v-else
                  class="pull-right icon-like el-icon-plus"
                  type="text"
                  @click="followed(scope.$index,scope.row)"
                >关注</el-button>

                <!-- 文章量 -->
                <p>写了{{scope.row.article}}篇文章 • {{scope.row.followed}}关注</p>
              </template>
            </el-table-column>
          </div>
        </el-table>
      </template>
    </div>
    <div v-if="wordCloudData.length" class="word-cloud">
      <wordCloud :data="wordCloudData" :size-range="[10, 30]" />
    </div>
  </div>
</template>

<script>
import wordCloud from "../Article/wordCloud";
import { reactive, ref, onMounted, computed } from "@vue/composition-api";
import { articleNewList,articleWordCloud } from "@/api/article";
import { userNewList, userFollow } from "@/api/user";
export default {
  name: "New",
  components: { wordCloud },
  data() {
    return {
      articleData: [], // 文章列表
      authorData: [], // 作者列表
      follow: true, // 关注与否
      authorLabel: [{ label: "推荐作者", operation: "换一批" }], // 作者列表头
      rotate: false, // 刷新图标
      pageInfo: {}, // 作者列表翻页信息
      wordCloudData:[]// 词云
    };
  },
  methods: {
    // 初始化数据
    initData() {
      this.getArticles(),
      this.getWordCloud(),
      this.getUserInfo();
      this.getAuthors(1, 5);
    },
    // 获取词云
    getWordCloud(){
      let requestData = {};
      articleWordCloud(requestData)
        .then(response => {
          this.wordCloudData = response.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 获取文章文章列表
    getArticles() {
      let requestData = {};
      // 初始化文章列表
      articleNewList(requestData)
        .then(response => {
          this.articleData = response.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getAuthors(page, per_page) {
      // 初始化作者列表
      let requestData = {
        page: page,
        per_page: per_page,
        user: this.userinfo.uid
      };
      userNewList(requestData)
        .then(response => {
          this.authorData = response.data.data;
          this.pageInfo = response.data.pageInfo;
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 关注和取消关注
    followed(index, author) {
      // 先判断是否登录
      if (this.checkUser()) {
        let requestData = {
          user: this.userinfo.uid,
          author: author.id
        };
        // follow=true时，说明用户已关注该作者，所以type=0，做取消关注操作
        requestData.type = author.follow ? 0 : 1;
        userFollow(requestData)
          .then(response => {
            // follow=true，说明请求做的是取消关注操作，说明此时页面上应该显示‘关注’，则改变follow的值为false
            author.follow = author.follow ? false : true;
            // 修改数组中的值
            this.$set(this.authorData, index, author);
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
    // 获取基础信息
    getUserInfo() {
      (this.userinfo = this.$store.state.userInfo),
        (this.islive = this.$store.state.isLive);
    },
    // 作者列表换批次
    changeAuthor() {
      // 更新标签旋转
      this.rotate = !this.rotate;
      // 判断是否有下一页
      if (this.pageInfo.has_next) {
        // 查询新的author
        this.getAuthors(this.pageInfo.page + 1, this.pageInfo.per_page);
      } else {
        this.$message({
          message: "无更多数据",
          type: "warning"
        });
      }
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

.new {
  height: 100%;
  width: 960px;
  margin: auto;
}
.article-list {
  width: 623px;
  display: inline-block;
  float: left;
  padding: 0 0 0 17px;
  // padding: 100px 100px;
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
.author-list {
  width: 280px;
  float: left;
  padding: 0 0 0 30px;
  .el-button {
    padding-top: 0;
    padding-bottom: 2px;
  }
  .author-wrap {
    color: #333;
    font-size: 14px;
  }
  .icon-like {
    padding-top: 5px;
    font-size: 13px;
  }
  p {
    font-size: 12px;
  }
  .author-label {
    font-size: 14px;
  }
  .rotate-end {
    // transform: rotate(-360deg);
    transition: all 0.5s;
  }

  .rotate-start {
    transform: rotate(7920deg);
    transition: all 0.5s;
  }
}
.word-cloud {
  width: 280px;
  float: right;
  padding: 10px 0 0 30px;
}
</style>