<template>
  <div id="tickets">
    <h3>{{movieName}}</h3>
    <p id="date">Date: {{movieDate}}</p>
    <p id="rating">{{movieRating}}</p>
    <ul>
        <li>Ticket Number: {{ticketNumber}}</li>
        <li>Theatre Number: {{theatreNumber}}</li>
        <li>Seat Number: {{seatNumber}}</li>
    </ul>
       
    <img alt="QR Code" :src="imageurl">  
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Tickets extends Vue {
  @Prop() readonly movieName!: string;
  @Prop() readonly ticketNumber!: number;
  @Prop() readonly theatreNumber!: number;
  @Prop() readonly seatNumber!: number;
  @Prop() readonly movieRating!: string;
  @Prop() readonly movieDate!: Date;
  @Prop() readonly imageurl!: string;

}
</script>

<style>
#tickets {
  display: block;
  border: 2px solid red;
  border-radius: 0.5em;
  padding: 1em;
  margin: 0.6em;
  max-width: 50%;
}

div {
    overflow: hidden;
}

#date, #rating{
    text-align: right;
}

li {
    list-style: none;
    text-align: left;
}

ul {
    display: inline-block;
}

h3 {
    text-align: left;
    
}

img {
    float: right;
    width: 25%;
}
</style>