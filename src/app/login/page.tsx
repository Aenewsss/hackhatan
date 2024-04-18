"use client"

import { login } from "@/utils/auth";
import Image from "next/image";

export default function Login() {
    return (
        <main className="h-screen">
            <Image className="h-1/2 w-full object-cover" src="/auth/first-carousel.svg" width={300} height={300} alt="Primeira Imagem de fundo" />
            <div className="flex h-1/2 flex-col px-4 gap-10">
                <h1 className="text-2xl font-bold">Arquivo Nacional</h1>
                <div className="flex flex-col gap-2">
                    <button disabled={true} className="pointer-events-none text-white bg-gray-500 border rounded-xl px-3 py-2 flex justify-center items-center gap-2 font-medium hover:scale-105 transition-all hover:bg-white hover:text-grabg-gray-500 hover:border-grabg-gray-500">
                        Entrar com gov.br
                    </button>
                    <button className="text-blue-800 border-blue-800 border rounded-xl px-3 py-2 
                        flex justify-center items-center gap-2 font-medium hover:scale-105
                        transition-all hover:bg-blue-800 hover:text-white"
                        onClick={login}>
                        <Image src="/icons/google.svg" width={20} height={20} alt="Ícone do google" />
                        Continuar com Google
                    </button>
                </div>
            </div>
        </main>
    )
}