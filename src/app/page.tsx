"use client"

import Profile from "@/components/Profile";
import Filters from "@/components/Filters";
import { Suspense } from "react";
import DocumentsList from "@/components/DocumentsList";

export default function Home() {

  return (
    <main className="mt-10 px-4 mb-[200px]">
      <Profile />
      <Suspense fallback={<div className="text-black">Carregando</div>} >
        <Filters />
      </Suspense>
      <DocumentsList />
    </main>
  );
}
