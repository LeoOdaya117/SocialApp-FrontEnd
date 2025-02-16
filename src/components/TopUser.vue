<!-- src/components/FriendList.vue -->
<template>
  <div class="bg-white p-4 rounded-lg shadow w-full">
    <h2 class="text-xl font-bold mb-4">Top 5 Users</h2>
    <ul>
      <li v-for="User in topUsers" :key="User.id" class="flex items-center mb-3 cursor-pointer hover:bg-gray-200 rounded-full">
        <div class="flex items-center mb-2">
            <img :src="User.avatar ?? 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg'" alt="Avatar" class="w-10 h-10 rounded-full mr-3" />
            <div>
            <h2 class="font-bold">{{ User.name }}</h2>
            <p class="text-gray-500 text-sm">{{ User.posts_count }} pts</p>
            </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axiosClient from '../axios';

const topUsers = ref([]);


onMounted(async () => {
  try {
    const response = await axiosClient.get('/api/topuser');
    console.log(response.data);
    topUsers.value = response.data;
  } catch (error) {
    console.error('Error fetching top users:', error);
  }
});
</script>
