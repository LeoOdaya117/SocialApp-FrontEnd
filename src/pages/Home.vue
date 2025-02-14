<!-- src/views/Home.vue -->
<template>
  
  <div class="max-w-6xl mx-auto px-2 grid grid-cols-1 md:grid-cols-4 gap-4">
    <!-- Left Column: Create Post -->
    <div class="hidden md:flex">
        <div class="md:col-span-1">
            <TrendingPost />
            <div class="mt-5">
              <TopUser />
            </div>
        </div>
        
    </div>

    <!-- Middle Column: Newsfeed (Scrollable) -->
    <div class="md:col-span-2">
      <CreatePost @show-toast="handleToast" />
        <Newsfeed />
    </div>

    <!-- Right Column: Friend List -->
    <div class="hidden md:flex">
      <div class="md:col-span-1 w-full">
        <FriendList />
      </div>
    </div>
  </div>
</template>

<script setup>
import TrendingPost from "../components/TrendingPost.vue";
import Newsfeed from "../components/Newsfeed.vue";
import FriendList from "../components/FriendList.vue";
import CreatePost from "../components/CreatePost.vue";
import TopUser from "../components/TopUser.vue";
import { showToast } from '../utils/toast.js';
import { onMounted } from "vue";
import axiosClient from "../axios.js";

const handleToast = ({ type, message }) => {
  console.log("Toast Event Triggered:", type, message); // Debugging log
  showToast(type, message);
};


const fetchUser = async () => {

  try {
      const response = await axiosClient.get('/api/user');
      const data = response.data;
      console.log(data);
  } catch (error) {
    console.log(error);
  }

};


fetchUser()
</script>
