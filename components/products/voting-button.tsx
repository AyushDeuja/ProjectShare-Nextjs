"use client";
import { Button } from "../ui/button";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  downVoteProductAction,
  upVoteProductAction,
} from "@/lib/products/product-action";
import { useOptimistic } from "react";
import { init } from "next/dist/compiled/webpack/webpack";
import { set } from "zod";

const VotingButtons = ({
  hasVoted,
  voteCount: initialVoteCount,
  productId,
}: {
  hasVoted: boolean;
  voteCount: number;
  productId?: number;
}) => {
  const [optimisticVoteCount, setOptimisticVoteCount] = useOptimistic(
    initialVoteCount,
    (currentCount, change: number) => Math.max(0, currentCount + change)
  );

  const handleUpVote = async () => {
    setOptimisticVoteCount(1);
    await upVoteProductAction(productId!);
  };
  const handleDownVote = async () => {
    setOptimisticVoteCount(-1);
    await downVoteProductAction(productId!);
  };
  return (
    <div
      className="flex flex-col items-center gap-1 shrink-0"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <Button
        onClick={handleUpVote}
        variant="ghost"
        size="icon-sm"
        className={cn(
          "h-8 w-8 text-primary hover:bg-primary/20",
          hasVoted
            ? "bg-primary/10 text-primary hover:bg-primary/20"
            : "hover:bg-primary/10 hover:text-primary"
        )}
      >
        <ChevronUpIcon className="size-5" />
      </Button>
      <span className="text-sm font-semibold transition-colors text-foreground">
        {optimisticVoteCount}
      </span>
      <Button
        onClick={handleDownVote}
        variant="ghost"
        size="icon-sm"
        className={cn(
          "h-8 w-8 text-primary hover:text-destructive",
          hasVoted ? "hover:text-destructive" : "opacity-50 cursor-not-allowed"
        )}
      >
        <ChevronDownIcon className="size-5" />
      </Button>
    </div>
  );
};

export default VotingButtons;
