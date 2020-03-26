<template>
  <div id="header-wrap">
    <div class="pull-left">
      <div class="pull-left header-icon">
        <router-link class="mid-wrap pull-left" to="/indexNew">
          <svg-icon iconClass="logo" className="logo" />
        </router-link>
      </div>
      <div class="header-mid pull-right">
        <!-- <div class="mid-wrap pull-left"> -->
        <router-link class="mid-wrap pull-left" to="/indexFound">
          <svg-icon iconClass="find" className="find" />发现
        </router-link>
        <!-- </div> -->
        <div class="mid-wrap pull-left">
          <router-link class="mid-wrap pull-left" to="/indexAttention">
            <svg-icon iconClass="attention" className="attention" />关注
          </router-link>
        </div>
        <div class="pull-left">
          <div :style="{display: 'inline-block'}">
            <el-input
              round
              size="medium"
              v-model="inputValue"
              placeholder="搜索"
              @focus="searchBtnColor= '#1D7BDE'"
              @blur="searchBtnColor= '#C0C4CC'"
              @keyup.enter.native="handleSearch"
    
            >
              <span slot="suffix" class="el-icon-search" @click="handleSearch" >

              </span>
              <!-- <svg-icon
                solt="suffix"
                iconClass="search"
                className="search"
                :style="{color:searchBtnColor,cursor: 'pointer'}"
                @click="handleSearch"
              /> -->
            </el-input>
          </div>
        </div>
      </div>
    </div>
    <div class="pull-right">
      <div v-if="islive" class="user-info pull-left">
        <template v-for="(item,index) in routers">
          <el-dropdown
            @command="handleCommand"
            v-if="!item.hidden"
            :key="item.id"
            :index="index + ''"
          >
            <span class="el-dropdown-link">
              {{userinfo.username}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                :command="subitem.name"
                v-for="subitem in item.children"
                :key="subitem.id"
              >{{subitem.meta.name}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </div>
      <div v-else class="user-info pull-left">
        <router-link class="login-register" to="/login">
          <el-button type="text">登陆</el-button>
        </router-link>
        <router-link class="login-register" to="/register">
          <el-button type="danger" round size="medium">注册</el-button>
        </router-link>
      </div>
      <div class="header-icon pull-left">
        <router-link class="login-register" :to="islive?'/userWriting':'/login'">
          <el-button type="danger" class="el-icon-edit" round size="medium">写文章</el-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from "@vue/composition-api";
export default {
  name: "Header",
  data() {
    return {
      routers: this.$router.options.routes,
      inputValue:"",
      searchBtnColor: '#C0C4CC'
    };
  },
  methods: {
    // 初始化数据
    initData() {
      this.getUserInfo();
    },
    // 获取基础信息
    getUserInfo() {
      (this.userinfo = this.$store.state.userInfo),
        (this.islive = this.$store.state.isLive);
    },
    // 跳转页面
    handleCommand(command) {
      this.$router.push({
        name: command,
        params:{
          userId:this.userinfo.uid
        },
        query:{
          type:2
        }
      });
    },
    handleSearch(){
      if (!this.inputValue){
        this.$message({
          message:"请输入关键词",
          type:"warning"
        })
      }else{
        this.$router.push({
          name: "IndexSearch",
          params:{
            keywords:this.inputValue
          }
        })
        console.log("搜索");
        console.log(this.inputValue);
      }
    }
  },
  created() {
    this.initData();
  }

  // setup(props,{ root }) {
  //   const userinfo = root.$store.state.userInfo

  //  // 获取所有路由
  //   const routers = reactive(root.$router.options.routes);

  //   console.log(userinfo.role);
  // /**
  //  * 函数
  //  */
  //   // 跳转页面
  //   const handleCommand = (command) =>{
  //       root.$router.push({
  //         name: command
  //       })
  //     }
  //   // const username = computed(()=>{
  //   //   if (!userinfo.username){
  //   //     return true
  //   //   }else{
  //   //     return false
  //   //   }
  //   // }

  //   // )
  //  return {
  //   userinfo,
  //   routers,
  //   handleCommand,
  //   // username
  //  }

  // }
};
</script>

<style lang="scss" scoped>
@import "../../../styles/config.scss";
#header-wrap {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 75px;
  background-color: #fff;
  // 阴影框
  // -webkit-box-shadow: 0 3px 16px 0 rgba(0,0,0,.1);
  box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.1);
  line-height: 75px;
}
.header-icon {
  padding: 0 32px;
  svg {
    margin-bottom: -12px;
    margin-left: 20px;
    font-size: 40px;
    fill: currentColor;
    color: rgb(8, 8, 8);
    cursor: pointer;
  }
}
.user-info {
  padding: 0 32px;
  height: 100%;
  border-right: 1px solid #ededed;
  // 兄弟节点的下一节点,user-info的下一兄弟节点是header-icon
  + .header-icon {
    padding: 0 28px;
  }
}
.header-mid {
  padding: 0 32px;
  font-size: 18px;
  cursor: pointer;
  svg {
    margin-bottom: -10px;
    margin-left: 20px;
    font-size: 30px;
    fill: currentColor;
    color: rgb(8, 8, 8);
  }
  .mid-wrap {
    padding: 0 32px;
  }
}

.login-register{
  padding: 20px;
}
</style>