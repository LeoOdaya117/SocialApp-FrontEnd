<template>
  <div class="max-w-6xl mx-auto py-4 grid grid-cols-1 md:grid-cols-4 gap-4">
    <!-- Left Column: Filter Tabs -->
    <div class="bg-white p-4 rounded-lg shadow-md">
      <h2 class="text-xl font-bold mb-4">Filters</h2>
      <ul>
        <li
          v-for="filter in filters"
          :key="filter.name"
          @click="activeFilter = filter.name"
          class="cursor-pointer px-4 py-2 mb-2 rounded-lg text-gray-700 hover:bg-blue-100"
          :class="{ 'bg-blue-500 text-white font-bold': activeFilter === filter.name }"
        >
          {{ filter.name }}
        </li>
      </ul>
    </div>

    <!-- Right Column: Search Results -->
    <div class="md:col-span-3">
      <h1 class="font-extrabold text-2xl mb-4">Search Results <span>"{{ searchQuery }}"</span></h1>

      <div v-if="activeFilter === 'Posts'">
       
        <!-- <p v-if="posts.length === 0" class="text-gray-600 p-4 text-center w-full">No result found.</p> -->

        <Newsfeed  />
      </div>

      <div v-else-if="activeFilter === 'People'">
        <div class="bg-white p-4 rounded-lg shadow">
          <h2 class="text-lg font-bold mb-2">People</h2>
          <p v-if="peopleResults.length === 0" class="text-gray-600 p-4 text-center w-full">No result found.</p>

          <ul>
            <li
              v-for="(user, index) in peopleResults"
              :key="index"
              class=" flex items-center mb-3 hover:bg-gray-100 p-2 rounded-lg justify-between"
            >
             
              <div class="flex items-center cursor-pointer">
                <img :src="user.avatar ?? 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg'" class="w-10 h-10 rounded-full mr-3" />

                <div>
                  <h3 class="font-bold">{{ user.name }}</h3>
                  <p v-if=" user.mutual_friends_count === 0" class="text-sm text-gray-500">{{ user.friends_count }} friends</p>
                  <p v-else class="text-sm text-gray-500">{{ user.mutual_friends_count }} mutual friends</p>

                </div>
              </div>

              <!-- Friendship Actions -->
              <button 
                v-if="!user.friendship_status" 
                @click="addFriend(user)" 
                class="button bg-blue-600 text-white rounded p-2">
                Add Friend
              </button>

              <button 
                v-else-if="user.friendship_status === 'pending'" 
                @click="cancelRequest(user)" 
                class="button bg-yellow-400 text-gray-950 rounded p-2 shadow-sm">
                Cancel Request
              </button>

              <button 
                v-else-if="user.friendship_status === 'accepted'" 
                class="button bg-green-400 text-gray-950 rounded p-2 shadow-sm">
                Friends
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div v-else-if="activeFilter === 'Photos'">
        <div class="bg-white p-4 rounded-lg shadow">
          <h2 class="text-lg font-bold mb-2">Photos</h2>
          <p v-if="photoResults.length === 0" class="text-gray-600 p-4 text-center w-full">No result found.</p>

          <div v-else  class="grid grid-cols-2 md:grid-cols-3 gap-2">
            <img v-for="(photo, index) in photoResults" :key="index" :src="photo" class="rounded-lg shadow" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { HandThumbUpIcon, ChatBubbleBottomCenterTextIcon, ArrowPathRoundedSquareIcon } from '@heroicons/vue/24/outline';

import { ref,onMounted,watch } from "vue";
import Newsfeed from "../components/Newsfeed.vue";
import router from '../router.js';
import { useRoute } from "vue-router";
import axiosClient from "../axios.js";

const route = useRoute(); // Get route information
const searchQuery = ref(route.query.q || ""); // Get search query from URL

const activeFilter = ref("Posts");

const filters = [
  { name: "Posts" },
  { name: "People" },
  // { name: "Photos" },
];

const peopleResults =ref([]);

// const photoResults =ref([]);

const posts =ref([]);


// Function to fetch search results
const fetchSearchResults = () => {
  if (searchQuery.value.trim() !== "") {
   
    axiosClient.get("/api/people", { params: { q: searchQuery.value } })
      .then(response => {
        peopleResults.value = response.data;
      });

    // axiosClient.get("/api/photos", { params: { q: searchQuery.value } })
    //   .then(response => {
    //     photoResults.value = response.data;
    //   });
  }
};

// ✅ Add Friend Request
const addFriend = async (user) => {
  try {
    const response = await axiosClient.post('/api/friendship', { friend_id: user.id, status: 'pending' });
    
    // Update user status to "pending"
    user.friendship_status = "pending";
    console.log(response.data);
  } catch (error) {
    console.error("Error sending friend request:", error);
  }
};

// ✅ Cancel Friend Request
const cancelRequest = async (user) => {
  try {
    const response = await axiosClient.delete(`/api/friendship/${user.id}`);
    user.friendship_status = null; // Update UI
    console.log(response.data);
  } catch (error) {
    console.error("Error canceling friend request:", error);
  }
};



// Fetch data when component mounts
onMounted(fetchSearchResults);
// Watch for search query changes in the URL
watch(() => route.query.q, (newQuery) => {
  searchQuery.value = newQuery;
  fetchSearchResults();
})
</script>
