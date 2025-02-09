<script setup>

import Navbar from './components/Navbar.vue';
</script>

<template>
    <Navbar />
 
  <div class="pt-16"> <!-- Adjust padding to push content down -->
    <RouterView />
  </div>

</template>

<style scoped>

</style>
