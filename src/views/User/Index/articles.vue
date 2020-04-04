<template>
  <div class="follow-content">
    <template>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!-- 文章 -->
        <el-tab-pane name="first">
          <span class="icon-title" slot="label"><svg-icon iconClass="articles" className="articles" /> 文章</span>
          <div class="article-list">
            <template>
              <el-table :data="articlesData" stripe style="width: 100%" :show-header="false">
                  <el-table-column>
                    <template slot-scope="scope">
                      <div class="title">
                        <router-link
                          tag="a"
                          :to="`/article/detail/${scope.row.id}`" target="_blank"
                        >{{scope.row.title}}</router-link>
                        <el-button v-if="authorId==user" class="pull-right" icon="el-icon-edit" size="mini" round @click="articleUpdate(scope.row.id)"></el-button> 
                      </div>
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
            <div class="more">
              <el-button style="width:100%" type="info" round @click="onMore('timestamp')">阅读更多</el-button>
            </div>
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
                      <div class="title">
                        <router-link
                          tag="a"
                          :to="`/article/detail/${scope.row.id}`" target="_blank"
                        >{{scope.row.title}}</router-link>
                        <el-button v-if="authorId==user" class="pull-right" icon="el-icon-edit" size="mini" round @click="articleUpdate(scope.row.id)"></el-button> 
                      </div>
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
            <div class="more">
              <el-button style="width:100%" type="info" round @click="onMore('read')">阅读更多</el-button>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </template>
  </div>
</template>

<script>
import { articleDetail,articleNewList } from "@/api/article";
export default {
  name: "userArticles",
  props:{
    user: {
      type: Number,
      // default: ''
    }
  },
  data() {
    return {
      page:1,
      per_page:5,
      authorId: this.$route.params.userId,
      activeName :"first",
      articlesData: [],
    };
  },
  methods: {
    initData() {
      this.getArticlesData(1,"timestamp")
    },
    // 获取文章文章列表
    getArticlesData(page=1,sortFields) {
      let requestData = {
        page:page,
        per_page:this.per_page,
        author:this.authorId,
        order:sortFields
      };
      // 初始化文章列表
      articleNewList(requestData)
        .then(response => {
          if (response.data.data.length){
            this.articlesData=this.articlesData.concat(response.data.data)
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
    handleClick(tab, event) {
      // 切换清空数据
      this.page=1
      this.articlesData=[]
      if (tab.name=="second"){
        this.getArticlesData(1,"read")
      }else{
        this.getArticlesData(1,"timestamp")
      }
    },
    articleUpdate(articleId){
       this.$router.push({
        name: "UserWriting",
        params:{
          userId:this.user
        },
        query:{
          articleId:articleId,
          type:"update"
        }
      });
      console.log("编辑文章");
    },
    // 阅读更多
    onMore(sortFields){
      this.page = this.page + 1
      this.getArticlesData(this.page,sortFields)
    }
    
  },
  created(){
    this.initData()
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
.more{
  margin-top:20px;
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