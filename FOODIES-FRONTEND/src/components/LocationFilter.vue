


<template>
  <div class="location-filter">
    <span><i class="fa fa-map-marker"></i> {{ $t('locationFilter.label') }}:</span>
    <select>
      <option>{{ $t('locationFilter.1 km') }}</option>
      <option>{{ $t('locationFilter.5 km') }}</option>
      <option>{{ $t('locationFilter.10 km') }}</option>
      <option>{{ $t('locationFilter.15 km') }}</option>
      <option>{{ $t('locationFilter.20 km') }}</option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CuisineFilter'
});
</script>

<style scoped>
.cuisine-filter {
  text-align: center; /* Ajustement de la mise en page */
}
</style>

  



