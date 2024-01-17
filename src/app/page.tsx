"use client";

import { trpc } from "@/lib/trpc.client";

export default function Home() {
  return (
    <main>
      <BoardsSection />
      <AssetsSection />
    </main>
  );
}

function SectionHeader({ label }: { label: string }) {
  return (
    <h2 className="font-semibold leading-none tracking-tight uppercase">
      {label}
    </h2>
  );
}

function BoardsSection() {
  const { data } = trpc.boards.getAll.useQuery();
  return (
    <div>
      <SectionHeader label={`Boards${!data ? "" : ` (${data.total})`}`} />
      {/* <pre>{JSON.stringify(data, undefined, 2)}</pre> */}
    </div>
  );
}

function AssetsSection() {
  const { data } = trpc.assets.getAll.useQuery({
    cursor: null,
  });
  console.log(data?.data.clips.length);
  return (
    <div>
      <SectionHeader label={`Assets${data ? ` (${data.data.total})` : ""}`} />
      <pre>{JSON.stringify(data, undefined, 2)}</pre>
    </div>
  );
}
