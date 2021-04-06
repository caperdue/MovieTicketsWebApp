<template>
  <div id="purchaseConfirmation">
    <h3>Purchase Confirmation</h3>
    <div  id="movies">
    <p id="movieName">{{movieName}}</p>
    <img id="movieImg" :src="movieUrl"/>
    <p><b>Date of Purchase: </b>{{dateOfPurchase}}</p>
    <p><b>Number of Tickets: </b>{{numTickets}}</p>
    <p class="totals">Ticket Total: ${{ticketTotal.toFixed(2)}}</p><br>
    <p class="totals">Tax: ${{taxAmount.toFixed(2)}}</p><br>
    <p class="totals"><b>Total: </b>${{totalAmount.toFixed(2)}}</p><br><br>
    <button>Print Ticket</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Tickets from './Tickets.vue';
 

@Component({
  components: {
    Tickets, 
  },
})

export default class PurchaseConfirmation extends Vue {
  @Prop() readonly movieName!: string;
  @Prop() readonly dateOfPurchase!: Date;
  @Prop() readonly numTickets!: number;
  @Prop() readonly ticketTotal!: number;
  @Prop() readonly taxAmount!: number;
  @Prop() readonly totalAmount!: number;
  @Prop() private movieUrl!: string;
}
</script>

<style>
#movies {
  display: inline-block;
  border: 2px solid;
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

.totals {
    text-align: right;
    display: inline-block;
}

#movieName {
    font-size: 20px;
}

#movieImg {
    float: left;
    width: 25%;
}

</style>