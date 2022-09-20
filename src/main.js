import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { initializeApp } from "firebase/app";

loadFonts()

const firebaseConfig = {
  apiKey: "AIzaSyBZWeX8r6fqBVDRv1_Sscx3xPcglIddgNM",
  authDomain: "vue-lab-69244.firebaseapp.com",
  projectId: "vue-lab-69244",
  storageBucket: "vue-lab-69244.appspot.com",
  messagingSenderId: "619382304753",
  appId: "1:619382304753:web:25cef1a1ab87b0a673de50",
  measurementId: "G-P0E0394WH6"
};

// Initialize Firebase
initializeApp(firebaseConfig);

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')

