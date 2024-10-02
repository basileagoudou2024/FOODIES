

<script lang="ts" setup>


</script>


<template>
   
      <div class="star-filter">

        <span><i class="fa fa-map-marker"></i> {{ $t('StarFilter.label') }}:</span>
    <select>
      <option>{{ $t('StarFilter.1 étoile') }}</option>
      <option>{{ $t('StarFilter.2 étoiles') }}</option>
      <option>{{ $t('StarFilter.3 étoiles') }}</option>
      <option>{{ $t('StarFilter.4 étoiles') }}</option>
      <option>{{ $t('StarFilter.5 étoiles') }}</option>
    </select>
       
      </div>      
</template>
  
 
  
<style scoped>

  
  .star-filter select {
    width: 6em; /* Augmenté de 0.5cm */
  
  }

</style>
  