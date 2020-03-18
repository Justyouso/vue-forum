<template>
  <div class="follow-content">
    <template>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="关注用户" name="first">
          <div class="author-list">
            <!-- 作者列表 -->
            <template>
              <el-table :data="followData" style="width: 100%" :show-header="false">
                <el-table-column>
                  <template slot-scope="scope">
                    <div class="follow">
                      <div class="fol-left pull-left">
                        <div class="title">
                          <!-- <el-button type="text" @click="authorClick(scope.row.id)">
                            {{scope.row.name}}
                          </el-button> -->
                          <!-- <router-link tag="a" :to="`/userIndex/${scope.row.id}+'?_='+(new Date).getTime()`">
                             {{scope.row.name}}
                          </router-link> -->
                          <!-- <router-link tag="a" :to="`/userIndex/${scope.row.id}`">
                             {{scope.row.name}}
                          </router-link> -->
                          <router-link tag="a" :to="{path:`/userIndex/${scope.row.id}`,query:{type:1}}" target="_blank">
                             {{scope.row.name}}
                          </router-link>
                        </div>
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
        </el-tab-pane>
        <el-tab-pane label="粉丝" name="second">
          <div class="author-list">
            <!-- 作者列表 -->
            <template>
              <el-table :data="followData" style="width: 100%" :show-header="false">
                <el-table-column>
                  <template slot-scope="scope">
                    <div class="follow">
                      <div class="fol-left pull-left">
                        <div class="title">
                          <!-- <el-button type="text" @click="authorClick(scope.row.id)">
                            {{scope.row.name}}
                          </el-button> -->
                          <!-- <router-link tag="a" :to="`/userIndex/${scope.row.id}+'?_='+(new Date).getTime()`">
                             {{scope.row.name}}
                          </router-link> -->
                          <!-- <router-link tag="a" :to="`/userIndex/${scope.row.id}`">
                             {{scope.row.name}}
                          </router-link> -->
                          <router-link tag="a" :to="{path:`/userIndex/${scope.row.id}`,query:{type:1}}" target="_blank">
                             {{scope.row.name}}
                          </router-link>
                        </div>
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
        </el-tab-pane>
      </el-tabs>
    </template>
  </div>
</template>

<script>
import { userFollow, userIndexFollows } from "@/api/user";
export default {
  name: "userFollow",
  props:{
    active:String,
    default:'followed'
  },
  data() {
    return {
      authorId: this.$route.params.userId,
      activeName :this.active,
      followData: [

      ],
      // activeName: "first"
    };
  },
  methods: {
    initData() {
      this.getUserInfo()
      console.log(this.activeName);
      
    },
    // 获取用户和作者基础
    getUserInfo() {
      // 用户数据
      (this.userInfo = this.$store.state.userInfo),
        (this.islive = this.$store.state.isLive);

      // 作者ID
      this.authorId = this.$route.params.userId;
      // this.activeName = this.$route.query.activeName

      // 获取作者关注或粉丝数据
      if (this.activeName == "first"){
        this.getFollowData(this.authorId,"followed")
      }else{
         this.getFollowData(this.authorId,"fans")
      }

      
    },
    authorClick(author_id){
      this.$router.push({
      name:"UserIndex",
      params:{
        userId:author_id
      },
      query:{
        type:1
      }
    });
    },
    handleClick(tab, event) {
      if (tab.label =="关注用户"){
        this.getFollowData(this.authorId,"followed")
      }else{
        this.getFollowData(this.authorId,"fans")
      }
      // this.getFollowData(this.author_id,"f")
      // console.log(tab.label, event);
    },
    // 获取作者关注或粉丝数据
    getFollowData(author_id, type) {
      let requestData = {
        author_id: author_id,
        type: type,
        user: this.userInfo.uid
      };
      userIndexFollows(requestData)
        .then(response => {
          this.followData = response.data.data;
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
          user: this.userInfo.uid,
          author: author.id
        };
        
        // follow=true时，说明用户已关注该作者，所以type=0，做取消关注操作
        requestData.type = author.is_followed ? 0 : 1;
        userFollow(requestData)
          .then(response => {
            // follow=true，说明请求做的是取消关注操作，说明此时页面上应该显示‘关注’，则改变follow的值为false
            author.is_followed = author.is_followed ? false : true;
            // 修改数组中的值
            this.$set(this.followData, index, author);
            
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
  },
  created(){
    this.initData()
  },
  watch: {
    // 监听从父组件中传来的值
    active: {
      // immediate: true, // 很重要！！！
      handler (val) {
        this.activeName = val
        // 获取作者关注或粉丝数据
        if (this.activeName == "first"){
          this.getFollowData(this.authorId,"followed")
        }else{
          this.getFollowData(this.authorId,"fans")
        }
        
        // console.log('action Value:', val, this.levelPersonal)
      }
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";
@import "@/styles/config.scss";

.fol-left {
  display: inline-block;
  .title {
    font-size: 15px;
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
}
</style>