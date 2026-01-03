import React from "react";
import { Button } from "../ui/button";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const VotingButtons = ({
  hasVoted,
  voteCount,
}: {
  hasVoted: boolean;
  voteCount: number;
}) => {
  return (
    <div className="flex flex-col items-center gap-1 shrink-0">
      <Button
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
