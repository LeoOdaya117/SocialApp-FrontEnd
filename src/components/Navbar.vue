<template>
  <nav class="bg-white shadow-md dark:bg-gray-900 fixed top-0 left-0 w-full z-50">
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex justify-between items-center py-3">
        <!-- Logo -->
        <router-link to="/" class="text-xl font-bold text-gray-800 dark:text-white">
          SocialApp
        </router-link>

        <!-- Desktop Menu -->
        <div class="hidden md:flex space-x-6 items-center relative">
          <!-- Search Bar -->
          <div class="hidden md:flex items-center space-x-4">
            <form @submit.prevent="goToSearch">
              <input
                v-model="searchQuery" 
                type="text"
                placeholder="Search..."
                class="px-3 py-1 w-60 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </form>
          </div>

          <!-- Notifications & Avatar -->
          <div class="flex items-center space-x-4">
            <!-- Notification Icon (Clickable) -->
            <div class="relative cursor-pointer" @click="toggleNotifications">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.5-1.5M12 19a2 2 0 01-2-2h4a2 2 0 01-2 2zM5.5 15.5L4 17h5m5-6a5 5 0 10-10 0v4l-1 1h12l-1-1v-4z"/>
              </svg>
              <!-- Notification Badge -->
              <span v-if="notificationCount > 0" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                {{ notificationCount }}
              </span>
            </div>

            <!-- Avatar Dropdown -->
            <div class="relative cursor-pointer" @click="toggleDropdown">
              <img :src="authStore.user.avatar ? authStore.user.avatar : 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg'" alt="Avatar" class="w-8 h-8 rounded-full" />
              <ul v-if="showDropdown" class="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                <li>
                  <router-link to="/profile" class="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Profile</router-link>
                </li>
                <li>
                  <button @click="logout" class="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700">Logout</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Notification Dropdown (Smaller Size) -->
    <div v-if="showNotifications" class="absolute right-4 mt-2 w-60 bg-white dark:bg-gray-800 shadow-lg z-40 rounded-lg">
      <div class="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white font-bold text-sm flex justify-between">
        <span>Notifications</span>
        <span>{{ notificationCount }}</span>
      </div>
      <ul class="divide-y divide-gray-200 dark:divide-gray-700">
        <li v-for="(notification, index) in notifications" :key="index" 
            :class="{'bg-gray-400 dark:bg-gray-700': notification.unread, 'bg-white dark:bg-gray-800': !notification.unread}"
            class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer">
          {{ notification.text }}
        </li>
        <li v-if="notifications.length === 0" class="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 text-center">
          No new notifications
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import router from '../router.js';
import axiosClient from '../axios';
import  {useAuthStore} from '../store/auth.js';

const authStore = useAuthStore();



const searchQuery = ref("");
const showNotifications = ref(false);
const showDropdown = ref(false);
const notificationCount = ref(3);
const notifications = ref([
  { text: "New friend request from John", unread: true },
  { text: "Alice liked your post", unread: false },
  { text: "You have a new message from Mark", unread: true }
]);

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value;
  if (showNotifications.value) {
    showDropdown.value = false;
  }
};

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
  if (showDropdown.value) {
    showNotifications.value = false;
  }
};

const closeDropdowns = (event) => {
  if (!event.target.closest(".cursor-pointer")) {
    showNotifications.value = false;
    showDropdown.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", closeDropdowns);
  
});

onBeforeUnmount(() => {
  document.removeEventListener("click", closeDropdowns);
});

const goToSearch = () => {
  if (searchQuery.value.trim() !== "") {
    router.push({ name: "Search", query: { q: searchQuery.value } });
  }
};

const logout = () => {
  axiosClient.post('/logout').then(() => {
    router.push({ name: "Login" });
  }).catch(error => {
    console.error("Logout failed:", error);
  });
};
</script>
