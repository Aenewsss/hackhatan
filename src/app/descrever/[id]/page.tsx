import Header from "@/components/Header"

export default function DescribeDoc({ params }: { params: { id: string } }) {
    return (
        <div className="p-4">
            <Header />
            <h1>Descrever documento {params.id}</h1>
        </div>
    )
}