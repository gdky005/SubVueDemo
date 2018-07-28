<template>
  <div>
    <h1>我是组件</h1>
    <p/>
    <el-input class="inline-input"  :placeholder="holder"></el-input>


    <el-button type="primary" @click="dialogVisible = true">点击打开 Dialog</el-button>




    <el-dialog title="订阅" width="40%" :visible.sync="dialogVisible" :before-close="handleClose">

      <div style="text-align: left">
        <span style="font-weight: bold"> hi, </span>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: red;font-weight: bold"> {{ userName }} </span>, 你要订阅的信息如下：</p>
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
        holder: "aaa"
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
