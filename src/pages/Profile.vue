<script setup>
import { ref, onMounted } from "vue";
import axiosClient from "../axios";

// User data
const user = ref({
    name: "",
    email: "",
    avatar: "",
});

const avatarPreview = ref(null);
const selectedAvatar = ref(null);
const loading = ref(false);
const successMessage = ref("");
const errorMessage = ref("");

// Fetch user profile
const fetchProfile = async () => {
    try {
        const { data } = await axiosClient.get("/api/user");
        user.value = data;
        avatarPreview.value = data.avatar;
    } catch (error) {
        console.error("Error fetching profile:", error);
    }
};

// Handle file selection
const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        selectedAvatar.value = file;
        avatarPreview.value = URL.createObjectURL(file);
    }
};

// Update profile
const updateProfile = async () => {
    loading.value = true;
    successMessage.value = "";
    errorMessage.value = "";

    try {
        const formData = new FormData();
        formData.append("name", user.value.name);
        formData.append("email", user.value.email);
        if (selectedAvatar.value) {
            formData.append("avatar", selectedAvatar.value);
        }

        const response = await axiosClient.post("/api/user/update", formData);
        successMessage.value = response.data.message;
        fetchProfile(); // Refresh profile data
    } catch (error) {
        errorMessage.value = "Failed to update profile. Please try again.";
        console.error(error);
    } finally {
        loading.value = false;
    }
};

onMounted(fetchProfile);
</script>

<template>
    <div class="max-w-lg mx-auto p-6 bg-white shadow rounded-lg">
        <h2 class="text-2xl font-bold text-center mb-4">Profile</h2>

        <div class="flex flex-col items-center">
            <label class="relative cursor-pointer">
                <input type="file" class="hidden" @change="handleFileChange" accept="image/*" />
                <img
                    :src="avatarPreview || 'https://via.placeholder.com/100'"
                    class="w-24 h-24 rounded-full border border-gray-300"
                    alt="User Avatar"
                />
                <span class="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full text-xs">✏️</span>
            </label>
        </div>

        <div class="mt-4 space-y-3">
            <div>
                <label class="text-gray-700">Name:</label>
                <input v-model="user.name" class="w-full p-2 border rounded focus:ring focus:ring-blue-300" />
            </div>
            <div>
                <label class="text-gray-700">Email:</label>
                <input v-model="user.email" type="email" class="w-full p-2 border rounded focus:ring focus:ring-blue-300" />
            </div>
        </div>

        <button
            @click="updateProfile"
            class="w-full mt-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
            :disabled="loading"
        >
            {{ loading ? "Updating..." : "Update Profile" }}
        </button>

        <p v-if="successMessage" class="text-green-600 mt-2 text-center">{{ successMessage }}</p>
        <p v-if="errorMessage" class="text-red-600 mt-2 text-center">{{ errorMessage }}</p>
    </div>
</template>
