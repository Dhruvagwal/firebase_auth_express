const firebase = require("firebase/app");
require("firebase/auth");

const fb = firebase.initializeApp(require('./firebase.json'));

exports.addUser = (email, password) =>
  fb.auth().createUserWithEmailAndPassword(email, password);

exports.authenticate = (email, password) =>
  fb.auth().signInWithEmailAndPassword(email, password);

exports.signOut = ()=>{
    fb.auth().signOut();
}