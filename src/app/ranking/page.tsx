import Header from "@/components/Header";
import RankingList from "./RankingList";

export default function Ranking() {
    return (
        <main className="px-4">
            <Header />
            <h1 className="text-2xl mt-4">Ranking dos Melhores Jogadores</h1>

            <RankingList />
        </main>
    )
}