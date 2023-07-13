import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD463CdesG9YBSg7ebi5txn1SEEMj0EHNo",
  authDomain: "house-marketplace-app-5d525.firebaseapp.com",
  projectId: "house-marketplace-app-5d525",
  storageBucket: "house-marketplace-app-5d525.appspot.com",
  messagingSenderId: "456202653451",
  appId: "1:456202653451:web:1c6a25381f1f8e976d1c0e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();
