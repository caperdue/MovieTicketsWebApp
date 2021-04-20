<template>
  <div id="printTicket">
    <h3>Print Ticket</h3>
    <div id=ticketContent>
      <Tickets v-for="ticket in tickets" :key="ticket.numTickets"
    :movieName="ticket.name" :dateOfPurchase="ticket.purchaseDate" :numberTickets="ticket.numTickets" :movieDate="ticket.date" :movieTime="ticket.time"></Tickets>
    <b-button variant="success" @click="browse">Return to Browsing Movies</b-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Tickets from './Tickets.vue';
import {FirebaseFirestore} from "@firebase/firestore-types";
import { FirebaseAuth } from "@firebase/auth-types";
import VueRouter,{ RouteConfig, RouterMode } from "vue-router";



@Component({
  components: {
    Tickets, 
  },
})

export default class PrintTicket extends Vue {

  private tickets: any[] = [];
  private userUID = "-1";
  private purchaseID = "";

  readonly $appAuth!: FirebaseAuth;
  readonly $appDB!: FirebaseFirestore;
  // readonly $router;
  // readonly $route;

   created() {
    this.purchaseID = this.$route.params.purchaseID;
    console.log(this.purchaseID);
    this.userUID = this.$appAuth.currentUser?.uid?? "-1";
    this.$appDB
      .collection(`users/${this.userUID}/purchases`)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (this.purchaseID == doc.data().purchaseID) {
          this.tickets.push(doc.data());  
          }   
        });
      console.log(this.tickets);
       
      });  
  }

  browse() {
    this.$router.replace({ path: "/browse" });
  }
  


}

</script>

<style scoped>
#ticketContent {
  display: inline-block;
  border-radius: 0.5em;
  padding: 1em;
  margin: 0.6em;
  width: 50%;
}

div {
    overflow: hidden;
}

h3 {
    text-align: center;
}

p {
    text-align: left;
}


</style>