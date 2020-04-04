<template>
  <div class="follow-content">
    <template>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="关注用户" name="first">
          <div class="author-list">
            <!-- 关注用户列表 -->
            <template>
              <el-table :data="followData" style="width: 100%" :show-header="false">
                <el-table-column>
                  <template slot-scope="scope">
                    <div class="follow">
                      <div class="fol-left pull-left">
                        <div class="title">
                          <router-link tag="a" :to="`/userIndex/${scope.row.id}`" target="_blank">
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
                        >{{scope.row.is_followed ? '取消':'关注'}}</el-button>
                      </div>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </template>
            <div class="more">
              <el-button style="width:100%" type="info" round @click="onMore('followed')">阅读更多</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="粉丝" name="second">
          <div class="author-list">
            <!-- 粉丝列表 -->
            <template>
              <el-table :data="followData" style="width: 100%" :show-header="false">
                <el-table-column>
                  <template slot-scope="scope">
                    <div class="follow">
                      <div class="fol-left pull-left">
                        <div class="title">
                          <router-link tag="a" :to="`/userIndex/${scope.row.id}`" target="_blank">
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
                        >{{scope.row.is_followed ? '取消':'关注'}}</el-button>
                      </div>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </template>
            <div class="more">
              <el-button style="width:100%" type="info" round @click="onMore('fans')">阅读更多</el-button>
            </div>
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
      page:1,
      per_page:5,
      authorId: this.$route.params.userId,
      activeName :this.active,
      followData: [],
    };
  },
  methods: {
    initData() {
      this.getUserInfo()
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
        this.getFollowData(1,this.authorId,"followed")
      }else{
         this.getFollowData(1,this.authorId,"fans")
      }
    },
    authorClick(author_id){
      this.$router.push({
      name:"UserIndex",
      params:{
        userId:author_id
      }
    });
    },
    handleClick(tab, event) {
      // 切换清空数据
      this.page=1
      this.followData=[]
      if (tab.label =="关注用户"){
        this.getFollowData(1,this.authorId,"followed")
      }else{
        this.getFollowData(1,this.authorId,"fans")
      }
    },
    // 获取作者关注或粉丝数据
    getFollowData(page,author_id, type) {
      let requestData = {
        page:page,
        per_page:this.per_page,
        author_id: author_id,
        type: type,
        user: this.userInfo.uid
      };
      userIndexFollows(requestData)
        .then(response => {
          if (response.data.data.length){
            this.followData=this.followData.concat(response.data.data)
          }else{
            this.$message(
              {
                message:'无更多数据',
                type:'warning'
              }
            )
          }
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
    // 阅读更多
    onMore(category){
      this.page = this.page + 1
      this.getFollowData(this.page,this.authorId,category)
    }
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
        // 切换清空数据
        this.page=1
        this.followData=[]
        // 获取作者关注或粉丝数据
        if (this.activeName == "first"){
          this.getFollowData(1,this.authorId,"followed")
        }else{
          this.getFollowData(1,this.authorId,"fans")
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
.more{
  margin-top:20px;
}
</style>