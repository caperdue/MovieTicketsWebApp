<template>
<div>
    <h1>Browse Movies</h1>
    <h4 class="inline-date mx-2">Choose a Date:</h4>
     <input v-model="selectedDate" type="date" class="inline-date" @change="loadMovies">
    <Movie v-for="movie in movieList" 
    :key="movie.imdbID" :movie="movie" :showDate="selectedDate" />

</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Movie from './Movie.vue';
import axios, { AxiosResponse } from "axios";

@Component({
  components: {
    Movie
  },
})
export default class BrowseMovies extends Vue {
  // Define and initialize movie list
  private movieList: any[] = [];

  // Set default value for selected movie date to today
  private selectedDate = new Date(Date.now()).toLocaleDateString('en-US', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});
  // Reference for authentication
  readonly $appAuth;

  mounted() {
    // Get the list of movies for viewing
    this.loadMovies();
  }

  // Load movies to be displayed
  loadMovies() {
    // Reset movie list
    this.movieList = [];
    axios.get("http://www.omdbapi.com/?apikey=91906364", {
      params: {
        y: "2021",
        s: "sweet",
      }
    })
    .then((r: AxiosResponse) => {
      for (let movie of r.data.Search) {
        this.movieList.push(movie); 
      }
    })
    
    .catch((err: any) => {
      console.log("Error fetching movies: " + err);
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

div {
    text-align:center;
    margin-top: 30px;
    padding:15px;
}

.inline-date {
  display: inline-block;
}

</style>
