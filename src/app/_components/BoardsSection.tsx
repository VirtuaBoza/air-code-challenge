"use client";

import { trpc } from "@/lib/trpc.client";
import { SectionHeader } from "./SectionHeader";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export function BoardsSection() {
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
              const thumbnail = board.thumbnails?.[0];
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20 flex flex-col justify-end p-4">
                    <p className="text-primary-foreground font-semibold text-lg">
                      {board.title}
                    </p>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}
