"use client";

import { BoardsSection } from "./_components/BoardsSection";
import { AssetsSection } from "./_components/AssetsSection";
import { useRef } from "react";

export default function Home() {
  const scrollContainer = useRef<HTMLElement>(null);
  return (
    <main ref={scrollContainer} className="py-8 px-12 overflow-y-auto">
      <BoardsSection />
      <AssetsSection />
    </main>
  );
}
