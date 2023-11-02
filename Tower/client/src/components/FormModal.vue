<template>
  

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog  modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Create Event</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body ">
        
        <form @submit.prevent="createEvent()" class="row ">
          <div class=" col-12 form-floating mb-3">
  <input v-model="editable.name" type="text" class="form-control" id="floatingInput" placeholder="name@example.com " maxlength="50">
  <label class="ms-2" for="floatingInput">Name</label>
</div>
          <div class=" col-12 form-floating mb-3">
  <input v-model="editable.coverImg" type="url" class="form-control" id="floatingInput" placeholder="name@example.com " maxlength="400">
  <label class="ms-2" for="floatingInput">Cover Image Url</label>
</div>
<div class="col-12 form-floating mb-3">
  <input v-model="editable.location" type="text" class="form-control" id="floatingPassword" placeholder="Location" maxlength="100">
  <label class="ms-2" for="floatingPassword">Location</label>
</div>
<div class="col-12 form-floating mb-3">
  <input v-model="editable.capacity" type="number" class="form-control" id="floatingPassword" placeholder="Location" required>
  <label class="ms-2" for="floatingPassword">Capacity</label>
</div>
<div class="col-12 form-floating mb-3">
  <input v-model="editable.startDate" type="date" class="form-control" id="floatingPassword" placeholder="Location" required>
  <label class="ms-2" for="floatingPassword">Start Date</label>
</div>
<!-- <div class="col-12 form-floating mb-3">
  <input v-model="editable.startTime" type="time" class="form-control" id="floatingPassword" placeholder="Location" required>
  <label class="ms-2" for="floatingPassword">Start Time</label>
</div> -->
<div class=" col-12 form-floating mb-3">
  <select v-model="editable.type" class="form-select bg-white" id="floatingSelect" aria-label="Floating label select example">
    <option selected>Type</option>
    <option 
    :value="type"
    v-for="type in types"
    :key="type" >
    {{ type }}
  </option>
    
  </select>
  <label class="ms-2" for="floatingSelect">Type of Event</label>
</div>
<div class=" mb-3 col-12 form-floating">
  <textarea v-model="editable.description" maxlength="250" class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"></textarea>
  <label class="ms-2" for="floatingTextarea2">Description</label>
</div>
<div class="col-12 text-end">
  <button type="submit" class="btn btn-outline-dark">Submit</button>
</div>
</form>
      </div>
      
    </div>
  </div>
</div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { ref } from "vue";
import Pop from "../utils/Pop";
import { eventsService } from "../services/EventsService";
import { Modal } from "bootstrap";
import { useRouter } from "vue-router";
export default {
  setup(){
    const router = useRouter()
    const editable = ref({})
    const types = ['concert', 'convention', 'sport', 'digital']
    
  return { 
    editable,
   types,


   async createEvent() {
try {
  const eventData = editable.value
  const event = await eventsService.createEvent(eventData)
  editable.value = {}
  Modal.getOrCreateInstance('#exampleModal').hide()
  router.push({name: "EventDetails", params: {eventId: event.id}})
} catch (error) {
  Pop.error(error)
}
  }
  }
  }
};
</script>


<style lang="scss" scoped>

</style>