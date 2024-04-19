import Header from "@/components/Header"

export default function ValidateDoc({ params }: { params: { id: string } }) {
    return (
        <main>
            <Header />
            <h1>Validar documento: {params.id}</h1>
        </main>
    )
}