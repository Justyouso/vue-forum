<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li v-for="item in menuTab" :key="item.id" :class="{'current': item.current}" @click="toggleMenu(item)">{{item.txt}}</li>
      </ul>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="loginForm" class="login-form" size="medium">
        <el-form-item prop="email" class="item-form">
          <label for="email">邮箱</label>
          <el-input id="email" type="text" v-model="ruleForm.email" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="username" class="item-form" v-show="model === 'register'">
          <label for="username" >用户名</label>
          <el-input id="username" type="text" v-model="ruleForm.username" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>

        <el-form-item prop="password" class="item-form">
          <label for="password">密码</label>
          <el-input id="password" type="password" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>

        <el-form-item prop="passwords" class="item-form" v-show="model === 'register'">
          <label for="passwords" >重复密码</label>
          <el-input id="passwords" type="password" v-model="ruleForm.passwords" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>

        <el-form-item prop="code" class="item-form"  v-show="model === 'register'">
          <label for="code">验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
               <el-input id="code" v-model="ruleForm.code"></el-input>
            </el-col>
            <el-col :span="9"> 
              <el-button type="success" class="block" @click="getSms()" :disabled= codeButtonStatus.status>{{codeButtonStatus.text}}</el-button>
            </el-col>
          </el-row> 
        </el-form-item>

        <router-link v-if="model === 'login'" to="/pwd/edit" style="color:white; font-size:14px">忘记密码</router-link>
        
        <el-form-item>
          <el-button type="danger" @click="submitForm('loginForm')" class="login-btn block">{{ model === 'login' ? "登陆":"注册" }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import sha1 from 'js-sha1'
import { GetSms, Register, Login } from '@/api/login'
import { reactive, ref, onMounted } from '@vue/composition-api'
import { stripscript, validateEmailPwdCode } from '@/utils/validate'
export default {
  name: "login",
  data(){
    //邮箱验证
    var validateEmail=(rule, value, callback)=>{
      if (value === '') {
        callback(new Error('请输入邮箱'));
      } else if (!validateEmailPwdCode(value,'email')){ // 验证邮箱各格式
        callback(new Error('邮箱格式错误'))
      }else{
        callback();
      }
    };
    //用户名验证
    var validateUsername=(rule, value, callback)=>{
      // 如果模块值为login,则直接通过,因为login没有重复密码
      if (this.model =='login') {callback();}
      //过滤掉特殊字符
      // 重新绑定form表单中的Username
      this.ruleForm.username = stripscript(value)
      // 将过滤的字符重新赋值给value
      value = stripscript(value)
      if (!value) {
        return callback(new Error('请输入用户名'));
      }else if (!validateEmailPwdCode(value,'username')){ //验证用户名
        callback(new Error('密码为6至20位数字+字母'))
      }else{
        callback();
      }
    };
    //密码验证
    var validatePassword=(rule, value, callback)=>{
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
      if (this.model == 'login') {callback();}

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
    var validateCode=(rule, value, callback)=>{
      if (this.model =='login') {callback();}
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
    return{
      // 登陆按钮
      menuTab:[
        {txt:"登录",current: false, type:'login'},
        {txt:"注册",current: false, type:'register'},
      ],
      // 模块值
      model:'login',
      // 验证码按钮状态和显示文本
      codeButtonStatus:{
        status: false,
        text: "发送验证码"
      },
      // 表单绑定数据
      ruleForm:{
        email: '',
        username:'',
        password: '',
        passwords:'',
        code: ''
      },
      // 表单验证
      rules:{
        email: [
          { validator: validateEmail, trigger: 'blur' }
        ],
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
      // 定时器
      timer :null,
    }
  },
  methods:{
    // 切换登陆和注册按钮
    toggleMenu(data){
      //初始化menuTab中的所有数据为false，for循环
      this.menuTab.forEach(elem => {
        elem.current=false
      });
      //添加高光
      data.current=true
      //改变model值
      this.model=data.type
      // 重置form表单
      this.resetForm()
      // 发送验证码后点击切换按钮，需要清除定时器和更改验证码状态
      this.clearCountDown()
    },
    // 重置form表单
    resetForm(){
      this.$refs['loginForm'].resetFields();
    },
    // 更新验证码按钮信息
    updateCodeButtonStatus(params){
      this.codeButtonStatus.status = params.status
      this.codeButtonStatus.text = params.text
    },
    // 获取验证码
    getSms(){
      // 验证邮箱
      if (this.ruleForm.email == ''){
        this.$message.error("邮箱不能为空!")
        return false
      }
      // 验证邮箱格式
      if (!validateEmailPwdCode(this.ruleForm.email,'email')){
        this.$message.error("邮箱格式错误!")
        return false
      }

      //验证码按钮禁用和显示文本
      this.updateCodeButtonStatus({status:true,text:"发送中"})
      
      // 请求接口
      let requestData = {email: this.ruleForm.email, module: this.model}
      GetSms(requestData).then(resoponse =>{
        let data = resoponse.data
        this.$message({
          message:data.message,
          type:"success"
        })
        // 调用定时器，倒计时
        this.countDown(60)
      }).catch(error =>{
        this.updateCodeButtonStatus({status:false,text:"发送验证码"})
        console.log(error)
      })
    },
    // 倒计时
    countDown(number){
      // setTimeout 只会执行一次
      // setInterval 不断执行，需要条件才会停止

      // 判断定时器是否存在，若有则先清除，为了防止定时器多次出现
      if(this.timer){ clearInterval(this.timer)}
      // 添加 定时器
      this.timer = setInterval(() =>{
        number-- 
        if (number === 0){
          clearInterval(this.timer)
          this.updateCodeButtonStatus({status:false,text:"重新发送"})
        }else{
          this.updateCodeButtonStatus({status:true,text:`倒计时${number}秒`})
        }
      },1000)
    },
    // 点击注册时跳转登陆清除倒计时以及将验证码恢复初始状态
    clearCountDown(){
      this.updateCodeButtonStatus({status:false,text:"获取验证码"})
      clearInterval(this.timer)
    },
    // 提交表单
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 判断是登陆还是注册 
          this.model === 'login' ? this.login():this.register() 
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    // 登陆操作
    login(){
      let requestData = {
        email: this.ruleForm.email,
        password: this.ruleForm.password,
      }
      Login(requestData).then(response =>{
        let data = response.data.data
        this.$store.commit('SET_USERINFO',data)
        this.$store.commit('SET_ISLIVE',true)
        // 清除验证码按钮和倒计时
        this.clearCountDown()
        // 跳转到最新文章
        this.$router.push({
          name: "IndexNew"
        })
      }).catch(error =>{
        console.log(error)
      })
    },
    // 注册操作
    register(){
      let requestData = {
            email: this.ruleForm.email,
            username:this.ruleForm.username,
            password: this.ruleForm.password,
            code: this.ruleForm.code,
            module: 'register'
          }
      Register(requestData).then(responce =>{
        // 清除验证码按钮和倒计时
        this.clearCountDown()
      }).catch(error =>{

      })
    }
  },
  created(){
    this.model = "login"
    if (this.$route.query.model){
      this.model = this.$route.query.model
    }
  }
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