<template>
  <div id="finalizePurchase">
    <h3>Finalize Purchase</h3>
    <div id="movieInformation" >
    <p><b>Movie: </b>{{movieName}}</p>
    <p><b>Number of Tickets: </b>{{numTickets}}</p>
    <p><b>Time: </b>{{movieTime}}</p>
    <p><b>Credit Card Number: </b>{{creditCardNumber}}</p>
    <button @click="purchase">Purchase</button>
    <button @click="backToBrowse">Return to Browse Movies</button>

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

export default class FinalizePurchase extends Vue {
  @Prop() readonly movieName!: string;
  @Prop() readonly numTickets!: number;
  @Prop() readonly movieTime!: string;
  @Prop() readonly creditCardNumber!: number;

  
  readonly $router;

  purchase() {
    this.$router.replace({path: "/confirmation"})
  }

  backToBrowse() {
    this.$router.replace({path: "/browse"})
  }
}
</script>

<style>
/* #movieInformation {
  display: inline-block;
  border: 2px solid;
  border-radius: 0.5em;
  padding: 1em;
  margin: 0.6em;
  max-width: 50%;
}  */

#movieInformation {
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


</style>