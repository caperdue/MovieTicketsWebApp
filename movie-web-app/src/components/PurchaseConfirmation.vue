<template>
  <b-container class="mt-3" id="purchaseConfirmation">
    <h3>Purchase Confirmation</h3>
    <div id="movies">
      <h6 id="movieName">{{ movieName }}</h6>
      <h6>Date of Purchase: {{ dateOfPurchase }}</h6>
      <h6>Number of Tickets: {{ numTickets }}</h6>
      <h6>Show date: {{ movieDate}}</h6>
      <h6>Show time: {{ movieTime }}</h6>
      <h6 class="totals">Total: ${{ totalAmount }}</h6>
      <b-button variant="success" @click="print">Print Ticket</b-button>
    </div>
  </b-container>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  components: {
  },
})

export default class PurchaseConfirmation extends Vue {

  //define and intialize movie information for purchase confirmation
  private movieName = "";
  private dateOfPurchase = "";
  private movieDate = "";
  private movieTime = "";
  private numTickets!: number;
  private totalAmount = 0;
  private purchaseID = "";

  //define router
  readonly $router;
  readonly $route;

  //route user to print ticket page when button is clicked
  print(): void {
    this.$router.replace({
      name: "Print Ticket",
      params: {
        purchaseID: this.purchaseID,
      },
    });
  }

  //movie information that is passed as params when created
  created(): void {
    this.dateOfPurchase = new Date(Date.now()).toDateString();
    this.purchaseID = this.$route.params.purchaseID;
    this.movieName = this.$route.params.name;
    this.numTickets = this.$route.params.tickets;
    this.movieDate = this.$route.params.date;
    this.movieTime = this.$route.params.time;

    // Generate total cost
    this.totalAmount = this.numTickets * 10;
  }
}
</script>

<style scoped>


#movies {
  border: 2px solid;
  border-radius: 0.5em;
  padding: 1em;
  font-size: 1.50em;
}

h3 {
  text-align: center;
}

#movieName {
  font-size: 1.25em;
}

</style>
