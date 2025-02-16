import { defineStore } from "pinia";
import { ref } from "vue";
import axiosClient from "../axios";

export const useAuthStore = defineStore("auth", () => {
    const user = ref([]);
    
    const fetchUser = async () => {

       
        try {
            const response = await axiosClient.get('/api/user');
            const data = response.data;
            console.log(data);

            user.value = data;
        } catch (error) {
          console.log(error);
        }
      
      };
      
      
    return { user, fetchUser }; // Return state & function

})