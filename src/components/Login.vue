<template>

  <div style="margin: 30px">

    <el-button type="primary" size="medium" slot="reference" @click="loginDialogState=true">登录按钮</el-button>


    <el-dialog
      title="登录提醒"
      :visible.sync="loginDialogState"
      width="40%" center>

      <el-form :model="userInfo" :rules="registerUserInfoRules" ref="userInfo">
        <el-form-item prop="user_name">
          <el-input placeholder="您的用户名或者邮箱" type="text" v-model="userInfo.user_name" clearable>
            <template slot="prepend">用 户 名：</template>
          </el-input>
        </el-form-item>

        <el-form-item prop="user_password">
          <el-input placeholder="密码" type="password" v-model="userInfo.user_password" clearable>
            <template slot="prepend">密　　码：</template>
          </el-input>
        </el-form-item>
      </el-form>

      <div style="text-align: center">
        <el-button type="text" size="mini">如有任何疑问请添加微信：gdky005</el-button>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = true">注册</el-button>
        <el-button style="text-align: center;" type="primary" @click="login">登录</el-button>
      </span>

    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "Login",
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
        zkIsDebug: this.$store.state.isDebug,
        //登录框状态
        loginDialogState: false,
        innerVisible: false,

        //登录信息
        userInfo: {
          user_name: '',
          user_password: '',
          user_email: '',
          user_is_active: '',
          user_id: "",
        },

        // 密码校验规则
        registerUserInfoRules: {

          user_name: [
            {validator: validateUserName, trigger: 'blur'}
          ],
          user_password: [
            {validator: validatePass, trigger: 'blur'}
          ],

          r_name: [
            {validator: validateUserName, trigger: 'blur'}
          ],
          r_password: [
            {validator: validatePass, trigger: 'blur'}
          ],
          r_confirm_password: [
            {validator: validatePass2, trigger: 'blur'}
          ],
          r_email: [
            {required: true, message: '请输入邮箱地址', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
          ]
        },

      };
    },
    methods: {

      saveData: function (l_name, l_email, l_is_active, l_user_id) {
        if (!this.zkIsDebug) {
          GM_setValue("name", l_name);
          GM_setValue("email", l_email);
          GM_setValue("is_active", l_is_active);
          GM_setValue("user_id", l_user_id);
        }
      },
      // resultCallBack: function (that, result, name) {
      //   that.subContentBtnState = false;
      //
      //   var responseContent = result.responseText;
      //   console.log(responseContent);
      //
      //   // {"code": 0, "message": "ok", "result": {"username": "a", "email": "741227905@qq.com", "is_active": true}}
      //   var objs = JSON.parse(responseContent);
      //   var code = objs['code'];
      //   var message = objs['message'];
      //   var resultJson = objs['result'];
      //
      //   var l_name = resultJson['username'];
      //   var l_email = resultJson['email'];
      //   var l_is_active = resultJson['is_active'];
      //   var l_user_id = resultJson['user_id'];
      //
      //   console.log(code + "," + message + "," + l_name + ", user_id:" + l_user_id);
      //
      //   if (code === 0) {
      //     that.$notify({
      //       title: '登录成功',
      //       message: "当前登录用户是：" + name,
      //       type: 'success'
      //     });
      //
      //     that.userIsLogin = true;
      //     that.userInfo.name = l_name;
      //     that.userInfo.email = l_email;
      //     that.userInfo.is_active = l_is_active;
      //     that.userInfo.user_id = l_user_id;
      //
      //     this.saveData(l_name, l_email, l_is_active, l_user_id);
      //
      //     // that.requestQRCode()
      //
      //   } else {
      //     that.$notify({
      //       title: '登录失败！',
      //       message: "。。。",
      //       type: 'error'
      //     });
      //     that.userIsLogin = false;
      //   }
      //
      //   that.subDialogState = false;
      //   return name;
      // },

      login() {

        var account = this.userInfo.user_name;
        var password = this.userInfo.user_password;


        this.$refs.userInfo.validate((valid) => {
          if (valid) {
            this.loginDialogState = false;
            this.innerVisible = false;

            var that = this;

            var formData = new FormData();
            formData.append("account", account);
            formData.append("password", password);


            var obj = {};
            obj.account = account;
            obj.password = password;
            obj.that = that;


            this.$store.dispatch('login', obj);

            return true;

            GM_xmlhttpRequest({
              method: 'POST',
              url: "http://zkteam.cc/Subscribe/login/",
              data: formData,
              onload: function (result) {
                name = this.resultCallBack(that, result, name);
              }
            });


          } else {
            this.$message.error('请先根据页面提示修复错误');
            return true;
          }
        });
      },
    }
  }
</script>

<style scoped>

</style>
