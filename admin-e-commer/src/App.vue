<template>
  <router-view></router-view>
</template>

<script>


export default {
  name: 'App',

}
</script>

<style lang="scss">
// Import Main styles for this application
@import 'assets/scss/style';
@import '../node_modules/bulma';
@import "assets/scss/base.css";

#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
}
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #ccc;
  border-color: #ccc transparent #ccc transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.is-loading-bar {
  height: 0;
  overflow: hidden;

  -webkit-transition: all 0.3s;
  transition: all 0.3s;

  &.is-loading {
    height: 80px;
  }
}
</style>












