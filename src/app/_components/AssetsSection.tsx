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
  ContextMenuLabel,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";
import { DownloadIcon, ExpandIcon, MoreHorizontalIcon } from "lucide-react";
import useResizeObserver from "use-resize-observer";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

export function AssetsSection({
  selectedIds,
  onSelect,
}: {
  selectedIds: Record<string, boolean>;
  onSelect: (id: string, force?: boolean) => void;
}) {
  const { data, hasNextPage, fetchNextPage, isFetchedAfterMount } =
    trpc.assets.getAll.useInfiniteQuery(
      {},
      {
        getNextPageParam: (p) => p.pagination.cursor,
        initialCursor: null,
      }
    );

  const didInitLoad = useRef(false);
  useEffect(() => {
    if (isFetchedAfterMount && hasNextPage && !didInitLoad.current) {
      fetchNextPage();
      didInitLoad.current = true;
    }
  }, [isFetchedAfterMount, hasNextPage, fetchNextPage]);

  const assets = data?.pages.flatMap((page) => page.data.clips) || [];
  const { ref, width = 0 } = useResizeObserver();

  return (
    <div ref={ref}>
      <SectionHeader
        label={`Assets${data ? ` (${data.pages[0].data.total})` : ""}`}
      />
      <InfiniteScroll
        dataLength={assets.length}
        hasMore={hasNextPage}
        loader={"..."}
        next={() => fetchNextPage()}
        className={cn(
          "grid grid-cols-6 gap-6",
          width > 1200
            ? "grid-cols-9"
            : width > 800
            ? "grid-cols-6"
            : "grid-cols-3"
        )}
      >
        {assets.map((clip) => (
          <Thumbnail
            key={clip.assetId}
            clip={clip}
            selectedIds={selectedIds}
            onSelect={onSelect}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}

function Thumbnail({
  clip,
  selectedIds,
  onSelect,
}: {
  clip: Clip;
  selectedIds: Record<string, boolean>;
  onSelect: (id: string, force?: boolean) => void;
}) {
  const selectedItemId = Object.entries(selectedIds)
    .filter(([k, v]) => v)
    .map(([k]) => k);
  return (
    <div
      className={cn(
        "rounded-md overflow-hidden relative p-2",
        clip.width / clip.height > 1 && "col-span-2",
        selectedIds[clip.assetId] && "bg-blue-100"
      )}
      onClick={() => {
        onSelect(clip.assetId);
      }}
    >
      <Image
        className="object-cover w-full h-full"
        alt={clip.importedName || "Unnamed asset"}
        src={clip.assets.image}
        height={400}
        width={400}
        priority
      />
      <ContextMenu
        onOpenChange={() => {
          onSelect(clip.assetId);
        }}
      >
        <ContextMenuTrigger>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20 flex flex-col justify-between p-4 opacity-0 hover:opacity-100">
            <div className="flex justify-end">
              <DropdownMenu
                onOpenChange={() => {
                  onSelect(clip.assetId);
                }}
              >
                <DropdownMenuTrigger asChild>
                  <Button size={"icon"}>
                    <MoreHorizontalIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>
                    {selectedItemId.length} Item
                    {selectedItemId.length === 1 ? "" : "s"} Selected
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <a
                      className="flex"
                      href={clip.assets.original}
                      target="_blank"
                    >
                      <ExpandIcon className="mr-2 h-4 w-4" /> Open
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
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
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div>
              <p className="text-primary-foreground font-medium truncate">
                {clip.importedName}
              </p>
              <p className="text-primary-foreground uppercase text-sm truncate">
                {clip.ext} · {Math.round(clip.size / 1_000_000)} MB ·{" "}
                {clip.width} x {clip.height}
              </p>
            </div>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-56">
          <ContextMenuLabel>
            {selectedItemId.length} Item
            {selectedItemId.length === 1 ? "" : "s"} Selected
          </ContextMenuLabel>
          <ContextMenuSeparator />
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
