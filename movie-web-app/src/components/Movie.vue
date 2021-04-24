<template>
  <b-container>
    <b-card class="movie">
      <b-media right-align vertical-align="center">
        <template #aside>
          <b-img class="mt-0" :src="movie.Poster"></b-img>
        </template>
        <h5 class="mt-0 mb-2">{{ movie.Title }}</h5>
        <h6 class="pt-3">View Times</h6>
        <b-button
          @click="goToPurchase"
          class="time-buttons"
          v-for="(time, index) in movieTimes"
          :key="index"
        >
          {{ time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) }}
        </b-button>
        <b-button
          class="mt-2"
          id="view-details"
          v-b-popover.hover.html="popoverMethod"
          title="Movie Details"
          variant="success"
        >
          View Movie Details
        </b-button>
      </b-media>
    </b-card>
  </b-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import axios, { AxiosResponse } from "axios";
import { FirebaseFirestore } from "@firebase/firestore-types";
import { FirebaseAuth } from "@firebase/auth-types";
import VueRouter from "vue-router";

@Component
export default class Movie extends Vue {

  //define and initialize properties for the movie
  @Prop() private movieYear!: string;
  @Prop() private showDate!: Date;
  @Prop() private movie!: any;

  // Define movie detail information
  private randomMovieTimeArray: any = {
    minutes: ["15", "30", "45", "00"],
    time: ["AM", "PM"],
  };

  //define and initialize movie arrays
  private movieTimes: any[] = [];
  private movieDetails: any = {};
  private selectedTime!: string;

  // References for routing, database, and authentication
  readonly $router!: VueRouter;
  readonly $appDB!: FirebaseFirestore;
  readonly $appAuth!: FirebaseAuth;

  /*
   * Redirects user to complete a purchase
   */ 
  goToPurchase(e): void {
    // Get time of selected button
    this.selectedTime = e.target.innerText;
    this.$router.push({
      name: "Finalize Purchase",
      params: {
        name: this.movie.Title,
        rating: this.movieDetails.rating,
        date: `${this.showDate}`,
        time: this.selectedTime,
      },
    });
  }

  /*
   * Gets details of movie hovered over.
   */ 
  getDetails(): void {
    axios
      .get("http://www.omdbapi.com/?apikey=91906364", {
        params: {
          i: this.movie.imdbID,
        },
      })
      .then((r: AxiosResponse) => {
        this.movieDetails = {
          year: parseFloat(r.data.Year),
          plot: r.data.Plot,
          rating: r.data.Rated,
          genre: r.data.Genre,
          runtime: r.data.Runtime,
        };
      })

      .catch((err: any) => {
        console.log("Error fetching data: " + err);
      });
  }

 /*
   * Renders the HTML for the selected movie in a popover.
   */ 
  popoverMethod(): string {
    this.getDetails();
    return "<p>Released in " + this.movieDetails.year === undefined
      ? "N/A"
      : this.movieDetails.year +
          "</p>" +
          "<h6>Summary</h6>" +
          "<p>" +
          (this.movieDetails.plot === "" ? "N/A" : this.movieDetails.plot) +
          "</p>" +
          "<p>Rated " +
          (this.movieDetails.rating === "" ? "N/A" : this.movieDetails.rating) +
          "</p>" +
          "<p>Genre: " +
          (this.movieDetails.genre === "" ? "N/A" : this.movieDetails.genre) +
          "</p>" +
          "<p>Runtime: " +
          (this.movieDetails.runtime === ""
            ? "N/A"
            : this.movieDetails.runtime) +
          "</p>";
  }

   /*
   * Generate the random movie times for the selected date
   */ 
  generateMovieTimes(): void {
    for (let i = 0; i <= Math.floor(Math.random() * 30); i++) {
      //Setting to temporary date for comparison
      this.movieTimes.push(new Date(`January 1 2021 ${Math.floor(Math.random() * 12 + 1)}:${
        this.randomMovieTimeArray.minutes[
          Math.floor(Math.random() * this.randomMovieTimeArray.minutes.length)
        ]
      }
          ${this.randomMovieTimeArray.time[Math.floor(Math.random() * 2)]}`));
    }
    this.movieTimes.sort((a, b) => {
      if (a > b) return 1;
      else return -1;
    })
  }

  /*
   * Generate movie times upon creation
   */
  created(): void {
    this.generateMovieTimes();
  }
}
</script>

<style scoped>
.movie {
  text-align: left;
}
img {
  height: 200px;
  width: 200px;
}
#view-details {
  display: block;
}
.time-buttons {
  margin: 2px;
  width: 100px;
}
.popov {
  float: right;
}

button:hover {
  background: rgba(255, 0, 0, 0.658);
}
</style>
