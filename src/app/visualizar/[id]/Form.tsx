"use client"

import { DocumentStatusEnum, IDocument, IMetadataDocument } from "@/storage/types";
import Image from "next/image"
import { useEffect, useState } from "react";
import { get, getDatabase, ref, update } from "firebase/database";
import Firebase from "@/app/api/firebase";
import { getDocIcon } from "@/utils/getDocIcon";
import { getFileName } from "@/utils/getFileName";

interface FormProps {
    doc_id: string
}

export default function Form({ doc_id }: FormProps) {

    const [documentDescription, setDocumentDescription] = useState<IMetadataDocument>({
        title: '', content: '', access_points: '', dates: '',
        social_tags: {
            gender: '', race: '', regionality: '', sexuality: ''
        }
    });

    const [docIcon, setDocIcon] = useState<string>('');
    const [docStatus, setDocStatus] = useState<DocumentStatusEnum>(DocumentStatusEnum.IN_PROGRESS);
    const [docMessage, setDocMessage] = useState('');

    useEffect(() => {
        getDocument()
    }, [doc_id]);

    async function getDocument() {
        Firebase.initializeFirebaseApp()
        const db = getDatabase();
        const documentRef = ref(db, `documents/${doc_id}`);

        get(documentRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const documentData = snapshot.val() as IDocument;

                    setDocStatus(documentData.status)
                    setDocMessage(documentData.responsible_validator?.message || '')

                    if (documentData?.metadata) setDocumentDescription(documentData?.metadata)


                    const icon = getDocIcon(getFileName(documentData.doc_path))
                    setDocIcon(icon)
                } else {
                    console.log("O objeto 'documents' não foi encontrado no banco de dados.");
                }
            })
            .catch((error) => {
                console.error("Erro ao resgatar o objeto 'documents':", error);
            });
    }

    function renderStatus() {
        switch (docStatus) {
            case DocumentStatusEnum.CONCLUDED: return (
                <div className="bg-green-500 p-2 text-white rounded-md">Concluído</div>
            )
            case DocumentStatusEnum.IN_ANALYSIS: return (
                <div className="bg-orange-500 p-2 text-white rounded-md">Em análise</div>
            )
            case DocumentStatusEnum.TO_CHANGE: return (
                <>
                    <div className="bg-orange-500 p-2 text-white rounded-md">
                        Em Alteração
                    </div>
                    <span className="text-xs">*Se você não consegue editar o documento, significa que você é o validador desse arquivo</span>
                </>
            )
        }
        return <div></div>
    }

    return (
        <form className="flex flex-col gap-4">

            {renderStatus()}

            {docMessage && <p>Mensagem do validador: <span className="text-red-500">{docMessage}</span></p>}

            <div className="bg-gray-300 flex flex-col gap-4 rounded-md p-4">
                <div className="p-4 bg-gray-400 rounded-full self-start">
                    <Image src={`/describe/${docIcon}-type.svg`} width={30} height={30} alt="Ícone do documento" />
                </div>

                <div className="flex flex-col gap-5">
                    <div className="flex gap-6 items-center">
                        <label className="text-blue-800 max-w-16">Título:</label>
                        <input value={documentDescription.title} required readOnly onChange={e => setDocumentDescription({ ...documentDescription, title: e.target.value })} className="bg-gray-400 rounded-full px-3 py-2 w-full" type="text" />
                    </div>
                    <div className="flex gap-6 items-center">
                        <label className="text-blue-800 max-w-16">Datas:</label>
                        <input value={documentDescription.dates} required readOnly onChange={e => setDocumentDescription({ ...documentDescription, dates: e.target.value })} className="bg-gray-400 rounded-full px-3 py-2 w-full" type="text" />
                    </div>
                    <div className="flex gap-6 items-center">
                        <label className="text-blue-800 max-w-16 text-sm">Âmbito e Conteúdo:</label>
                        <textarea value={documentDescription.content} required readOnly onChange={e => setDocumentDescription({ ...documentDescription, content: e.target.value })} className="bg-gray-400 rounded-full px-3 py-2 w-full"></textarea>
                    </div>
                    <div className="flex gap-6 items-center">
                        <label className="text-blue-800 max-w-16 text-sm">Pontos de acesso e indexação de assunto:</label>
                        <input value={documentDescription.access_points} required readOnly onChange={e => setDocumentDescription({ ...documentDescription, access_points: e.target.value })} className="bg-gray-400 rounded-full px-3 py-2 w-full" type="text" />
                    </div>

                    <h2 className="text-blue-800 mt-4 font-semibold">Marcadores Sociais</h2>
                    <div className="flex gap-6 items-center">
                        <label className="text-blue-800 max-w-16">Raça:</label>
                        <input value={documentDescription.social_tags.race} required readOnly onChange={e => setDocumentDescription({ ...documentDescription, social_tags: { ...documentDescription.social_tags, race: e.target.value } })} className="bg-gray-400 rounded-full px-3 py-2 w-full" type="text" />
                    </div>
                    <div className="flex gap-6 items-center">
                        <label className="text-blue-800 max-w-16">Gênero:</label>
                        <input value={documentDescription.social_tags.gender} required readOnly onChange={e => setDocumentDescription({ ...documentDescription, social_tags: { ...documentDescription.social_tags, gender: e.target.value } })} className="bg-gray-400 rounded-full px-3 py-2 w-full" type="text" />
                    </div>
                    <div className="flex gap-6 items-center">
                        <label className="text-blue-800 max-w-16">Sexualidade:</label>
                        <input value={documentDescription.social_tags.sexuality} required readOnly onChange={e => setDocumentDescription({ ...documentDescription, social_tags: { ...documentDescription.social_tags, sexuality: e.target.value } })} className="bg-gray-400 rounded-full px-3 py-2 w-full" type="text" />
                    </div>
                    <div className="flex gap-6 items-center">
                        <label className="text-blue-800 max-w-16">Regionalidade:</label>
                        <input value={documentDescription.social_tags.regionality} required readOnly onChange={e => setDocumentDescription({ ...documentDescription, social_tags: { ...documentDescription.social_tags, regionality: e.target.value } })} className="bg-gray-400 rounded-full px-3 py-2 w-full" type="text" />
                    </div>
                </div>
            </div>
        </form>
    )
}