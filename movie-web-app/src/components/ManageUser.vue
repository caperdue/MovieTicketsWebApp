<template>
  <div>
    <h1>Sign In / Sign up</h1>
    <div id="form">
      <input type="text" placeholder="Email" />
      <input type="text" placeholder="Password" />
      <button :disabled="noInput" @click="createAccount">
        Sign Up
      </button>
      <button :disabled="noInput" @click="authenticate">
        Sign In
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Movie from "./Movie.vue";

@Component({
  components: {},
})
export default class ManageUser extends Vue {
  readonly $router;

  authenticate() {
    this.$router.replace({path: "/browse"})
  }
  createAccount() {
    this.$router.replace({path: "/browse"})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#form {
  margin-top: 40px;
  padding-left: 10%;
  padding-right: 10%;
}
input {
  display: block;
  margin: auto;
  width: 40%;
  margin-bottom: 5px;
}
h1 {
  padding-top: 20px;  
  text-align: center;
}

button:first-of-type{
    margin-top:10px;
}
button {
  margin: auto;
  margin-bottom: 10px;
  padding: 7px;
  display: block;

  border-radius: 20px;
  background-color: red;
  width: 25%;
  border: none;
  color: white;
}
</style>
