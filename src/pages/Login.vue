<script setup>
import { RouterLink } from 'vue-router';
import GuestLayout from '../components/GuestLayout.vue';
import router from '../router.js';
import { ref } from 'vue';
import axiosClient from '../axios';
import { showToast } from '../utils/toast.js';

const data = ref({
    email: '',
    password: '', 
});



async function login() {
    try {
        await axiosClient.get('/sanctum/csrf-cookie');
        await axiosClient.post('/login', data.value);

        showToast('success', 'Login Success!');

        setTimeout(() => {
            router.push({ name: "Home" });
        }, 2000); // 2 seconds delay
    } catch (error) {
        console.error("Login error:", error.response?.data); // Log error for debugging

        showToast('error', error.response?.data?.message || "Login failed. Please try again.");
    }
}

</script>

<template>
    <GuestLayout>
        <Toaster /> <!-- Ensure Toaster component is included -->
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
           
            <form @submit.prevent="login" class="space-y-6">

                <div>
                    <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
                    <div class="mt-2">
                        <input v-model="data.email" type="email" name="email" id="email" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                        <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
                        <div class="text-sm">
                            <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                        </div>
                    </div>
                    <div class="mt-2">
                        <input v-model="data.password" type="password" name="password" id="password" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                </div>

                <div>
                    <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                </div>
            </form>

            <p class="mt-10 text-center text-sm/6 text-gray-500">
                Not a member? 
                <router-link to='signup' class="font-semibold text-indigo-600 hover:text-indigo-500">Create an account</router-link>
            </p>
        </div>
    </GuestLayout>
</template>
