import Firebase from "@/app/api/firebase";
import { GoogleAuthProvider, signInWithPopup, getAuth, signInWithRedirect, getRedirectResult } from "firebase/auth";
import cookie from "js-cookie";

//initialize App 
Firebase.initializeFirebaseApp();

const provider = new GoogleAuthProvider();
const auth = getAuth();

export const login = () => {
    // Verificar se o usuário está em um dispositivo móvel
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        signInWithRedirect(auth, provider);
    } else {
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
}

getRedirectResult(auth)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        alert(`chegou aqui ${result}`)
        console.log('result', result)
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
    }).catch((error) => {
        console.log('error', error)
        // ...
    });
