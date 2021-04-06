<template>
  <div id="app">
    <!-- <Tickets v-for="(c,pos) in ticketsInfo.movies" :key="pos"
    v-bind:movieName="c.movieName" v-bind:ticketNumber="c.ticketNumber" v-bind:theatreNumber="c.theatreNumber" v-bind:seatNumber="c.seatNumber" v-bind:movieRating="c.movieRating" v-bind:movieDate="c.movieDate" v-bind:imageurl="imgurl" ></Tickets><br> -->
    <Movie :movie-name="movies.movieTitle" :movie-time="movies.movieTimes" :movieImgUrl='movies.movieImgUrl' />
    <FinalizePurchase v-for="(c,pos) in ticketsInfo.movies" :key="pos" v-bind:movieName="c.movieName" v-bind:numTickets="c.numTickets" v-bind:movieTime="c.movieTime" v-bind:creditCardNumber="c.creditCardNumber"></FinalizePurchase>
    <!-- <FinalizePurchase></FinalizePurchase> -->
    <PurchaseConfirmation v-for="(c,pos) in ticketsInfo.movies" :key="pos" v-bind:movieUrl="c.movImgUrl" v-bind:movieName="c.movieName" v-bind:dateOfPurchase="c.dateOfPurchase" v-bind:taxAmount="c.taxAmount" v-bind:ticketTotal="c.ticketTotal" v-bind:totalAmount="c.totalAmount" v-bind:numTickets="c.numTickets"></PurchaseConfirmation>
    <PrintTicket></PrintTicket>  
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Tickets from './components/Tickets.vue';
import Movie from './components/Movie.vue';
import FinalizePurchase from './components/FinalizePurchase.vue';
import PurchaseConfirmation from './components/PurchaseConfirmation.vue';
import PrintTicket from './components/PrintTicket.vue';


@Component({
  components: {
<<<<<<< HEAD
    HelloWorld, Tickets, Movie, FinalizePurchase, PurchaseConfirmation, PrintTicket,
=======
    Tickets, Movie
>>>>>>> 00c8648b9289031b809abc8fa14ffb4715d4b157
  },
})
export default class App extends Vue {

  readonly movies = { 
    movieTimes: ["11:30pm", "12:00pm"],
    movieTitle: "The Joker",
    movieImgUrl: "https://fanart.tv/fanart/movies/475557/movieposter/joker-5d6732e7bf212.jpg"
  }

  readonly imgurl =  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/800px-QR_code_for_mobile_English_Wikipedia.svg.png"

  readonly ticketsInfo = {
  movies: [
    /* List the classes you are taking this semester */
    { movieName: "Disaster Movie", ticketTotal: 20.08, taxAmount: 2.30, totalAmount: 22.38, dateOfPurchase: "12/30//2021", numTickets: 4, ticketNumber: 20, theatreNumber: 16, seatNumber: 6, movieDate: "03/10/21", movieRating: "PG-13", movieTime: "11:30", creditCardNumber: 16273728328482372, movImgUrl: "https://mk0movieguide99l7786.kinstacdn.com/wp-content/uploads/2012/08/6013.jpg"},
    { movieName: "The Joker", ticketTotal: 20.08, taxAmount: 2.30, totalAmount: 22.38, dateOfPurchase: "12/30//2021", ticketNumber: 18, theatreNumber: 17, seatNumber: 10, movieDate: "03/11/21", movieRating: "R",numTickets: 6, movieTime: "2:00", creditCardNumber: 19402085580482372, movImgUrl: "https://fanart.tv/fanart/movies/475557/movieposter/joker-5d6732e7bf212.jpg" },
    { movieName: "Camp Rock 2", ticketTotal: 20.08, taxAmount: 2.30, totalAmount: 22.38, dateOfPurchase: "12/30//2021", ticketNumber: 25, theatreNumber: 8, seatNumber: 2, movieDate: "03/12/21", movieRating: "PG", numTickets: 4, movieTime: "3:30", creditCardNumber: 14934248322382379, movImgUrl: "https://upload.wikimedia.org/wikipedia/en/c/c8/CampRock2DVD.jpg" },
  ],
  };
  



}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
