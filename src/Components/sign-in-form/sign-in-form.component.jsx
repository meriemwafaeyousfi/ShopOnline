import { useState } from "react";
import { createAuthUserWithEmailAndPassword,
         createUserDocumentFromAuth,
         signInWithGooglePopup,
         signInAuthUserWithEmailAndPassword} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss'
import Button from "../button/button.component";


const defaultFormFields= {
    email : '',
    password : ''
}

const SignInForm = ()=>{
const [formFields, setFormFields] = useState(defaultFormFields)
const {email, password} = formFields;

const resetFormFields = () =>{
    setFormFields(defaultFormFields)
}
const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = signInAuthUserWithEmailAndPassword(email, password)
        console.log(response)
        resetFormFields()
    }catch(error){
        switch(error.code){
            case 'auth/wrong-password':
                alert('invalid password or email');
                break;
            case 'auth/user-not-found':
                alert('no user associated with this email');
                break;
            default : 
             console.log(error);
        }
    }

}

const handleChange = (event) => {
 const {name, value} = event.target;
 setFormFields({...formFields, [name] : value });
}
const signInWithGoogle = async () => {
    const {user} = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
}

 return(
    <div className="sign-in-container">
        <h2>I already have an account</h2>
       <span>Sign in with your email and password</span> 
       <form onSubmit={handleSubmit}>

            <FormInput label='Email' type="email" onChange={handleChange} name='email' value={email} required/>
            <FormInput label='Password' type="password" onChange={handleChange} name='password' value={password} required/>
            <div className="buttons-container">
                <Button type="submit" buttonType='inverted'>Sign in</Button>
                <Button type='button' buttonType='google' onClick={signInWithGoogle} >Sign in with Google</Button>
            </div>
       </form>
   </div>
    )
}
export default SignInForm;