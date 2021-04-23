<template>
  <b-container class="mt-3" id="ticketInfo">
    <div id="tickets">
      <b-button
        v-if="editMode && new Date(Date.now()) < new Date(`${this.movieDate} ${this.movieTime}`)"
        class="edit ml-2"
        variant="danger"
        @click="handleDelete"
        >Cancel Reservation</b-button
      >
      <b-button
        v-if="editMode"
        class="edit"
        variant="warning"
        @click="showModal = !showModal"
        >Edit</b-button
      >

      <h3>{{ movieName }}</h3>
      <p id="date">Date of purchase: {{ dateOfPurchase }}</p>
      <ul>
        <li>Number of tickets: {{ numberTickets }}</li>
        <li>Show date: {{ movieDate }}</li>
        <li>Show time: {{ movieTime }}</li>
        <li v-if="printMode">Seat Number: {{ seatNumber }}</li>
        <li v-if="printMode">Theater Number: {{ theaterNumber }}</li>
      </ul>
      <img alt="QR Code" :src="imageurl" />
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Edit Ticket"
      v-model="showModal"
      @ok="handleEdit"
    >
      <h6>{{ movieName }}</h6>
      <p>Edit Ticket Number</p>
      <select class="input" v-model="tempTickets">
        <option disabled value="">Edit Tickets</option>
        <option v-for="(n, pos) in 10" :key="pos">{{ n }}</option>
      </select>
    </b-modal>
      </div>
  </b-container>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { FirebaseAuth } from "@firebase/auth-types";
import {
  DocumentReference,
  FirebaseFirestore,
  QuerySnapshot,
} from "@firebase/firestore-types";

@Component
export default class Tickets extends Vue {
  @Prop() readonly editMode!: boolean;
  @Prop() readonly movieName!: string;
  @Prop() readonly dateOfPurchase!: string;
  @Prop() numberTickets!: string;
  @Prop() readonly movieDate!: string;
  @Prop() readonly movieTime!: string;
  @Prop() readonly printMode = true;
  @Prop() readonly theaterNumber!: number;
  
  private seatNumber = Math.ceil(Math.random() * (100));
  // private theatreNumber = Math.ceil(Math.random() * (100));


  @Prop() readonly ticketID!: string;

  // @Prop() readonly imageurl!: string;
  readonly $appDB!: FirebaseFirestore;
  readonly $appAuth!: FirebaseAuth;
  private userUID: string | undefined = "";
  private showModal = false;
  private tempTickets = 1;

  readonly imageurl =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/800px-QR_code_for_mobile_English_Wikipedia.svg.png";

  created() {
    this.userUID = this.$appAuth.currentUser?.uid;
  }

  handleDelete() {
    this.$appDB.collection(`users/${this.userUID}/purchases`)
    .doc(this.ticketID)
    .delete()
    .then(() => {
      alert("Tickets successfully refunded and reservation canceled.");
    })
    .catch((err: any) => {
      alert("There was an error cancelling your reservation.");
      })

  }
  handleEdit() {
    this;
    this.$appDB
      .collection(`users/${this.userUID}/purchases`)
      .doc(this.ticketID)
      .set(
        {
          numTickets: this.tempTickets,
        },
        { merge: true }
      );

    alert("Tickets updated, amount reflected on your credit card")
  }
}
</script>

<style scoped>
#ticketInfo {
  text-align: center;
}
#tickets {
  display: inline-block;
  border: 2px solid;
  border-radius: 0.5em;
  padding: 1em;
  margin: 0.6em;
  text-align: left;
  width:100%;
}

div {
  overflow: hidden;
}

#date,
#rating {
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

.edit {
  float: right;
}
</style>