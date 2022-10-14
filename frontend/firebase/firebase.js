// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdG5_pb5p1kKzWE27V70pfG-C6GhVHZEg",
  authDomain: "klaygoods-8da86.firebaseapp.com",
  projectId: "klaygoods-8da86",
  storageBucket: "klaygoods-8da86.appspot.com",
  messagingSenderId: "824001515785",
  appId: "1:824001515785:web:9f2d27de3caef7684fc3d8",
  measurementId: "G-V7X1GBBJFL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore();
