import firebase from "firebase"
const firebaseConfig = {
    apiKey: "AIzaSyAJUrJi-pNXXBdbkqxMWg4NyQJ7iQ8gReY",
    authDomain: "chatroom-c827e.firebaseapp.com",
    projectId: "chatroom-c827e",
    storageBucket: "chatroom-c827e.appspot.com",
    messagingSenderId: "6991606734",
    appId: "1:6991606734:web:360cbcaebc86c6767bf19f",
    measurementId: "G-FPSX9BXJ3K"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db= firebaseApp.firestore()
  const auth =firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth,provider};
  export default db;