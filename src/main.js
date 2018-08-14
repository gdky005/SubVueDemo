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

    registerRequest(context, obj) {
      let that = obj.that;

      let account = obj.account;
      let password = obj.password;
      let password2 = obj.password2;
      let email = obj.email;

      if (context.state.isDebug) {

        let params = new URLSearchParams();
        params.append('account', account);
        params.append('password', password);
        params.append('password2', password2);
        params.append('email', email);

        axios.post('http://127.0.0.1:8000/Subscribe/register/', params)
          .then(function (res) {
            console.log(res);
            obj.result = res.data;
            that.resultCallBackForRegister(obj);
          })
          .catch(function (err) {
            console.log(err);
            that.resultCallBackForRegister(obj);
          });
      } else {

        let formData = new FormData();
        formData.append("account", account);
        formData.append("password", password);
        formData.append("password2", password2);
        formData.append("email", email);

        GM_xmlhttpRequest({
          method: 'POST',
          url: "http://zkteam.cc/Subscribe/register/",
          data: formData,
          onload: function (result) {
            var obj = {};
            obj.that = that;
            obj.result = result;
            obj.name = name;
            // that.$store.dispatch('resultCallBack', obj);
            that.resultCallBackForRegister(obj);
          }
        });
      }
    },




    login(context, obj) {

      var params = new URLSearchParams();
      params.append('account', obj.account);
      params.append('password', obj.password);

      axios.post('http://127.0.0.1:8000/Subscribe/login/', params)
        .then(function (res) {
          console.log(res);
          obj.result = res.data;
          store.dispatch("resultLoginCallBack", obj);
        })
        .catch(function (err) {
          console.log(err);
          obj.that.$notify({
            title: '登录失败！',
            message: "错误信息是：" + err.message,
            type: 'error'
          });
        });
    },




    resultLoginCallBack: function (that, obj) {
      that = obj.that;

      that.subContentBtnState = false;


      var resultData = obj.result;
      var objs;
      //
      if (resultData.code !== 0) {
        objs = resultData;
        objs.message = resultData.result;
      } else {
        // {"code": 0, "message": "ok", "result": {"username": "a", "email": "741227905@qq.com", "is_active": true}}
        objs = resultData;
      }

      var code = objs['code'];
      var message = objs['message'];
      var resultJson = objs['result'];

      var l_name = resultJson['username'];
      var l_email = resultJson['email'];
      var l_is_active = resultJson['is_active'];
      var l_user_id = resultJson['user_id'];

      console.log(code + "," + message + "," + l_name + ", user_id:" + l_user_id);

      if (code === 0) {
        that.$notify({
          title: '登录成功',
          message: "当前登录用户是：" + l_name,
          type: 'success'
        });

        that.userIsLogin = true;
        that.userInfo.name = l_name;
        that.userInfo.email = l_email;
        that.userInfo.is_active = l_is_active;
        that.userInfo.user_id = l_user_id;

        that.saveData(l_name, l_email, l_is_active, l_user_id);

        // that.requestQRCode()

      } else {
        that.$notify({
          title: '登录失败！',
          message: "。。。" + message,
          type: 'error'
        });
        that.userIsLogin = false;
      }

      that.subDialogState = false;
      return name;
    },



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
