<template>
  <div style="margin: 30px">
    <el-button type="primary" size="medium" slot="reference" @click="innerVisible=true">注册按钮</el-button>


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

      <span slot="footer" class="dialog-footer">
          <el-button @click="register(true)">取消</el-button>
          <el-button style="text-align: center;" type="primary" @click="register(false)"
                     :disabled="registerBtnState">确定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>

  export default {
    name: "Register",
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

      // function resultCallBack(that, result, name) {
      //   that.subContentBtnState = false;
      //
      //   var responseContent = result.responseText;
      //   console.log(responseContent);
      //
      //   var objs = JSON.parse(responseContent);
      //   var code = objs['code'];
      //   var message = objs['message'];
      //
      //   console.log(code + "," + message);
      //
      //   if (code === 0) {
      //     that.$notify({
      //       title: '注册成功',
      //       message: "您的账户名是：" + name,
      //       type: 'success'
      //     });
      //   } else {
      //     that.$notify({
      //       title: '注册失败！',
      //       message: "。。。",
      //       type: 'error'
      //     });
      //   }
      //
      //   that.subDialogState = false;
      // }

      return {
        //登录框状态
        loginDialogState: false,
        innerVisible: false,
        //状态
        registerBtnState: true,

        // 用户注册信息
        registerUserInfo: {
          r_name: '',
          r_password: '',
          r_confirm_password: '',
          r_email: '',
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
          log += password + ", ";
          log += confirm_password + ", ";
          log += email + ", ";





          this.$refs.registerUserInfo.validate((valid) => {
            if (valid) {
              this.innerVisible = false;
              this.userIsLogin = false;

              var that = this;

              var formData = new FormData();
              formData.append("account", name);
              formData.append("password", password);
              formData.append("password2", confirm_password);
              formData.append("email", email);

              var isDebug = this.$store.state.isDebug;

              if (isDebug) {
                // 注册接口请求
                var obj = {};
                obj.name = name;
                obj.password = password;
                obj.confirm_password = confirm_password;
                obj.email = email;
                obj.that = that;
                this.$store.dispatch('register', obj);
              } else {
                GM_xmlhttpRequest({
                  method: 'POST',
                  url: "http://zkteam.cc/Subscribe/register/",
                  data: formData,
                  onload: function (result) {
                    var obj = {};
                    obj.that = that;
                    obj.result = result;
                    obj.name = name;
                    // resultCallBack(that, obj);
                    that.$store.dispatch('resultCallBack', obj);
                  }
                });
              }

            } else {
              this.$message.error('请先根据页面提示修复错误');
              return true;
            }
          });
        },
      }
    },
    watch: {
      registerUserInfo: {  // 这监听对象值的改变 和上面的不一样。
        handler: function (curVal, oldVal) {
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

<style scoped>

</style>
