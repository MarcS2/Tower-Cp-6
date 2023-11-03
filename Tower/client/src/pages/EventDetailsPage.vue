<template>
  <div v-if="activeEvent" class="container-fluid">
<section class="row justify-content-center">
  
  <div class="col-11  mt-3 p-4 border border-dark shadow">
    <section class="row  ">
      <div class="col-12 col-md-4">
        <img class="img-fluid rounded shadow" :src="activeEvent?.coverImg" alt="Event cover image">
        
      </div>
      <div class="col-12 col-md-8 ">
<section class="row">
  <div class="col-6 ">
    <h1>{{ activeEvent.name }}</h1>
  </div>
  <div class="col-6 text-end">
    <h2>{{ activeEvent.startDate.toDateString() }}</h2>
  </div>
  <div class="col-12 ">
    <h2>{{ activeEvent.location }}</h2>
  </div>

  <div class="col-12">
    <h4>{{ activeEvent.description }}</h4>
  </div>
  
  <div v-if="!activeEvent.isCanceled" class="col-6 mt-3">
    <h4>{{ activeEvent.capacity - attendeeCount}} Tickets Left</h4>
  </div>
  <div v-else-if="activeEvent.isCanceled" class="col-12 mt-3">
    <p class="text-center fs-4 text-danger">Sorry this event has been canceled.</p>
  </div>
  
  <div v-if="account" class="col-6 text-end mt-3">
    <button :disabled="isAttendee || activeEvent.capacity - attendeeCount == 0" :hidden="activeEvent.isCanceled" @click="getTicket()" class="btn btn-outline-dark">Get Ticket</button>
    <p v-if="isAttendee && !activeEvent.isCanceled" class="mt-2">You are attending this event.</p>
  </div>
  <div v-if="activeEvent.capacity - attendeeCount == 0" class="col-12 text-center">
    <h5 class="text-danger"> Sorry out of tickets</h5>
    
  </div>
  <div v-if="account == activeEvent.creatorId"  class="col-12 mt-2 text-end">
    <button @click="cancelEvent()" class="btn btn-outline-danger">Cancel Event</button>
  </div>
</section>
      </div>
    </section>
  </div>
</section>
<section class="row mt-3 justify-content-center">
  <div v-if="activeEvent.ticketCount > 0" class="col-10 border border-dark shadow p-3">
    <div class="d-inline me-2" v-for="attendee in attendee" :key="attendee.id">
      <p class="d-inline">
        {{ attendee.profile.name }}

      </p>
      <img class="rounded-circle img-pfp ms-1" :src="attendee.profile.picture" alt="profile picture">

    </div>
  </div>
</section>
<section  class="row justify-content-center p-2  ">
  <div v-if="isComments" class="col-10 comment-bg">
    <section class="row justify-content-center p-2">
      <div v-for="comment in comments" :key="comment.id" class="col-9">
    <CommentCard :commentData="comment" />
      </div>
      
    </section>
  </div>
</section>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { eventsService } from "../services/EventsService";
import Pop from "../utils/Pop";
import { attendeeService } from "../services/AttendeeService"
import { commentsService } from "../services/CommentsService";
export default {
  
  setup(){
    const router = useRouter()
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

async function getComments() {
  try {
    const eventId = route.params.eventId
    await commentsService.getComments(eventId)
  } catch (error) {
    Pop.error(error)
  }
}
    
    onMounted(() =>{
getProfilesWithEventTicket()
getComments()
    eventsService.getEventById(route.params.eventId)
    })
  return { 
    attendee: computed(() => AppState.attendee),
    account: computed(() => AppState.account.id),
    activeEvent: computed(() => AppState.activeEvent),
    isAttendee: computed(() => 
      AppState.attendee.find((attendee) => attendee.accountId == AppState.account.id)
    ),
    comments: computed(() => AppState.comments),
    isComments: computed(() => {
      if(AppState.comments.length == 0) {
        return false
      } else {
        return true
      }
    }),
    attendeeCount: computed(() => AppState.attendee.length),



   async getTicket() {
     try {
      
        const eventId = route.params.eventId
        await attendeeService.getTicket(eventId)
        Pop.success('You got a ticket ')
      } catch (error) {
        Pop.error(error)
      }
    },


    async cancelEvent() {
      try {
        const wantTo = await Pop.confirm('Would you like to cancel the event?')
        if(!wantTo) {
          return
        }
        const eventId = route.params.eventId
        await eventsService.cancelEvent(eventId)
        router.push({path: '/'})
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


.comment-bg {
  background-color: rgba(145, 130, 130, 0.67);
}
</style>