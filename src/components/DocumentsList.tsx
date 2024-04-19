import { DocumentStatusEnum, IDocument, UserEnum } from "@/storage/types";
import userService from "@/storage/user.service";
import { get, getDatabase, ref } from "firebase/database";
import Link from "next/link";
import { useEffect, useState } from "react";
import Urgency from "./Urgency";
import Image from "next/image";
import { getDocIcon } from "@/utils/getDocIcon";
import { useSearchParams } from "next/navigation";

export default function DocumentsList() {

    const searchParams = useSearchParams()

    const [documents, setDocuments] = useState<IDocument[]>([]);

    useEffect(() => {
        getDocuments()
    }, [searchParams]);

    function getStatusFilter() {
        const params = new URLSearchParams(searchParams);
        return params.get('status')?.toString() || '';
    }

    function getTextFilter() {
        const params = new URLSearchParams(searchParams);
        return params.get('text')?.toString() || '';
    }

    function getFiltersToSetDocuments(documentsToDo: any) {

        const statusFilter = getStatusFilter()
        const textFilter = getTextFilter()

        if (!statusFilter && !textFilter) setDocuments(documentsToDo.filter((doc: any) => (doc.responsible_user == userService.getUser().id || doc.responsible_validator?.id == userService.getUser().id)))
        else if (statusFilter && textFilter) setDocuments(documentsToDo.filter((doc: any) => (doc.responsible_user == userService.getUser().id || doc.responsible_validator?.id == userService.getUser().id) && doc.status == statusFilter && doc.doc_path.toLowerCase().includes(textFilter.toLocaleLowerCase())))
        else if (statusFilter && !textFilter) setDocuments(documentsToDo.filter((doc: any) => (doc.responsible_user == userService.getUser().id || doc.responsible_validator?.id == userService.getUser().id) && doc.status == statusFilter))
        else setDocuments(documentsToDo.filter((doc: any) => (doc.responsible_user == userService.getUser().id || doc.responsible_validator?.id == userService.getUser().id) && doc.doc_path.toLowerCase().includes(textFilter.toLocaleLowerCase())))

    }

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
                    })

                    getFiltersToSetDocuments(documentsToDo)
                } else {
                    console.log("O objeto 'documents' não foi encontrado no banco de dados.");
                }
            })
            .catch((error) => {
                console.error("Erro ao resgatar o objeto 'documents':", error);
            });
    }

    function getFileName(path: string) {
        const pathArr = path.split('/')
        const filenameArr = pathArr[pathArr.length - 1].split('?')
        const filename = filenameArr[0]

        return filename
    }

    function setDocStatusBorder(status: DocumentStatusEnum) {
        switch (status) {
            case DocumentStatusEnum.IN_PROGRESS: return 'border-blue-800'
            case DocumentStatusEnum.CONCLUDED: return 'border-green-500'
            case DocumentStatusEnum.TO_CHANGE: return 'border-orange-500'
            case DocumentStatusEnum.IN_ANALYSIS: return 'border-violet-500'
        }
    }

    function checkActionToDoc(doc_id: string, status: DocumentStatusEnum) {
        const document = documents.find(doc => doc.doc_id == doc_id)
        if (status == DocumentStatusEnum.IN_PROGRESS || (status === DocumentStatusEnum.TO_CHANGE && document?.responsible_validator?.id != userService.getUser().id)) return `/descrever/${doc_id}`
        return '/'
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
                    <Link href={checkActionToDoc(doc.doc_id, doc.status)} key={index} className={`border-4 flex gap-6 bg-gray-300 p-4 rounded-md overflow-hidden ${setDocStatusBorder(doc.status)}`}>
                        <Image src={`/describe/${getDocIcon(getFileName(doc?.doc_path))}-type.svg`} width={76} height={76} alt="Tipo do documento" />

                        <div className="flex flex-col gap-2">
                            <p>Arquivo: {getFileName(doc?.doc_path)}</p>
                            <p>Data de entrega: {doc?.final_date}</p>
                            <Urgency urgency={doc?.urgency} />
                        </div>
                    </Link>
                ))
            }

        </div>
    )
}