<template>
    <v-container fluid class="">
        <h1 class="text-center mt-16 mb-10 text-blue-grey-darken-3">
            Sign In
        </h1>
        <v-card color="brown-lighten-5" class="border-rounded mx-auto" style="width: 600px">
            <v-container>
                <p class="mb-5 ml-2">We are glad to have you back!</p>
                <v-text-field type="text" placeholder="Email" v-model="email"></v-text-field>
                <v-text-field type="password" placeholder="Password" v-model="password"></v-text-field>
                <p class="ml-2">Don't have an account?<a href="/usercreate" style="text-decoration: none;"> Join us
                        now!</a></p>
                <br>
                <v-btn @click="signin" class="text-white me-3" color="blue-grey-darken-1">Sign in</v-btn>
                <v-btn @click="signInWithGoogle" class="text-blue me-3" color="">Google Sign in</v-btn>
            </v-container>
        </v-card>
    </v-container>

</template>
<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc, setDoc, doc } from "firebase/firestore";
import { useRouter } from "vue-router";
import {
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
// import VueAlertify from 'vue-alertify';
//import Swal from "sweetalert2";
// Vue.use(VueAlertify);

const email = ref("");
const password = ref("");
const router = useRouter();
const db = getFirestore();
const userRef = collection(db, "users");
function signin() {
    signInWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((data) => {
            // addDoc(userRef, { email: email.value, score: 0 });
            setDoc(doc(db, "users", email.value), { email: email.value, score: 0 });
            console.log(userRef.id);
            alert("You've successfully signed in!");
            router.push("/");
        })
        .catch((error) => {
            alert("Your email or password is invalid!");
        });
}
const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider)
        .then((result) => {
            console.log(result.user);
            router.push("/");
        })
        .catch((error) => {
        });
};

</script>

<style scoped>
h1 {
    font-size: 80px;
}
</style>