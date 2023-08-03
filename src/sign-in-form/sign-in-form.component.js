import { useState, useContext, useReducer } from "react";
import { signInUserAuthUserWithEmailAndPassword, signInWithGooglePopup, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils"
import FormInput from "../components/form-input/form-input.component";
import Button from "../components/button/button.component";
import { UserContext } from "../context/user.context";
import './sign-in-form.styles.scss'
const defaultFormFields = {
    email: '',
    password: '',
}
const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { setCurrentUser } = useContext(UserContext)
    // Desturucturing form filed items
    const { email, password } = formFields;
    // console.log(formFields)
    const SignInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user)

    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { user } = await signInUserAuthUserWithEmailAndPassword(email, password);
            // console.log(response)
            alert('User Logged IN')
            setCurrentUser(user)
            resetForm()
        }
        catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password');
                    break;
                case 'auth/user-not-found':
                    alert("No User Associated with email");
                    break;
                default:
                    console.log("useer creation error occured:", error);
            }

        }
    }

    const resetForm = () => {
        setFormFields(defaultFormFields)
    }
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value })
    }
    return (<div className="sign-up-container">
        <h2>Don't have  an account ?</h2>
        <span>Sin Up with Email and Password </span>
        <form onSubmit={handleSubmit}>
            <FormInput label="Email" type="email" required name="email" value={email} onChange={handleChange} />
            <FormInput label="Passsword" type="password" required name="password" value={password} onChange={handleChange} />
            <div className="buttons-container"> <Button type="submit" >Sign In </Button>
                <Button buttonType='google' onClick={SignInWithGoogle}>Sign In With Google</Button></div>

        </form>
    </div>)
}

export default SignInForm;