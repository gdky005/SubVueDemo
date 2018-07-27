<template>
  <div id="app">

    <h1>用户注册和登录内部对话框 调试</h1>

    <el-input placeholder="您的用户名或者邮箱" v-model="input3" clearable>
      <template slot="prepend">用户名：</template>
    </el-input>

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
        width="60%"
        title="请注册一个账号吧"
        :visible.sync="innerVisible"
        append-to-body>

        <div style="padding: 20px auto auto;">
          <div style=" margin: auto;">
            <el-input placeholder="您的用户名或者邮箱" type="text" v-model="r_name" clearable>
              <template slot="prepend">用 户 名：</template>
            </el-input>
          </div>
          <div style=" margin: 30px auto auto;">
            <el-input placeholder="密码" type="password" v-model="r_password" clearable>
              <template slot="prepend">密　　码：</template>
            </el-input>
          </div>
          <div style=" margin: 30px auto auto;">
            <el-input placeholder="确认密码" type="password" v-model="r_confirm_password" clearable>
              <template slot="prepend">确认密码：</template>
            </el-input>
          </div>
          <div style=" margin: 30px auto auto;">
            <el-input placeholder="邮箱地址" type="email" v-model="r_email_password" clearable>
              <template slot="prepend">邮箱地址：</template>
            </el-input>
          </div>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="register(true)">取消</el-button>
          <el-button style="text-align: center;" type="primary" @click="register(false)">确定</el-button>
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
      return {
        //登录信息
        user_name: '',
        user_password: '',

        // 注册信息
        r_name: '',
        r_password: '',
        r_confirm_password: '',
        r_email_password: '',

        //登录框状态
        centerDialogVisible: false,
        dialogVisible: false,
        innerVisible: false
      };
    },
    methods: {
      login() {
        this.centerDialogVisible = false;
        var log = this.user_name + ", ";
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
        this.innerVisible = false;

        if (isCancel) {
          this.$notify.info({
            title: '取消注册',
            message: '你已经取消注册了'
          });
          return;
        }

        var log = this.r_name + ", ";
        log +=  this.r_password + ", ";
        log +=  this.r_confirm_password + ", ";
        log +=  this.r_email_password + ", ";

        this.$notify({
          title: '注册成功',
          message: log,
          type: 'success'
        });
      },

      // handleClose(done) {
      //   this.$confirm('确认关闭？')
      //     .then(_ => {
      //       done();
      //     })
      //     .catch(_ => {
      //     });
      // },
    }
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
