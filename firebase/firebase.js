import * as firebase from "firebase";

const Config = {
  apiKey: "AIzaSyAjqqIJYyRxS4gPZwhipopMTzFYmVFNHrQ",
  authDomain: "practicerena.firebaseapp.com",
  databaseURL: "https://practicerena.firebaseio.com",
  projectId: "practicerena",
  storageBucket: "practicerena.appspot.com",
  messagingSenderId: "541438332950",
  appId: "1:541438332950:web:80da970ef7f7d9d0412537",
  measurementId: "G-8XM24VTH13",
};

export default firebaseConfig = firebase.initializeApp(Config);
