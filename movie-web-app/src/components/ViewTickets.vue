<template>
  <div>
     <Tickets v-for="ticket in tickets" :key="ticket.purchaseID"
    :movieName="ticket.name" :dateOfPurchase="ticket.purchaseDate" :numberTickets="ticket.numTickets" :movieDate="ticket.date" :movieTime="ticket.time"></Tickets>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { DocumentReference } from "@firebase/firestore-types";
import { FirebaseAuth, UserCredential } from "@firebase/auth-types";
import {FirebaseFirestore} from "@firebase/firestore-types";
import Tickets from './Tickets.vue';


@Component({
  components: {
    Tickets,
  },
})
export default class ViewTickets extends Vue {
  // readonly $router;
  // readonly $route;
  readonly $appDB!: FirebaseFirestore;
  readonly $appAuth!: FirebaseAuth;

  private tickets: any[] = [];
  private userUID = "-1";

  created() {
    this.userUID = this.$appAuth.currentUser?.uid ?? "-1";
    // this.userUID = this.$appAuth.currentUser?.uid ?? "none";
    console.log(this.userUID);
    this.$appDB
      .collection(`users/${this.userUID}/purchases`)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.tickets.push(doc.data());  
          console.log(doc.data());
        });
      console.log(this.tickets);
       
      });
  }
}
</script>

<style scoped>
</style>
