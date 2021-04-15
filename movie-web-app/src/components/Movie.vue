<template>
  <b-container>
    <b-card class="movie">
      <b-media right-align vertical-align="center">
        <template #aside>
          <b-img class="mt-0" :src="movie.Poster"></b-img>
        </template>
        <h5 class="mt-0 mb-2">{{movie.Title}}</h5>
        <h6 class="pt-3">View Times</h6>
        <b-button
          @click="goToPurchase"
          class="time-buttons"
          v-for="(time, index) in movieTimes"
          :key="index"
        >
          {{ time }}
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
import { FirebaseAuth, UserCredential } from "@firebase/auth-types";

@Component
export default class Movie extends Vue {
  readonly $router;
  readonly $appDB!: FirebaseFirestore;
  readonly $appAuth!: FirebaseAuth;

  @Prop() private movieYear!: string;
  @Prop() private showDate!: string;
  @Prop() private movie: any;

  private movieDetails: any = {};
  private selectedTime!: string;

  private randomMovieTimeArray = {
    minutes: ["15", "30", "45", "00"],
    time: ["AM", "PM"],
  };
  private movieTimes: any[] = [];

  goToPurchase(e) {
    // Get time of selected button
    this.selectedTime = e.target.innerText;
     this.$router.push({
       name: "Finalize Purchase",
       params: {
         name: this.movie.Title,
         rating: this.movieDetails.rating,
         date: this.showDate,
         time: this.selectedTime,
       }
       });
  }

  getDetails() {
    axios
      .get("http://www.omdbapi.com/?apikey=91906364", {
        params: {
          i: this.movie.imdbID,
        },
      })
      .then((r: AxiosResponse) => {
        console.log(r);
        this.movieDetails = {
          year: parseFloat(r.data.Year),
          plot: r.data.Plot,
          rating: r.data.Rated,
          genre: r.data.Genre,
          runtime: r.data.Runtime,
        }
      })

      .catch((err: any) => {
        console.log("Error fetching data: " + err);
      });
  }

  popoverMethod() {
    this.getDetails();
    //Return HTML for content and also grab movie info upon request
    return (
      "<p>Released in " +
      this.movieDetails.year === undefined ? "N/A": this.movieDetails.year +
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
      (this.movieDetails.runtime === "" ? "N/A" : this.movieDetails.runtime) +
      "</p>"
    );
  }

  generateMovieTimes() {
    for (let i = 0; i <= Math.floor(Math.random() * 30); i++) {
      this.movieTimes.push(`${Math.floor(Math.random() * 12 + 1)}:${
        this.randomMovieTimeArray.minutes[
          Math.floor(Math.random() * this.randomMovieTimeArray.minutes.length)
        ]
      }
          ${this.randomMovieTimeArray.time[Math.floor(Math.random() * 2)]}`);
    }
  }

  created() {
    this.generateMovieTimes();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.movie {
  text-align: left;
}
img {
  height: 200px;
  width: 200px;
}
#view-details {
  display:block;
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
