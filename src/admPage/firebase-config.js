
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAsxlnqiOFzJczSXEAo8a5_Z3Tazw9t8lk",
    authDomain: "books-c3119.firebaseapp.com",
    projectId: "books-c3119",
    storageBucket: "books-c3119.appspot.com",
    messagingSenderId: "187151827958",
    appId: "1:187151827958:web:b791939157fbff4b91fdd7",
    measurementId: "G-WBCBGCY4MF"
});

const db = firebaseApp.firestore();
export default db;