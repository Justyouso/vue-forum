<template>
  <div class="setting-warp">
    <div class="setting-content">
      <el-form :label-position="labelPosition" :rules="rules" label-width="80px" :model="formLabel" ref="formLabel">
        <el-form-item label="昵称" prop="name">
          <el-input id="name" type="text" v-model="formLabel.name" autocomplete="off"></el-input>
        </el-form-item>
        <br>
        <hr/>
        <br>
        <el-form-item label="个人简介" prop="about_me">
          <el-input type="textarea" v-model="formLabel.about_me" :autosize="{ minRows: 2, maxRows: 4}" ></el-input>
        </el-form-item>
        <br>
        <hr/>
        <br>
        <el-form-item label="兴趣词汇" prop="topic">
          <div class="tag-list">
            <el-tag
              size="medium"
              :key="tag"
              v-for="tag in formLabel.topic"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)">
              {{tag}}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+添加</el-button>
          </div>
        </el-form-item>
        <br>
        <hr/>
        <br>
        <el-form-item>
          <el-button class="pull-right btn"  type="primary" @click="submitForm('formLabel')" round>保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>
<script>
import { stripscript, validateEmailPwdCode } from '@/utils/validate'
import { userIndex,userUpdate } from "@/api/user";
  export default {
    data() {
      //用户名验证
      var validateUsername=(rule, value, callback)=>{
        if (!value) {
          return callback(new Error('简介不能为空'));
        }else{
          callback();
        }
        // 重新绑定form表单中的Username
        this.formLabel.name = stripscript(value)
        // 将过滤的字符重新赋值给value
        value = stripscript(value)
        if (!value) {
          return callback(new Error('请输入用户名'));
        }else if (!validateEmailPwdCode(value,'username')){ //验证用户名
          callback(new Error('用户名为6至20位'))
        }else{
          callback();
        }
      };
      //简介验证
      var validateSummary=(rule, value, callback)=>{
        if (!value) {
          return callback(new Error('简介不能为空'));
        }else{
          callback();
        }
        // 重新绑定form表单中的Username
        this.formLabel.about_me = stripscript(value)
        // 将过滤的字符重新赋值给value
        value = stripscript(value)
        if (!value) {
          return callback(new Error('简介不能为空'));
        }else{
          callback();
        }
      };
      //简介验证
      var validateTopic=(rule, value, callback)=>{
        if (!this.formLabel.topic.length) {
          return callback(new Error('兴趣词汇不能为空'));
        }else{
          callback();
        }
      };
      return {
        userId:this.$route.params.userId,
        labelPosition: 'left',
        formLabel: {
          name: '',
          about_me: '',
          topic: []
        },
        inputVisible: false,
        inputValue: '',
        // 表单验证
        rules:{
          name: [
            { validator: validateUsername, trigger: 'blur' }
          ],
          // summary: [
          //   { validator: validateSummary, trigger: 'blur' }
          // ],
        //   topic: [
        //     { validator: validateTopic, trigger: 'blur' }
        //   ]
        },
      };
    },
    methods:{
      initData(){
        this.getAuthorData(this.userId)
      },
      // 获取用户信息
      getAuthorData(author_id) {
        userIndex(author_id)
          .then(response => {
            this.formLabel = response.data.data
          })
          .catch(error => {
            console.log(error);
          });
      },

      handleClose(tag) {
        this.formLabel.topic.splice(this.formLabel.topic.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.formLabel.topic.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },

      // 提交表单
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let requestData= {
              id:this.userId,
              about_me:this.formLabel.about_me,
              username:this.formLabel.name,
              topic:this.formLabel.topic.join(",")
            }
            userUpdate(requestData)
            .then(response => {
              this.$message({
                type:'success',
                message:response.data.data
              })
            })
            .catch(error => {
              console.log(error);
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },
      
    },
    created(){
      this.initData()
    }
  }
</script>
<style lang="scss" scoped>
.setting-warp{
  width: 500px;
  margin: auto;
}
.tag-list{
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  padding: 10px;
  font-size: 12px;
}
.el-tag {
    background-color: rgba(64,158,255,.1);
    padding: 0 10px;
    height: 32px;
    line-height: 30px;
    font-size: 12px;
    color: #409eff;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid rgba(64,158,255,.2);
    margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.btn{
  margin-right: 50px;
}
</style>