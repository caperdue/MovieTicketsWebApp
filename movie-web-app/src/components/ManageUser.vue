<template>
  <div>
    <h1>Sign In / Sign Up</h1>
    <div id="form">
      <form>
      <input type="text" placeholder="Email" v-model="email" />
      <input type="text" placeholder="Password" v-model="password" />
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
import { Component, Vue, Prop } from "vue-property-decorator"
import { FirebaseFirestore } from "@firebase/firestore-types"
import { FirebaseAuth, UserCredential } from "@firebase/auth-types";

@Component({
  components: {},
})

export default class ManageUser extends Vue {
  private email = "";
  private password = "";
  readonly $router;
  readonly $appDB!: FirebaseFirestore;
  readonly $appAuth!: FirebaseAuth;

  authenticate() {
    this.$appAuth.signInWithEmailAndPassword(this.email, this.password)
    .then((u: UserCredential) => {
      alert("Successfully signed in!");
      this.$router.push({path: "/browse"});
    })
    .catch((err: any) => {
      alert("Error signing in: " + err);
    })
  }

  createAccount() {
    this.$appAuth.createUserWithEmailAndPassword(this.email, this.password)
    .then((u: UserCredential) => {
      alert("Successfully signed up!");
      this.$router.push({path: "/browse"});
    })
    .catch((err: any) => {
      alert("Error signing up: " + err);
    }) 
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

button:first-of-type {
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
