"use client";

import { trpc } from "@/lib/trpc.client";
import { SectionHeader } from "./SectionHeader";
import InfiniteScroll from "react-infinite-scroll-component";
import { Clip } from "../api/clips";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenu,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { DownloadIcon, ExpandIcon } from "lucide-react";

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
        "rounded-md overflow-hidden relative",
        clip.width / clip.height > 1 && "col-span-2"
      )}
    >
      <Image
        className="object-cover w-full h-full"
        alt={clip.importedName || "Untitled asset"}
        src={clip.assets.image}
        height={400}
        width={400}
        priority
      />
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20 flex flex-col justify-end p-4 opacity-0 hover:opacity-100">
            <p className="text-primary-foreground font-medium truncate">
              {clip.importedName}
            </p>
            <p className="text-primary-foreground uppercase text-sm truncate">
              {clip.ext} · {Math.round(clip.size / 1_000_000)} MB · {clip.width}{" "}
              x {clip.height}
            </p>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>
            <a className="flex" href={clip.assets.original} target="_blank">
              <ExpandIcon className="mr-2 h-4 w-4" /> Open
            </a>
          </ContextMenuItem>
          <ContextMenuItem>
            <a
              className="flex"
              download={clip.importedName}
              href={clip.assets.original}
              onClick={(e) => {
                e.preventDefault();
                alert("Pretend this was successful.");
              }}
            >
              <DownloadIcon className="mr-2 h-4 w-4" /> Download
            </a>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
}
