<template>
  <div class="search">
    <div class="nav-left pull-left">
      <el-row class="tac">
        <el-col :span="20">
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo">
            <el-menu-item index="1" @click="getArticles()">
              <i class="el-icon-document"></i>
              <span slot="title">文章</span>
            </el-menu-item>
             <el-menu-item index="2" @click="getUsers()">
              <i class="el-icon-document"></i>
              <span slot="title">用户</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <div class="nav-right pull-left">
      <div v-if="flag=='articles'">
        {{flag}}
      </div>
      <div v-else>
        {{flag}}
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        keywords: this.$route.params.keywords,
        flag:"articles"
      }
    },
    methods: {
      getArticles(){
        this.flag="articles"
        console.log("文章");
        console.log(this.keywords);
        
      },
      getUsers(){
        this.flag="users"
        console.log("用户");
        console.log(this.keywords);
      }
    },
    created(){
      this.keywords= this.$route.params.keywords,
      this.getArticles()
    }
  }

</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";
@import "@/styles/config.scss";

.search {
  height: 100%;
  width: 960px;
  margin: auto;
}
.nav-left{
  width: 280px;
}
.nav-right{
  width: 680px;
}
</style>