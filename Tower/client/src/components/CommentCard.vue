<template>
  <section class="row">
    {{ commentData }}
  </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { UserComment } from "../models/Comment";
export default {
  props: {commentData: {type: UserComment, required: true}},
  setup(){
  return {  }
  }
};
</script>


<style lang="scss" scoped>

</style>