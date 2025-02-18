<script setup>
// IMPORTS
import { ref, onMounted, onUnmounted } from "vue";
import { HandThumbUpIcon, ChatBubbleBottomCenterTextIcon, ArrowPathRoundedSquareIcon } from '@heroicons/vue/24/outline';
import axiosClient from "../axios";
import echo from '../plugins/echo'; // Import Echo instance
import { useRoute } from "vue-router";
import  {useAuthStore} from '../store/auth.js';

const authStore = useAuthStore();
const route = useRoute(); // Get route information
const searchQuery = ref(route.query.q || ""); // Get search query from URL

// USER
const user = ref({
    firstname: "Leo",
    lastname: "Odaya",
    profile: "https://i.pravatar.cc/50?img=1",
});

// POSTS
const posts = ref([]);
const page = ref(1);
const hasMore = ref(true);
const loading = ref(false);
const newsfeedContainer = ref(null);

const fetchPosts = async () => {
    if (loading.value || !hasMore.value) return;
    loading.value = true;
    try {
        const response = await axiosClient.get('/api/posts', {
            params: { q: searchQuery.value, page: page.value }
        });
        if (response.data.data.length > 0) {
            posts.value.push(...response.data.data);
            page.value++;
        } else {
            hasMore.value = false; // No more posts
        }
    } catch (error) {
        console.error("Error fetching posts:", error);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchPosts();
    echo.channel('newsfeed').listen('PostCreated', ({ post }) => {
        if (post) {
            posts.value.unshift(post); // Prepend new post
        } else {
            console.error('Received an empty post:', post);
        }
    });
});

echo.channel("post-likes").listen(".PostLikedEvent", (data) => {
    const postIndex = posts.value.findIndex((p) => p.id == data.postId);
    if (postIndex !== -1) {
        posts.value[postIndex] = Object.assign({}, posts.value[postIndex], { likes: data.likesCount });
    }
});

// LIKE FUNCTION
const likePost = async (postId) => {
    try {
        const { data } = await axiosClient.post(`/api/posts/${postId}/like`);
        const post = posts.value.find((p) => p.id === postId);
        if (post) {
            post.likes = data.likes;
            post.likedByUser = !post.likedByUser;
        }
    } catch (error) {
        console.error("Error liking post:", error.response?.data || error.message);
    }
};

const handleScroll = () => {
    if (!newsfeedContainer.value) return;
    const { scrollTop, scrollHeight, clientHeight } = newsfeedContainer.value;
    if (scrollTop + clientHeight >= scrollHeight - 50) {
        fetchPosts();
    }
};

onMounted(() => {
    if (newsfeedContainer.value) {
        newsfeedContainer.value.addEventListener("scroll", handleScroll);
    }
});

onUnmounted(() => {
    if (newsfeedContainer.value) {
        newsfeedContainer.value.removeEventListener("scroll", handleScroll);
    }
});

// FOR IMAGE MODAL
const isImageModalOpen = ref(false);
const selectedImage = ref(null);
const openImageModal = (image) => {
    selectedImage.value = image;
    isImageModalOpen.value = true;
};
const closeImageModal = () => {
    isImageModalOpen.value = false;
    selectedImage.value = null;
};
</script>

<template>
    <div class="rounded h-screen overflow-y-scroll scrollbar-hide" ref="newsfeedContainer">
        <div v-for="post in posts" :key="post.id" class="bg-white shadow p-4 rounded-lg mb-4">
            <div class="flex items-center mb-2">
                <router-link to="/profile">
                    <img :src="post.user.avatar || 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg'" alt="Avatar" class="w-10 h-10 rounded-full mr-3" />
                </router-link>
                <div>
                    <router-link to="/profile">
                        <h2 class="font-bold">{{ post.user.name }}</h2>
                    </router-link>
                    <p class="text-gray-500 text-sm">{{ post.created_at }}</p>
                </div>
            </div>
            <p class="text-gray-800 mb-2 text-justify whitespace-pre-line" v-html="post.content"></p>

            <img v-if="post.image" :src="post.image" @click="openImageModal(post.image)" alt="Post Image" class="w-full rounded-lg mb-2 object-cover max-h-80">
            <div class="flex justify-between mb-2">
                <div class="flex items-center gap-2 text-gray-500 text-sm mb-1">
                    <div class="flex gap-1 cursor-pointer">
                        <HandThumbUpIcon class="w-5 h-5 hover:bg-red-200 rounded-full" :class="post.likedByUser ? 'text-red-500' : 'text-gray-500'" @click="likePost(post.id)"/>
                        <span>{{ post.likes }} Likes</span>
                    </div>
                    <div class="flex gap-1">
                        <ChatBubbleBottomCenterTextIcon class="w-5 h-5 text-gray-500 cursor-pointer" />
                        <span>{{ post.comments }} Comments</span>
                    </div>
                </div>
                <div class="flex items-center gap-2 text-gray-500 text-sm mb-1">
                    <ArrowPathRoundedSquareIcon class="w-5 h-5 text-gray-500 cursor-pointer" />
                    <span>{{ post.comments }} Shares</span>
                </div>
            </div>
            <hr class="mb-2">
            <div class="flex items-center space-x-2">
                <img :src="authStore.user.avatar ?? 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg'" alt="Avatar" class="w-10 h-10 rounded-full border border-gray-300" />
                <input placeholder="Write a comment..." class="flex-1 p-1 border border-gray-300 rounded-full bg-gray-100 cursor-pointer" />
            </div>
        </div>
        <div v-if="loading" class="text-center text-gray-500 py-2">Loading more posts...</div>
    </div>
    <div v-if="isImageModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
        <button @click="closeImageModal" class="absolute top-4 right-4 bg-transparent text-red-600 shadow-lg text-3xl p-3 rounded-full z-50 font-extrabold">&times;</button>
        <div class="absolute inset-0" @click="closeImageModal"></div>
        <div class="relative max-w-3xl w-full p-4">
            <img :src="selectedImage" class="w-full max-h-[80vh] rounded-lg object-contain" />
        </div>
    </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>
