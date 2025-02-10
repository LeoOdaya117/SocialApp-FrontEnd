<template>
  <!-- Create Post Button -->
  <div class="bg-white p-4 rounded-lg shadow-md mb-4">
    <div class="flex items-center space-x-3">
      <img :src="user.profile" alt="Avatar" class="w-12 h-12 rounded-full border border-gray-300" />
      <input
        placeholder="What's on your mind, Leo?"
        class="flex-1 p-3 border border-gray-300 rounded-full bg-gray-100 cursor-pointer"
        @click="openModal"
        readonly
      />
    </div>
  </div>

  <!-- Modal -->
  <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-5 rounded-lg w-full max-w-md shadow-lg">
      <h2 class="text-lg font-semibold mb-3 text-gray-700">Create Post</h2>

      <!-- Avatar & Input -->
      <div class="flex items-center space-x-3 mb-3">
        <img :src="user.profile" alt="Avatar" class="w-12 h-12 rounded-full border border-gray-300" />
        <input
          v-model="newPost"
          placeholder="What's on your mind?"
          class="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <!-- Image Preview (If Selected) -->
      <div v-if="previewImage" class="relative mt-3">
        <img :src="previewImage" alt="Selected Image" class="w-full rounded-lg max-h-60 object-cover">
        <button @click="removeImage" class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 text-xs">✕</button>
      </div>

      <!-- Image Upload Section (Hidden if Image is Selected) -->
      <div 
        v-if="!previewImage" 
        class="mt-2 flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
        @dragover.prevent="dragOver"
        @dragleave="dragLeave"
        @drop="handleDrop"
      >
        <div class="text-center">
          <label for="file-upload" class="cursor-pointer flex flex-col items-center">
            <svg class="h-10 w-10 text-indigo-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 16l3 3m0 0l3-3m-3 3V4m6 13l3 3m0 0l3-3m-3 3V4"></path>
            </svg>
            <span class="mt-2 text-sm text-gray-600 font-semibold">Click to upload or drag & drop</span>
            <input id="file-upload" type="file" @change="handleImageUpload" class="hidden" accept="image/*" />
          </label>
          <p class="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
        </div>
      </div>

      <!-- Post Button -->
      <div class="flex items-center justify-between mt-3">
        <button
          @click="submitPost"
          class="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Post
        </button>
      </div>

      <!-- Close Modal Button -->
      <button @click="closeModal" class="mt-3 text-gray-600 hover:text-gray-800 w-full text-center">
        Cancel
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const newPost = ref("");
const previewImage = ref(null);
const isModalOpen = ref(false);
const isDragging = ref(false);

const user = ref({
  firstname: "Leo",
  lastname: "Odaya",
  profile: "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
});

// Open/Close Modal
const openModal = () => {
  isModalOpen.value = true;
};
const closeModal = () => {
  isModalOpen.value = false;
  newPost.value = "";
  previewImage.value = null;
};

// Handle Image Upload from File Input
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

// Handle Drag & Drop Upload
const dragOver = (event) => {
  event.preventDefault();
  isDragging.value = true;
};
const dragLeave = () => {
  isDragging.value = false;
};
const handleDrop = (event) => {
  event.preventDefault();
  isDragging.value = false;
  
  const file = event.dataTransfer.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

// Remove Image
const removeImage = () => {
  previewImage.value = null;
};

// Submit Post
const submitPost = () => {
  alert("Post submitted! (You can now handle post submission logic)");
  closeModal();
};
</script>
