import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// ⬇️ REPLACE these values with your real config from Firebase console
const firebaseConfig = {
  apiKey: "AIzaSyCPDZQ42zD3ygjXvpzqCFpIUy35G0bko5g",
  authDomain: "phoneotp-82185.firebaseapp.com",
  projectId: "phoneotp-82185",
  // fixed storage bucket value (was likely incorrect in original upload)
  storageBucket: "phoneotp-82185.appspot.com",
  messagingSenderId: "895376510900",
  appId: "1:895376510900:web:d6e845f3775dc00bfd2ce1",
  measurementId: "G-5XS6EVE0TC",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// if you want to export the app for other firebase services:
export default app;
