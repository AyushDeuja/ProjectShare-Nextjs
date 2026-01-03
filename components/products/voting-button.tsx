"use client";
import { Button } from "../ui/button";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  downVoteProductAction,
  upVoteProductAction,
} from "@/lib/products/product-action";

const VotingButtons = ({
  hasVoted,
  voteCount,
  productId,
}: {
  hasVoted: boolean;
  voteCount: number;
  productId?: number;
}) => {
  const handleUpVote = async () => {
    const result = await upVoteProductAction(productId!);
  };
  const handleDownVote = async () => {
    const result = await downVoteProductAction(productId!);
    console.log(result);
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
        {voteCount}
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
