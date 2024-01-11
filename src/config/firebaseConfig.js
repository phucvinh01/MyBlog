// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCHU5nZBed-fKTEEmyeQxcM6a82WQQq-R8",
    authDomain: "blog-406007.firebaseapp.com",
    projectId: "blog-406007",
    storageBucket: "blog-406007.appspot.com",
    messagingSenderId: "929474736814",
    appId: "1:929474736814:web:3cf582ab61af6cceca733f",
    measurementId: "G-WSZC3KM6VR"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)