"use client";

import { BoardsSection } from "./_components/BoardsSection";
import { AssetsSection } from "./_components/AssetsSection";
import { useState } from "react";

export default function Home() {
  const [selectedIds, setSelectedIds] = useState<Record<string, boolean>>({});

  const handleSelect = (id: string, force?: boolean) => {
    setSelectedIds((prev) => ({ ...prev, [id]: force || !prev[id] }));
  };

  return (
    <main className="py-8 px-12">
      <BoardsSection selectedIds={selectedIds} onSelect={handleSelect} />
      <AssetsSection selectedIds={selectedIds} onSelect={handleSelect} />
    </main>
  );
}
