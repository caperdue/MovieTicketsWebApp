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
      <b-button
        v-if="search"
        @click="() => {this.search = ''
        loadMovies()}"
        size="sm"
        class="ml-2"
        type="cancel"
        >Clear Search</b-button
      >
    </b-nav-form>

    <h1 v-if="!search">Browse Movies</h1>
    <h1 v-else>Showing Search Results for: "{{ this.search }}"</h1>
    <h4 class="inline-date mr-3">Choose a Date:</h4>
    <h6>
      Currently showing times for
      {{ selectedDate }}
    </h6>
    <input
      v-model="selectedDate"
      type="date"
      class="inline-date form-control"
      :min="dateLimit"
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
  private search = '';

  //Set limit and selected date to tomorrow by default.
  private today = new Date(Date.now());
  private tomorrow = new Date(this.today.setDate(this.today.getDate() + 1));
  private selectedDate = `${this.tomorrow.getFullYear()}-${
    this.tomorrow.getMonth() + 1 <= 9
      ? "0" + (this.tomorrow.getMonth() + 1)
      : this.tomorrow.getMonth() + 1
  }-${
    this.tomorrow.getDate() <= 9
      ? "0" + this.tomorrow.getDate()
      : this.tomorrow.getDate()
  }`;
  private dateLimit = this.selectedDate;

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
    this.movieList = [];

    if (this.search == '') {
      params.y = "2021";
    }

    params.s = this.search != '' ? this.search : 'sweet';
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
        alert("Error searching movies! Your search is likely too broad.");
      });
  }
}
</script>

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
  float: right;
}
</style>
