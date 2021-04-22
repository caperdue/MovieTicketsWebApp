<template>
  <div>
     <b-nav-form @submit="onSubmit" class="searchMovie">
        <b-form-input
          size="sm"
          class="mr-sm-2"
          placeholder="Search Movie"
          v-model="search"
        ></b-form-input>
        <b-button size="sm" class="my-2 my-sm-2" type="submit">Search</b-button>
        <b-button v-if="search" @click="() => this.search = ''" size="sm" class="ml-2" type="cancel">Clear Search</b-button>
     </b-nav-form>
     
    <h1 v-if="!search">Browse Movies</h1>
    <h1 v-else>Showing Search Results for: "{{ this.search }}"</h1>
    <h4 class="inline-date mr-3">Choose a Date:</h4>
    <input
      v-model="selectedDate"
      type="date"
      class="inline-date"
      @change="loadMovies"
    />
    <Movie
      v-for="movie in movieList"
      :key="movie.imdbID"
      :movie="movie"
      :showDate="selectedDate"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Movie from "./Movie.vue";
import axios, { AxiosResponse } from "axios";

@Component({
  components: {
    Movie,
  },
})
export default class BrowseMovies extends Vue {
  // Define and initialize movie list
  private movieList: any[] = [];
  private search: string | undefined;

  // Set default value for selected movie date to today
  private selectedDate = new Date(Date.now()).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  // Reference for authentication
  readonly $appAuth;
  readonly $route;

  mounted(): void {
    // Get the list of movies for viewing
    this.loadMovies();
  }
  onSubmit(event): void {
    event.preventDefault();
    this.loadMovies();

  }
  // Load movies to be displayed
  loadMovies(): void {
    // Reset movie list
    let params: any = {};

    if (!this.search) {
      params.y = "2021";
    }
    (params.s = this.search ? this.search : "sweet"), (this.movieList = []);
    axios
      .get("http://www.omdbapi.com/?apikey=91906364", {
        params,
      })
      .then((r: AxiosResponse) => {
        for (let movie of r.data.Search) {
          this.movieList.push(movie);
        }
      })
      .catch((err: any) => {
        alert("Error searching movies! Your search is likely too broad.")
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  text-align: left;
  margin-top: 15px;
  padding: 15px;
}

.inline-date {
  display: inline-block;
}

.searchMovie {
  display: block;
  float:right;

}
</style>
