<script setup>
import { onMounted } from 'vue';
import Navbar from '../components/Navbar.vue';
</script>

<template>

<Navbar  />
     <div class="pt-16">
          <RouterView  />
     </div>
</template>

<style scoped>

</style>
