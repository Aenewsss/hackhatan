"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Toolbar() {

    const pathname = usePathname()

    if (pathname.includes('login') || pathname.includes('/descrever/')) return null

    function getIconClass(path: string) {
        return pathname == path ? 'bg-blue-800' : 'bg-gray-300'
    }

    function getImageSelected(path:string){
        return pathname == path ? '' : '-selected'
    }

    return (
        <div className="w-full fixed z-10 bg-white bottom-0 border-t border border-black border-l-0 border-r-0 border-b-0 flex justify-between p-4 rounded-t-3xl">
            <Link href="/ranking" className={`${getIconClass('/ranking')} cursor-pointer rounded-full p-5 flex items-center justify-center`}>
                <Image src={`/icons/trophy${getImageSelected('/ranking')}.svg`} width={36} height={36} alt="Ícone Troféu para o ranking" />
            </Link>
            <Link href="/" className={`${getIconClass('/')} cursor-pointer rounded-full p-5 flex items-center justify-center`}>
                <Image src={`/icons/home${getImageSelected('/')}.svg`} width={36} height={36} alt="Ícone da Home" />
            </Link>
            <Link href="/descrever" className={`${getIconClass('/descrever')} cursor-pointer rounded-full p-5 flex items-center justify-center`}>
                <Image src={`/icons/sword${getImageSelected('/descrever')}.svg`} width={36} height={36} alt="Ícone de Espada para buscar documentos para descrever" />
            </Link>
            <Link href="/treinamento" className={`${getIconClass('/treinamento')} cursor-pointer rounded-full p-5 flex items-center justify-center`}>
                <Image src={`/icons/graduation${getImageSelected('/treinamento')}.svg`} width={36} height={36} alt="Ícone Treinamento" />
            </Link>
        </div>
    )
}