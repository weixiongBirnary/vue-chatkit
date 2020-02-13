<template>
  <div id="app">
    <!-- <login/> -->
    <!-- <chat/> -->
    <b-alert variant="danger">测试</b-alert>
    <router-view/>
  </div>
</template>

<script>
// import login from './views/Login'
// import chat from './views/ChatDashboard'
export default {
  components: {
    // login,
    // chat
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
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
