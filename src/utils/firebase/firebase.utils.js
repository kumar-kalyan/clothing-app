import { initializeApp } from 'firebase/app'
import { getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, getDocs, query, where } from 'firebase/firestore'

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
// adding batch data 
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey)
    const batch = writeBatch(db)
    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object)
    })
    await batch.commit();
    console.log('done')
}

// get data from db 
export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories')
    const q = query(collectionRef)
    const querySnapshot = await getDocs(q)
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const { title, items } = docSnapshot.data()
        acc[title.toLowerCase()] = items

        return acc
    }, {})
    console.log(categoryMap)
    return categoryMap

}

/*Feth User Orders*/
export const fetchUserOrders = async () => {
    const user = auth.currentUser;
    if (!user)
        return "Please Sign in to place order"
    try {
        const ordersDocRef = collection(db, "orders")
        const q = query(ordersDocRef, where('userId', '==', user.uid))
        const querySnapshot = await getDocs(q);
        const userOrdersMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
            const { total, status } = docSnapshot.data()
            const { id } = docSnapshot;
            acc[id] = { total, status }
            return acc
        }, {})
        return userOrdersMap;
        console.log(userOrdersMap)
    }
    catch (error) {
        console.log(error)
    }

}

/*Handle Orders*/
export const placeUserOrder = async (total, orderInfo) => {
    const user = auth.currentUser
    // check if user logged in 
    if (!user)
        return "Please Sign In To place order"
    const items = [...orderInfo]
    if (items.length === 0)
        return "Cannot place order with empty cart"
    const orderCollectionRef = collection(db, "orders")
    const orderDocRef = doc(orderCollectionRef);
    const createdAt = new Date();
    const userId = user.uid;
    const status = 'placed';

    try {
        await setDoc(orderDocRef, {
            userId, createdAt, status, total, items
        })
    }
    catch (error) {
        console.log(error)
    }
    return orderDocRef;
}


/*User Functions */

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
// Create new user with email amd password 
export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return
    return await createUserWithEmailAndPassword(auth, email, password)
}
// Sign in user with email and password
export const signInUserAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return
    return await signInWithEmailAndPassword(auth, email, password)
}

// Signout user
export const signOutUser = async () => await signOut(auth)

//An observerable listener 

export const onAuthStateChangedListner = (callback) => onAuthStateChanged(auth, callback)


