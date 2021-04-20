<template>
    <b-container class="mt-3" id="ticketInfo">
    <div id="tickets">
    <h3>{{movieName}}</h3>
    <p id="date">Date of purchase: {{dateOfPurchase}}</p>
    <!-- <p id="rating">{{movieRating}}</p> -->
    <ul>
        <li>Number of tickets: {{numberTickets}}</li>
        <li>Show date: {{movieDate}}</li>
        <li>Show time: {{movieTime}}</li>
    </ul>     
    <img alt="QR Code" :src="imageurl">  
  </div>
    </b-container>

</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Tickets extends Vue {
  @Prop() readonly movieName!: string;
  @Prop() readonly dateOfPurchase!: string;
  @Prop() readonly numberTickets!: string;
  @Prop() readonly movieDate!: string;
  @Prop() readonly movieTime!: string;
  // @Prop() readonly imageurl!: string;

  readonly imageurl =  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/800px-QR_code_for_mobile_English_Wikipedia.svg.png"


}
</script>

<style scoped>
#ticketInfo {
  text-align:center;
}
#tickets {
  display: inline-block;
  border: 2px solid;
  border-radius: 0.5em;
  padding: 1em;
  margin: 0.6em;
  text-align: left;
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