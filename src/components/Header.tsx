import Image from "next/image";
import Link from "next/link";

export default function Header() {

    return (
        <div className="py-4 flex justify-between">
            <Link href="/" >
                <Image src="/icons/arrow-back.svg" width={30} height={30} alt="ícone de seta para voltar à home" />
            </Link>

            <div className="flex gap-2">
                <Image src="/icons/bell.svg" width={30} height={30} alt="ícone de seta para voltar à home" />
                <Image src="/icons/settings.svg" width={30} height={30} alt="ícone de seta para voltar à home" />
            </div>
        </div>
    )
}