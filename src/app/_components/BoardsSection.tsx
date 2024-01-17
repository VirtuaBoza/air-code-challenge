"use client";

import { trpc } from "@/lib/trpc.client";
import { SectionHeader } from "./SectionHeader";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DownloadIcon, MoreHorizontalIcon } from "lucide-react";
import { Board } from "../api/boards";

export function BoardsSection({
  onSelect,
  selectedIds,
}: {
  selectedIds: Record<string, boolean>;
  onSelect: (id: string, force?: boolean) => void;
}) {
  const { data, isLoading } = trpc.boards.getAll.useQuery();
  return (
    <div className="pb-8">
      <SectionHeader label={`Boards${!data ? "" : ` (${data.total})`}`} />
      <div className="flex gap-6 flex-wrap">
        {isLoading
          ? Array(3)
              .fill(0)
              .map((e, i) => (
                <Skeleton key={i} className="h-48 w-48 rounded-md shrink-0" />
              ))
          : (data?.data || []).map((board) => {
              return (
                <BoardThumbnail
                  key={board.id}
                  board={board}
                  onSelect={onSelect}
                  selectedIds={selectedIds}
                />
              );
            })}
      </div>
    </div>
  );
}

function BoardThumbnail({
  board,
  onSelect,
  selectedIds,
}: {
  board: Board;
  selectedIds: Record<string, boolean>;
  onSelect: (id: string, force?: boolean) => void;
}) {
  const thumbnail = board.thumbnails?.[0];
  const selectedItemId = Object.entries(selectedIds)
    .filter(([k, v]) => v)
    .map(([k]) => k);

  return (
    <div
      key={board.id}
      className="h-48 w-48 rounded-md overflow-hidden relative shrink-0"
    >
      {thumbnail && (
        <Image
          className="object-cover w-full h-full"
          alt={board.title}
          src={thumbnail}
          height={400}
          width={400}
          priority
        />
      )}
      <ContextMenu onOpenChange={() => {}}>
        <ContextMenuTrigger>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20 flex flex-col justify-between p-4 opacity-0 hover:opacity-100">
            <div className="flex justify-end">
              <DropdownMenu>
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
                      href={"#"}
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
            <p className="text-primary-foreground font-semibold text-lg">
              {board.title}
            </p>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-56">
          <ContextMenuLabel>
            {selectedItemId.length} Item
            {selectedItemId.length === 1 ? "" : "s"} Selected
          </ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuItem>
            <a
              className="flex"
              href={"#"}
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
