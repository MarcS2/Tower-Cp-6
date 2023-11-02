<template>
  <div class="container-fluid">
    <!-- SECTION bg img maybe? -->
    <!-- <section class="row">
    </section> -->
    <!-- !SECTION -->
    <!-- SECTION filters -->
    <!-- <section class="row">

    </section> -->
    <!-- SECTION Events -->
    <section class="row">
      <div v-for="eventData in towerEvents" :key="eventData.eventId" class="col-3">
        <EventCard :event="eventData" />

      </div>
    </section>
    <!-- !SECTION -->
  </div>
</template>

<script>
import { computed, onMounted } from "vue";

import Pop from "../utils/Pop";
import {eventsService} from "../services/EventsService"
import { AppState } from "../AppState";
import EventCard from "../components/EventCard.vue";
export default {
    setup() {
        onMounted(() => {
            getEvents();
        });
        async function getEvents() {
            try {
                await eventsService.getEvents();
            }
            catch (error) {
                Pop.error(error);
            }
        }
        return {
            towerEvents: computed(() => AppState.towerEvent)
        };
    },
    components: { EventCard }
}
</script>

<style scoped lang="scss">

</style>
