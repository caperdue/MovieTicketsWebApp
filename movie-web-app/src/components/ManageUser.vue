<template>
  <div>
    <h1>Sign In / Sign Up</h1>
    <div id="form">
      <form>
      <input type="text" placeholder="Email" v-model="email" />
      <input type="password" placeholder="Password" v-model="password" />
      <button @click.prevent="createAccount">
        Sign Up
      </button>
      <button @click.prevent="authenticate">
        Sign In
      </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { FirebaseAuth, UserCredential } from "@firebase/auth-types";
import VueRouter from 'vue-router';

@Component({
  components: {},
})

export default class ManageUser extends Vue {

  // Define attributes for user management
  private email = "";
  private password = "";

  // Provide references for routing and authentication
  readonly $router!: VueRouter;
  readonly $appAuth!: FirebaseAuth;

  /*
   * Log in the user through Firebase.
   */
  authenticate(): void {
    this.$appAuth.signInWithEmailAndPassword(this.email, this.password)
    .then((u: UserCredential) => {
      alert("Successfully signed in!");
      this.$router.push({path: "/browse"});
    })
    .catch((err: any) => {
      // Alert user with the error for signing in
      alert("Error signing in: " + err);
    })
  }

  /*
   * Create an account for the user through Firebase.
   */
  createAccount(): void {
    this.$appAuth.createUserWithEmailAndPassword(this.email, this.password)
    .then((u: UserCredential) => {
      alert("Successfully signed up!");
      this.$router.push({ path: "/browse" });
    })
    .catch((err: any) => {
      // Alert user with the error for signing up
      alert("Error signing up: " + err);
    }) 
  }
}
</script>

<style scoped>
#form {
  margin-top: 40px;
  padding-left: 10%;
  padding-right: 10%;
}

input {
  display: block;
  width: 40%;
  margin: auto;
  margin-bottom: 5px;
}

h1 {
  padding-top: 20px;  
  text-align: center;
}

button:first-of-type {
    margin-top:10px;
}

button {
  margin: auto;
  margin-bottom: 5px;
  padding: 7px;
  display: block;

  border-radius: 20px;
  background-color: red;
  width: 25%;
  border: none;
  color: white;
}
</style>
