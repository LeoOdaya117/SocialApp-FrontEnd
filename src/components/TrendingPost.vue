<!-- src/components/CreatePost.vue -->
<template>
  <div class="bg-white p-4 rounded-lg shadow w-full">
    <h2 class="text-xl font-bold mb-5">Latest Trending Post</h2>

    <p v-if="trendingPost.length === 0" class="text-gray-500">No trending post yet.</p>
    <ul v-else class="w-full">
     
      
      <li v-for="post in trendingPost" :key="post.id" @click="router.push({ path: '/search', query: { q: post.content } })" class="flex items-center mb-2  hover:bg-gray-200 rounded cursor-pointer">
        
        <img :src="post.user.avatar ??  'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg'" alt="Avatar" class="w-10 h-10 rounded-full mr-3" />
        <div>
          <h2 class="font-bold truncate-text">{{ post.content }}</h2>
          <p class="text-gray-500 text-sm">{{ post.created_at }}</p>
        </div>
        
        
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axiosClient from "../axios";
import router from "../router";

const trendingPost = ref([]);


axiosClient.get('/api/trendingpost').then((response)=>{
      console.log(response.data);
      trendingPost.value = response.data;
  });
</script>

<style scoped>
.truncate-text {
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 👈 Limits to 2 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
