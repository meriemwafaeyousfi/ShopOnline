import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss'
import Button from "../button/button.component";

const defaultFormFields= {
    displayName: '',
    email : '',
    password : '',
    confirmPassword : ''
}

const SignUpForm = ()=>{
const [formFields, setFormFields] = useState(defaultFormFields)
const {displayName, email, password, confirmPassword} = formFields;

const resetFormFields = () =>{
    setFormFields(defaultFormFields)
}
const handleSubmit = async (event) => {
    event.preventDefault();
    if(password !== confirmPassword){
        alert('password does not match');
        return;
    }

    try {
        const {user} = await createAuthUserWithEmailAndPassword(email, password);
        await createUserDocumentFromAuth(user, {displayName});
        resetFormFields()
    }catch(error){
        if(error.code === 'auth/email-already-in-use'){
            alert('Email Already in Use')
            console.log(error.code)
        }else{
            console.log(error)
        }
    }

}

const handleChange = (event) => {
 const {name, value} = event.target;
 setFormFields({...formFields, [name] : value });
}

 return(
    <div className="sign-up-container">
        <h2>Don't have an account?</h2>
       <span>sign up with your email and password</span> 
       <form onSubmit={handleSubmit}>

            <FormInput label='Display Name' type="text" onChange={handleChange} name='displayName' value={displayName} required/>
            <FormInput label='Email' type="email" onChange={handleChange} name='email' value={email} required/>
            <FormInput label='Password' type="password" onChange={handleChange} name='password' value={password} required/>
            <FormInput label='Confirm password' type="password" onChange={handleChange} name='confirmPassword' value={confirmPassword} required/>

            <Button type="submit" buttonType='inverted'>Sign up</Button>
       </form>
   </div>
    )
}
export default SignUpForm;