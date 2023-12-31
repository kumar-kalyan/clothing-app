import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
// import { UserContext } from "../../context/user.context";
import './sign-up-form.styles.scss'
const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}
const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    // Desturucturing form filed items
    const { displayName, email, password, confirmPassword } = formFields;
    // console.log(formFields)
    //Setting Up context
    // const { setCurrentUser } = useContext(UserContext)

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("password donot match")
            return
        }
        try {

            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            // setCurrentUser(user)
            await createUserDocumentFromAuth(user, { displayName })
            alert('User Signed Up Successfully')
            resetForm()
        }
        catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('cannot create user, e mail already in use')
            }
            else {
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
            <FormInput label="Display Name" type="text" required name="displayName" value={displayName} onChange={handleChange} />
            <FormInput label="Email" type="email" required name="email" value={email} onChange={handleChange} />
            <FormInput label="Passsword" type="password" required name="password" value={password} onChange={handleChange} />
            <FormInput label="Confirm Password" type="password" required name="confirmPassword" value={confirmPassword} onChange={handleChange} />
            <Button type="submit" >Sign Up </Button>
        </form>
    </div>)
}

export default SignUpForm;