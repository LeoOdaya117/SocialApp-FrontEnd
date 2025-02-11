<script setup>

import { RouterLink } from 'vue-router';
import GuestLayout from '../components/GuestLayout.vue';
import { ref } from 'vue';
import axiosClient from '../axios';
import { showToast } from '../utils/toast.js';

const data = ref({
    name: '',
    email: '',
    password: '', 
    password_confirmation: '',
})

function submit() {
   

    axiosClient.get('/sanctum/csrf-cookie').then(() => {
        axiosClient.post('/register', data.value).then(response => {
            showToast('success', 'Registration Success!');


            setTimeout(() => {
                router.push({ name: "Home" });
            }, 2000); // 2 seconds delay
        }).catch(error => {
            

            showToast('error',error.response?.data?.message || "Login failed. Please try again.");
           
           
        });
    }).catch(error => {
        // Handle CSRF cookie error here
        console.error("CSRF cookie request failed:", error);
        alert("An error occurred. Please try again later.");
    });
}



</script>

<template>
    <GuestLayout>
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            
            <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Create an Account</h2>
        </div>
        
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form @submit.prevent="submit" class="space-y-6" >
                <div>
                    <label for="fullname" class="block text-sm/6 font-medium text-gray-900">Full Name</label>
                    <div class="mt-2">
                        <input v-model="data.name" type="text" name="fullname" id="fullname" autocomplete="fullname"  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                    <p class="text-sm text-red-600 mt-1"></p>
                </div>
                
                <div>
                    <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
                    <div class="mt-2">
                    <input v-model="data.email" type="email" name="email" id="email" autocomplete="email" required="" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                </div>
        
                <div>
                    <div class="flex items-center justify-between">
                    <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
                    
                    </div>
                    <div class="mt-2">
                        <input v-model="data.password" type="password" name="password" id="password" autocomplete="current-password" required="" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                </div>
                <div>
                    <div class="flex items-center justify-between">
                    <label for="confirm-password" class="block text-sm/6 font-medium text-gray-900">Confirm Password</label>
                    
                    </div>
                    <div class="mt-2">
                        <input v-model="data.password_confirmation" type="password" name="confirm-password" id="confirm-password" autocomplete="current-password" required="" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                </div>
        
                <div>
                    <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create account</button>
                </div>
            </form>
    
            <p class="mt-10 text-center text-sm/6 text-gray-500">
            Already have an account?
            {{ ' ' }}
            <router-link to='/login' class="font-semibold text-indigo-600 hover:text-indigo-500">Sign In</router-link>
            </p>
        </div>
    </GuestLayout>

</template>

<style scoped>

</style>
