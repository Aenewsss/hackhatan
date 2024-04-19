"use client"

import { DocumentStatusEnum, IDocument } from "@/storage/types";
import { get, getDatabase, ref, set, update } from "firebase/database";
import Image from "next/image";
import { useEffect, useState } from "react";
import Firebase from "../api/firebase";
import Urgency from "@/components/Urgency";
import Link from "next/link";
import { formatDate } from "@/utils/formatDate";
import userService from "@/storage/user.service";
import { getDocIcon } from "@/utils/getDocIcon";
import { getFileName } from "@/utils/getFileName";
import { useSearchParams } from "next/navigation";

export default function DocumetsToDoList() {

    const searchParams = useSearchParams()

    const [documents, setDocuments] = useState<IDocument[]>([]);
    const [showDocument, setShowDocument] = useState(false);
    const [selectedDoc, setSelectedDoc] = useState<{ doc_id: string, final_date: string, urgency: number, doc_type: string }>();

    useEffect(() => {
        getDocuments()
    }, []);

    function getDocuments() {
        Firebase.initializeFirebaseApp()
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
                    }).filter(doc => doc.status == DocumentStatusEnum.TO_DO && !doc?.responsible_user)
                    setDocuments(documentsToDo)
                } else {
                    console.log("O objeto 'documents' não foi encontrado no banco de dados.");
                }
            })
            .catch((error) => {
                console.error("Erro ao resgatar o objeto 'documents':", error);
            });
    }

    function chooseDoc(doc: IDocument) {
        setSelectedDoc({
            doc_id: doc.doc_id, final_date: doc.final_date,
            urgency: doc.urgency, doc_type: getFileName(doc?.doc_path)
        })
        setShowDocument(true)
    }

    async function assignDocToUser(doc_id: string) {
        const database = getDatabase();
        const docRef = ref(database, `documents/${doc_id}`);
        try {
            await update(docRef, {
                responsible_user: userService.getUser().id,
                status: DocumentStatusEnum.IN_PROGRESS,
            });
        } catch (error) {
            console.error("Erro ao atribuir documento ao usuário:", error);
        }
    }

    function getPageByAction() {
        const params = new URLSearchParams(searchParams)

        const actionParam = params.get('action')?.toString()

        return actionParam == 'description'
            ? `/descrever/${selectedDoc?.doc_id}`
            : `/validar/${selectedDoc?.doc_id}`
    }

    function getButtonTextByAction() {
        const params = new URLSearchParams(searchParams)

        const actionParam = params.get('action')?.toString()

        return actionParam == 'description' ? 'Inicar Descrição' : 'Iniciar Validação'
    }

    if (!documents || documents.length == 0) return <p className="text-red-500">Nenhum documento disponível no momento</p>

    return (
        <>
            <div className="mt-6 flex flex-col gap-6">
                {
                    documents.map((doc, index) => (
                        <div onClick={_ => chooseDoc(doc)} key={index}
                            className="flex gap-6 bg-gray-300 p-4 rounded-md overflow-hidden cursor-pointer hover:scale-105 transition-all">
                            <Image src={`/describe/${getDocIcon(getFileName(doc?.doc_path))}-type.svg`} width={76} height={76} alt="Tipo do documento" />
                            <div className="flex flex-col gap-2">
                                <p>Tipo de Arquivo: {getFileName(doc?.doc_path)}</p>
                                <p>Data de entrega: {doc?.final_date}</p>
                                <Urgency urgency={doc?.urgency} />
                            </div>
                        </div>
                    ))
                }
            </div >

            {
                (showDocument && selectedDoc) &&
                <div className="fixed w-screen h-screen bg-gray-500 bg-opacity-50 top-0 z-20 left-0 flex items-center justify-center flex-col gap-8 px-4">
                    <button onClick={_ => setShowDocument(false)} className="bg-gray-100 p-4 rounded-full flex self-start">
                        <Image src="/icons/arrow-back.svg" width={30} height={30} alt="ícone de seta para voltar à home" />
                    </button>
                    <div className="bg-gray-100 p-6 w-full flex flex-col gap-4 items-center h-1/2 rounded-md">
                        <p className="bg-gray-400 text-white self-start flex p-2">Arquivo de {selectedDoc.doc_type}</p>
                        <div className="p-6 rounded-sm bg-gray-400">
                            <Image src={`/describe/${getDocIcon(selectedDoc.doc_type)}-type.svg`} width={200} height={200} alt="Tipo do documento" />
                        </div>
                        {/* <div className="flex flex-col gap-4">
                            Tarefas
                        </div> */}

                        <p className="bg-gray-400 text-white self-end flex p-2 ">Data de entrega: {formatDate(selectedDoc.final_date)}</p>

                        <div className="flex justify-between w-full">
                            <p className="text-blue-500 text-xl">Dificuldade</p>
                            <Urgency urgency={selectedDoc.urgency} />
                        </div>
                    </div>
                    <Link onClick={_ => assignDocToUser(selectedDoc.doc_id)} href={getPageByAction()} className="bg-green-600 text-white p-4 rounded-2xl text-2xl">
                        {getButtonTextByAction()}
                    </Link>

                </div>
            }
        </>
    )
}