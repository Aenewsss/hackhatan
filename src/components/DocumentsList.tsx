import { IDocument } from "@/storage/types";
import { get, getDatabase, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function DocumentsList() {

    const [documents, setDocuments] = useState<IDocument[]>([]);

    useEffect(() => {
        getDocuments()
    }, []);

    function getDocuments() {
        // Obtém uma referência para o banco de dados
        const db = getDatabase();

        // Define a referência para o caminho do objeto 'documents'
        const documentsRef = ref(db, 'documents');

        // Realiza a consulta GET para resgatar o objeto 'documents' e todos os objetos dentro dele
        get(documentsRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const documentsData = snapshot.val();
                    console.log(documentsData)
                    setDocuments(documentsData)
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

    return (
        <div className="mt-6 flex flex-col gap-6">
            {
                documents.map((doc, index) => (
                    <div className="flex flex-col gap-4 bg-gray-300 p-4 rounded-md overflow-hidden">
                        <p>Arquivo: {getFileName(doc?.doc_path)}</p>
                        <p>Data de entrega: {doc?.final_date}</p>
                        <p>Urgência: {getUrgency(doc?.urgency)}</p>
                    </div>
                ))
            }
      
        </div>
    )
}