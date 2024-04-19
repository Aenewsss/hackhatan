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
import userService from "@/storage/user.service";

interface FormProps {
    doc_id: string
}

export default function Form({ doc_id }: FormProps) {

    const router = useRouter()

    const [documentValidation, setDocumentValidation] = useState<IMetadataDocument>({
        title: '', content: '', access_points: '', dates: '',
        social_tags: {
            gender: '', race: '', regionality: '', sexuality: ''
        }
    });

    const [docIcon, setDocIcon] = useState<string>('');
    const [responsibleUserId, setResponsibleUserId] = useState<string>('');
    const [openModalRequestChanges, setOpenModalRequestChanges] = useState(false);

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

                    setDocumentValidation(documentData.metadata!)
                    setResponsibleUserId(documentData.responsible_user!)
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

    async function approveDocument(e: any) {
        e.preventDefault()

        try {
            await Firebase.changeDocStatusToConcluded(doc_id, userService.getUser().id, userService.getUser().name)
            await Firebase.registerValidationSuccess(userService.getUser().id)
            await Firebase.registerDescriptionSuccess(responsibleUserId)
            router.push('/')
        } catch (error) {
            console.error(error)
        }


    }

    async function requestChanges() {
        try {
            await Firebase.changeDocStatusToReject(doc_id, userService.getUser().id, userService.getUser().name, '')
            router.push('/')
        } catch (error) {
            console.error(error)
        }
    }

    async function rejectDocument() {
        try {
            await Firebase.changeDocStatusToReject(doc_id, userService.getUser().id, userService.getUser().name, 'Documento Rejeitado Totalmente')
            router.push('/')
        } catch (error) {
            console.error(error)
        }
    }

    function openModalChanges() {
        setOpenModalRequestChanges(true)
    }

    return (
        <form onSubmit={approveDocument} className="flex flex-col gap-4">
            {/* <ProgressBar documentValidation={documentValidation} /> */}

            <div className="bg-gray-300 flex flex-col gap-4 rounded-md py-4">
                <div className="p-4 bg-gray-400 rounded-full self-start mx-4">
                    <Image src={`/describe/${docIcon}-type.svg`} width={30} height={30} alt="Ícone do documento" />
                </div>

                <div className="flex flex-col gap-5">
                    <div className="flex gap-6 items-center mx-4">
                        <label className="text-blue-800 max-w-16">Título:</label>
                        <input value={documentValidation.title} readOnly onChange={e => setDocumentValidation({ ...documentValidation, title: e.target.value })} className="bg-gray-400 rounded-full px-3 py-2 w-full" type="text" />
                    </div>
                    <div className="flex gap-6 items-center mx-4">
                        <label className="text-blue-800 max-w-16">Datas:</label>
                        <input value={documentValidation.dates} readOnly onChange={e => setDocumentValidation({ ...documentValidation, dates: e.target.value })} className="bg-gray-400 rounded-full px-3 py-2 w-full" type="text" />
                    </div>
                    <div className="flex gap-6 items-center mx-4">
                        <label className="text-blue-800 max-w-16 text-sm">Âmbito e Conteúdo:</label>
                        <textarea value={documentValidation.content} readOnly onChange={e => setDocumentValidation({ ...documentValidation, content: e.target.value })} className="bg-gray-400 rounded-full px-3 py-2 w-full"></textarea>
                    </div>
                    <div className="flex gap-6 items-center mx-4">
                        <label className="text-blue-800 max-w-16 text-sm">Pontos de acesso e indexação de assunto:</label>
                        <input value={documentValidation.access_points} readOnly onChange={e => setDocumentValidation({ ...documentValidation, access_points: e.target.value })} className="bg-gray-400 rounded-full px-3 py-2 w-full" type="text" />
                    </div>

                    <h2 className="bg-blue-800 font-semibold text-white px-4 py-4">Marcadores Sociais</h2>
                    <div className="flex gap-6 items-center mx-4">
                        <label className="text-blue-800 max-w-16">Raça:</label>
                        <input value={documentValidation.social_tags.race} readOnly onChange={e => setDocumentValidation({ ...documentValidation, social_tags: { ...documentValidation.social_tags, race: e.target.value } })} className="bg-gray-400 rounded-full px-3 py-2 w-full" type="text" />
                    </div>
                    <div className="flex gap-6 items-center mx-4">
                        <label className="text-blue-800 max-w-16">Gênero:</label>
                        <input value={documentValidation.social_tags.gender} readOnly onChange={e => setDocumentValidation({ ...documentValidation, social_tags: { ...documentValidation.social_tags, gender: e.target.value } })} className="bg-gray-400 rounded-full px-3 py-2 w-full" type="text" />
                    </div>
                    <div className="flex gap-6 items-center mx-4">
                        <label className="text-blue-800 max-w-16">Sexualidade:</label>
                        <input value={documentValidation.social_tags.sexuality} readOnly onChange={e => setDocumentValidation({ ...documentValidation, social_tags: { ...documentValidation.social_tags, sexuality: e.target.value } })} className="bg-gray-400 rounded-full px-3 py-2 w-full" type="text" />
                    </div>
                    <div className="flex gap-6 items-center mx-4">
                        <label className="text-blue-800 max-w-16">Regionalidade:</label>
                        <input value={documentValidation.social_tags.regionality} readOnly onChange={e => setDocumentValidation({ ...documentValidation, social_tags: { ...documentValidation.social_tags, regionality: e.target.value } })} className="bg-gray-400 rounded-full px-3 py-2 w-full" type="text" />
                    </div>
                </div>
            </div>

            <div className="flex gap-4 justify-between">
                <button onClick={rejectDocument} type="button" className="border-2 p-4 bg-red-500 text-white rounded-full self-center flex gap-2 items-center pr-4 transition-all hover:scale-105 text-xl">
                    Rejeitar
                </button>
                <button onClick={openModalChanges} type="button" className="border-2 p-4 bg-blue-500 text-white rounded-full self-center flex gap-2 items-center pr-4 transition-all hover:scale-105 text-xl">
                    Solicitar Alterações
                </button>
                <button type="submit" className="border-2 p-4 bg-green-500 text-white rounded-full self-center flex gap-2 items-center pr-4 transition-all hover:scale-105 text-xl">
                    Aprovar
                </button>
            </div>

            {
                openModalRequestChanges &&
                <div className="fixed w-screen h-screen bg-gray-500 bg-opacity-50 top-0 z-20 left-0 flex items-center justify-center flex-col gap-8 px-4">
                    <button onClick={_ => setOpenModalRequestChanges(false)} className="bg-gray-100 p-4 rounded-full flex self-start">
                        <Image src="/icons/arrow-back.svg" width={30} height={30} alt="ícone de seta para voltar à home" />
                    </button>
                    <form onSubmit={requestChanges} className="flex flex-col w-full bg-gray-300 p-4 rounded-md gap-4">
                        <textarea required className="p-2" placeholder="Insira aqui as alterações que vc deseja no documento" cols={30} rows={10}></textarea>

                        <button className="bg-blue-500 p-2 rounded-md text-white hover:scale-105 transition-all" type="submit">Enviar mensagem</button>
                    </form>
                </div>
            }
        </form>
    )
}