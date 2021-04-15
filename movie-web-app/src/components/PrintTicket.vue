<template>
  <div id="printTicket">
    <h3>Print Ticket</h3>
    <div id=ticketContent>
     <Tickets v-for="(c,pos) in ticketsInfo.movies" :key="pos"
    v-bind:movieName="c.movieName" v-bind:ticketNumber="c.ticketNumber" v-bind:theatreNumber="c.theatreNumber" v-bind:seatNumber="c.seatNumber" v-bind:movieRating="c.movieRating" v-bind:movieDate="c.movieDate" v-bind:imageurl="imgurl" ></Tickets>
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

export default class PrintTicket extends Vue {
  @Prop() readonly movieName!: string;
  @Prop() readonly ticketNumber!: number;
  @Prop() readonly theatreNumber!: number;
  @Prop() readonly seatNumber!: number;
  @Prop() readonly movieRating!: string;
  @Prop() readonly movieDate!: Date;
  @Prop() readonly imageurl!: string;

readonly ticketsInfo = {
  movies: [
    /* List the classes you are taking this semester */
    { movieName: "Disaster Movie", ticketNumber: 20, theatreNumber: 16, seatNumber: 6, movieDate: "03/10/21", movieRating: "PG-13", numTickets: 2, movieTime: "11:30", creditCardNumber: 16273728328482372},
    { movieName: "The Joker", ticketNumber: 18, theatreNumber: 17, seatNumber: 10, movieDate: "03/11/21", movieRating: "R",numTickets: 6, movieTime: "2:00", creditCardNumber: 19402085580482372 },
    { movieName: "Camp Rock 2", ticketNumber: 25, theatreNumber: 8, seatNumber: 2, movieDate: "03/12/21", movieRating: "PG", numTickets: 4, movieTime: "3:30", creditCardNumber: 14934248322382379},
  ],
  };

readonly imgurl =  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/800px-QR_code_for_mobile_English_Wikipedia.svg.png"
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