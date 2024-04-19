
"use client"

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";
import Firebase from "../api/firebase";
import userService from "@/storage/user.service";


export default function SwitchAction() {

    const pathname = usePathname();
    const searchParams = useSearchParams()
    const { replace } = useRouter();

    const [userIsValidator, setUserIsValidator] = useState(false);

    useEffect(() => {
        verifyParams()
        verifyIfUserIsValidator()
    }, [pathname, searchParams]);

    function verifyParams() {
        const params = new URLSearchParams(searchParams);

        if (!params.size) {
            params.set('action', 'description')   
            replace(`${pathname}?${params.toString()}`);
        }
    }

    function getButtonStyle(action: "description" | "validation") {
        const params = new URLSearchParams(searchParams);

        const actionParam = params.get('action')?.toString()

        return actionParam == action ? 'bg-blue-800' : 'bg-gray-400'
    }

    function setAction(action: "description" | "validation") {
        const params = new URLSearchParams(searchParams);

        params.set('action', action);

        replace(`${pathname}?${params.toString()}`);
    }

    async function verifyIfUserIsValidator() {
        const user = await Firebase.getUserById(userService.getUser().id)

        const userLevel = user?.level

        if (userLevel == 3) return setUserIsValidator(true)

        const validators = await Firebase.getCountValidators()

        if (validators < 5) return setUserIsValidator(true)
        return setUserIsValidator(false)
    }

    return (
        <div className="flex gap-6 justify-center">
            <button onClick={_ => setAction("description")} className={`flex items-center text-white gap-3 px-5 py-3 rounded-full ${getButtonStyle("description")}`}>
                <Image src="/icons/pencil.svg" width={26} height={26} alt="Ícone de descrição" />
                Descritor
            </button>
            <button onClick={_ => setAction("validation")} className={`flex items-center text-white gap-3 px-5 py-3 rounded-full ${getButtonStyle("validation")}`}>
                {
                    !userIsValidator &&
                    <Image src="/icons/lock.svg" width={26} height={26} alt="Ícone de bloqueio para quem não é validador" />
                }
                <Image src="/icons/eye.svg" width={26} height={26} alt="Ícone de validação" />
                Validador
            </button>
        </div>
    )
}