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
      <input v-model="creditCardNumber" type="text" />
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

@Component({
  components: {},
})
export default class FinalizePurchase extends Vue {
  private movieName = "";
  private numTickets = 0;
  private movieTime = "";
  private showDate = "";
  private creditCardNumber: null | number = null;

  readonly $route;
  readonly $router;

  purchase() {
    if (this.numTickets > 0 && this.creditCardNumber) {

    this.$router.replace({
      name: "Purchase Confirmation",
      params: {
        name: this.movieName,
        tickets: this.numTickets,
        time: this.movieTime,
        date: this.showDate,
      },
    });
    }
  }

  backToBrowse() {
    this.$router.back();
  }

  created() {
    // Get the parameters to pass along movie information
    this.movieName = this.$route.params.name;
    this.movieTime = this.$route.params.time;
    this.showDate = this.$route.params.date;
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
