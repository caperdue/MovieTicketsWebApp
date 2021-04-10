<template>
  <div>
    <b-navbar toggleable type="dark" variant="dark">
      <b-navbar-brand href="#">Star Cinema</b-navbar-brand>
      <b-nav-form class="ml-auto pr-4">
        <b-form-input
          size="sm"
          class="mr-sm-2"
          placeholder="Search Movie"
        ></b-form-input>
        <b-button size="sm" class="my-2 my-sm-2" type="submit">Search</b-button>
      </b-nav-form>
      
      <b-navbar-toggle target="navbar-toggle-collapse">
        <template #default="{ expanded }">
          <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
          <b-icon v-else icon="chevron-bar-down"></b-icon>
        </template>
      </b-navbar-toggle>

      <b-collapse id="navbar-toggle-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item @click="browseMovies">Browse Movies</b-nav-item>
          <b-nav-item>My Tickets</b-nav-item>
          <b-nav-item @click="manageUser" v-if="!this.$appAuth.currentUser">Sign In/Sign Up</b-nav-item>
           <b-nav-item @click="signOut" v-if="this.$appAuth.currentUser">Sign Out</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Movie from "./Movie.vue";
import firebase from "firebase/app";
import "firebase/auth";
import { FirebaseAuth, UserCredential } from "@firebase/auth-types";



@Component({})
export default class HeaderNav extends Vue {
    readonly $appAuth;
    readonly $router;
    browseMovies() {
       this.$router.replace({ path: "/browse" });
    }
    manageUser(): void {
      this.$router.push({ path: "/signin" });
    }
    signOut(): void {
      this.$appAuth.signOut()
      .then(() => {
        alert("Successfully signed out.");
      })
      .catch((err: any) => {
        alert("Error signing out: " + err);
      })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
