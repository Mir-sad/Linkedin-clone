import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBzvDZF2m9lkjmdBsq8DV4PMReAJTSTMzo",
    authDomain: "linkedin-clone-96568.firebaseapp.com",
    projectId: "linkedin-clone-96568",
    storageBucket: "linkedin-clone-96568.appspot.com",
    messagingSenderId: "590638951613",
    appId: "1:590638951613:web:b30f49f8565ada77845bd4"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  const storage = firebase.storage();

  export { auth, provider, storage };
  export default db;