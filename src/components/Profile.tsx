import Firebase from "@/app/api/firebase";
import userService from "@/storage/user.service";
import { logout } from "@/utils/auth";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Filters() {

    const [CurrentUser, setCurrentUser] = useState<any>();

    useEffect(() => {
        getCurrentUser()
    }, []);

    async function getCurrentUser() {
        const user = await Firebase.getUserById(userService.getUser().id)

        const email = userService.getUser().email
        
        setCurrentUser({...user, email})
    }

    if(!CurrentUser) return <p>Usuário não cadastrado</p>

    return (
        <div className="flex gap-4">
            <button onClick={logout} className="text-blue-600 underline absolute top-4 right-4">Sair</button>
            <div className="bg-gray-300 p-3 rounded-full">
                <Image src="/icons/person.svg" width={50} height={50} alt="Imagem de Perfil" />
            </div>

            <div>
                <ul>
                    <li>{CurrentUser.name}</li>
                    <li>{CurrentUser.email}</li>
                    <li className="flex gap-2">
                        <Image src={CurrentUser.level >= 1 ? '/icons/star-filled.svg' : '/icons/star.svg'} width={30} height={30} alt="Estrela Nível 1" />
                        <Image src={CurrentUser.level >= 2 ? '/icons/star-filled.svg' : '/icons/star.svg'} width={30} height={30} alt="Estrela Nível 2" />
                        <Image src={CurrentUser.level >= 3 ? '/icons/star-filled.svg' : '/icons/star.svg'} width={30} height={30} alt="Estrela Nível 3" />
                    </li>
                </ul>
            </div>
        </div>
    )
}