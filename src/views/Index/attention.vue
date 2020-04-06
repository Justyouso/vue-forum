<template>
  <div class="attention">
    <div class="nav-left pull-left">
      <!-- 作者列表 -->
      <template>
        <el-table :data="tableData" style="width: 100%" :show-header="false">
          <el-table-column>
            <template slot-scope="scope">
              <div class="user-list pull-left" @click="handleUserInfo(scope.row)">
                <p>{{scope.row.name}}</p>
                <p style="font-size:12px">{{scope.row.articles}}篇文章 • {{scope.row.fans}}粉丝</p>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <div class="nav-right pull-right">
      <div v-if="tableData.length" class="article">
        <Articles :authorInfo="authorInfo" />
      </div>
      
    </div>
  </div>
</template>

<script>
import { articleSearch,userSearch } from "@/api/search";
import { userFollow,userIndexFollows,userIndex } from "@/api/user";
import Articles from '@/views/Article/attentionArticles'
  export default {
  components: {Articles},
  data() {
    return{
      userId:this.$route.params.userId,
      tableData:[],
      authorInfo:{}
    }
  },
  methods:{
    // 初始化数据
    initData(){
      this.getAuthorData(this.userId)
    },
    // 获取作者关注或粉丝数据
    getFollowData(author_id) {
      let requestData = {
        page:1,
        per_page:1000,
        author_id: author_id,
        type: "followed",
      };
      userIndexFollows(requestData)
        .then(response => {
          this.tableData=this.tableData.concat(response.data.data)
        })
        .catch(error => {
          console.log(error);
        });
    },
    //
    handleUserInfo(user){
      this.authorInfo = user
    },
    // 获取作者信息
    getAuthorData(author_id) {
      userIndex(author_id)
        .then(response => {
          this.authorInfo = response.data.data
          this.tableData = [response.data.data],
          // 获取作者关注数据
          this.getFollowData(this.userId)
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
  created(){
    this.initData()
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";
@import "@/styles/config.scss";

.attention {
  height: 100%;
  width: 960px;
  margin: auto;
}
.nav-left{
  overflow: scroll;
  overflow-x: hidden;
  height: 100%;
  width: 280px;
  .user-list{
    cursor: pointer;
    width: 250px;
  }
  
}

.nav-right{
  width: 620px;
}
</style>