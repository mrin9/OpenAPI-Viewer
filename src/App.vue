<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import "~@/assets/styles/index.scss";
#app{
  min-width:$sw-min-app-width;
  min-height:$sw-min-app-height;
}
</style>
