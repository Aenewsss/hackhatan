import { DocumentStatusEnum, IDocument, UserEnum } from "@/storage/types";
import userService from "@/storage/user.service";
import { get, getDatabase, ref } from "firebase/database";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DocumentsList() {

    const [documents, setDocuments] = useState<IDocument[]>([]);

    useEffect(() => {
        getDocuments()
    }, []);

    function getDocuments() {
        const db = getDatabase();
        const documentsRef = ref(db, 'documents');

        get(documentsRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const documentsData = snapshot.val();
                    const documentsToDo = Object.entries(documentsData).map(([key, document]) => {
                        return {
                            // @ts-ignore
                            ...document,
                            doc_id: key
                        }
                    }).filter(doc => doc.responsible_user == userService.getUser().id)
                    setDocuments(documentsToDo)
                } else {
                    console.log("O objeto 'documents' não foi encontrado no banco de dados.");
                }
            })
            .catch((error) => {
                console.error("Erro ao resgatar o objeto 'documents':", error);
            });
    }

    function getUrgency(urgency: number) {
        return urgency == 1
            ? 'Baixa'
            : urgency == 2
                ? 'Média'
                : 'Alta'
    }

    function getFileName(path: string) {
        const pathArr = path.split('/')
        const filenameArr = pathArr[pathArr.length - 1].split('?')
        const filename = filenameArr[0]

        return filename
    }

    if (!documents || documents.length == 0) return <p className="mt-10 text-center text-red-500">
        Você ainda não possui nenhum documento
        <p>
            <Link className="underline text-blue-700" href="/descrever">Clique aqui para começar a descrever</Link>
        </p>
    </p>

    return (
        <div className="mt-6 flex flex-col gap-6">
            {
                documents.map((doc, index) => (
                    <div key={index} className="flex flex-col gap-4 bg-gray-300 p-4 rounded-md overflow-hidden">
                        <p>Arquivo: {getFileName(doc?.doc_path)}</p>
                        <p>Data de entrega: {doc?.final_date}</p>
                        <p>Urgência: {getUrgency(doc?.urgency)}</p>
                    </div>
                ))
            }

        </div>
    )
}