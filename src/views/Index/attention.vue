<template>
  <div class="attention">
      <div class="nav-left pull-left">
        <div id="box">
          <div class="box" v-infinite-scroll="load" infinite-scroll-disabled="disabled" >
              <ul class="list" >
                <li v-for="(i,index) in list" class="list-item" :key="index">{{ i }}</li>
              </ul>
              <p v-if="loading" style="margin-top:10px;" class="loading">
                <span></span>
              </p>
              <p v-if="noMore" style="margin-top:10px;font-size:13px;color:#ccc">没有更多了</p>
          </div>
        </div>
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
    return {
      count: 0,//起始页数值为0
      loading: false,
      totalPages: "",//取后端返回内容的总页数
      list: [1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10] //后端返回的数组
    };
  },
  computed: {
    noMore() {
      //当起始页数大于总页数时停止加载
      return this.count >= this.totalPages - 1;
    },
    disabled() {
      return this.loading || this.noMore;
    }
  },
  created() {
    // this.getMessage();
  },
  methods: {
    load() {
      //滑到底部时进行加载
      this.loading = true;
      setTimeout(() => {
        this.count += 1; //页数+1
        x = [1,2,3,4,5]
        this.list = this.list.concat(x); //因为每次后端返回的都是数组，所以这边把数组拼接到一起
        this.totalPages = 5;
        this.loading = false;
        // this.getMessage(); //调用接口，此时页数+1，查询下一页数据
      }, 2000);
    },
    getMessage() {
      let params = {
        pageNumber: this.count,
        pageSize: 10 //每页查询条数
      };
      this.$axios
        .post(
          "https://接口",
          params
        )
        .then(res => {
          console.log(res);
          this.list = this.list.concat(res.data.body.content); //因为每次后端返回的都是数组，所以这边把数组拼接到一起
          this.totalPages = res.data.body.totalPages;
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
    }
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
.article-list {
  width: 623px;
  display: inline-block;
  padding: 0 0 0 17px;
  .title {
    font-size: 18px;
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
.pageination{
  padding:20px 35px 0 0;
}
.author-list {
  width: 623px;
  display: inline-block;
  padding: 0 0 0 17px;
  .fol-left {
    display: inline-block;
    .title {
      font-size: 18px;
      font-weight: bold;
    }
    .icon-list {
      padding-top: 5px;

      .meta-bolck {
        // display: inline-block;
        padding: 0 10px 0 10px;
        border-right: 1px solid #ededed;
        font-size: $minFont;
        p {
          font-size: $medFont;
          color: #333;
        }
        a {
          color: #969696;
        }
      }
      .first {
        padding: 0 10px 0 0;
      }
    }
    .about-me{
       font-size: $listContent;
    }
  }
}

#box{
  width: 100px;
  height: 100%;
  // position: absolute;
  // overflow-y: auto;
  overflow: auto;
  overflow-x: hidden;
}
.box {
  width: 100px;
  margin:  0 auto;
}
.list {
  padding: 0;
  font-size: 14px;
}
.list-item {
  width: 50px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  list-style: none;
  padding: 0 1rem;
  box-sizing: border-box;
  height: 70px;
  line-height: 70px;
  border-bottom: 1px solid #e7e7e7;
}
.loading span {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid #409eff;
  border-left: transparent;
  animation: zhuan 0.5s linear infinite;
  border-radius: 50%;
}
@keyframes zhuan {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>