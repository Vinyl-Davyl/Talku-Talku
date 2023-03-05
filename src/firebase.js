import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBCUXm4OY_ppaohEHx2Ucia_DxeJX5AHWQ",
  authDomain: "talku-talku-v2-b289a.firebaseapp.com",
  projectId: "talku-talku-v2-b289a",
  storageBucket: "talku-talku-v2-b289a.appspot.com",
  messagingSenderId: "689328048848",
  appId: "1:689328048848:web:e5041878e28bb00a55ecd5",
  measurementId: "G-F78CRS51Z2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
export const analytics = getAnalytics(app);
