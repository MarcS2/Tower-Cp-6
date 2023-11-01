<template>
  <div v-if="activeEvent" class="container-fluid">
<section class="row">
  <div class="col-12 mt-3">
    <section class="row">
      <div class="col-4">
        <img class="img-fluid" :src="activeEvent?.coverImg" alt="Event cover image">
      </div>
      <div class="col-8">
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
</section>
      </div>
    </section>
  </div>
</section>

  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { useRoute } from "vue-router";
import { eventsService } from "../services/EventsService";
export default {
  
  setup(){
    const route = useRoute()
    onMounted(() =>{
eventsService.getEventById(route.params.eventId)
    })
  return { 
    activeEvent: computed(() => AppState.activeEvent)
   }
  }
};
</script>


<style lang="scss" scoped>

</style>