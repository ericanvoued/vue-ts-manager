<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  box-sizing: content-box;
}
#nav {
  padding: 30px;
}
.clearfix {
    zoom:1}

.clearfix :after {
    clear: both;
    content: none;
    display: block;
    width: 0;
    height: 0;
    visibility: hidden
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
