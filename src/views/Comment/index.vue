<template>
    <div class="comment">
      <div class="comment-form">
        <el-form :model="commentForm" ref="commentForm" label-width="100px" class="demo-ruleForm">
          <el-form-item
            label="wangchao"
            prop="comment"
            :rules="[
              { required: true, message: '评论不能为空'},
            ]"
          >
            <el-input type="textarea" v-model="commentForm.comment" :autosize="{ minRows: 4, maxRows: 6}"
            placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="mini" type="primary" @click="submitForm('commentForm')" round>发布</el-button>
            <el-button size="mini" @click="resetForm('commentForm')" round>重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="comment-list">
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
        commentForm: {
          comment: ''
        },
        commentsData:[
          {
            username:"wc",
            userid:1,
            comment:"测试1",
            timestamp:"2019-03-05 13:15:16"
          },
          {
            username:"wc",
            userid:1,
            comment:"测试1",
            timestamp:"2019-03-05 13:15:16"
          },
          {
            username:"wc",
            userid:1,
            comment:"测试1",
            timestamp:"2019-03-05 13:15:16"
          },
        ]
      };
    },
    methods: {
      initData(){
        this.getUserInfo()
        this.getComments()
      },
      // 获取登陆用户信息
      getUserInfo(){
        this.userInfo = this.$store.state.userInfo,
        this.isLive = this.$store.state.isLive;
      },
      // 获取评论列表
      getComments(){
        let requestData = {
          article:this.article
        }
        commentList(requestData).then(response => {
          this.commentsData = response.data.data
        })
        .catch(error => {
          console.log(error);
        });
      },
      submitForm(formName) {
        // 判断用户是否登陆
        if (this.isLive){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              let requestData ={
                body:this.commentForm.comment,
                article:this.article,
                user:this.user
              }
              // 提交评论
              commentPost(requestData)
              .then(response => {
                // follow=true，说明请求做的是取消关注操作，说明此时页面上应该显示‘关注’，则改变follow的值为false
                author.is_followed = author.is_followed ? false : true;
                // 修改数组中的值
                const comment = {
                  author:this.userInfo.username,
                  author_id:this.userInfo.uid,
                  body:this.commentForm.comment,
                  article_id:this.author_id,
                  timestamp:"刚刚"
                }
                this.commentsData = comment.concat(this.commentsData)
                
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
.comment-list{
  margin-top:20px;
  padding-top: 10px;
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
</style>