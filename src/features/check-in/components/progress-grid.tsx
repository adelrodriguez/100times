"use client"

import { cn } from "~/shared/utils/cn"

export default function ProgressGrid({
  progress,
  onPress,
  highlightNext = false,
}: {
  progress: number
  onPress?: (index: number) => void
  highlightNext?: boolean
}) {
  return (
    <div className="grid grid-cols-10 gap-2 w-full h-full">
      {Array.from({ length: 100 }).map((_, idx) => (
        <GridCell
          // biome-ignore lint/suspicious/noArrayIndexKey: we don't really need a unique key here
          key={idx}
          index={idx}
          isCompleted={idx <= progress - 1}
          isNext={idx === progress && highlightNext}
          onPress={() => onPress?.(idx)}
        />
      ))}
    </div>
  )
}

function GridCell({
  index,
  isCompleted,
  isNext,
  onPress,
}: {
  index: number
  isCompleted: boolean
  isNext: boolean
  onPress?: () => void
}) {
  return (
    <button
      className={cn(
        "aspect-square flex-1 items-center justify-center flex",
        (isNext || isCompleted) && "cursor-pointer",
      )}
      type="button"
      disabled={!isCompleted}
      onClick={onPress}
    >
      <div
        className={cn(
          "border border-primary rounded-md lg:rounded-lg size-full font-bold text-xs flex items-center justify-center",
          isCompleted || isNext ? "bg-primary text-primary-foreground" : "bg-white text-muted-foreground",
          isNext && "animate-pulse",
        )}
      >
        {index + 1}
      </div>
    </button>
  )
}
