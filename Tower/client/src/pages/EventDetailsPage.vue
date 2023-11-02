<template>
  <div v-if="activeEvent" class="container-fluid">
<section class="row">
  <div class="col-12 mt-3">
    <section class="row">
      <div class="col-12 col-md-4">
        <img class="img-fluid" :src="activeEvent?.coverImg" alt="Event cover image">
      </div>
      <div class="col-12 col-md-8 ">
<section class="row">
  <div class="col-6 ">
    <h1>{{ activeEvent.name }}</h1>
  </div>
  <div class="col-6 text-end">
    <h2>{{ activeEvent.startDate.toDateString() }}</h2>
  </div>
  <div class="col-6 ">
    <h2>{{ activeEvent.location }}</h2>
  </div>
  <div class="col-6 text-end">
    <h3>{{ activeEvent.startDate.toLocaleTimeString() }}</h3>
  </div>
  <div class="col-12">
    <h4>{{ activeEvent.description }}</h4>
  </div>
  
  <div class="col-6 mt-3">
    <h4>{{ activeEvent.capacity - attendeeCount}} Tickets Left</h4>
    
  </div>
  <div v-if="account" class="col-6 text-end mt-3">
<button :disabled="isAttendee" @click="getTicket()" class="btn btn-outline-dark">Get Ticket</button>
  </div>
</section>
      </div>
    </section>
  </div>
</section>
<section class="row mt-3">
  <div  class="col-12">
    <div class="d-inline me-2" v-for="attendee in attendee" :key="attendee.id">
      <p class="d-inline">
        {{ attendee.profile.name }}

      </p>
      <img class="rounded-circle img-pfp ms-1" :src="attendee.profile.picture" alt="profile picture">

    </div>
  </div>
</section>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { useRoute } from "vue-router";
import { eventsService } from "../services/EventsService";
import Pop from "../utils/Pop";
import { attendeeService } from "../services/AttendeeService"
export default {
  
  setup(){
    const route = useRoute()
async function getProfilesWithEventTicket() {
  try {
    const eventId = route.params.eventId
      await eventsService.getProfilesWithEventTicket(eventId);
  }
  catch (error) {
      Pop.error(error);
  }
}
    
    onMounted(() =>{
getProfilesWithEventTicket()

    eventsService.getEventById(route.params.eventId)
    })
  return { 
    attendee: computed(() => AppState.attendee),
    account: computed(() => AppState.account.id),
    activeEvent: computed(() => AppState.activeEvent),
    isAttendee: computed(() => 
      AppState.attendee.find((attendee) => attendee.accountId == AppState.account.id)
    ),
    attendeeCount: computed(() => AppState.attendee.length),
   async getTicket() {
     try {
      
        const eventId = route.params.eventId
        await attendeeService.getTicket(eventId)
        Pop.success('You got a ticket ')
      } catch (error) {
        Pop.error(error)
      }
    }
   }
  }
};
</script>


<style lang="scss" scoped>
.img-pfp {
  height: 3rem;
}
</style>