<template>
  <div>
    <h1>我是组件</h1>
    <p/>
    <el-input class="inline-input" :placeholder="holder"></el-input>


    <el-button type="primary" @click="dialogVisible = true">点击打开 Dialog</el-button>


    <el-dialog title="订阅" width="50%" :visible.sync="dialogVisible" :before-close="handleClose">

      <el-container>
        <el-container>
          <el-main style="background: #FFFFE0" width="70%">
            <div style="text-align: left">
              <span style="font-weight: bold"> hi, </span>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: red;font-weight: bold"> {{ userName }} </span>, 你要订阅的信息如下：
              </p>
              <div style="background: rgba(191,157,42,0.29); padding: 10px; margin: 10px">
                <el-input placeholder="22758" type="text" :disabled="false" size="small">
                  <template slot="prepend"><span>ＩＤ：</span></template>
                </el-input>

                <el-input placeholder="红海行动" type="text" :disabled="false" size="small">
                  <template slot="prepend">影片：</template>
                </el-input>

                <el-input placeholder="https://www.80s.tw/movie/22758" type="text" :disabled="false" size="small">
                  <template slot="prepend">网址：</template>
                </el-input>
              </div>
            </div>
          </el-main>
          <el-aside style="background: #FDF5E6" width="30%">
            <div style="text-align: center; padding: 10px">
              <p><img width="100px" height="100px"
                      :src=wx_rdcode />
              </p>
              <p>关注微信号免费获得微信订阅消息通知服务</p>
            </div>
          </el-aside>
        </el-container>
        <el-footer>
          <p style="text-align: center; margin-top: 15px">
            <el-button type="text">退出当前帐号</el-button>
          </p>
        </el-footer>
      </el-container>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
  export default {
    name: "ZJ",
    data() {
      return {
        dialogVisible: false,
        userName: "Qing",
        holder: "aaa",
        wx_rdcode: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=679764585,617630770&fm=11&gp=0.jpg"
      };
    },
    methods: {
      // handleClose(done) {
      //   this.$confirm('确认关闭？')
      //     .then(_ => {
      //       done();
      //     })
      //     .catch(_ => {
      //     });
      // }
    }
  }
</script>
