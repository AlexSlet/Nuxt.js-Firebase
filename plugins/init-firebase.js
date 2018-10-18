import firebase from 'firebase'
import 'firebase/firestore' //if use firestore

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyCrCjpRkRcv2EC1PVHLqM7vaxwQXeKphCA",
    authDomain: "nuxt-blog-69de4.firebaseapp.com",
    databaseURL: "https://nuxt-blog-69de4.firebaseio.com",
    projectId: "nuxt-blog-69de4",
    storageBucket: "nuxt-blog-69de4.appspot.com",
    messagingSenderId: "85432884365" 
  })
}



