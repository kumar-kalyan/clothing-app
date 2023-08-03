// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import { signInWithGooglePopup, createUserDocumentFromAuth, signInWithGoogleRedirect, auth } from "../../utils/firebase/firebase.utils";

const SignIn = () => {
    // useEffect(() => {
    //     const getResult = async () => {
    //         const response = await getRedirectResult(auth);
    //          if(response){
    //             const userDocRef = await createUserDocumentFromAuth(response.user)
    //          }
    //     }
    //      getResult();



    // }, [])
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user)

    }
    return (<><h1>Sign In Page </h1>
        <button onClick={logGoogleUser}>Sign In with Google Popup</button>
        <SignUpForm />
    </>)
}
export default SignIn;