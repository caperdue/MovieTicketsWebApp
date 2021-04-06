<template>
<div>
    <h1>Browse Movies</h1>
    
    <Movie/>
</div>
 
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Movie from './Movie.vue';



@Component({
  components: {
    Movie
  },
})
export default class BrowseMovies extends Vue {
  @Prop() private movieName!: string;
  @Prop() private movieImgUrl!: string;
  @Prop() private movieTime!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
    margin-top: 30px;
    padding:15px;
}



</style>
