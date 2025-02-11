
<template>
  <div class="bg-white p-4 rounded-lg shadow">
    <h2 class="text-xl font-bold mb-4">Friends</h2>
    <ul class="">
      <li v-for="friend in friends" :key="friend.id" @click="chat(friend.name)" class="flex items-center mb-4 w-full friends hover:bg-gray-200 p-1 gap-0 rounded-full">
        <img :src="friend.avatar" alt="Avatar" class="w-8 h-8 rounded-full mr-2" />
        <span class="flex-grow">{{ friend.name }}</span>
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
  ,
  {
    id: 3,
    name: "Bato Delata",
    avatar: "https://i.pravatar.cc/50?img=3",
  }
  ,
  {
    id: 4,
    name: "Totoy Bibo",
    avatar: "https://i.pravatar.cc/50?img=4",
  }
  ,
  {
    id: 5,
    name: "Neneng bee",
    avatar: "https://i.pravatar.cc/50?img=5",
  }
  ,
  {
    id: 6,
    name: "Joshua Sarosa",
    avatar: "https://i.pravatar.cc/50?img=6",
  }
  ,
  {
    id: 7,
    name: "Jane Smith",
    avatar: "https://i.pravatar.cc/50?img=7",
  }
  ,
  {
    id: 8,
    name: "Wolf Gang",
    avatar: "https://i.pravatar.cc/50?img=8",
  },
  {
    id: 9,
    name: "Dan Fer",
    avatar: "https://i.pravatar.cc/50?img=9",
  },
  {
    id: 10,
    name: "Joana Smith",
    avatar: "https://i.pravatar.cc/50?img=10",
  }


]);

function chat(id){
  alert(id);
}
</script>

<style scoped>

.friends{
  cursor: pointer;

}

</style>
