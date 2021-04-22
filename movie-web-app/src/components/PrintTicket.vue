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
  private userUID: string | undefined;
  private purchaseID = "";
  // private seatNumber = Number;
  // private theatreNumber = Math.ceil(Math.random() * (100));

  readonly $appAuth!: FirebaseAuth;
  readonly $appDB!: FirebaseFirestore;
  readonly $router;
  readonly $route;

   created() {
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