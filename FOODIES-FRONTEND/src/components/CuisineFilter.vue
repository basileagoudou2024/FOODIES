
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CuisineFilter'
});
</script>


<template>
  <div class="cusine-filter">
    <span><i class="fa fa-map-marker"></i> {{ $t('cuisineFilter.label') }}:</span>
    <select>
      <option>{{ $t('cuisineFilter.italienne') }}</option>
      <option>{{ $t('cuisineFilter.grecque') }}</option>
      <option>{{ $t('cuisineFilter.africaine') }}</option>
      <option>{{ $t('cuisineFilter.asiatique') }}</option>
      <option>{{ $t('cuisineFilter.chinoise') }}</option>
    </select>
  </div>
</template>



<style scoped>
.cuisine-filter {
  text-align: center; /* Ajustement de la mise en page */
}
</style>
