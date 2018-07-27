<template>
  <div id="app">

    <h1>用户注册和登录内部对话框 调试</h1>

    <!--<el-input placeholder="您的用户名或者邮箱" v-model="input3" clearable>-->
      <!--<template slot="prepend">用户名：</template>-->
    <!--</el-input>-->

    <p/>
    <p/>
    <p/>
    <p/>


    <el-button @click="centerDialogVisible = true" type="primary">点击打开 Dialog</el-button>
    <el-dialog
      title="登录提醒"
      :visible.sync="centerDialogVisible"
      width="40%" center>

      <el-dialog
        width="40%"
        title="请先注册一个账号吧"
        :visible.sync="innerVisible"
        append-to-body>


        <el-form :model="registerUserInfo" :rules="registerUserInfoRules" ref="registerUserInfo">

          <el-form-item prop="r_name">
            <el-input placeholder="您的用户名或者邮箱" type="text" v-model="registerUserInfo.r_name" clearable>
              <template slot="prepend">用 户 名：</template>
            </el-input>
          </el-form-item>

          <el-form-item prop="r_password">
            <el-input placeholder="密码" type="password" v-model="registerUserInfo.r_password" clearable>-->
              <template slot="prepend">密　　码：</template>
              </el-input>
          </el-form-item>

          <el-form-item prop="r_confirm_password">
            <el-input placeholder="确认密码" type="password" v-model="registerUserInfo.r_confirm_password" clearable>
            <template slot="prepend">确认密码：</template>
            </el-input>
          </el-form-item>


          <el-form-item prop="r_email">
            <el-input placeholder="邮箱地址" type="email" v-model="registerUserInfo.r_email" clearable>
              <template slot="prepend">邮箱地址：</template>
            </el-input>
          </el-form-item>

        </el-form>


        <!--<div style="padding: 20px auto auto;">-->
          <!--<div style=" margin: auto;">-->
            <!--<el-input placeholder="您的用户名或者邮箱" type="text" v-model="r_name" clearable>-->
              <!--<template slot="prepend">用 户 名：</template>-->
            <!--</el-input>-->
          <!--</div>-->
          <!--<div style=" margin: 30px auto auto;">-->
            <!--<el-input placeholder="密码" type="password" v-model="r_password" clearable>-->
              <!--<template slot="prepend">密　　码：</template>-->
            <!--</el-input>-->
          <!--</div>-->
          <!--<div style=" margin: 30px auto auto;">-->
            <!--<el-input placeholder="确认密码" type="password" v-model="r_confirm_password" clearable>-->
              <!--<template slot="prepend">确认密码：</template>-->
            <!--</el-input>-->
          <!--</div>-->
          <!--<div style=" margin: 30px auto auto;">-->
            <!--<el-input placeholder="邮箱地址" type="email" v-model="r_email" clearable>-->
              <!--<template slot="prepend">邮箱地址：</template>-->
            <!--</el-input>-->
          <!--</div>-->
        <!--</div>-->

        <span slot="footer" class="dialog-footer">
          <el-button @click="register(true)">取消</el-button>
          <el-button style="text-align: center;" type="primary" @click="register(false)" :disabled="registerBtnState">确定</el-button>
        </span>



      </el-dialog>


      <div style="padding: 20px auto auto;">
        <div style=" margin: auto;">
          <el-input placeholder="您的用户名或者邮箱" v-model="user_name" clearable>
            <template slot="prepend">用户名：</template>
          </el-input>
        </div>
        <div style=" margin: 30px auto auto;">
          <el-input placeholder="密码" type="password" v-model="user_password" clearable>
            <template slot="prepend">密　码：</template>
          </el-input>
        </div>
      </div>


      <span slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = true">注册</el-button>
        <el-button style="text-align: center;" type="primary" @click="login">登录</el-button>
      </span>
    </el-dialog>

    <div>
      <h1>hello!</h1>


    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {

      var validateUserName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入6位以上的用户名'));
        } else {
          // if (this.registerUserInfo.r_name !== '') {
          //   this.$refs.registerUserInfo.validateField('r_name');
          // }
          callback();
        }
      };

      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          // if (this.registerUserInfo.r_password !== '') {
          //   this.$refs.registerUserInfo.validateField('r_password');
          // }
          callback();
        }
      };

      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerUserInfo.r_password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

      return {
        // 用户注册信息
        registerUserInfo: {
          r_name: '',
          r_password: '',
          r_confirm_password: '',
          r_email: '',
        },


        // 密码校验规则
        registerUserInfoRules: {
          r_name: [
            { validator: validateUserName, trigger: 'blur' }
          ],
          r_password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          r_confirm_password: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          r_email: [
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ]
        },


        //登录信息
        user_name: '',
        user_password: '',

        //登录框状态
        centerDialogVisible: false,
        dialogVisible: false,
        innerVisible: false,

        //状态
        registerBtnState: true,
      };
    },
    methods: {
      login() {
        this.centerDialogVisible = false;
        var log = this.registerUserInfo.user_name + ", ";
        log += this.user_password;


        this.$notify({
          title: '登录成功',
          message: log,
          type: 'success'
        });


        // this.$message({
        //   message: log,
        //   type: 'warning'
        // });
      },

      register(isCancel) {
        if (isCancel) {
          this.$notify({
            title: '取消注册',
            message: '你已经取消注册了',
            type: 'warning'
          });
          this.innerVisible = false;
          return;
        }

        var name = this.registerUserInfo.r_name;
        var password = this.registerUserInfo.r_password;
        var confirm_password = this.registerUserInfo.r_confirm_password;
        var email = this.registerUserInfo.r_email;

        var log = name + ", ";
        log +=  password + ", ";
        log +=  confirm_password + ", ";
        log +=  email + ", ";



        this.$refs.registerUserInfo.validate((valid) => {
          if (valid) {
            this.innerVisible = false;

            this.$notify({
              title: '注册成功',
              message: "您的账户名是：" + name,
              type: 'success'
            });
          } else {
            this.$message.error('请先根据页面提示修复错误');
            return true;
          }
        });
      },
    },
    watch: {
      registerUserInfo: {  // 这监听对象值的改变 和上面的不一样。
        handler: function (curVal,oldVal){
          var registerUserInfo = this.registerUserInfo;

          if (!!registerUserInfo.r_name &&
            !!registerUserInfo.r_password &&
            !!registerUserInfo.r_confirm_password &&
            !!registerUserInfo.r_email) {
            this.registerBtnState = false;
          } else {
            this.registerBtnState = true;
          }
        },
        deep: true,
        // immediate: true
      },
    },
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
