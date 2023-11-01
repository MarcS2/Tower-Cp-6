<template>
  <div class="container-fluid">
    <!-- SECTION bg img maybe? -->
    <section class="row">
    </section>
    <!-- !SECTION -->
    <!-- SECTION filters -->
    <section class="row">

    </section>
    <!-- SECTION Events -->
    <section class="row">
      <div class="col-3">

      </div>
    </section>
    <!-- !SECTION -->
  </div>
</template>

<script>
import { onMounted } from "vue";
import Pop from "../utils/Pop";
import {eventsService} from "../services/EventsService"
export default {
  setup() {
    onMounted(()=> {
      getEvents()
    })
    async function getEvents() {
      try {
       await eventsService.getEvents()
        
      } catch (error) {
        Pop.error(error)
      }
    } 
    return {
      
    }
  }
}
</script>

<style scoped lang="scss">

</style>
