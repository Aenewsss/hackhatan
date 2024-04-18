// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";

class FirebaseConfig {

    constructor(
        private appSDK: FirebaseApp | null = null,
    ) { }

    initializeFirebaseApp() {
        const firebaseConfig = {
            apiKey: process.env.NEXT_PUBLIC_API_KEY,
            authDomain: process.env.NODE_ENV == "development" ? process.env.NEXT_PUBLIC_AUTH_DOMAIN : "hackathan.vercel.app",
            projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
            storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
            messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
            appId: process.env.NEXT_PUBLIC_APP_ID,
            measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
        };

        this.appSDK = initializeApp(firebaseConfig);
    }

}

const Firebase = new FirebaseConfig()

export default Firebase