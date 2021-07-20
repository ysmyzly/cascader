<template>
  <div id="app">
    <div id="nav">
      <router-link to="/"></router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app{
  background-color: #fff;
}
.paging{
  padding:20px 0;
  text-align: right;
}
</style>
