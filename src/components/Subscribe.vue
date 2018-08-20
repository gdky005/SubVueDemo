<template>
  <div style="margin: 30px">
    订阅中-start


    <el-popover placement="top-start" title="" width="100" trigger="hover" content="登录以后将获得邮件和微信 更新 提醒哦！">
      <el-button type="primary" size="medium" slot="reference" @click="subDialogState=true">订阅按钮</el-button>
    </el-popover>

    <el-dialog title="订阅"  width="50%" :visible.sync="subDialogState" center>
      <el-container>
        <el-container>
          <el-main style="background: #FFFFE0" width="70%">
            <div style="text-align: left">
              <span style="font-weight: bold"> hi, </span>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: red;font-weight: bold"> {{ userInfo.user_name }} </span>, 你要订阅的信息如下：</p>
              <div style="background: rgba(191,157,42,0.29); padding: 10px; margin: 10px">
                <el-input :placeholder="pid" type="text" :disabled="false" size="small">
                  <template slot="prepend"><span>ＩＤ：</span></template>
                </el-input>

                <el-input :placeholder="name" type="text" :disabled="false" size="small">
                  <template slot="prepend">影片：</template>
                </el-input>

                <el-input :placeholder="url" type="text" :disabled="false" size="small">
                  <template slot="prepend">网址：</template>
                </el-input>

                <el-input :placeholder="last_fj_number" type="text" :disabled="false" size="small">
                  <template slot="prepend">最新：</template>
                </el-input>
              </div>
            </div>
          </el-main>
          <el-aside style="background: #FDF5E6" width="30%">
            <div style="text-align: center; padding: 10px">
              <p><img width="80px" :src=wx_qr_code /></p>
              <p>关注微信号免费获得微信订阅消息通知服务</p>
            </div>
          </el-aside>
        </el-container>
        <el-footer>
          <p style="text-align: center; margin-top: 15px">
            <el-button type="text" @click="quit">退出当前帐号</el-button>
          </p>
        </el-footer>
      </el-container>
      <span slot="footer" class="dialog-footer">
          <el-button @click="cancelSub">取 消</el-button>
          <el-button type="primary" @click="subContent" :loading="subContentBtnState">确 定</el-button>
        </span>
    </el-dialog>

    订阅中-end

  </div>
</template>

<script>
  export default {
    name: "Subscribe",
    data() {

      return {

        subIsDebug: this.$store.state.isDebug,
        // 订阅按钮的状态
        subDialogState: false,
        // 订阅对话框中的确定按钮的 loading 的状态
        subContentBtnState: false,
        //登录框状态
        loginDialogState: false,


        //登录信息
        userInfo: {
          user_name: 'fefqef',
          user_password: '',
          user_email: '',
          user_is_active: '',
          user_id: "48", //测试 id
        },

        // // 影片订阅信息
        // name: '',
        // pid: '',
        // url: '',
        // last_fj_number: '',

        // 影片订阅信息
        name: '测试 name',
        pid: '10000', //测试
        url: 'https://www.80s.tw/dm/23096', // 测试
        last_fj_number: '6',

        // 微信二维码
        wx_qr_code: "http://www.gdky005.com/images/wechatqcode.jpeg"


      };
    },
    methods: {


      resultCallBackForSub(that, result) {
        that.subContentBtnState = false;

        console.log(result);

        let code = result['code'];
        let message = result['message'];

        console.log(code + "," + message);

        if (code === 0) {
          that.$message({
            message: '订阅成功！',
            type: 'success'
          });
        } else {
          that.$message({
            showClose: true,
            message: '订阅失败: ' + result['result'],
            type: 'error'
          });
        }

        that.subDialogState = false;
      },


      subContent() {
        // 订阅成功后 可以请求数据, 然后 确定按钮 转圈，成功和失败后都给予提示。
        this.subDialogState = false;
        this.subContentBtnState = true;

        let obj = {};
        obj.pid = this.pid;
        obj.name = this.name;
        obj.user_id = this.userInfo.user_id;
        obj.url = this.url;
        obj.last_fj_number = this.last_fj_number;

        obj.that = this;

        this.$store.dispatch('subContent', obj);
      },

      resultCallBackForQRCode (that, objs) {
        let resultObj = objs['result'];
        that.wx_qr_code = resultObj['url'];
      },


      requestQRCode() {
        let obj = {};

        obj.that = this;
        obj.user_id = this.userInfo.user_id;

        this.$store.dispatch('qrCode', obj);
      },

      cancelSub() {
        this.subDialogState = false;
        this.$message({
          message: '取消订阅',
          type: 'warning'
        });
      },

      quit() {
        let that = this;
        this.$store.dispatch('quitAccount', that);
      },

      resultCallBackForQuitAccount(that, result) {
        that.subContentBtnState = false;

        console.log(result);

        let code = result['code'];
        let message = result['message'];

        console.log(code + "," + message);

        if (code === 0) {
          that.userIsLogin = false;

          this.clearAccount();

          that.$message({
            message: '退出登录成功！',
            type: 'success'
          });
        } else {
          that.$message({
            showClose: true,
            message: '退出登录失败: ' + message,
            type: 'error'
          });
        }
        that.subDialogState = false;
      },

      clearAccount: function () {
        if (!this.subIsDebug) {
          GM_setValue("name", "");
          GM_setValue("email", "");
          GM_setValue("is_active", "");
        }
      },



    }
  }
</script>

<style scoped>

</style>
