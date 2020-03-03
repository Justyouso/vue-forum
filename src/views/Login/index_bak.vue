<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li v-for="item in menuTab" :key="item.id" :class="{'current': item.current}" @click="toggleMenu(item)">{{item.txt}}</li>
      </ul>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form" size="medium">
        <el-form-item prop="username" class="item-form">
          <label>邮箱</label>
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="password" class="item-form">
          <label>密码</label>
          <el-input type="text" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>

        <el-form-item prop="passwords" class="item-form" v-show="model === 'register'">
          <label>重复密码</label>
          <el-input type="text" v-model="ruleForm.passwords" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>

        <el-form-item prop="code" class="item-form">
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
               <el-input v-model.number="ruleForm.code"></el-input>
            </el-col>
            <el-col :span="9"> 
              <el-button type="success" class="block">获取验证码</el-button>
            </el-col>
          </el-row> 
        </el-form-item>

        <el-form-item>
          <el-button type="danger" @click="submitForm('ruleForm')" class="login-btn block">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/composition-api'
import { stripscript, validateEmailPwdCode } from '@/utils/validate'
export default {
  name: "login",
  setup(props,context){
    // 说有数据都放在这里
     
  },
  data(){
    //用户名验证
    var validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else if (!validateEmailPwdCode(value,'email')){ // 验证邮箱各格式
        callback(new Error('邮箱格式错误'))
      }else{
        callback();
      }
    };

    //密码验证
    var validatePassword = (rule, value, callback) => {
      //过滤掉特殊字符
      // 重新绑定form表单中的password
      this.ruleForm.password = stripscript(value)
      // 将过滤的字符重新赋值给value
      value = stripscript(value)
      if (!value) {
        return callback(new Error('请输入密码'));
      }else if (!validateEmailPwdCode(value,'pwd')){ //验证密码
        callback(new Error('密码为6至20位数字+字母'))
      }else{
        callback();
      }
    };

    //重复密码验证
    var validatePasswords = (rule, value, callback) => {
      // 如果模块值为login,则直接通过,因为login没有重复密码
      if (this.model=='login') {callback();}

      //过滤掉特殊字符
      // 重新绑定form表单中的passwords
      this.ruleForm.passwords = stripscript(value)
      // 将过滤的字符重新赋值给value
      value = stripscript(value)
      if (!value) {
        return callback(new Error('请输入密码'));
      }else if (value != this.ruleForm.password){ //验证重复密码
        callback(new Error('重复密码错误'))
      }else{
        callback();
      }
    };
    //验证码验证
    var validateCode = (rule, value, callback) => {
      //过滤掉特殊字符
      // 重新绑定form表单中的code
      this.ruleForm.code = stripscript(value)
      // 将过滤的字符重新赋值给value
      value = stripscript(value)
      if (value === '') {
        callback(new Error('请输入验证码'));
      } else if (!validateEmailPwdCode(value,'code')) {
        callback(new Error('验证码格式错误'));
      } else {
        callback();
      }
    };
    return {
      //模块值
      model:'login',
      //表单数据
      ruleForm: {
          username: '',
          password: '',
          passwords:'',
          code: ''
        },
      // 验证规则
      rules: {
        username: [
          { validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        passwords: [
          { validator: validatePasswords, trigger: 'blur' }
        ],
        code: [
          { validator: validateCode, trigger: 'blur' }
        ]
      },
      // 菜单表
      menuTab:[
        {txt: "登陆","current":true,"type":'login'},
        {txt: "注册","current":false,"type":'register'}
      ]
    }
  },
  created(){},
  mounted(){},
  methods:{
    // 改变高光方法
    toggleMenu(data){
      //初始化menuTab中的所有数据为false，for循环
      this.menuTab.forEach(elem => {
        elem.current=false
      });
      //添加高光
      data.current=true
      this.model =data.type
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
};
</script>

<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login-wrap{
  width: 330px;
  margin: auto;
}
.menu-tab{
  text-align: center; //居中
  li {
    display: inline-block; // 线性块展示
    width: 88px;
    line-height: 36px; //每行的高
    font-size: 14px;
    color: #fff;
    border-radius: 2px; //加圆角
    cursor: pointer; //鼠标变手势
  }
  .current {
    background-color: rgba(0,0,0,.1); // 透明度
  }
}
.login-form{
  margin-top:29px;
  label {
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: #fff;
  }
  .item-form {margin-bottom: 13px;}
  .block{
    display: block;
    width: 100%;
  }
  .login-btn {margin-top: 19px;}
}

</style>