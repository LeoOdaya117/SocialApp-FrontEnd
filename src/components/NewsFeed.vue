<template>
  <div class=" rounded-lg h-[90vh] overflow-y-scroll scrollbar-hide" ref="newsfeedContainer">


   


    <div v-for="post in posts" :key="post.id" class="bg-white shadow p-4 rounded-lg mb-4">
      <div class="flex items-center mb-2">
        <img :src="post.avatar" alt="Avatar" class="w-10 h-10 rounded-full mr-3" />
        <div>
          <h2 class="font-bold">{{ post.user }}</h2>
          <p class="text-gray-500 text-sm">{{ post.created_at }}</p>
        </div>
      </div>
      <p class="text-gray-800 mb-2">{{ post.content }}</p>

      <!-- Post Photo (if available) -->
      <img v-if="post.photo" :src="post.photo" alt="Post Image" class="w-full rounded-lg mb-2 object-cover max-h-80">

      <div class="flex justify-between text-gray-500 text-sm">
        <span>👍 {{ post.likes }} Likes</span>
        <span>💬 {{ post.comments }} Comments</span>
      </div>
    </div>

    <div v-if="loading" class="text-center text-gray-500 py-2">Loading more posts...</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const user = ref({
    firstname: "Leo",
    lastname: "Odaya",
    profile: "https://i.pravatar.cc/50?img=1",
  });

const posts = ref([
  {
    id: 1,
    user: "John Doe",
    avatar: "https://i.pravatar.cc/50?img=1",
    content: "This is my first post! 🎉",
    photo: "https://picsum.photos/400/300?random=1", // Static test image
    likes: 5,
    comments: 2,
    created_at: "2 hours ago",
  },
  {
    id: 2,
    user: "Jane Smith",
    avatar: "https://i.pravatar.cc/50?img=2",
    content: "Loving this new platform! 🚀",
    photo: "https://picsum.photos/400/300?random=2",
    likes: 10,
    comments: 4,
    created_at: "5 hours ago",
  },
]);

const loading = ref(false);
const newsfeedContainer = ref(null);

const loadMorePosts = () => {
  if (loading.value) return;

  loading.value = true;
  setTimeout(() => {
    for (let i = 0; i < 3; i++) {
      posts.value.push({
        id: posts.value.length + 1,
        user: "Random User",
        avatar: `https://i.pravatar.cc/50?img=${posts.value.length + 1}`,
        content: "Another dummy post!",
        photo: `https://picsum.photos/400/300?random=${posts.value.length + 1}`, // Static random image
        likes: Math.floor(Math.random() * 20),
        comments: Math.floor(Math.random() * 10),
        created_at: "Just now",
      });
    }
    loading.value = false;
  }, 1000);
};

const handleScroll = () => {
  if (!newsfeedContainer.value) return;

  const { scrollTop, scrollHeight, clientHeight } = newsfeedContainer.value;
  if (scrollTop + clientHeight >= scrollHeight - 20) {
    loadMorePosts();
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




const newPost = ref("");
const previewImage = ref(null);

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const submitPost = () => {
  alert("Post submitted! (You can now handle post submission logic)");
};
</script>

<style scoped>
/* Hide scrollbar */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
