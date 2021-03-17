<template>
  <div class="context">
    <div class="main"
         ref="main"
         style="transform: rotate(0deg)"
         :class="{'main-after':rotateMain}">
      <div class="login">
        <div class="login-head">
          登录
        </div>
        <div class="login-main">
          <el-form :model="loginForm"
                   ref="loginForm"
                   :rules="loginRules"
                   hide-required-asterisk="false"
                   :show-message="false">
            <el-form-item prop="userid" label-width="0px">
              <div class="login-input">
                <el-input size="mini" v-model="loginForm.userid"></el-input>
              </div>
            </el-form-item>
            <el-form-item  prop="password" label-width="0px">
              <div class="login-input">
                <el-input size="mini" type="password" v-model="loginForm.password"></el-input>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="login-sub">
          <el-checkbox v-model="remberMe">记住我</el-checkbox>
          <el-select v-model="language" size="mini">
            <el-option value="01" label="简体中文"></el-option>
            <el-option value="02" label="English"></el-option>
          </el-select>
        </div>
        <div class="login-option">
          <div class="login-option-main">
            <el-button @click="login">login</el-button>
            <el-button @click="rotateMain">register</el-button>
          </div>
          <div class="login-option-sub">
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </div>
      </div>
      <div class="register">
        <div class="register-head">注册</div>
        <div class="register-main">
          <el-form :model="registerForm"
                   ref="registerForm"
                   :rules="registerRules"
                   hide-required-asterisk="false"
                   :show-message="false">
            <el-form-item prop="userid" label-width="0px">
              <div class="login-input">
                <el-input size="mini" v-model="registerForm.userid"></el-input>
              </div>
            </el-form-item>
            <el-form-item  prop="password" label-width="0px">
              <div class="login-input">
                <el-input size="mini" type="password" v-model="registerForm.password"></el-input>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="register-sub">
          <el-button @click="rotateMain">AAA</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "login",
        data(){
          return{
            loginForm:{
              userid:'',
              password:'',
              language:'01',
            },
            loginRules:{
              userid:{
                required: true,
              },
              password:{
                required: true,
              }
            },
            registerForm:{
              userid:'',
              password:''
            },
            registerRules:{
              userid:{
                required: true,
              },
              password:{
                required: true,
              }
            },
            remberMe:false,
            language:'01',
          }
        },
        methods:{
          login(){
            //表单验证
            this.$refs['loginForm'].validate((valid)=>{
              if(valid){
                this.$api.user.login({
                  userid:this.loginForm.userid,
                  password:this.loginForm.password
                }).then((res)=>{
                  if(res.retCode !== '200') {
                    //登录失败
                    console.log("login error");
                    return false;
                  }
                  //Token过期
                  // if(res.retToken.token === null){
                  //   console.log("token is not found");
                  //   return false;
                  // }
                  //登录成功，保存语言、token和owner
                  this.$store.dispatch('userStore/storeLang',this.loginForm.language);
                  this.$store.dispatch('userStore/storeToken',res.retData.token);
                  this.$store.dispatch('userStore/storeOwner',this.loginForm.userid);
                  //记住我
                  // if(this.remberMe){
                  //   //永久保存在浏览器上
                  //   localStorage.setItem('ourline-userid',this.loginForm.userid);
                  //   localStorage.setItem('ourline-password',this.loginForm.password);
                  // }else{
                  //   //删除过往保存的该用户信息
                  //   localStorage.removeItem('ourline-userid');
                  //   localStorage.removeItem('ourline-password');
                  // }
                  //跳转
                  this.$router.push({name: 'mainpage'}).catch((err) => {
                    console.log(err)
                  });
                }).catch((err)=>{
                  console.log(err);
                })
              }
            })
          },
          //旋转主盒子
          rotateMain(){
            let main = this.$refs.main;
            let rotate = main.style.transform;
            rotate = rotate.substring(rotate.indexOf("(")+1,rotate.indexOf("d"));
            rotate = parseInt(rotate) - 180;
            console.log(rotate);
            rotate = "rotate(" + rotate + "deg)";
            main.style.transform = rotate;
          },
        }
    }
</script>

<style scoped>
/deep/ .el-select{
  width: 100px;
  margin-left: 108px;
}
/deep/ .login-option-main .el-button{
  width: 100px;
}
.el-form-item{
  margin-bottom: 10px;
}
.context{
  height: 100%;
  width: 100%;
}
.main{
  height: 1000px;
  width: 1000px;
  border-radius: 500px;
  background-color: bisque;
  margin-top: -140px;
  margin-left: 1020px;
  padding: 340px 120px;
  box-sizing: border-box;
  transition: all 0.5s linear 0s;
  transform: rotate(0deg);

}
.main-after{
  transform: rotate(-180deg);
}
.login{
  height: 320px;
  width: 320px;
  background-color: #ef907a;
  border-radius: 10px;
  overflow: hidden;
  float: left;
}
.register{
  height: 450px;
  width: 320px;
  background-color: steelblue;
  float: right;
  transform: rotate(180deg);
  margin-top: -70px;
}
.register-head{
  height: 8%;
  text-align: center;
  text-indent: 30px;/*缩进*/
  letter-spacing: 50px;/*字体间距*/
  font-size: 20px;
  line-height: 32px;
}
.register-main{
  height: 80%;
  background-color: red;
  padding: 18px 20px;
  box-sizing: border-box;
}
.register-sub{
  height: 12%;
  padding-left: 130px;
  padding-top: 7px;
  box-sizing: border-box;
}
.login-head{
  width: 100%;
  height: 10%;
  text-align: center;
  text-indent: 30px;/*缩进*/
  letter-spacing: 50px;/*字体间距*/
  font-size: 20px;
  line-height: 32px;
}
.login-main{
  width: 100%;
  height: 40%;
  background-color: darkblue;
  box-sizing: border-box;
  padding: 18px 20px;
}
.login-item{
  height: 40px;
  width: 100%;
}
.login-message{
  height: 100%;
  width: 20%;
  float: left;
}
.login-input{
  height: 100%;
  width: 100%;
  float: left;
}
.login-sub{
  width: 100%;
  height: 15%;
  background-color: #6c3049;
  box-sizing: border-box;
  padding: 9px 20px;
}
.login-option{
  width: 100%;
  height: 35%;
}
.login-option-main{
  height: 60%;
  padding: 10px 50px;
  box-sizing: border-box;
}
.login-option-sub{
  padding-left: 130px;
}
</style>
