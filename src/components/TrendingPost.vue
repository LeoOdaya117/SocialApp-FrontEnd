<!-- src/components/CreatePost.vue -->
<template>
  <div class="bg-white p-4 rounded-lg shadow w-full">
    <h2 class="text-xl font-bold mb-5">Latest Trending Post</h2>
    <ul class="w-full">
      <li v-for="post in trendingPost" :key="post.id" class="flex items-center mb-2  hover:bg-gray-200 rounded cursor-pointer">
        
        <img :src="post.avatar" alt="Avatar" class="w-10 h-10 rounded-full mr-3" />
        <div>
          <h2 class="font-bold truncate-text">{{ post.title }}</h2>
          <p class="text-gray-500 text-sm">{{ post.created_at }}</p>
        </div>
        
        
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";

const trendingPost = ref([
  {
    id: 1,
    title: "Si superman ay bakla",
    avatar: "https://i.pravatar.cc/50?img=1",
    created_at: "2 mins ago",
  },
  {
    id: 2,
    title: "Batang babae nahulog sa kanal",
    avatar: "https://i.pravatar.cc/50?img=2",
    created_at: "2 mins ago",
  }
  ,
  {
    id: 3,
    title: "Isang pulubi napagkamalang blogger naka puslit ng sampung libo",
    avatar: "https://i.pravatar.cc/50?img=2",
    created_at: "2 mins ago",
  }
]);
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
