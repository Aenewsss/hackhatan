import Firebase from "@/app/api/firebase";
import storageService from "@/storage/storage.service";
import { UserEnum } from "@/storage/types";
import { GoogleAuthProvider, signInWithPopup, getAuth, signOut } from "firebase/auth";
// @ts-ignore
import cookie from "js-cookie";

//initialize App 
Firebase.initializeFirebaseApp();

const provider = new GoogleAuthProvider();
const auth = getAuth();

export const login = () => {
    signInWithPopup(auth, provider)
        .then(async (result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            // The signed-in user info.
            const user = result.user;

            storageService.setItem(UserEnum.USER_NAME, user.displayName)
            storageService.setItem(UserEnum.USER_EMAIL, user.email)
            storageService.setItem(UserEnum.USER_ID, user.uid)

            await Firebase.addUserToDatabase(user.uid)

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
        });
}

export const logout = () => {
    signOut(auth)
        .then(result => {
            cookie.remove('hackathan_token')
            storageService.removeAll()
            window.location.assign('/login')
        })
        .catch(error => console.error('Erro ao tentar sair:', error))
}