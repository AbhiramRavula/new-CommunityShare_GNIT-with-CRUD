import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
 import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
 import{getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"
 
// Import the functions you need from the SDKs you need
// import { initializeApp  } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
// // import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
// import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js" ;
// import {getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js" ; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDg7Rm8VDU3B82mavkg2XpiUPejF2HnyXc",
  authDomain: "communityshare-20a2b.firebaseapp.com",
  projectId: "communityshare-20a2b",
  storageBucket: "communityshare-20a2b.firebasestorage.app",    
  messagingSenderId: "7335376772",
  appId: "1:7335376772:web:813affd59a49c10c8c8fd1",
  measurementId: "G-KEP46BGPZ3"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

function showMessage(message, divId){
   var messageDiv=document.getElementById(divId);
   messageDiv.style.display="block";
   messageDiv.innerHTML=message;
   messageDiv.style.opacity=1;
   console.log(message);
   setTimeout(function(){
       messageDiv.style.opacity=0;
   },5000);
}
const signUp=document.getElementById('submitSignUp');
signUp.addEventListener('click', (event)=>{
   event.preventDefault();
   const email=document.getElementById('rEmail').value;
   const password=document.getElementById('rPassword').value;
   const firstName=document.getElementById('fName').value;
   const lastName=document.getElementById('lName').value;

   const auth=getAuth();
   const db=getFirestore();

   createUserWithEmailAndPassword(auth, email, password)
   .then((userCredential)=>{
       const user=userCredential.user;
       const userData={
           email: email,
           firstName: firstName,
           lastName:lastName
       };
       showMessage('Account Created Successfully', 'signUpMessage');
       const docRef=doc(db, "users", user.uid);
       setDoc(docRef,userData)
       .then(()=>{
           window.location.href='login.html';
       })
       .catch((error)=>{
           console.error("Error writing document:", error);
           showMessage('Error writing document: ' + error.message, 'signUpMessage');
       });
   })
   .catch((error)=>{
       const errorCode=error.code;
       if(errorCode=='auth/email-already-in-use'){
           showMessage('Email Address Already Exists !!!', 'signUpMessage');
       }
       else{
           showMessage('Unable to create User: ' + error.message, 'signUpMessage');
       }
   })
});

const signIn = document.getElementById('submitSignIn');
signIn.addEventListener('click', (event) => {
   event.preventDefault();
   const email = document.getElementById('email').value;
   const password = document.getElementById('password').value;
   const auth = getAuth();

   signInWithEmailAndPassword(auth, email, password)
   .then((userCredential) => {
       showMessage('Login is successful', 'signInMessage');
       const user = userCredential.user;
       localStorage.setItem('loggedInUserId', user.uid);
       window.location.href = 'index.html';
   })
   .catch((error) => {
       const errorCode = error.code;
       if (errorCode === 'auth/invalid-credential') {
           showMessage('Incorrect Email or Password', 'signInMessage');
       } else {
           showMessage('Account does not Exist', 'signInMessage');
       }
   });
});

