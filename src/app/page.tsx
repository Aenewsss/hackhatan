"use client"

import Profile from "@/components/Profile";
import Filters from "@/components/Filters";

export default function Home() {

  return (
    <main className="mt-10 px-4">
      <Profile />
      <Filters />
    </main>
  );
}
