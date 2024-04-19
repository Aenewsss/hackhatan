"use client"

import Profile from "@/components/Profile";
import Filters from "@/components/Filters";
import { Suspense } from "react";

export default function Home() {

  return (
    <main className="mt-10 px-4">
      <Profile />
      <Suspense fallback={<div className="text-black">Carregando</div>} >
        <Filters />
      </Suspense>
    </main>
  );
}
