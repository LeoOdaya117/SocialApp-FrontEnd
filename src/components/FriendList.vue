<!-- src/components/FriendList.vue -->
<template>
  <div class="bg-white p-4 rounded-lg shadow">
    <h2 class="text-xl font-bold mb-2">Friends</h2>
    <ul>
      <li v-for="friend in friends" :key="friend.id" class="flex items-center mb-2">
        <img :src="friend.avatar" alt="Avatar" class="w-8 h-8 rounded-full mr-2" />
        <span>{{ friend.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";

const friends = ref([
  {
    id: 1,
    name: "John Doe",
    avatar: "https://i.pravatar.cc/50?img=1",
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "https://i.pravatar.cc/50?img=2",
  }
]);
</script>
