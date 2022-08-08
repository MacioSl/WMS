//Import firebase
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";

//Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBfes9cvwQQSSj_63gPfFIf0muO5owEyfo",
    authDomain: "warehouse-management-sys-4e6b7.firebaseapp.com",
    projectId: "warehouse-management-sys-4e6b7",
    storageBucket: "warehouse-management-sys-4e6b7.appspot.com",
    messagingSenderId: "357068216334",
    appId: "1:357068216334:web:5236f79b47a3271a50845f",
    measurementId: "G-NP3L7BBXWZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//Export the database reference
export default db;
