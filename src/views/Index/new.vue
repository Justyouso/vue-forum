<template>
  <div class="new">
    <div class="article-list">
      <template>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%"
          :show-header="false">
          <div >
            <el-table-column>
              <template  slot-scope="scope">
                <router-link tag='a' class="title" :to="`/infoCenter/detail/${scope.row.title}`">
                    {{scope.row.title}}
                </router-link>
                <p class='summary'>{{scope.row.summary}}</p>
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
      12155
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
    const tableData =  [{
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
    return {
      tableData
    }

    
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/main.scss';
@import "@/styles/config.scss";
.article-list {
  width: 700px;
  display: inline-block;
  float: left;
  .title{
    font-size:18px;
    height: 30px;
    display: block;
    padding: 0 0 5px 0;
  }
  p {
   font-size: 13px;
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

  float: left;
}

</style>