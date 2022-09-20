import { createRouter, createWebHistory } from 'vue-router'
import BasicMathView from '../views/BasicMathView.vue'
import StringAppView from '../views/StringAppView.vue'
import HomeView from '../views/Dashboard.vue'
import VuetifyView from '../views/Vuetify.vue'
import AboutmeView from '../views/Aboutme.vue'
import AxiosView from '../views/AxiosView.vue' 
import Aboutproject from '../views/Aboutproject.vue' 
import UserCreate from '../views/UserCreate.vue' 
import Signin from '../views/Signin.vue' 
import { getAuth, onAuthStateChanged } from "firebase/auth";



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/stringApp',
      name: 'StringAppView',
      component: StringAppView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/basicMath',
      name: 'basicMath',
      component: BasicMathView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/vuetifyApp',
      name: 'vuetifyApp',
      component: VuetifyView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/aboutmeApp',
      name: 'aboutmeApp',
      component: AboutmeView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/axiosdemo',
      name: 'axiosdemo',
      component: AxiosView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/aboutprojectApp',
      name: 'aboutprojectApp',
      component: Aboutproject
    },
    {
      path: '/usercreate',
      name: 'usercreate',
      component: UserCreate
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    },
  ]
})


const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      alert("You must sign-in first!");
      next("/signin");
    }
  } else {
    next();
  }
  
});

export default router
