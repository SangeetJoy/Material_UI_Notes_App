// import firebase from "firebase";
import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBWk0MiVAbiNMW9RFroWO_7OZhgH7FD5Fw",
    authDomain: "joys-notes-app.firebaseapp.com",
    databaseURL: "https://joys-notes-app-default-rtdb.firebaseio.com",
    projectId: "joys-notes-app",
    storageBucket: "joys-notes-app.appspot.com",
    messagingSenderId: "37679897575",
    appId: "1:37679897575:web:bbb4c8c474dec24a127b42",
    measurementId: "G-5LWJGYYW1X"
  };

firebase.initializeApp(firebaseConfig)

export default firebase