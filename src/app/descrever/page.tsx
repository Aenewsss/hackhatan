import Header from "@/components/Header";
import DocumetsToDoList from "./DocumentsToDoList";
import SwitchAction from "./SwitchAction";

export default function Describe() {

    return (
        <main className="px-4 mb-[200px]">
            <Header />
            <SwitchAction />
            <DocumetsToDoList />
        </main>
    )
}