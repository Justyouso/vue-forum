<template>
  <div class="new">
      <div class="article-list">
        <template>
          <el-table
            :data="articleData"
            stripe
            style="width: 100%"
            :show-header="false">
            <div >
              <el-table-column>
                <template  slot-scope="scope">
                  <router-link tag='a' class="title" :to="`/article/detail/${scope.row.id}`">
                      {{scope.row.title}}
                  </router-link>
                  <p>{{scope.row.summary}}</p>
                  <div class="article-table-bottom">
                    <router-link tag='a' class="author-box" :to="`/infoCenter/detail/${scope.row.author_id}`">
                      {{scope.row.author}}
                    </router-link>
                    <svg-icon iconClass="read" className="read" />
                    <span  class="author-box">{{scope.row.read}}</span>
                    <svg-icon iconClass="like" className="like" />
                    <span  class="author-box">{{scope.row.comments}}</span>
                  </div>
                </template>
              </el-table-column>
            </div>
          </el-table>
        </template>
      </div>
      
      <div class="author-list">
        <template>
          <el-table
            :data="authorData"
            style="width: 100%">
            <div >
              <el-table-column label="推荐作者">
                <template  slot-scope="scope">
                  <router-link tag='a' class="title" :to="`/infoCenter/detail/${scope.row.username}`">
                      {{scope.row.username}}
                  </router-link>
                  <div class="icon-attention pull-right">
                    <router-link tag='a' class="title" :to="`/infoCenter/detail/${scope.row.name}`">
                      <svg-icon iconClass="add" className="add" />
                      <p> 关注</p>
                    </router-link>
                  </div>
                  <p>写了{{scope.row.article}}篇文章 • {{scope.row.followed}}关注</p>
                </template>
              </el-table-column>
            </div>
          </el-table>
        </template>
      </div>
  </div>

</template>

<script>
import { reactive, ref, onMounted,computed } from "@vue/composition-api";
import { articleNewList } from '@/api/article';
import { userNewList } from '@/api/user';
export default {
  
  name: 'New',
    data(){
      return {
        articleData: [],
        authorData: []
      }
    },
    created(){
      let requestData = {}
      // 初始化文章列表
      articleNewList(requestData).then(response =>{
          this.articleData = response.data.data
        }).catch(error =>{
          console.log(error)
      })
      // 初始化作者列表
      // let requestData = {"page":1,"pre_page":5}
      userNewList(requestData).then(response =>{
          this.authorData = response.data.data
        }).catch(error =>{
          console.log(error)
      })
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/main.scss';
@import "@/styles/config.scss";

.new {
  height: 100%;
  width: 920px;
  margin: auto;
}
.article-list {
  width: 623px;
  display: inline-block;
  float: left;
  padding: 0 0 0 17px;
  // padding: 100px 100px;
  .title{
    font-size:18px;
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
  .author-box{
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
  width: 250px;
  float: left;
  padding: 0 0 0 30px;
  p {
    font-size: $listContent;
  }
  .icon-attention{
    a {
      font-size:13px;
      color: rgb(22, 236, 68);
    }
    p {
      display: inline-block;
      font-size: 14px;
    }    
  }
}

</style>