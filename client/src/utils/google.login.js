// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_GOOGLE_AUTH_API_KEY,
  authDomain: "login-df10f.firebaseapp.com",
  projectId: "login-df10f",
  storageBucket: "login-df10f.appspot.com", // Corrected storageBucket
  messagingSenderId: "248118223459",
  appId: "1:248118223459:web:664b8ed3561258f29c0e56",
  measurementId: "G-SWC7JB213H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Google Auth Provider
const auth = getAuth(app); // Renamed `analytics` to `auth` for clarity
const provider = new GoogleAuthProvider();

// Initialize Firebase Analytics (optional, only if you need it)
const analytics = getAnalytics(app);

// Export the necessary Firebase services
export { auth, provider, analytics };
