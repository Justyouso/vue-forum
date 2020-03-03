<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li v-for="item in menuTab" :key="item.id" :class="{'current': item.current}" @click="toggleMenu(item)">{{item.txt}}</li>
      </ul>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="loginForm" class="login-form" size="medium">
        <el-form-item prop="username" class="item-form">
          <label for="username">邮箱</label>
          <el-input id="username" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="password" class="item-form">
          <label for="password">密码</label>
          <el-input id="password" type="text" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>

        <el-form-item prop="passwords" class="item-form" v-show="model === 'register'">
          <label for="passwords" >重复密码</label>
          <el-input id="passwords" type="text" v-model="ruleForm.passwords" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>

        <el-form-item prop="code" class="item-form">
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

        <el-form-item>
          <el-button type="danger" @click="submitForm('loginForm')" class="login-btn block" :disabled="loginButtonStatus">{{ model === 'login' ? "登陆":"注册" }}</el-button>
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
  setup(props,{ refs, root }){
    
     //用户名验证
    let validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else if (!validateEmailPwdCode(value,'email')){ // 验证邮箱各格式
        callback(new Error('邮箱格式错误'))
      }else{
        callback();
      }
    };

    //密码验证
    let validatePassword = (rule, value, callback) => {
      //过滤掉特殊字符
      // 重新绑定form表单中的password
      ruleForm.password = stripscript(value)
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
    let validatePasswords = (rule, value, callback) => {
      // 如果模块值为login,则直接通过,因为login没有重复密码
      if (model.value=='login') {callback();}

      //过滤掉特殊字符
      // 重新绑定form表单中的passwords
      ruleForm.passwords = stripscript(value)
      // 将过滤的字符重新赋值给value
      value = stripscript(value)
      if (!value) {
        return callback(new Error('请输入密码'));
      }else if (value != ruleForm.password){ //验证重复密码
        callback(new Error('重复密码错误'))
      }else{
        callback();
      }
    };
    //验证码验证
    let validateCode = (rule, value, callback) => {
      //过滤掉特殊字符
      // 重新绑定form表单中的code
      ruleForm.code = stripscript(value)
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

    /**
     * 声明数据
     */
    // 登陆按钮
    const menuTab = reactive([
      {txt:"登陆",current: true, type:'login'},
      {txt:"注册",current: false, type:'register'},
    ])
    // 模块值
    const model= ref('login')
    // 登陆按钮禁用状态
    const loginButtonStatus = ref(true);
    // 验证码按钮状态和显示文本
    const codeButtonStatus = reactive(
      {
        status: false,
        text: "发送验证码"
      }
    )
    // 表单绑定数据
    const ruleForm = reactive({
      username: '',
      password: '',
      passwords:'',
      code: ''
    })
    // 表单验证
    const rules= reactive({
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
    })
    // 倒计时变量
    const timer = ref(null)
/***************************************************************************** */

    /**
     * 声明函数
     * 1. 尽量提出公共方法，一个方法只一件事
     */
    // 切换登陆和注册按钮
    const toggleMenu = (data =>{
      //初始化menuTab中的所有数据为false，for循环
      menuTab.forEach(elem => {
        elem.current=false
      });
      //添加高光
      data.current=true
      //改变model值
      model.value =data.type
      // 重置form表单
      resetForm()
      // 发送验证码后点击切换按钮，需要清除定时器和更改验证码状态
      clearCountDown()
    })
    // 重置form表单
    const resetForm = (() =>{
      refs.loginForm.resetFields();
    })

    // 更新验证码按钮信息
    const updateCodeButtonStatus = ((params) =>{
      codeButtonStatus.status = params.status
      codeButtonStatus.text = params.text
    })

    // 获取验证码
    const getSms = (()=>{
      // 验证邮箱
      if (ruleForm.username == ''){
        root.$message.error("邮箱不能为空!")
        return false
      }
      // 验证邮箱格式
      if (!validateEmailPwdCode(ruleForm.username,'email')){
        root.$message.error("邮箱格式错误!")
        return false
      }

      //验证码按钮禁用和显示文本
      updateCodeButtonStatus({status:true,text:"发送中"})
      
      // 请求接口
      let requestData = {username: ruleForm.username, module: model.value}
      GetSms(requestData).then(resoponse =>{
        let data = resoponse.data
        root.$message({
          message:data.message,
          type:"success"
        })
        // 启动登陆或注册按钮
        loginButtonStatus.value=false
        // 调用定时器，倒计时
        countDown(60)
      }).catch(error =>{
        updateCodeButtonStatus({status:false,text:"发送验证码"})
        console.log(error)
      })
    })

    // 倒计时
    const countDown= ((number) =>{
      // setTimeout 只会执行一次
      // setInterval 不断执行，需要条件才会停止

      // 判断定时器是否存在，若有则先清除，为了防止定时器多次出现
      if(timer.value){ clearInterval(timer.value)}
      // 添加 定时器
      timer.value = setInterval(() =>{
        number-- 
        if (number === 0){
          clearInterval(timer.value)
          updateCodeButtonStatus({status:false,text:"重新发送"})
        }else{
          updateCodeButtonStatus({status:true,text:`倒计时${number}秒`})
        }
      },1000)
    })

    // 点击注册时跳转登陆清除倒计时以及将验证码恢复初始状态
    const clearCountDown = (() =>{
      updateCodeButtonStatus({status:false,text:"获取验证码"})
      clearInterval(timer.value)
    })

    // 提交表单
    const submitForm = (formName =>{
      console.log()
      refs[formName].validate((valid) => {
        if (valid) {
          // 判断是登陆还是注册 
          model.value === 'login' ? login():register() 
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    })

    // 登陆操作
    const login= (() =>{
      let requestData = {
            username: ruleForm.username,
            password: sha1(ruleForm.password),
            code: ruleForm.code,
            module: 'login'
          }
      Login(requestData).then(responce =>{
        // let data = resoponse.data
        // root.$message({
        //   message:data.message,
        //   type:"success"
        // })
        // 清除验证码按钮和倒计时
        clearCountDown()
        // 跳转到其他页面
        root.$router.push({
          name: "Console"
        })
      }).catch(error =>{

      })
    })

    // 注册操作
    const register= (() =>{
      let requestData = {
            username: ruleForm.username,
            password: sha1(ruleForm.password),
            code: ruleForm.code,
            module: 'register'
          }
      // console.log(menuTab[0])
      // toggleMenu(menuTab[0])
      Register(requestData).then(responce =>{
        // let data = resoponse.data
        // root.$message({
        //   message:data.message,
        //   type:"success"
        // })
        // 清除输入框内容
        toggleMenu(menuTab[0])
       
        // 清除验证码按钮和倒计时
        clearCountDown()
      }).catch(error =>{

      })
    })
/*********************************************************************************** */
    /**
     * 生命周期
     */
    // 挂载完成后
    onMounted(() =>{
   
    })
  
    /**
     * 返回数据
     */
    return {
      menuTab,
      model,
      loginButtonStatus,
      codeButtonStatus,
      ruleForm,
      rules,
      toggleMenu,
      submitForm,
      getSms
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