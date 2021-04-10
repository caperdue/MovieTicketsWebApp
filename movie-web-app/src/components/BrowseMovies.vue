<template>
<div>
    <h1>Browse Movies</h1>
    <Movie v-for="movie in movieList" 
    :key="movie.imdbID" :movieName="movie.Title" 
    :movieImgUrl="movie.Poster" :movieYear="parseFloat(movie.Year)" :movieId="movie.imdbID"/>
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
  private movieList: any[] = [];

  mounted() {
    //Get the list of movies for viewing
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
    margin-top: 30px;
    padding:15px;
}



</style>
