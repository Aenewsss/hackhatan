"use client"

import { useEffect, useState } from "react";
import Firebase from "../api/firebase";
import userService from "@/storage/user.service";

export default function CurrentUser() {

    const [currentUser, setCurrentUser] = useState<any>({ points: 0, level: 0, name: '' })

    useEffect(() => {
        getCurrentUser()
    }, []);

    async function getCurrentUser() {
        const user = await Firebase.getUserById(userService.getUser().id)
        setCurrentUser(user)
    }

    return (
        <div className="flex gap-4 p-4 text-white absolute bg-gray-700 rounded-md mt-10">
            <span className="flex gap-2 font-bold">
                <span className="font-medium">Nome:</span>
                {currentUser.name}
            </span>
            <span className="flex gap-2 font-bold">
                <span className="font-medium">Seu Nível:</span>
                {currentUser.level}
            </span>
            <span className="flex gap-2 font-bold">
                <span className="font-medium">Sua Pontuação:</span>
                {currentUser.points}
            </span>
        </div>
    )
}