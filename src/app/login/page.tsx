"use client"

import { login } from "@/utils/auth";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Login() {

    const images = [
        { image: 'second-carousel.svg', text: 'Nossos arquivos são registros da nossa história.Faça parte deste processo de preservação cultural ', title: 'Árvore de memórias' },
        { image: 'first-carousel.svg', text: 'Dentro da plataforma existem inúmeros documentos a serem descritos.E sua ajuda é essencial neste processo.', title: 'Árvore de memórias' },
        { image: 'third-carousel.svg', text: 'Você iniciará como uma pessoa descritora, sendo responsável por descrever os tópicos exigidos. Posteriormente poderá se tornar Validadora. Juntas essas funções garantem a qualidade  da descrição dos documentos. ', title: 'Descritores e Validadores' }
    ]
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = currentImageIndex + 1
            if (nextIndex > images.length - 1) setCurrentImageIndex(0)
            else setCurrentImageIndex(nextIndex);
        }, 5000);
        return () => {
            clearInterval(interval)
        }
    }, [currentImageIndex]);

    let startX = 0

    const handleMouseDown = (event: any) => {
        startX = event.pageX;
    };

    const handleMouseUp = (event: any) => {
        const endX = event.pageX;
        const diffX = endX - startX;
        if (Math.abs(diffX) >= 200) {
            if (diffX > 0) {
                setCurrentImageIndex((prevIndex) =>
                    prevIndex === 0 ? images.length - 1 : prevIndex - 1
                );
            } else {
                setCurrentImageIndex((prevIndex) =>
                    prevIndex === images.length - 1 ? 0 : prevIndex + 1
                );
            }
        }
    };

    return (
        <main className="h-screen">
            <Image onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} className="h-[400px] w-full object-cover" src={`/auth/${images[currentImageIndex].image}`} width={300} height={300} alt="Primeira Imagem de fundo" />
            <div className="flex h-1/2 flex-col px-4 gap-2">
                <h1 className="text-2xl font-bold mt-4">{images[currentImageIndex].title}</h1>
                <p>{images[currentImageIndex].text}</p>
                <div className="flex flex-col gap-2 mt-10">
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
                <div className="flex mt-6 gap-4 justify-center">
                    <Image className="cursor-pointer" onClick={_ => setCurrentImageIndex(0)} src={currentImageIndex == 0 ? '/icons/ball-filled.svg' : '/icons/ball.svg'} width={10} height={10} alt="carrossel 1" />
                    <Image className="cursor-pointer" onClick={_ => setCurrentImageIndex(1)} src={currentImageIndex == 1 ? '/icons/ball-filled.svg' : '/icons/ball.svg'} width={10} height={10} alt="carrossel 2" />
                    <Image className="cursor-pointer" onClick={_ => setCurrentImageIndex(2)} src={currentImageIndex == 2 ? '/icons/ball-filled.svg' : '/icons/ball.svg'} width={10} height={10} alt="carrossel 3" />
                </div>
            </div>
        </main>
    )
}