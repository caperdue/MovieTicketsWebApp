<template>
  <div>
      <Tickets v-for="ticket in tickets" :key="ticket.purchaseID"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { DocumentReference } from "@firebase/firestore-types";
import Tickets from "./Tickets.vue";

@Component({
  components: {},
})
export default class ViewTickets extends Vue {
  readonly $router;
  readonly $route;
  readonly $appDB;
  readonly $appAuth;

  private tickets: any[] = [];
  private userUID = -1;

  created() {
    this.userUID = this.$appAuth.currentUser?.uid;
    this.$appDB
      .collection(`users/${this.userUID}/purchases`)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.tickets.push(doc.data());
        });

       
      });

    
  }
}
</script>

<style scoped>
</style>
