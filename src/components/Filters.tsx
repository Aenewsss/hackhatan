import { FiltersEnum } from "@/storage/types";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Profile() {

    const searchParams = useSearchParams()
    const pathname = usePathname();
    const { replace } = useRouter();

    const [textFilter, setTextFilter] = useState('');
    
    function filterText() {
        const params = new URLSearchParams(searchParams);

        params.set('text', textFilter);
        
        replace(`${pathname}?${params.toString()}`);
    }

    function filterStatus(status: FiltersEnum) {
        const params = new URLSearchParams(searchParams);

        if (status) {
            params.set('status', status);
        } else {
            params.delete('status');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="flex flex-col gap-2 mt-10">
            <h2>Pesquisa</h2>
            <div className="relative flex items-center">
                <Image className="absolute left-4" src="/icons/lupa.svg" width={20} height={20} alt="Ícone Lupa para filtrar documentos" />
                <input onChange={e => setTextFilter(e.target.value)} placeholder="Digite sua busca..." className="border rounded-md border-gray-400 w-full py-2 px-10" type="text" />
                <button onClick={filterText} className="absolute right-0 rounded-md p-2 bg-blue-800 text-white hover:scale-105 transition-all">Buscar</button>
            </div>
            <div className="flex gap-4 overflow-auto overflow-y-hidden py-4">
                <button onClick={_ => filterStatus(FiltersEnum.IN_PROGRESS)} className="hover:scale-105 transition-all rounded-full bg-blue-800 text-white px-3 py-2">Em Progresso</button>
                <button onClick={_ => filterStatus(FiltersEnum.IN_ANALYSIS)} className="hover:scale-105 transition-all rounded-full bg-violet-500 text-white px-3 py-2">Em Análise</button>
                <button onClick={_ => filterStatus(FiltersEnum.CONCLUDED)} className="hover:scale-105 transition-all rounded-full bg-green-500 text-white px-3 py-2">Concluídos</button>
                <button onClick={_ => filterStatus(FiltersEnum.TO_CHANGE)} className="hover:scale-105 transition-all rounded-full bg-orange-500 text-white px-3 py-2">Alteração</button>
            </div>
        </div>
    )
}