<template>
<div class="movie">
  <b-card>
  <b-media right-align vertical-align="center">
    <template #aside>
      <b-img class="mx-0" :src="movieImgUrl"></b-img>
    </template>
    <h5 class="mt-0 mb-2">{{movieName}}</h5>
    <h6 class="pt-3">View Times</h6>
    <button @click="purchaseTickets" class="mx-1 px-1" v-for="(movie, index) in movieTimes" :key="index">
      {{movie}}
    </button>
  </b-media>
     <b-button @mouseover="getDetails" v-b-popover.hover.html="popoverMethod" title="Movie Details" variant="success">
          View Movie Details
     </b-button>
  </b-card>
</div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios, { AxiosResponse } from "axios";
import { FirebaseFirestore } from "@firebase/firestore-types"
import { FirebaseAuth, UserCredential } from "@firebase/auth-types";

@Component
export default class Movie extends Vue {
  readonly $router;
  readonly $appDB!: FirebaseFirestore;
  readonly $appAuth!: FirebaseAuth;
  @Prop() private movieName!: string;
  @Prop() private movieImgUrl!: string;
  @Prop() private movieTime!: string;
  @Prop() private movieYear!: string;
  @Prop() private movieId!: string;

  private moviePlot = "";

  private randomMovieTimeArray = {
    minutes: ["15", "30", "45", "00"],
    time: ["AM", "PM"],
  }
  private movieTimes: any[] = [];
  private movieRating = "";
  private movieGenre = "";
  private movieRuntime = "";

  purchaseTickets() {
    this.$router.push()
  }
  getDetails() {
    axios.get("http://www.omdbapi.com/?apikey=91906364", {
      params: {
        i: this.movieId,
      }
    })
    .then((r: AxiosResponse) => {
      this.moviePlot = r.data.Plot;
      this.movieRating = r.data.Rated
      this.movieGenre = r.data.Genre
      this.movieRuntime = r.data.Runtime
    })
    
    .catch((err: any) => {
      console.log("Error fetching data: " + err);
    })
  }
  popoverMethod() {
    //Return HTML for content and also grab movie info upon request 
    return '<p>Released in ' + this.movieYear + '</p>' +
    '<h6>Summary</h6>' + '<p>' + (this.moviePlot === "" ? 'N/A' : this.moviePlot) + '</p>' + 
    '<p>Rated ' + (this.movieRating === "" ? 'N/A' : this.movieRating) +
     '</p>' + '<p>Genre: ' + (this.movieGenre === "" ? 'N/A' : this.movieGenre) + '</p>' +
     '<p>Runtime: ' + (this.movieRuntime === "" ? 'N/A' : this.movieRuntime) + '</p>'
  }
  
  generateMovieTimes() {
    for(let i = 0; i <= Math.floor(Math.random() * 30); i++) {
      this.movieTimes.push(`${Math.floor(Math.random()*12 + 1)}:${this.randomMovieTimeArray.minutes[Math.floor(Math.random()*this.randomMovieTimeArray.minutes.length)]}
          ${this.randomMovieTimeArray.time[Math.floor(Math.random() * 2)]}`);
    }
  }
  created(){
    this.generateMovieTimes();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.movie {
  width: 80%;
}
img {
  height: 200px;
  width: 200px
}
button {
  border: 1px solid black;
  text-align:center;
  margin-right: 10px;
  display:inline-block;
}
.popov {
  float:right;
}
button:hover {
  background: rgba(255,0,0, 0.5)
}

</style>