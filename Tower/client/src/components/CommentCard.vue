<template>
  <section class="row bg-light border border-dark shadow p-3 justify-content-center">
    <div class="col-12">
      <img class="rounded-circle img-pfp " :src="commentData.creator.picture " alt="Comment creator image">
      <p class=" ms-2 mt-1 d-inline">
        {{ commentData.creator.name }}
      </p>
      
    </div>
    <div class="col-10">
      {{ commentData.description }}
    </div>
    <div v-if="activeEvent.creatorId == account" class="col-12 text-end">
      <button>Delete Comment</button>
    </div>
  </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { UserComment } from "../models/Comment";
import { TowerEvent } from "../models/TowerEvent";
export default {
  props: {
    commentData: {type: UserComment, required: true},
    // activeEvent: {type: TowerEvent, required: true}
  },
  setup(){
  return { 
    activeEvent: computed(() => AppState.activeEvent),
    account: computed(() => AppState.account.id)
   }
  }
};
</script>


<style lang="scss" scoped>
.img-pfp {
  
  height: 3rem;
}
</style>