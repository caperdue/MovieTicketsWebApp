<template>
  <div>
    <Tickets
      v-for="ticket in tickets"
      :key="ticket.purchaseID"
      :movieName="ticket.name"
      :dateOfPurchase="ticket.purchaseDate"
      :numberTickets="ticket.numTickets"
      :movieDate="ticket.date"
      :movieTime="ticket.time"
      :editMode="true"
      :ticketID="ticket.purchaseID"
      :printMode="false"
    ></Tickets>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { DocumentReference, QuerySnapshot } from "@firebase/firestore-types";
import { FirebaseAuth, UserCredential } from "@firebase/auth-types";
import { FirebaseFirestore } from "@firebase/firestore-types";
import Tickets from "./Tickets.vue";

@Component({
  components: {
    Tickets,
  },
})

export default class ViewTickets extends Vue {

  //defining firestore and authentication
  readonly $appDB!: FirebaseFirestore;
  readonly $appAuth!: FirebaseAuth;

  //define and intializing tickets array and userUID
  private tickets: any[] = [];
  private userUID = "-1";

  //pushing data from firestore into tickets array upon creation
  created(): void {
    this.userUID = this.$appAuth.currentUser?.uid ?? "-1";
    this.$appDB
      .collection(`users/${this.userUID}/purchases`)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.tickets.push(doc.data());
        });
        console.log(this.tickets);
      });
    
    //Listen to realtime updates
    this.$appDB
      .collection(`users/${this.userUID}/purchases`)
      .onSnapshot((querySnapshot: QuerySnapshot) => {
        this.tickets = [];
        querySnapshot.forEach((doc) => {
          this.tickets.push(doc.data());
        });
      });
  }
}
</script>

<style scoped></style>
