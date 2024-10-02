
<script setup lang="ts">

</script>


<template>
  <div class="cusine-filter">
    <span><i class="fa fa-map-marker"></i> {{ $t('cuisine.label') }}:</span>
    <select>
      <option>{{ $t('cuisine.italienne') }}</option>
      <option>{{ $t('cuisine.grecque') }}</option>
      <option>{{ $t('cuisine.africaine') }}</option>
      <option>{{ $t('cuisine.asiatique') }}</option>
      <option>{{ $t('cuisine.chinoise') }}</option>
    </select>
  </div>
</template>



<style scoped>
.cuisine-filter {
  text-align: center; /* Ajustement de la mise en page */
}
</style>
