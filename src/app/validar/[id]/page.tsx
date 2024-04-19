import Header from "@/components/Header"
import Form from "./Form"

export default function ValidateDoc({ params }: { params: { id: string } }) {
    return (
        <div className="p-4">
            <Header />
            <Form doc_id={params.id} />
        </div>
    )
}