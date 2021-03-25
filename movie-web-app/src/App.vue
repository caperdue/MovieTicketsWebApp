<template>
  <div id="app">
    <Tickets v-for="(c,pos) in ticketsInfo.movies" :key="pos"
  v-bind:movieName="c.movieName" v-bind:ticketNumber="c.ticketNumber" v-bind:theatreNumber="c.theatreNumber" v-bind:seatNumber="c.seatNumber" v-bind:movieRating="c.movieRating" v-bind:movieDate="c.movieDate" v-bind:imageurl="imgurl" ></Tickets><br>
  <Movie :movie-name="movies.movieTitle" :movie-time="movies.movieTimes" :movieImgUrl='movies.movieImgUrl' />

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';
import Tickets from './components/Tickets.vue';
import Movie from './components/Movie.vue';


@Component({
  components: {
    HelloWorld, Tickets, Movie
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
    { movieName: "Disaster Movie", ticketNumber: 20, theatreNumber: 16, seatNumber: 6, movieDate: "03/10/21", movieRating: "PG-13"},
    { movieName: "The Joker", ticketNumber: 18, theatreNumber: 17, seatNumber: 10, movieDate: "03/11/21", movieRating: "R"},
    { movieName: "Camp Rock", ticketNumber: 25, theatreNumber: 8, seatNumber: 2, movieDate: "03/12/21", movieRating: "PG"},
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
