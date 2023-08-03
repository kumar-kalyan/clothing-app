import { initializeApp } from 'firebase/app'
import { getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyBaarFfg4vniiYv0mnyGdfTm5jgX_Il4oc",
    authDomain: "crown-clothing-db-a5937.firebaseapp.com",
    projectId: "crown-clothing-db-a5937",
    storageBucket: "crown-clothing-db-a5937.appspot.com",
    messagingSenderId: "1051168889877",
    appId: "1:1051168889877:web:2d35a95993b3c9b28ec21c"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account',
    login_hint: 'user@example.com'
})
// authenticate with Firebase
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)
// Create db 
export const db = getFirestore();
//Register user in db
export const createUserDocumentFromAuth = async (userAuth, additonalInfo = {}) => {
    if (!userAuth) return
    const userDocRef = doc(db, 'users', userAuth.uid)
    // console.log(userDocRef)
    const userSnapshot = await getDoc(userDocRef)
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName, email, createdAt, ...additonalInfo
            })
        }
        catch (err) {
            console.log("error" + err.message)
        }
    }
    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return
    return await createUserWithEmailAndPassword(auth, email, password)
}