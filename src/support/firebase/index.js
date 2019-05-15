import Firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyAZYmStWHXwACyQ8R7WRZDYQg6ooqeZovc",
    authDomain: "manajer-b2f58.firebaseapp.com",
    databaseURL: "https://manajer-b2f58.firebaseio.com",
    projectId: "manajer-b2f58",
    storageBucket: "manajer-b2f58.appspot.com",
    messagingSenderId: "669638840071",
    appId: "1:669638840071:web:091220bedcf0e398"
  };

export const Fire = Firebase.initializeApp(firebaseConfig)