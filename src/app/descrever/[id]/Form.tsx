"use client"

import { DocumentStatusEnum, IDocument, IMetadataDocument } from "@/storage/types";
import Image from "next/image"
import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import { get, getDatabase, ref, update } from "firebase/database";
import Firebase from "@/app/api/firebase";
import { getDocIcon } from "@/utils/getDocIcon";
import { getFileName } from "@/utils/getFileName";
import { useRouter } from "next/navigation";

interface FormProps {
    doc_id: string
}

export default function Form({ doc_id }: FormProps) {

    const router = useRouter()

    const [documentDescription, setDocumentDescription] = useState<IMetadataDocument>({
        title: '', content: '', access_points: '', dates: '',
        social_tags: {
            gender: '', race: '', regionality: '', sexuality: ''
        }
    });

    const [docIcon, setDocIcon] = useState<string>('');

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

                    console.log(documentData)
                    const icon = getDocIcon(getFileName(documentData.doc_path))
                    console.log('icon', icon)
                    setDocIcon(icon)
                } else {
                    console.log("O objeto 'documents' não foi encontrado no banco de dados.");
                }
            })
            .catch((error) => {
                console.error("Erro ao resgatar o objeto 'documents':", error);
            });
    }

    async function sendToAnalysis(e: any) {
        e.preventDefault()

        const database = getDatabase();
        const docRef = ref(database, `documents/${doc_id}`);
        try {
            await update(docRef, {
                status: DocumentStatusEnum.IN_ANALYSIS,
                metadata: documentDescription
            });

            router.push('/')
        } catch (error) {
            console.error("Erro ao atribuir documento ao usuário:", error);
        }
    }

    async function removeDocument(){
        await Firebase.changeDocStatusInProgress(doc_id)

        router.push('/')
    }

    return (
        <form onSubmit={sendToAnalysis} className="flex flex-col gap-4">
            <ProgressBar documentDescription={documentDescription} />

            <div className="bg-gray-300 flex flex-col gap-4 rounded-md p-4">
                <div className="p-4 bg-gray-400 rounded-full self-start">
                    <Image src={`/describe/${docIcon}-type.svg`} width={30} height={30} alt="Ícone do documento" />
                </div>

                <div className="flex flex-col gap-5">
                    <div className="flex gap-6 items-center">
                        <label className="text-blue-800 max-w-16">Título:</label>
                        <input required onChange={e => setDocumentDescription({ ...documentDescription, title: e.target.value })} className="bg-gray-400 rounded-full px-3 py-2 w-full" type="text" />
                    </div>
                    <div className="flex gap-6 items-center">
                        <label className="text-blue-800 max-w-16">Datas:</label>
                        <input required onChange={e => setDocumentDescription({ ...documentDescription, dates: e.target.value })} className="bg-gray-400 rounded-full px-3 py-2 w-full" type="text" />
                    </div>
                    <div className="flex gap-6 items-center">
                        <label className="text-blue-800 max-w-16 text-sm">Âmbito e Conteúdo:</label>
                        <textarea required onChange={e => setDocumentDescription({ ...documentDescription, content: e.target.value })} className="bg-gray-400 rounded-full px-3 py-2 w-full"></textarea>
                    </div>
                    <div className="flex gap-6 items-center">
                        <label className="text-blue-800 max-w-16 text-sm">Pontos de acesso e indexação de assunto:</label>
                        <input required onChange={e => setDocumentDescription({ ...documentDescription, access_points: e.target.value })} className="bg-gray-400 rounded-full px-3 py-2 w-full" type="text" />
                    </div>

                    <h2 className="text-blue-800 mt-4 font-semibold">Marcadores Sociais</h2>
                    <div className="flex gap-6 items-center">
                        <label className="text-blue-800 max-w-16">Raça:</label>
                        <input required onChange={e => setDocumentDescription({ ...documentDescription, social_tags: { ...documentDescription.social_tags, race: e.target.value } })} className="bg-gray-400 rounded-full px-3 py-2 w-full" type="text" />
                    </div>
                    <div className="flex gap-6 items-center">
                        <label className="text-blue-800 max-w-16">Gênero:</label>
                        <input required onChange={e => setDocumentDescription({ ...documentDescription, social_tags: { ...documentDescription.social_tags, gender: e.target.value } })} className="bg-gray-400 rounded-full px-3 py-2 w-full" type="text" />
                    </div>
                    <div className="flex gap-6 items-center">
                        <label className="text-blue-800 max-w-16">Sexualidade:</label>
                        <input required onChange={e => setDocumentDescription({ ...documentDescription, social_tags: { ...documentDescription.social_tags, sexuality: e.target.value } })} className="bg-gray-400 rounded-full px-3 py-2 w-full" type="text" />
                    </div>
                    <div className="flex gap-6 items-center">
                        <label className="text-blue-800 max-w-16">Regionalidade:</label>
                        <input required onChange={e => setDocumentDescription({ ...documentDescription, social_tags: { ...documentDescription.social_tags, regionality: e.target.value } })} className="bg-gray-400 rounded-full px-3 py-2 w-full" type="text" />
                    </div>
                </div>
            </div>

            <div className="flex gap-4 justify-between">
                <button onClick={removeDocument} type="button" className="border-2 p-4 bg-red-500 text-white rounded-full self-center flex gap-2 items-center pr-4 transition-all hover:scale-105">
                    Remover documento
                </button>

                <button type="submit" className="border-2 border-black rounded-full self-center flex gap-2 items-center pr-4 transition-all hover:scale-105">
                    <div className="bg-green-500 p-4 rounded-full">
                        <Image src="/icons/arrow-right.svg" width={20} height={20} alt="Ícone de seta para ir para a análise" />
                    </div>
                    Enviar para análise
                </button>
            </div>
        </form>
    )
}