<template>
  <div id="app">

    <div>
      <ZJ/>
    </div>
    <h1 style="background: gray; height: 1px"/>
    <h1> Tampermonkey 调试</h1>
    <p/>
    <div style="text-align:center">
      <!--Tampermonkey h5代码开始点 -->


      <el-popover placement="top-start" title="" width="100" trigger="hover" content="登录以后将获得邮件和微信 更新 提醒哦！">
        <el-button type="primary" size="medium" slot="reference" @click="subscribeBtn">订阅按钮</el-button>
      </el-popover>

      <el-dialog title="提示" :visible.sync="subDialogState" width="30%" center>
        <span>{{ dialogText }}</span>
        <span slot="footer" class="dialog-footer">
           <el-button @click="cancelSub">取 消</el-button>
           <el-button type="primary" @click="subContent" :loading="subContentBtnState">确 定</el-button>
          </span>
      </el-dialog>


      <el-dialog
        title="登录提醒"
        :visible.sync="loginDialogState"
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

          <span slot="footer" class="dialog-footer">
          <el-button @click="register(true)">取消</el-button>
          <el-button style="text-align: center;" type="primary" @click="register(false)"
                     :disabled="registerBtnState">确定</el-button>
        </span>
        </el-dialog>

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


      <!--Tampermonkey h5代码结束点 -->
    </div>
  </div>
</template>

<script>
  import ZJ from "./components/ZJ"
  export default {
    name: 'App',
    components: {
      ZJ
    },

    // Tampermonkey 《Vue 代码》 开始点
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

        // 订阅按钮的状态
        subDialogState: false,

        // 订阅对话框中的确定按钮的 loading 的状态
        subContentBtnState: false,

        // 用户登录的状态
        userIsLogin: false,

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

        //登录信息
        userInfo: {
          user_name: '',
          user_password: '',
          user_email: '',
          user_is_active: '',
        },

        //登录框状态
        loginDialogState: false,
        innerVisible: false,

        //状态
        registerBtnState: true,


        // 订阅信息
        message: "",
        dialogText: "是否真的要订阅？",
        dialogVisible: false,

        // 影片订阅信息
        name: '',
        pid: '',
        url: '',
      };
    },
    methods: {
      login() {

        var name = this.userInfo.user_name;
        var password = this.userInfo.user_password;


        this.$refs.userInfo.validate((valid) => {
          if (valid) {
            this.loginDialogState = false;
            this.innerVisible = false;

            var that = this;

            var formData = new FormData();
            formData.append("account", name);
            formData.append("password", password);

            GM_xmlhttpRequest({
              method: 'POST',
              url: "http://zkteam.cc/Subscribe/login/",
              data: formData,
              onload: function (result) {

                that.subContentBtnState = false;

                var responseContent = result.responseText;
                console.log(responseContent);

                // {"code": 0, "message": "ok", "result": {"username": "a", "email": "741227905@qq.com", "is_active": true}}
                var objs = JSON.parse(responseContent);
                var code = objs['code'];
                var message = objs['message'];
                var resultJson = objs['result'];

                var l_name = resultJson['username'];
                var l_email = resultJson['email'];
                var l_is_active = resultJson['is_active'];

                console.log(code + "," + message + "," + l_name);

                if (code === 0) {
                  that.$notify({
                    title: '登录成功',
                    message: "当前登录用户是：" + name,
                    type: 'success'
                  });

                  that.userIsLogin = true;

                  GM_setValue("name", l_name);
                  GM_setValue("email", l_email);
                  GM_setValue("is_active", l_is_active);

                } else {
                  that.$notify({
                    title: '登录失败！',
                    message: "。。。",
                    type: 'error'
                  });
                  that.userIsLogin = false;
                }

                that.subDialogState = false;
              }
            });


          } else {
            this.$message.error('请先根据页面提示修复错误');
            return true;
          }
        });
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

            GM_xmlhttpRequest({
              method: 'POST',
              url: "http://zkteam.cc/Subscribe/register/",
              data: formData,
              onload: function (result) {

                that.subContentBtnState = false;

                var responseContent = result.responseText;
                console.log(responseContent);

                var objs = JSON.parse(responseContent);
                var code = objs['code'];
                var message = objs['message'];

                console.log(code + "," + message);

                if (code === 0) {
                  that.$notify({
                    title: '注册成功',
                    message: "您的账户名是：" + name,
                    type: 'success'
                  });
                } else {
                  that.$notify({
                    title: '注册失败！',
                    message: "。。。",
                    type: 'error'
                  });
                }

                that.subDialogState = false;
              }
            });

          } else {
            this.$message.error('请先根据页面提示修复错误');
            return true;
          }
        });
      },

      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          }).catch(_ => {
        });
      },

      cancelSub() {
        this.subDialogState = false;
        this.$message({
          message: '取消订阅',
          type: 'warning'
        });
      },

      subscribeBtn() {
        var nameStr = GM_getValue("name", "");
        var emailStr = GM_getValue("email", "");
        var isActiveStr = GM_getValue("is_active", "");

        console.log("存储的值是：" + nameStr + ", " + emailStr + ", " + isActiveStr);

        if (nameStr && emailStr) {
          this.subDialogState = true;
          this.userIsLogin = true;
          this.userInfo.user_name = nameStr;
          this.userInfo.user_email = emailStr;
          this.userInfo.user_is_active = isActiveStr;
        }

        if (this.userIsLogin) {
          this.$message("你已经登录啦！");
          this.subDialogState = true;
        } else {
          this.$message("你还没登录呢！请先登录");
          this.loginDialogState = true;
        }

        // return;


        var url = document.URL;
        var name = $("h1.font14w")[0].innerText;
        var pid = url.substring(url.lastIndexOf("/") + 1, url.length);
        var msg = "url 是：" + url + ",\n名字：" + name + ",\nid：" + pid;

        console.log(msg);
        this.dialogText = msg;

        this.pid = pid;
        this.name = name;
        this.url = url;
      },

      subContent() {
        // 订阅成功后 可以请求数据, 然后 确定按钮 转圈，成功和失败后都给予提示。
        // this.subDialogState = false;
        this.subContentBtnState = true;

        var params = 'pid=' + this.pid;
        params += '&name=' + this.name;
        params += '&url=' + this.url;

        var that = this;

        GM_xmlhttpRequest({
          method: 'GET',
          url: "http://zkteam.cc/Subscribe/add?" + params,
          onload: function (result) {
            that.subContentBtnState = false;

            var responseContent = result.responseText;
            console.log(responseContent);

            var objs = JSON.parse(responseContent);
            var code = objs['code'];
            var message = objs['message'];

            console.log(code + "," + message);

            if (code === 0) {
              that.$message({
                message: '订阅成功！',
                type: 'success'
              });
            } else {
              that.$message({
                showClose: true,
                message: '订阅失败!',
                type: 'error'
              });
            }

            that.subDialogState = false;
          }
        });

      },

      requestData() {
        this.subDialogState = false;

        var params = 'pid=' + this.pid;
        params += '&name=' + this.name;
        params += '&url=' + this.url;

        var that = this;

        GM_xmlhttpRequest({
          method: 'GET',
          url: "http://zkteam.cc/Subscribe/add?" + params,
          onload: function (result) {
            //eval(result.responseText);
            console.log(result.responseText);

            that.$message({
              message: '订阅成功！',
              type: 'success'
            });
          }
        });

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

    // Tampermonkey 《Vue 代码》 结束点
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
