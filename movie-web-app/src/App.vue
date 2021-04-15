<template>
  <div id="app">
    <HeaderNav />
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HeaderNav from "./components/HeaderNav.vue";

@Component({
  components: {
    HeaderNav
  },
})
export default class App extends Vue {

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-osx-font-smoothing: grayscale;
  -moz-box-sizing: border-box;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
