<template>
<div class="container">
  <div id="title">
    <div id="information">
      <h1>{{movieName}}</h1>
      <p>Rated R</p>
    </div>
    <div>
      <div>
        <img :src="movieImgUrl"/>
        <p>Description textDescrkhlsdfkgjhdfkg kjfhsdfkjhj</p>
      </div>
    </div>
  </div>
  <div id="times"> 
    <h2>Times</h2>
    <ul>
      <li v-for="item in movieTime" :key="item">
        {{item}}
      </li>
    </ul>
  </div>
</div>
 
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';


@Component
export default class Movie extends Vue {
  @Prop() private movieName!: string;
  @Prop() private movieImgUrl!: string;
  @Prop() private movieTime!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.container {
  overflow:hidden;
  padding:0;
  width: 60%;
  font-size: 1rem;
}

ul {
  list-style-type: none;
  border:1px solid rgba(0,0,0, 1);
  padding: 0;
  display:inline-block;
  text-align: center;

}
li {
  padding: 15px;
}
li:hover {
  background-color: rgba(0,0,0, 0.1);
}

.container #title {
  padding:15px;
  margin:0;
  display:inline-block;
  width:75%;
  text-align:left;
  border-left: 30px solid red;
}
.container #times {
  padding:25px;
  float:right;
  width: 25%;
}


.container #title #information p {
  text-align:right;
  border-bottom: 1px solid rgba(0,0,0, 0.1)
}
img {
  width:40%;
  padding-right:10px;
  float:left;
}
h1 {
  border-bottom: 1px solid rgba(0,0,0, 0.1)
}


</style>
