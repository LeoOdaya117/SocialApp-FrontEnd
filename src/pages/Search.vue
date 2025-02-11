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
      <h1 class="font-extrabold text-2xl mb-4">Search Results</h1>

      <div v-if="activeFilter === 'Posts'">
        <Newsfeed />
      </div>

      <div v-else-if="activeFilter === 'People'">
        <div class="bg-white p-4 rounded-lg shadow">
          <h2 class="text-lg font-bold mb-2">People</h2>
          <ul>
            <li
              v-for="(user, index) in peopleResults"
              :key="index"
              class="flex items-center mb-3 hover:bg-gray-100 p-2 rounded-lg"
            >
              <img :src="user.image" class="w-10 h-10 rounded-full mr-3" />
              <div>
                <h3 class="font-bold">{{ user.name }}</h3>
                <p class="text-sm text-gray-500">{{ user.mutualFriends }} mutual friends</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div v-else-if="activeFilter === 'Photos'">
        <div class="bg-white p-4 rounded-lg shadow">
          <h2 class="text-lg font-bold mb-2">Photos</h2>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
            <img v-for="(photo, index) in photoResults" :key="index" :src="photo" class="rounded-lg shadow" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Newsfeed from "../components/Newsfeed.vue";

const activeFilter = ref("Posts");

const filters = [
  { name: "Posts" },
  { name: "People" },
  { name: "Photos" },
];

const peopleResults = [
  { name: "John Doe", mutualFriends: 5, image: "https://i.pravatar.cc/50?img=2" },
  { name: "Jane Smith", mutualFriends: 3, image: "https://i.pravatar.cc/50?img=3" },
];

const photoResults = [
  "https://source.unsplash.com/100x100/?nature",
  "https://source.unsplash.com/100x100/?city",
  "https://source.unsplash.com/100x100/?beach",
];
</script>
