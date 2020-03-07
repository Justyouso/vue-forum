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
                  <router-link tag='a' class="title" :to="`/infoCenter/detail/${scope.row.title}`">
                      {{scope.row.title}}
                  </router-link>
                  <p>{{scope.row.summary}}</p>
                  <div class="article-table-bottom">
                    <router-link tag='a' class="author-box" :to="`/infoCenter/detail/${scope.row.title}`">
                      {{scope.row.author}}
                    </router-link>
                    <svg-icon iconClass="read" className="read" />
                    <span  class="author-box">{{scope.row.read}}</span>
                    <svg-icon iconClass="like" className="like" />
                    <span  class="author-box">{{scope.row.like}}</span>
                  </div>
                </template>
              </el-table-column>
            </div>
          </el-table>
        </template>
      </div>
      
      <div class="author-list">
        <div>换一批</div>
        <template>
          <el-table
            :data="authorData"
            style="width: 100%">
            <div >
              <el-table-column label="推荐作者">
                <template  slot-scope="scope">
                  <router-link tag='a' class="title" :to="`/infoCenter/detail/${scope.row.name}`">
                      {{scope.row.name}}
                  </router-link>
                  <div class="icon-attention pull-right">
                    <router-link tag='a' class="title" :to="`/infoCenter/detail/${scope.row.name}`">
                      <svg-icon iconClass="add" className="add" />
                      <p> 关注</p>
                    </router-link>
                  </div>
                  <p>写了{{scope.row.article}}篇文章 • {{scope.row.followed}}关注</p>
                  <!-- <div class="icon-attention">
                    <svg-icon iconClass="article" className="article" />
                    <p>{{scope.row.article}}</p>
                    <svg-icon iconClass="article" className="article" />
                    <p>{{scope.row.followed}}</p>
                  </div> -->
                  
                  <!-- <p>文章数</p>
                  <p>关注人数</p> -->
                  
                  <!-- <p class='summary'>{{scope.row.summary}}</p>
                  <div class="article-table-bottom">
                    <router-link tag='a' class="author-box" :to="`/infoCenter/detail/${scope.row.title}`">
                      {{scope.row.author}}
                    </router-link>
                    <svg-icon iconClass="read" className="read" />
                    <span  class="author-box">{{scope.row.read}}</span>
                    <svg-icon iconClass="like" className="like" />
                    <span  class="author-box">{{scope.row.like}}</span>
                  </div> -->
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
export default {
  
  name: 'New',
  setup(props,{ root }){

    /**
     * 变量
     */
    const articleData =  [{
          title: '婚姻中的男男女女',
          summary:"文/小蜗牛 最近几天晚上，总听到对面楼里一对夫妻的争吵声，现在小区本就比较安静，因此他们的声音格外清晰。 女人扯着嗓子喊叫，男人爆着粗口，让她滚...",
          author: '王小虎',
          read: 10,
          like:5
        },
        {
          title: '婚姻中的男男女女',
          summary:"文/小蜗牛 最近几天晚上，总听到对面楼里一对夫妻的争吵声，现在小区本就比较安静，因此他们的声音格外清晰。 女人扯着嗓子喊叫，男人爆着粗口，让她滚...",
          author: '王小虎',
          read: 10,
          like:5
        },
        {
          title: '婚姻中的男男女女',
          summary:"文/小蜗牛 最近几天晚上，总听到对面楼里一对夫妻的争吵声，现在小区本就比较安静，因此他们的声音格外清晰。 女人扯着嗓子喊叫，男人爆着粗口，让她滚...",
          author: '王小虎',
          read: 10,
          like:5
        },
        {
          title: '婚姻中的男男女女',
          summary:"文/小蜗牛 最近几天晚上，总听到对面楼里一对夫妻的争吵声，现在小区本就比较安静，因此他们的声音格外清晰。 女人扯着嗓子喊叫，男人爆着粗口，让她滚...",
          author: '王小虎',
          read: 10,
          like:5
        },
        {
          title: '婚姻中的男男女女',
          summary:"文/小蜗牛 最近几天晚上，总听到对面楼里一对夫妻的争吵声，现在小区本就比较安静，因此他们的声音格外清晰。 女人扯着嗓子喊叫，男人爆着粗口，让她滚...",
          author: '王小虎',
          read: 10,
          like:5
        },
        {
          title: '婚姻中的男男女女',
          summary:"文/小蜗牛 最近几天晚上，总听到对面楼里一对夫妻的争吵声，现在小区本就比较安静，因此他们的声音格外清晰。 女人扯着嗓子喊叫，男人爆着粗口，让她滚...",
          author: '王小虎',
          read: 10,
          like:5
        },{
          title: '婚姻中的男男女女',
          summary:"文/小蜗牛 最近几天晚上，总听到对面楼里一对夫妻的争吵声，现在小区本就比较安静，因此他们的声音格外清晰。 女人扯着嗓子喊叫，男人爆着粗口，让她滚...",
          author: '王小虎',
          read: 10,
          like:5
        },{
          title: '婚姻中的男男女女',
          summary:"文/小蜗牛 最近几天晚上，总听到对面楼里一对夫妻的争吵声，现在小区本就比较安静，因此他们的声音格外清晰。 女人扯着嗓子喊叫，男人爆着粗口，让她滚...",
          author: '王小虎',
          read: 10,
          like:5
        }]
    
    const authorData = [
      {
        "name":"王超",
        "article":10,
        "followed":200
      },
      {
        "name":"王超",
        "article":10,
        "followed":20
      },
      {
        "name":"王超",
        "article":10,
        "followed":20
      },
      {
        "name":"王超",
        "article":10,
        "followed":20
      },
      {
        "name":"王超",
        "article":10,
        "followed":20
      }
    ]
    
    return {
      articleData,
      authorData
    }

    
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