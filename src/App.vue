<template>
  <div id="app">
    订阅前
    <Subscribe/>
    订阅后
  </div>
</template>

<script>
  import Register from './components/Register'
  import Login from './components/Login'
  import Subscribe from './components/Subscribe'

  export default {
    name: 'App',
    components: {
      Register,
      Login,
      Subscribe,
    },
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
