<!-- src/views/Home.vue -->
<template>
  <div class="max-w-6xl mx-auto py-2 grid grid-cols-1 md:grid-cols-4 gap-4">
    <!-- Left Column: Create Post -->
    <div class="hidden md:flex">
        <div class="md:col-span-1">
            <TrendingPost />
        </div>
    </div>

    <!-- Middle Column: Newsfeed (Scrollable) -->
    <div class="md:col-span-2">
        <CreatePost/>
      <Newsfeed />
    </div>

    <!-- Right Column: Friend List -->
    <div class="md:col-span-1">
      <FriendList />
    </div>
  </div>
</template>

<script setup>
import TrendingPost from "../components/TrendingPost.vue";
import Newsfeed from "../components/Newsfeed.vue";
import FriendList from "../components/FriendList.vue";
import CreatePost from "../components/CreatePost.vue";
</script>
