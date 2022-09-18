import firebase from "firebase";
import { ref, onUnmounted } from "vue";

const config = {
    apiKey: "AIzaSyBZWeX8r6fqBVDRv1_Sscx3xPcglIddgNM",
    authDomain: "vue-lab-69244.firebaseapp.com",
    projectId: "vue-lab-69244",
    storageBucket: "vue-lab-69244.appspot.com",
    messagingSenderId: "619382304753",
    appId: "1:619382304753:web:25cef1a1ab87b0a673de50",
    measurementId: "G-P0E0394WH6"
  };
const firebaseApp = firebase.initializeApp(config);

const db = firebaseApp.firestore();
const usersCollection = db.collection("users");

export const createUser = (user) => {
  return usersCollection.add(user);
};

export const getUser = async (id) => {
  const user = await usersCollection.doc(id).get();
  return user.exists ? user.data() : null;
};

export const updateUser = (id, user) => {
  return usersCollection.doc(id).update(user);
};

export const deleteUser = (id) => {
  return usersCollection.doc(id).delete();
};

export const useLoadUsers = () => {
  const users = ref([]);
  const close = usersCollection.onSnapshot((snapshot) => {
    users.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  });
  onUnmounted(close);
  return users;
};