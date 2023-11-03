<template>
  <div class="container-fluid">
    <!-- SECTION bg img maybe? -->
    <!-- <section class="row">
    </section> -->
    <!-- !SECTION -->
    <!-- SECTION filters -->
    <section class="row">
<div class="col-12 mt-4">
  <div class="p-3 d-flex justify-content-around rounded-pill bg-secondary">
    <button class="btn btn-outline-dark" @click="changeType('')">
      All
    </button>
    <button v-for="type in types" :key="type" @click="changeType(type)" class="btn btn-outline-dark mx-2">
  {{ type }}
  
    </button>

  </div>
</div>
    </section>
    <!-- SECTION Events -->
    <section class="row">
      <div v-for="eventData in towerEvents" :key="eventData.eventId" class="col-12 col-md-3">
        <EventCard :event="eventData" />

      </div>
    </section>
    <!-- !SECTION -->
  </div>
</template>

<script>
import { computed, onMounted, onUnmounted} from "vue";

import Pop from "../utils/Pop";
import {eventsService} from "../services/EventsService"
import { AppState } from "../AppState";
import EventCard from "../components/EventCard.vue";
import { ref } from "vue";
export default {
    setup() {
      const types = ['concert', 'convention', 'sport', 'digital']
      const filteredType = ref("")
        onMounted(() => {
            getEvents();
        });
        // onUnmounted(() => eventsService.getMyEvents())
        async function getEvents() {
            try {
              
                await eventsService.getEvents();
            }
            catch (error) {
                Pop.error(error);
            }
        }
        return {
          types,
          filteredType,
            towerEvents: computed(() => {
              if(filteredType.value) {
                return AppState.towerEvent.filter(event => event.type == filteredType.value)
              } else {
                return AppState.towerEvent
              }
            }),


            changeType(type) {
filteredType.value = type
            }

        };
    },
    components: { EventCard }
}
</script>

<style scoped lang="scss">

</style>
