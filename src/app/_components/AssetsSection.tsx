"use client";

import { trpc } from "@/lib/trpc.client";
import { SectionHeader } from "./SectionHeader";
import InfiniteScroll from "react-infinite-scroll-component";
import { Clip } from "../api/clips";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function AssetsSection() {
  const { data, hasNextPage, fetchNextPage } =
    trpc.assets.getAll.useInfiniteQuery(
      {},
      {
        getNextPageParam: (p) => p.pagination.cursor,
        initialCursor: null,
      }
    );

  const assets = data?.pages.flatMap((page) => page.data.clips) || [];

  return (
    <div>
      <SectionHeader
        label={`Assets${data ? ` (${data.pages[0].data.total})` : ""}`}
      />
      <InfiniteScroll
        dataLength={assets.length}
        hasMore={hasNextPage}
        loader={"..."}
        next={() => fetchNextPage()}
        className="grid grid-cols-6 gap-6"
      >
        {assets.map((clip) => (
          <Thumbnail key={clip.assetId} clip={clip} />
        ))}
      </InfiniteScroll>
    </div>
  );
}

function Thumbnail({ clip }: { clip: Clip }) {
  return (
    <div
      className={cn(
        "rounded-md overflow-hidden",
        clip.width / clip.height > 1 && "col-span-2"
      )}
    >
      <Image
        className="object-cover w-full h-full"
        alt={clip.title || "asset"}
        src={clip.assets.image}
        height={400}
        width={400}
      />
    </div>
  );
}
