import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from './components/DefaultLayout.vue'

import Login from "./pages/Login.vue"
import Signup from "./pages/Signup.vue"
import Home from "./pages/Home.vue"
import Profile from "./pages/Profile.vue"
import NotFound from './pages/NotFound.vue'


const routes = [
    {
        path: "/",
        component: DefaultLayout,
        children:[
            {path:"/", name: "Home", component: Home},
            {path:"/profile", name: "Profile", component: Profile}
            
        ]
    },
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: "/signup",
        name: "Signup",
        component: Signup
    }
    
    ,
    {
        path: "/:pathMatch(.*)*",
        name: "not-found",
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes // Use the defined routes array
})

export default router