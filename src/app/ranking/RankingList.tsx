"use client"

import { IUser } from "@/storage/types";
import { useEffect, useState } from "react";
import Firebase from "../api/firebase";

export default function RankingList() {

    const [topUsers, setTopUsers] = useState<IUser[]>([]);

    useEffect(() => {
        getTopUsers()
    }, []);

    async function getTopUsers() {
        setTopUsers(await Firebase.getTop10UsersByPoints())
    }

    return (


        <div className="relative overflow-x-auto mt-6">
            <table className="w-full text-sm text-left rtl:text-right">
                <thead className="text-xs text-white uppercase bg-gray-500 ">
                    <tr>
                        <th scope="col" className="px-6 py-3"></th>
                        <th scope="col" className="px-6 py-3">Usuário</th>
                        <th scope="col" className="px-6 py-3">Nível</th>
                        <th scope="col" className="px-6 py-3">Pontuação</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        topUsers.map((topUser, index) => (
                            <tr className="bg-gray-200 border-b border-gray-700 text-lg">
                                <td className="px-6 py-4 whitespace-nowrap text-green-600">
                                    {index + 1}
                                </td>
                                <td className="px-6 py-4">Nome</td>
                                <td className="px-6 py-4">{topUser.level}</td>
                                <td className="px-6 py-4 text-3xl">{topUser.points} xp</td>
                            </tr>
                        ))
                    }

                </tbody>
            </table >
        </div >
    )
}