import Firebase from "@/app/api/firebase";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth"
// @ts-ignore
import cookie from "js-cookie"

//initialize App 
Firebase.initializeFirebaseApp()

const provider = new GoogleAuthProvider()

const auth = getAuth();

export const login = () => {
    signInWithPopup(auth, provider)
        .then(async (result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            // The signed-in user info.
            const user = result.user;
            cookie.set('hackathan_token', await user.getIdToken())
            window.location.assign('/')
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
}