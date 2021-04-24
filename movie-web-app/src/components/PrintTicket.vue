<template>
  <div id="printTicket">
    <h3>Print Ticket</h3>
    <div id=ticketContent>
      <Tickets v-for="ticket in tickets" 
      :key="ticket.numTickets"
      :movieName="ticket.name" 
      :dateOfPurchase="ticket.purchaseDate" 
      :numberTickets="ticket.numTickets" 
      :movieDate="ticket.date" 
      :movieTime="ticket.time" 
      :theaterNumber="theatreNumber"></Tickets>
    <b-button variant="success" @click="browse" :printMode="true">Return to Browsing Movies</b-button>
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

  //define and intialize print ticket info
  private tickets: any[] = [];
  private userUID: string | undefined;
  private purchaseID = "";
  private theatreNumber = Math.ceil(Math.random() * (100));

  //define route and authentication
  readonly $appAuth!: FirebaseAuth;
  readonly $appDB!: FirebaseFirestore;
  readonly $router;
  readonly $route;

  //movie information loaded on the screen on creation
   created(): void {
    this.purchaseID = this.$route.params.purchaseID;
    this.userUID = this.$appAuth.currentUser?.uid;
    this.$appDB
      .collection(`users/${this.userUID}/purchases`)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().purchaseID === this.purchaseID){
            for(let i = 0; i < doc.data().numTickets; i++){
              this.tickets.push(doc.data())
            }

          }
        });  
      });  
  }

  //route user back to browse movies when button is clicked
  browse(): void {
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