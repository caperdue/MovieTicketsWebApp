<template>
  <b-container class="mt-3">
    <h3>Finalize Purchase</h3>
    <div class="ticket-container px-3">
      <h5 class="mt-3">
        Movie: <span>{{ movieName }}</span>
      </h5>
      <h5>
        Movie Date: <span>{{ showDate }}</span>
      </h5>
      <h5 class="mt-3">Number of Tickets</h5>
      <select class="input" v-model="numTickets">
        <option disabled value="">Please select one</option>
        <option v-for="(n, pos) in 10" :key="pos">{{ n }}</option>
      </select>
      <h5 class="mt-3">Credit Card Number</h5>
      <input v-model="creditCardNumber" type="text" maxlength="19"/>
      <div class="mt-3 mb-3">
        <b-button @click="purchase" class="mr-3" variant="primary"
          >Purchase</b-button
        >
        <b-button @click="backToBrowse" variant="warning">Go Back</b-button>
      </div>
    </div>
  </b-container>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import * as uuid from "uuid";
import firebase from 'firebase';

@Component({
  components: {},
})

export default class FinalizePurchase extends Vue {

  //define and initialize movie information
  private movieName = "";
  private numTickets = 0;
  private movieTime = "";
  private showDate = "";
  private creditCardNumber = "";
  private dateOfPurchase = "";
  private purchaseID = -1;

  //defining routing and authentication
  readonly $route;
  readonly $router;
  readonly $appDB;
  readonly $appAuth;

  //setting user id for firebase
  private userUID = 0;

  purchase(): void {
    if (this.numTickets > 0 && this.creditCardNumber) {
      //Send the tickets to the database
      this.$appDB
        .collection(`users/${this.userUID}/purchases`)
        .doc(this.purchaseID)
        .set({
          name: this.movieName,
          numTickets: this.numTickets,
          date: this.showDate,
          time: this.movieTime,
          cost: this.numTickets * 10,
          purchaseDate: this.dateOfPurchase,
          purchaseID: this.purchaseID,
        });

        //Update the ticket purchase count for realtime updates
        this.$appDB
        .collection("tickets")
        .doc("purchaseInfo")
        .update("totalPurchases", firebase.firestore.FieldValue.increment(this.numTickets));
    }
    
    //route user to the purchase confirmation page
    this.$router.replace({
      name: "Purchase Confirmation",
      params: {
        name: this.movieName,
        tickets: this.numTickets,
        time: this.movieTime,
        date: this.showDate,
        purchaseID: this.purchaseID,
      },
    });

    //validation if the credit card number includes spaces
    if (this.creditCardNumber.indexOf(' ') >= 0) {
      alert("Credit card number cannot include spaces");
      this.$router.replace({ path: "/finalize" });
      this.creditCardNumber = "";
    }

    //validation if the credit card number includes letters
    else if (isNaN(Number(this.creditCardNumber))) {
      alert("Credit card number cannot include letters");
      this.$router.replace({ path: "/finalize" });
      this.creditCardNumber = "";
    }

    //validation if the credit card length is less than 13 digits
    else if (this.creditCardNumber.length < 13) {
      alert("Credit card number must be at least 13 numbers");
      this.$router.replace({ path: "/finalize" });
      this.creditCardNumber = "";
    }    
  }

  //route the user back to the browse movies page
  backToBrowse(): void {
    this.$router.back();
  }

  created(): void {
    // Get the parameters to pass along movie information
    this.purchaseID = uuid.v1();
    this.movieName = this.$route.params.name;
    this.movieTime = this.$route.params.time;
    this.showDate = this.$route.params.date;
    this.userUID = this.$appAuth.currentUser?.uid;
    this.dateOfPurchase = new Date(Date.now()).toDateString();
  }
}
</script>

<style scoped>
span {
  font-size: 1.25em;
}

h3 {
  text-align: center;
}

.ticket-container {
  border: 2px solid;
  border-radius: 0.5em;
}
</style>
