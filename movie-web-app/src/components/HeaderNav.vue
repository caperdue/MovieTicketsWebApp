<template>
  <div>
    <b-navbar toggleable type="dark" variant="dark">
      <b-navbar-brand :to="{ name: 'Browse Movies' }"
        >Star Cinema</b-navbar-brand
      >
      <b-navbar-toggle target="navbar-toggle-collapse">
        <template #default="{ expanded }">
          <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
          <b-icon v-else icon="chevron-bar-down"></b-icon>
        </template>
      </b-navbar-toggle>

      <b-collapse id="navbar-toggle-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item @click="() => this.$router.push({ path: '/browse' })"
            >Browse Movies</b-nav-item
          >
          <b-nav-item
            @click="() => this.$router.push({ path: '/tickets' })"
            v-if="user"
            >My Tickets</b-nav-item
          >
          <b-nav-item
            v-if="!user"
            @click="() => this.$router.push({ path: '/' })"
            >Sign In/Sign Up</b-nav-item
          >
          <b-nav-item v-else @click="signOut">Sign Out</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import "firebase/auth";
import { FirebaseAuth, UserCredential } from "@firebase/auth-types";
import VueRouter from "vue-router";

@Component({})
export default class HeaderNav extends Vue {
  private user: string | null = null;

  // References for authentication and routing
  readonly $appAuth!: FirebaseAuth;
  readonly $router!: VueRouter;

  // Sign out the user
  signOut(): void {
    this.$appAuth
      .signOut()
      .then(() => {
        alert("Successfully signed out.");
        this.$router.replace({ path: "/" });
      })
      .catch((err: any) => {
        alert("Error signing out: " + err);
      });
  }

  // Log in the user
  userLoggedIn(): boolean {
    return this.$appAuth.currentUser?.uid !== undefined;
  }

  // Check if user is logged in, if so, set user UID
  created(): void {
    this.$appAuth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user.uid;
      } else {
        this.user = null;
      }
    });
  }
}
</script>

<style scoped></style>
