<template>
  <div class="attention">
    <div class="nav-left pull-left">
      <!-- 作者列表 -->
      <template>
        <el-table :data="tableData" style="width: 100%" :show-header="false">
          <el-table-column>
            <template slot-scope="scope">
              <div class="user-list pull-left" @click="gen(userId)">
                <p>{{scope.row.name}}</p>
                <p style="font-size:12px">{{scope.row.articles}}篇文章 • {{scope.row.fans}}粉丝</p>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <!-- <div class="nav-right pull-left">
      右
    </div> -->
  </div>
</template>

<script>
import { articleSearch,userSearch } from "@/api/search";
import { userFollow } from "@/api/user";
  export default {
  data() {
    return{
      userId:this.$route.params.userId,
      tableData:[{"name":"王超","articles":10,"fans":20,"about_me":"我是一个很牛逼的人"}]
    }
  },
  methods:{
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
</style>