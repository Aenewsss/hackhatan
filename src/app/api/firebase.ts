// Import the functions you need from the SDKs you need
import { IUser } from "@/storage/types";
import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth, getAdditionalUserInfo } from "firebase/auth";
import { child, get, getDatabase, ref, set } from "firebase/database";

class FirebaseConfig {

    constructor(
        private appSDK: FirebaseApp | null = null,
    ) { }

    initializeFirebaseApp() {
        const firebaseConfig = {
            apiKey: process.env.NEXT_PUBLIC_API_KEY,
            authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
            projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
            storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
            messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
            appId: process.env.NEXT_PUBLIC_APP_ID,
            measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
        };

        this.appSDK = initializeApp(firebaseConfig);
        const database = getDatabase();
    }

    initializeDatabase() {

    }

    addUserToDatabase = async (user_id: string, user_name:string) => {

        const isUserExists = async (user_id: string) => {
            const db = getDatabase();
            const userRef = ref(db, `users/${user_id}`);

            try {
                const snapshot = await get(userRef);
                return snapshot.exists();
            } catch (error) {
                console.error("Erro ao verificar se o usuário existe:", error);
                return false;
            }
        };

        try {
            const userExists = await isUserExists(user_id);

            if (!userExists) {
                const db = getDatabase();
                const usersRef = ref(db, 'users');

                const userData = {
                    user_id,
                    points: 10,
                    number_of_descriptions: 0,
                    number_of_validations: 0,
                    level: 0,
                    user_name
                };

                await set(child(usersRef, user_id), userData);
                console.log("Usuário inserido com sucesso no Realtime Database.");
            } else {
                console.log("O usuário já existe no Realtime Database.");
            }
        } catch (error) {
            console.error("Erro ao inserir usuário no Realtime Database:", error);
        }

    }

    getUserById = async (user_id: string): Promise<IUser | null> => {
        try {
            const db = getDatabase();
            const usersRef = ref(db, 'users');

            const userRef = child(usersRef, user_id);

            const snapshot = await get(userRef);

            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                console.log("Usuário não encontrado.");
                return null;
            }
        } catch (error) {
            console.error("Erro ao buscar usuário por ID:", error);
            return null;
        }
    }

    getCountValidators = async (): Promise<number> => {
        try {
            const db = getDatabase();
            const usersRef = ref(db, 'users');

            const snapshot = await get(usersRef);

            if (snapshot.exists()) {

                let countValidators = 0

                snapshot.forEach((childSnapshot) => {
                    const userData = childSnapshot.val();
                    if (userData.level === 3 && countValidators <= 5) {
                        countValidators++
                    }
                });
                return countValidators


            } else {
                console.log("Nenhum usuário encontrado");
                return 0
            }
        } catch (error) {
            console.error("Erro ao buscar usuários por nível:", error);
            return 0;
        }
    }

    getTop10UsersByPoints = async () => {
        try {
            Firebase.initializeFirebaseApp()
            const db = getDatabase();
            const usersRef = ref(db, 'users');

            const snapshot = await get(usersRef);

            if (snapshot.exists()) {

                const topUsers: IUser[] = [];

                snapshot.forEach((childSnapshot) => {
                    const userData = childSnapshot.val() as IUser;
                    console.log(userData)
                    if (topUsers.length < 10) {
                        topUsers.push(userData)
                    } else {
                        const smallestPontuation = topUsers.filter(el => el.points <= userData.points).sort((a, b) => a.points - b.points)[0]
                        const indexToRemove = topUsers.findIndex(el => el == smallestPontuation)
                        topUsers.splice(indexToRemove, 1)
                    }
                });

                return topUsers.sort((a, b) => a.points - b.points).reverse()
            } else {
                console.log("Nenhum usuário encontrado");
                return []
            }
        } catch (error) {
            console.error("Erro ao buscar os top 10 usuários por pontos:", error);
            return []
        }
    };

}

const Firebase = new FirebaseConfig()

export default Firebase