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
      let that = obj.that;
      let account = obj.account;
      let password = obj.password;


      if (context.state.isDebug) {
        let params = new URLSearchParams();
        params.append('account', account);
        params.append('password', password);

        axios.post('http://127.0.0.1:8000/Subscribe/login/', params)
          .then(function (res) {
            console.log(res);
            obj.result = res.data;
            // store.dispatch("resultLoginCallBack", obj);
            that.resultCallBackForLogin(obj);
          })
          .catch(function (err) {
            console.log(err);
            that.resultCallBackForLogin(obj);
          });
      } else {
        let formData = new FormData();
        formData.append("account", account);
        formData.append("password", password);

        GM_xmlhttpRequest({
          method: 'POST',
          url: "http://zkteam.cc/Subscribe/login/",
          data: formData,
          onload: function (result) {
            console.log(result);
            obj.result = result;
            that.resultCallBackForLogin(obj);
          }
        });
      }


    },

    quitAccount(context, that) {
      if (context.state.isDebug) {
        axios.get('http://127.0.0.1:8000/Subscribe/logout/')
          .then(function (res) {
            console.log(res);
            that.resultCallBackForQuitAccount(that, res.data);
          })
          .catch(function (err) {
            console.log(err);
            that.resultCallBackForQuitAccount(that, err);
          });

      } else {
        GM_xmlhttpRequest({
          method: 'GET',
          url: "http://zkteam.cc/Subscribe/logout",
          onload: function (result) {
            console.log(result);
            that.resultCallBackForQuitAccount(that, result);
          }
        });
      }
    },


    subContent(context, obj) {
      let that = obj.that;

      let pid = obj.pid;
      let name = obj.name;
      let user_id = obj.user_id;
      let url = obj.url;
      let last_fj_number = obj.last_fj_number;

      var params = 'pid=' + pid;
      params += '&name=' + name;
      params += '&user_id=' + user_id;
      params += '&url=' + url;
      params += '&number=' + last_fj_number;


      if (context.state.isDebug) {
        axios.get('http://zkteam.cc/Subscribe/add?' + params)
          .then(function (res) {
            console.log(res);
            that.resultCallBackForSub(that, res.data);
          })
          .catch(function (err) {
            console.log(err);
            that.resultCallBackForSub(that, err);
          });
      } else {
        GM_xmlhttpRequest({
          method: 'GET',
          url: "http://zkteam.cc/Subscribe/add?" + params,
          onload: function (result) {
            that.resultCallBackForSub(that, result);
          }
        });
      }
    },



    qrCode(context, obj) {
      let that = obj.that;
      let user_id = obj.user_id;

      if (context.state.isDebug) {
        axios.get('http://127.0.0.1:8000/Subscribe/wxQRcode/?user_id='  + user_id)
          .then(function (res) {
            console.log(res);
            that.resultCallBackForQRCode(that, res.data);
          })
          .catch(function (err) {
            console.log(err);
            that.resultCallBackForQRCode(that, err);
          });

      } else {
        GM_xmlhttpRequest({
          method: 'GET',
          url: "https://www.zkteam.cc/Subscribe/wxQRcode/?user_id=" + user_id,
          onload: function (result) {
            console.log(result);
            that.resultCallBackForQRCode(that, result);
          }
        });
      }
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
