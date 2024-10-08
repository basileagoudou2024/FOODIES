

<script setup lang="ts">
import LoginForm from '../components/LoginForm.vue';
import NavigatorBarForAuth from '@/components/NavigatorBarForAuth.vue';
import Carousel from '@/components/BootstrapCarousel.vue';
import MessageDisplay from '@/components/MessageDisplay.vue';


</script>

<template>
  <NavigatorBarForAuth/>
  <Carousel/>
  <MessageDisplay/>
    <LoginForm/>
</template>

<style scoped>

</style>