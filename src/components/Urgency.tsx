import Image from "next/image"

interface UrgencyProps {
    urgency: number
}

export default function Urgency({ urgency }: UrgencyProps) {

    if (urgency == 1) return (
        <div className="flex gap-2">
            <Image src="/icons/urgency-1.svg" width={40} height={40} alt="Ícone de urgência 1" />
        </div>
    )

    if (urgency == 2) return (
        <div className="flex gap-2">
            <Image src="/icons/urgency-2.svg" width={40} height={40} alt="Ícone de urgência 2" />
            <Image src="/icons/urgency-2.svg" width={40} height={40} alt="Ícone de urgência 2" />
        </div>
    )

    return (
        <div className="flex gap-2">
            <Image src="/icons/urgency-3.svg" width={40} height={40} alt="Ícone de urgência 3" />
            <Image src="/icons/urgency-3.svg" width={40} height={40} alt="Ícone de urgência 3" />
            <Image src="/icons/urgency-3.svg" width={40} height={40} alt="Ícone de urgência 3" />
        </div>
    )
}