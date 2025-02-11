<!-- src/components/FriendList.vue -->
<template>
  <div class="bg-white p-4 rounded-lg shadow">
    <h2 class="text-xl font-bold mb-4">Top 5 Users</h2>
    <ul>
      <li v-for="User in topUsers" :key="User.id" class="flex items-center mb-3 cursor-pointer hover:bg-gray-200 rounded-full">
        <div class="flex items-center mb-2">
            <img :src="User.avatar" alt="Avatar" class="w-10 h-10 rounded-full mr-3" />
            <div>
            <h2 class="font-bold">{{ User.name }}</h2>
            <p class="text-gray-500 text-sm">{{ User.points }} pts</p>
            </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";

const topUsers = ref([
  {
    id: 1,
    name: "John Doe",
    avatar: "https://i.pravatar.cc/50?img=1",
    points: 50,
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "https://i.pravatar.cc/50?img=2",
    points: 45,
  }
  ,
  {
    id: 3,
    name: "Rowens Miles",
    avatar: "https://i.pravatar.cc/50?img=3",
    points: 40,
  }
  ,
  {
    id: 4,
    name: "David Well",
    avatar: "https://i.pravatar.cc/50?img=4",
    points: 39,
  }
  ,
  {
    id: 5,
    name: "George Gia",
    avatar: "https://i.pravatar.cc/50?img=5",
    points: 35,
  }


]);
</script>
