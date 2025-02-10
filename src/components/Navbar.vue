<template>
  <nav class="bg-white shadow-md dark:bg-gray-900 fixed top-0 left-0 w-full z-50">
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex justify-between items-center py-3">
        <!-- Logo -->
        <router-link to="/" class="text-xl font-bold text-gray-800 dark:text-white">
          SocialApp
        </router-link>

        <!-- Search Bar (Desktop) -->
        <div class="hidden md:flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search..."
            class="px-3 py-1 w-60 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        <!-- Desktop Menu -->
        <div class="hidden md:flex space-x-6">
          <router-link to="/" class="text-gray-600 dark:text-gray-300 hover:text-blue-500">Home</router-link>
          <router-link to="/profile" class="text-gray-600 dark:text-gray-300 hover:text-blue-500">Profile</router-link>
          <button @click="logout" class="text-red-500 hover:text-red-700">Logout</button>
        </div>

        <!-- Mobile Menu Button -->
        <button @click="toggleMenu" class="md:hidden text-gray-600 dark:text-gray-300 focus:outline-none text-2xl">
          ☰
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isOpen" class="md:hidden bg-white dark:bg-gray-900 py-2 px-4">
      <input
        type="text"
        placeholder="Search..."
        class="px-3 py-1 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm mb-2"
      />
      <router-link to="/" @click="toggleMenu" class="block py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
        Home
      </router-link>
      <router-link to="/profile" @click="toggleMenu" class="block py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
        Profile
      </router-link>
      <button @click="logout" class="block w-full text-left py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800">
        Logout
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import router from '../router.js';

import axiosClient from '../axios';


const isOpen = ref(false);

// Toggle mobile menu
const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

// Dummy logout function
const logout = () => {
  axiosClient.get('/sanctum/csrf-cookie').then(() => {
        axiosClient.post('/logout').then(response => {
            alert("Logged out!");
            toggleMenu();
            router.push({name: "Login"});
        }).catch(error => {
            // Handle login error here
            console.error("Login failed:", error);
            alert("Login out. Please check your credentials and try again.");
        });
    }).catch(error => {
        // Handle CSRF cookie error here
        console.error("CSRF cookie request failed:", error);
        alert("An error occurred. Please try again later.");
    });
 

};


</script>
