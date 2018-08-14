// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App';

// 引入 axios
import axios from 'axios';

// store.js
import Vuex from 'vuex';


Vue.use(Vuex);
Vue.use(ElementUI);

Vue.config.productionTip = false;

var instance = axios.create({
  // baseURL: 'https://some-domain.com/api/',
  // timeout: 5000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/x-www-form-urlencoded',
  }
});

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';


// https://www.cnblogs.com/wisewrong/p/6402183.html
const store = new Vuex.Store({
  // 定义状态
  state: {
    isDebug: true
  },
  actions: {
    // 封装一个 ajax 方法
    // saveForm (context) {
    //   axios({
    //     method: 'post',
    //     url: '/user',
    //     data: context.state.test02
    //   })
    // }

    register(context, obj) {

      var params = new URLSearchParams();
      params.append('account', obj.name);
      params.append('password', obj.password);
      params.append('password2', obj.confirm_password);
      params.append('email', obj.email);

      // instance.post('http://zkteam.cc/Subscribe/register/', {
      axios.post('http://127.0.0.1:8000/Subscribe/register/', params)
        .then(function (res) {
          console.log(res);
          obj.result = res.data;
          store.dispatch("resultCallBack", obj);
        })
        .catch(function (err) {
          console.log(err);
          obj.that.$notify({
            title: '注册失败！',
            message: "错误信息是：" + err.message,
            type: 'error'
          });
        });
    },

    resultCallBack(context, obj) {
      var that = obj.that;
      that.subContentBtnState = false;

      var resultData = obj.result;
      var objs;

      if (resultData.code != null) {
        objs = resultData;
        objs.message = resultData.result;
      } else {
        const responseContent = obj.result.responseText;
        console.log(responseContent);

        objs = JSON.parse(responseContent);
      }


      const code = objs['code'];
      const message = objs['message'];

      console.log(code + "," + message);

      if (code === 0) {
        that.$notify({
          title: '注册成功',
          message: "您的账户名是：" + obj.name,
          type: 'success'
        });
      } else {
        that.$notify({
          title: '注册失败！',
          message: "。。。 错误信息是：" + message,
          type: 'error'
        });
      }

      that.subDialogState = false;
    }

  }
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {App},
  template: '<App/>',
  render: h => h(App),
  store: store
});
