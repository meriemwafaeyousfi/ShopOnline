import SignUpForm from "../../Components/sign-up-form/sign-up-form.component";
import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"

const SignIn = ()=>{
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef= await createUserDocumentFromAuth(user);
    }
    return(
    <div>
       <h1>sign-in</h1> 
       <SignUpForm/>
       <button onClick={logGoogleUser}>sign In With Google Popup</button>
    </div>
    )
}
export default SignIn;