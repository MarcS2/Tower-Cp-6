<template>
 <section v-if="ticketData.id" class="row px-5 mb-3">
<div class="col-12">
  <section class="row border border-dark shadow ">
    <div class=" col-12 col-md-6 col-lg-3 p-0">
      <img class="col-12 cover-img" :src="ticketData.event.coverImg" alt="event ticket cover image">
    </div>
    <div class="col-md-6 col-lg-9 p-3">
      <section class="row">
        <div class="col-12 col-md-6 text-start">
          <h1>{{ ticketData.event.name }}</h1>

        </div>

  <div class="col-12 col-md-6 text-end">
    <h2>{{ new Date(ticketData.event.startDate).toDateString() }}</h2>
  </div>
  <div class="col-12 col-md-6 ">
    <h2>{{ ticketData.event.location }}</h2>
  </div>
  <div class="col-12 col-md-6 text-end">
    <button @click="destroyTicket(`${ticketData.id}`)" class="btn btn-outline-danger">Un-attend Event</button>
  </div>
  <div class="col-12">{{ ticketData.event.description }}</div>
      </section>
    </div>
  </section>
</div>
 </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Attendee } from "../models/Attendee";
import Pop from "../utils/Pop";
import { attendeeService } from "../services/AttendeeService";
export default {
  props: {ticketData: {type: Attendee, required: true}},
  setup(){
  return { 
   async destroyTicket(ticketId) {
      try {
        const wantTo = await Pop.confirm('Would you like to un-attend this event ?')
        if(!wantTo) {
          return
        }
        await attendeeService.destroyTicket(ticketId)
      } catch (error) {
        Pop.error(error)
      }
    }
   }
  }
};
</script>


<style lang="scss" scoped>
.cover-img {
  height: 40dvh;
  width: 100%;
  object-fit: cover;
  object-position: center;
}



</style>