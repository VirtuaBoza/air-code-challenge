import { BoardsSection } from "./_components/BoardsSection";
import { AssetsSection } from "./_components/AssetsSection";

export default function Home() {
  return (
    <main className="py-8 px-12 overflow-y-auto">
      <BoardsSection />
      <AssetsSection />
    </main>
  );
}
