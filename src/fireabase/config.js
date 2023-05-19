import { initializeApp } from "firebase/app";

import { getFirestore } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAa-qfVBOQUHj0neTB7q76lxVdTsHCaSHQ",
  authDomain: "docs-clone-6bde3.firebaseapp.com",
  projectId: "docs-clone-6bde3",
  storageBucket: "docs-clone-6bde3.appspot.com",
  messagingSenderId: "539413933943",
  appId: "1:539413933943:web:3d3c05781ba932db2abb72",
  measurementId: "G-MZF3FFV9QM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const auth = getAuth(app);

export { firestore, auth };
