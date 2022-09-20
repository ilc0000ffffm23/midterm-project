<template>
  <nav>
    <v-toolbar app color="#B0BEC5">
      <v-app-bar-nav-icon @click='toggleDrawer'></v-app-bar-nav-icon>
      <v-toolbar-title>

      </v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- dropdown menu -->
      <v-menu open-on-hover >
        <template v-slot:activator="{ props }">
          <v-btn color="black" v-bind="props">
            Dropdown
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="(item, index) in items" :key="index" router :to="item.path" :prepend-icon="item.icon">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" target="_blank" flat color="black">
        <v-icon>mdi-star</v-icon>
        <span>Click for Fun</span>
      </v-btn>

      <v-btn @click="handleSignOut" v-if="isLoggedIn" color="black">
        <strong><span>Sign Out</span></strong>
      </v-btn>



    </v-toolbar>

    <v-navigation-drawer app v-model="drawer" color="#B0BEC5">
      <center>
        <br>
        <v-list-item-title>
          <h3>Ian Guilan B.Gaudier</h3>
        </v-list-item-title>
      </center>
      <img src="/img/1.png" alt="Avatar" style="border-radius: 50%; width:200px; height: auto;">
        <br>
      <v-divider></v-divider>
      <v-list-item v-for="item in items" :key="item.title" router :to="item.path" :prepend-icon="item.icon">
        <v-list-item-title>{{ item.title }}</v-list-item-title>

      </v-list-item>

    </v-navigation-drawer>
  </nav>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";
//import Swal from "sweetalert2";

const router = useRouter();

const drawer = ref(false);

const isLoggedIn = ref(false);


const items = ref([
  { title: 'Dashboard', icon: 'mdi-home', path: '/' },
  { title: 'Math', icon: 'mdi-calculator-variant', path: '/basicMath' },
  { title: 'String App', icon: 'mdi-alpha-s-circle', path: '/stringApp' },
  { title: 'Vuetify', icon: 'mdi-vuejs', path: '/vuetifyApp' },
  { title: 'About Me', icon: 'mdi-account', path: '/aboutmeApp' },
  { title: 'Axios', icon: 'mdi-alien', path: '/axiosdemo' },
  { title: 'About Project', icon: 'mdi-folder-information', path: '/aboutprojectApp' },
])

let auth;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
      const info = user.email;
      console.log(info);
    } else {
      isLoggedIn.value = false;
      console.log("not logged in");
    }
  });
});
function toggleDrawer() {
  return (drawer.value = !drawer.value);
}
const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/signin");
  });
};

</script>

<style>
</style>