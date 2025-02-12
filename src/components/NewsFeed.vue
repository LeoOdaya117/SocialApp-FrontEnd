  <script setup>
  // IMPORTS
  import { ref, onMounted, onUnmounted } from "vue";
  import { HandThumbUpIcon, ChatBubbleBottomCenterTextIcon, ArrowPathRoundedSquareIcon } from '@heroicons/vue/24/outline';
  import axiosClient from "../axios";
  import echo from '../plugins/echo'; // Import Echo instance

  // USER
  const user = ref({
      firstname: "Leo",
      lastname: "Odaya",
      profile: "https://i.pravatar.cc/50?img=1",
  });


  // POST
  const posts = ref([]);

  onMounted(()=>{
      axiosClient.get('/api/posts').then((Response)=>{
        // console.log(Response.data);
          posts.value = Response.data;
      });
  });

  onMounted(() => {
      echo.channel('newsfeed') // ✅ Correct channel name
          .listen('PostCreated', ({ post }) => { // Destructure to get the actual post data
            if (post) {
                // console.log('New Post Received:', post);
                posts.value.unshift(post); // Prepend the new post to the feed
            } else {
                console.error('Received an empty post:', post);
            }
      });

  }); 




  // LIKE FUNCTION
  function likePost(id, name){
    alert('You liked a post of ' + name);
  }

  // LOADING MORE
  const loading = ref(false);
  const newsfeedContainer = ref(null);

  const loadMorePosts = () => {
    if (loading.value) return;

    loading.value = true;
    setTimeout(() => {
      for (let i = 0; i < 3; i++) {
        posts.value.push({
          id: posts.value.length + 1,
          user: {
            name: "Random User",
            avatar: `https://i.pravatar.cc/50?img=${posts.value.length + 1}`,
          },
          content: "Another dummy post!",
          image: `https://picsum.photos/400/300?random=${posts.value.length + 1}`,
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


  // FOR IMAGE MODAL

    //FOR IMAGE MODAL
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
    <div class="rounded-lg h-[80vh] overflow-y-scroll scrollbar-hide" ref="newsfeedContainer">
      <div v-for="post in posts" :key="post.id" class="bg-white shadow p-4 rounded-lg mb-4">
        <!-- User Info -->
        <div class="flex items-center mb-2">
          <router-link to="/profile">
            <img :src="post.user.avatar ? post.user.avatar : 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg'" alt="Avatar" class="w-10 h-10 rounded-full mr-3" />
          </router-link>
          <div>
            <router-link to="/profile">
              <h2 class="font-bold">{{ post.user.name }}</h2>
            </router-link>
            <p class="text-gray-500 text-sm">{{ post.created_at }}</p>
          </div>
        </div>

        <!-- Post Content -->
        <p class="text-gray-800 mb-2">{{ post.content }}</p>

        <!-- Post Photo (if available) -->
        <img v-if="post.image" :src="post.image" @click="openImageModal(post.image)" alt="Post Image" 
            class="w-full rounded-lg mb-2 object-cover max-h-80">

        <!-- Likes, Comments, Shares -->
        <div class="flex justify-between mb-2">
          <div class="flex items-center gap-2 text-gray-500 text-sm mb-1">
          <div class="flex gap-1 cursor-pointer">
              <HandThumbUpIcon class="w-5 h-5 text-gray-500 " @click="likePost(post.id, post.user)"/>
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

        <!-- Comment Input -->
        <div class="flex items-center space-x-2">
          <img :src="user.profile" alt="Avatar" class="w-10 h-10 rounded-full border border-gray-300" />
          <input
            placeholder="Write a comment..."
            class="flex-1 p-1 border border-gray-300 rounded-full bg-gray-100 cursor-pointer"
          />
        </div>
      </div>

      <div v-if="loading" class="text-center text-gray-500 py-2">Loading more posts...</div>
    </div>

     <!-- Image Modal -->
  <div v-if="isImageModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
    <!-- Close button OUTSIDE the image -->
    <button 
      @click="closeImageModal" 
      class="absolute top-4 right-4 bg-transparent text-red-600 shadow-lg text-3xl p-3 rounded-full z-50 font-extrabold"
    >
      &times;
    </button>

    <!-- Click overlay to close -->
    <div class="absolute inset-0" @click="closeImageModal"></div>

    <!-- Image container -->
    <div class="relative max-w-3xl w-full p-4">
      <img :src="selectedImage" class="w-full max-h-[80vh] rounded-lg object-contain" />
    </div>
  </div>
  </template>

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
