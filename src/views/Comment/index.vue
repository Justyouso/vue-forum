<template>
    <div class="comment">
      <div class="comment-form">
        <!-- <span class="pull-left form-title">{{userInfo.username}}</span> -->
        <span class="pull-left" >发表评论:</span>

          <el-form :model="commentForm" ref="commentForm" label-width="100px" class="demo-ruleForm">
            <el-form-item
              prop="comment"
              :rules="[
                { required: true, message: '评论不能为空'},
              ]"
            >
              <el-input type="textarea" v-model="commentForm.comment" :autosize="{ minRows: 4, maxRows: 6}"
              placeholder="请输入内容"></el-input>
            </el-form-item>
            <div class="btn pull-right">
              <el-form-item>
                <el-button size="mini" type="primary" @click="submitForm('commentForm')" round>发布</el-button>
                <el-button size="mini" @click="resetForm('commentForm')" round>重置</el-button>
              </el-form-item>
            </div>
          </el-form>
      </div>
      <div class="comment-list">
        <div class="comment-title">
          全部评论: {{totalpage}}
          <ul class="menu-tab pull-right">
            <li v-for="item in menuTab" :key="item.id" :class="[{ 'current': item.current }]" @click="handleOrderChange(item)">{{item.txt}}</li>
          </ul>
        </div>
        <div>
          <template>
            <el-table
              :data="commentsData"
              style="width: 100%"
              :show-header="false">
              <el-table-column>
                <template slot-scope="scope">
                  <div class="username">{{scope.row.author}}</div>
                  <div class="time">{{scope.row.timestamp}}</div>
                  <div class="comment">{{scope.row.body}}</div>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
         <div class="pull-right pageination">
          <el-pagination
            background
            @current-change="handleCurrentChange" 
            :current-page.sync="currentPage" 
            :page-size="per_page"
            layout="prev, pager, next"
            :total.sync="totalpage"
          >
          </el-pagination>
      </div>
      </div>
    </div>  
</template>
<script>
import { commentList,commentPost } from "@/api/comment";
  export default {
    props:{
      article:{
        type:String,
      }
    },
    data() {
      return {
        // 排序列表
        menuTab:[
          {txt:"按时间倒序",current: true, type:'desc'},
          {txt:"按时间正序",current: false, type:'asc'},
        ],
        // 分页信息
        currentPage:1,
        totalpage: 0,
        per_page:5,
        // 排序类型
        order:"desc",
        commentForm: {
          comment: ''
        },
        commentsData:[]
      };
    },
    methods: {
      initData(){
        this.getUserInfo()
        this.getComments(1)
      },
      // 获取登陆用户信息
      getUserInfo(){
        this.userInfo = this.$store.state.userInfo,
        this.isLive = this.$store.state.isLive;
      },
      // 获取评论列表
      getComments(page){
        let requestData = {
          page:page,
          per_page: this.per_page,
          article:this.article,
          sort:this.order
          
        }
        commentList(requestData).then(response => {
          this.commentsData = response.data.data
          this.totalpage = response.data.total
        })
        .catch(error => {
          console.log(error);
        });
      },
      // 改变页数
      handleCurrentChange(val) {
        this.getComments(val)
      },
      handleOrderChange(data){
        //初始化menuTab中的所有数据为false，for循环
        this.menuTab.forEach(elem => {
          elem.current=false
        });
        // 初始化当前页为1
        this.currentPage =1
        this.order=data.type
        // 改变选中高光
        data.current = true
        this.getComments(1)
      },
      submitForm(formName) {
        // 判断用户是否登陆
        if (this.isLive){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              let requestData ={
                body:this.commentForm.comment,
                article:this.article,
                user:this.userInfo.uid
              }
              // 提交评论
              commentPost(requestData)
              .then(response => {
                //清空输入框
                this.resetForm(formName)
                // 修改数组中的值
                const comment = [{
                  author:this.userInfo.username,
                  author_id:this.userInfo.uid,
                  body:this.commentForm.comment,
                  article_id:this.article,
                  timestamp:"刚刚"
                }]
                // 将提交的评论放入第一行
                this.commentsData = comment.concat(this.commentsData)
                this.totalpage = this.totalpage+1
              })
              .catch(error => {
                console.log(error);
              });
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        }else{
          this.$message({
            message:"请先登录",
            type:"warning"
          })
        }
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    },
    created(){
      this.initData()
    }
  }
</script>
<style lang="scss" scoped>
.comment-form{
  padding-bottom: 30px;
  .form-title{
    font-weight: bold;
  }
}
.comment-list{
  margin-top:30px;
  padding-top: 10px;
  .comment-title{
    padding-bottom: 20px;
    .time-filter{
      padding-right: 20px;
      font-size:13px;
      cursor: pointer;
    }
  }
}
.menu-tab{
  li {
    display: inline-block; // 线性块展示
    padding: 0 20px 0 0;
    font-size: 14px;
    cursor: pointer; //鼠标变手势
  }
  .current {
    color: #969696;
  }
}

.username{
  font-size: 15px;
}
.time{
  font-size: 12px;
  color: #969696;
}
.comment{
  font-size:16px;
}
.pageination{
  padding:20px 35px 0 0;
}
</style>