<template>
  <div class="person">
    <div class="home-page pull-left">
      <!-- 头部 -->
      <div class="home-head pull-left ">
          <div class="title pull-left">
            <div class="name">
              王超
            </div>
            <div class="icon-list">
              <div  class="meta-bolck">
                <router-link tag='a' :to="`/userIndexFollow`">
                  <p>336</p>
                  关注
                </router-link>
              </div>
              <div  class="meta-bolck pull-left">
                <router-link tag='a' :to="`/userIndexFollow`">
                  <p>3360</p>
                  关注   <i class="el-icon-arrow-right"></i> 
                </router-link>
              </div>
            </div>
          </div>
          <div class="btn pull-left">
            按钮
          </div>
      </div>
      <!-- 展现主体 -->
      <div class='home-content home-head '>
        王超
        <router-view />
      </div>
    </div>
    <!-- 右侧展示 -->
    <div class="user-summary pull-left">
      简介
    </div>
  </div>

</template>

<script>

export default {
  name: "userIndex"
}
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";
@import "@/styles/config.scss";
.person{
  width: 920px;
  height: 100%;
  margin: auto;
}
.home-page{
  width: 625px;
  height: 100%;
  display: inline-block;
}
.home-head{
  width: 625px;
  padding-bottom: 30px;
  display: inline-block;
  padding-left: 15px;
  .title{
    width: 420px;
    display: inline-block;
    .name{
      font-size: 21px;
      font-weight:bold;
    }
    .icon-list{
      padding-top:5px;
      .meta-bolck{
        display: inline-block;
        padding: 0 10px 0 2px;
        border-right: 1px solid #ededed;
        font-size: $minFont;
        p{
          font-size: $medFont;
          color: #333;
        }
        a{
          color: #969696;
        }
      }
    }
  }
  .btn{
    padding-left:10px;
  }
}
.user-summary{
  width: 250px;
  padding-left: 30px;
}
</style>