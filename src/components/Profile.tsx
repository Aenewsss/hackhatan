import userService from "@/storage/user.service";
import { logout } from "@/utils/auth";
import Image from "next/image";

export default function Filters() {

    const { email, level, name } = userService.getUser()

    function getLevel() {
        
    }

    return (
        <div className="flex gap-4">
            <button onClick={logout} className="text-blue-600 underline absolute top-4 right-4">Sair</button>
            <div className="bg-gray-300 p-3 rounded-full">
                <Image src="/icons/person.svg" width={50} height={50} alt="Imagem de Perfil" />
            </div>

            <div>
                <ul>
                    <li>{name}</li>
                    <li>{email}</li>
                    <li className="flex gap-2">
                        <Image src={level >= 1 ? '/icons/star-filled.svg' : '/icons/star.svg'} width={30} height={30} alt="Estrela Nível 1" />
                        <Image src={level >= 2 ? '/icons/star-filled.svg' : '/icons/star.svg'} width={30} height={30} alt="Estrela Nível 2" />
                        <Image src={level >= 3 ? '/icons/star-filled.svg' : '/icons/star.svg'} width={30} height={30} alt="Estrela Nível 3" />
                    </li>
                </ul>
            </div>
        </div>
    )
}