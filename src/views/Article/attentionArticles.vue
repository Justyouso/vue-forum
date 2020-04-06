<template>
  <div class="user-info">
    <div class="user-title">
      <p class="title">{{this.authorInfo.name}}</p>
      <p class="summary">{{this.authorInfo.about_me}}</p>
      <p class="info">{{this.authorInfo.articles}}篇文章 • {{this.authorInfo.fans}}粉丝</p>
    </div>

    <div class="articles">
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
                          <!-- <el-button v-if=Info==user" class="pull-right" icon="el-icon-edit" size="mini" round @click="articleUpdate(scope.row.id)"></el-button>  -->
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
                          <!-- <el-button v-if="authorId==user" class="pull-right" icon="el-icon-edit" size="mini" round @click="articleUpdate(scope.row.id)"></el-button>  -->
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
  </div>
</template>

<script>
import { articleDetail,articleNewList } from "@/api/article";
export default {
  name: "userArticles",
  props:{
    authorInfo: {
      type: Object,
      // default: ''
    },
  },
  data() {
    return {
      page:1,
      per_page:5,
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
        author:this.authorInfo.id,
        order:sortFields
      };
      console.log(this.authorInfo);
      
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
    // 阅读更多
    onMore(sortFields){
      this.page = this.page + 1
      this.getArticlesData(this.page,sortFields)
    }
    
  },
  created(){
    this.initData()
  },
  watch: {
  // 监听从父组件中传来的值
  authorInfo: {
      // immediate: true, // 很重要！！！
      handler (val) {
        this.authorInfo = val
        // 切换清空数据
        this.page=1
        this.articlesData=[]
        // 获取作者关注或粉丝数据
        this.activeName = "first"
        this.getArticlesData(1,"timestamp")
      }
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";
@import "@/styles/config.scss";

.user-title{
  .title{
    font-size:21px;
    font-weight: bold;
    padding-bottom: 10px;
  }
  .summary{
    font-size:14px;
    color: #969696;
    padding-bottom: 5px;
  }
  .info{
    font-size:12px;
    color: #969696;
    padding-bottom: 5px;
  }
}
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
</style>