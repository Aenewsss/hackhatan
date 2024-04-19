import Header from "@/components/Header";
import DocumetsToDoList from "./DocumentsToDoList";
import SwitchAction from "./SwitchAction";
import { Suspense } from "react";

export default function Describe() {

    return (
        <main className="px-4 mb-[200px]">
            <Header />
            <Suspense fallback={<div className="text-black">Carregando</div>} >
                <SwitchAction />
                <DocumetsToDoList />
            </Suspense>
        </main>
    )
}