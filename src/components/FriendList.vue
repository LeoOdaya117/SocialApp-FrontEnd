
<template>
  <div class="bg-white p-4 rounded-lg shadow">
    <h2 class="text-xl font-bold mb-4">Friends</h2>
    
    <!-- Show default message if no friends -->
    <p v-if="friends.length === 0" class="text-gray-500">No friends yet.</p>
    
    <!-- Show friends list if not empty -->
    <ul v-else>
      <li v-for="friend in friends" :key="friend.friend_id" @click="chat(friend.name)" 
          class="flex items-center mb-4 w-full friends hover:bg-gray-200 p-1 gap-0 rounded-full">
        <img :src="friend.avatar ?? 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg'" alt="Avatar" class="w-8 h-8 rounded-full mr-2" />
        <span class="flex-grow">{{ friend.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref,onMounted } from "vue";

import axiosClient from '../axios';
const friends = ref([]);

onMounted(()=>{
    axiosClient.get('/api/friends').then((Response)=>{
        console.log(Response.data);
        friends.value = Response.data;
    });


});
function chat(id){
  alert(id);
}
</script>

<style scoped>

.friends{
  cursor: pointer;

}

</style>
