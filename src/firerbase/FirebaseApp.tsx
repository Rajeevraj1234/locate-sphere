import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBDLFaHfN0jTB4J5ezVrAscCu_ktRNH7Cg",
  authDomain: "locate-sphere.firebaseapp.com",
  projectId: "locate-sphere",
  storageBucket: "locate-sphere.appspot.com",
  messagingSenderId: "140492682212",
  appId: "1:140492682212:web:22feca334aebfc3bde8df1",
  measurementId: "G-4KT8WB1DHK"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
