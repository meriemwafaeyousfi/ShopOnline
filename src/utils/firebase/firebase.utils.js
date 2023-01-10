import { initializeApp } from 'firebase/app';
import {getAuth,
        signInWithRedirect,
        signInWithPopup,
        GoogleAuthProvider,
        getAdditionalUserInfo,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDYZxEeWSj4tcKsS0CLAFhVnv0ymNruKj0",
    authDomain: "my-shop-db-2c97d.firebaseapp.com",
    projectId: "my-shop-db-2c97d",
    storageBucket: "my-shop-db-2c97d.appspot.com",
    messagingSenderId: "994555834687",
    appId: "1:994555834687:web:aea562b3936fc80be1238a"
  };
  
  // Initialize Firebase
  const  firebaseApp = initializeApp(firebaseConfig);
  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt : 'select_account'
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {displayName : 'user'}) =>{
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot =  await getDoc(userDocRef);
    if(!userSnapshot.exists()){
        //if user data does not exist
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        }catch(error){
            console.log('error creating the user', error.message)
        }
    }
    return userDocRef; 
  }

  export const createAuthUserWithEmailAndPassword = async (email, password) =>{
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)

  }
  export const signInAuthUserWithEmailAndPassword = async (email, password) =>{
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password)

  }