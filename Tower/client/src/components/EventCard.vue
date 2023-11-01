<template>
  <section class="row mt-3">
  <div class="col-12">
    <router-link :to="{name: 'EventDetails', params:{eventId: event.eventId}}">
    <img class="img-fluid" :src="event.coverImg" alt="Event Cover Image">
    </router-link>
  </div>
  <div class="col-12">
    <p>{{ event.name }}</p>
  </div>
</section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { TowerEvent } from "../models/TowerEvent";
export default {
  props: {event: {type: TowerEvent, required: true}},
  setup(){
  return {  }
  }
};
</script>


<style lang="scss" scoped>

</style>