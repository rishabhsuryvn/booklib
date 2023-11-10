import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import {initializeApp} from 'firebase/app';
import {
    getAuth,
     createUserWithEmailAndPassword, 
     signInWithEmailAndPassword,
      GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged} from 'firebase/auth';
import {getFirestore, collection, addDoc, getDocs, doc, getDoc, query, where} from 'firebase/firestore';   
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage';
const FirebaseContext = createContext(null);

const firebaseConfig = {
    apiKey: "AIzaSyC_3npyg276oaslELARecOhijjdoEPH66I",
    authDomain: "booklib-c5110.firebaseapp.com",
    projectId: "booklib-c5110",
    storageBucket: "booklib-c5110.appspot.com",
    messagingSenderId: "674958698692",
    appId: "1:674958698692:web:03c26d07c55f3c831a4191"
  };
  

export  const useFirebase =() => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const firestore= getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export const FirebaseProvider =(props) =>{
   const [user, setUser] = useState(null);

   useEffect(()=>{
    onAuthStateChanged(firebaseAuth, (user)=>{
        if(user) setUser(user);
        else setUser(null);
    })
   }, [])

    const signupUserwithEmailandPassword = (email,password)=>
        createUserWithEmailAndPassword(firebaseAuth, email, password);

    const siginUserWithEmailandPass = (email,password)=>
        signInWithEmailAndPassword(firebaseAuth, email, password); 
        
    const signinWithGoogle = ()=> signInWithPopup(firebaseAuth, googleProvider);    
    
    const createNewList = async(name,isbn,price,cover) =>{
     const imageRef= ref(storage, `uploads/images/${Date.now()}-${cover.name}`);
    
     const uploadResult = await uploadBytes(imageRef, cover);
    return await addDoc(collection(firestore, 'book'),{
        name,
        isbn,
        price,
        imageUrl: uploadResult.ref.fullPath,
        userID: user.uid,
        userEmail: user.email,
        displayName: user.displayName,
        photoUrl: user.photoURL,
     });
    };

    const listAllBooks = ()=>{
        return getDocs(collection(firestore, "book"));
    }

     const getImageUrl = (path)=>{
        return getDownloadURL(ref(storage,path));
     };

     const getBookId= async(id)=>{
        const docRef = doc(firestore, 'book', id);
       const result = await getDoc(docRef);
       return result;
     }

      const placeOrder= async (bookId, qty)=>{
       const collectionRef = collection(firestore, 'book',bookId, 'order');
       const result = await addDoc(collectionRef, {
        userID: user.uid,
        userEmail: user.email,
        displayName: user.displayName,
        photoUrl: user.photoURL,
        qty: Number(qty),
       });
       return result;
      };
    
      const fetchMyBooks = async (userId) => {
        const collectionRef = collection(firestore, "books");
        const q = query(collectionRef, where("userID", "==", userId));
    
        const result = await getDocs(q);
        return result;
      };
      

    const isLoggedIn = user ? true: false;

    return (
        <FirebaseContext.Provider value={{
            signinWithGoogle,
            signupUserwithEmailandPassword, 
            siginUserWithEmailandPass,
            isLoggedIn,
            createNewList,
            listAllBooks,
            getImageUrl,
            getBookId,
            placeOrder,
            fetchMyBooks,
            user,
            }}>
            {props.children}
        </FirebaseContext.Provider>
    )
};