<template>
  <div class="container-fluid">
<section class="row" >
  <div class="col-12 text-center">
    <h1>Events I've Created</h1>
  </div>
  <div class="col-12 col-md-6 col-lg-3" v-for="event in events" :key="event.eventId">
    
    <EventCard :event="event" />
  </div>
  <div class="col-12">
    <h1>My Tickets</h1>
  </div>
</section>
<section class="row">
<div v-for="ticket in tickets" :key="ticket.id" class="col-12">
<TicketCard :ticketData="ticket"/>
</div>
</section>

  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, onUnmounted } from 'vue';
import EventCard from "../components/EventCard.vue";
import { eventsService } from "../services/EventsService";
import {attendeeService} from "../services/AttendeeService"
import Pop from "../utils/Pop";
import TicketCard from "../components/TicketCard.vue";
export default {
    setup() {
        async function getMyTickets() {
            try {
                await attendeeService.getMyTickets();
            }
            catch (error) {
                Pop.error(error);
            }
        }

        async function getEvents() {
          try {
            await eventsService.getEvents()
          } catch (error) {
            Pop.error(error)
          }
        }
        onMounted(() =>  {
          getMyTickets()
        getEvents()
        });
        return {
            // account: computed(() => AppState.account.id),
            events: computed(() => AppState.towerEvent.filter((event) => event.creatorId == AppState.account.id)),
            tickets: computed(() => AppState.attendee)
        };
    },
    components: { TicketCard }
};
</script>


<style lang="scss" scoped>

</style>