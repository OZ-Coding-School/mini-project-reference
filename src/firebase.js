import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBqbKs1naHGTgjvq5aQTbTsHa1lchLjtf4",
  authDomain: "my-movies-79348.firebaseapp.com",
  projectId: "my-movies-79348",
  storageBucket: "my-movies-79348.appspot.com",
  messagingSenderId: "382911662465",
  appId: "1:382911662465:web:cccb583ba69d938b6a4080",
  measurementId: "G-9V5F4JH6WD",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
