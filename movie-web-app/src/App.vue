<template>
  <div id="app">
    <Movie :movie-name="movies.movieTitle" :movie-time="movies.movieTimes" :movieImgUrl='movies.movieImgUrl' />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Movie from './components/Movie.vue';

@Component({
  components: {
    //HelloWorld,
    Movie,
  },
})
export default class App extends Vue {
  readonly movies = { 
    movieTimes: ["11:30pm", "12:00pm"],
    movieTitle: "The Joker",
    movieImgUrl: "https://fanart.tv/fanart/movies/475557/movieposter/joker-5d6732e7bf212.jpg"
  }
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
