import Link from "next/link";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ArrowRightIcon, SparklesIcon } from "lucide-react";

const LiveBadge = () => {
  return (
    <Badge
      variant="outline"
      className="px-4 py-2 mb-8 text-sm backdrop-blur-sm"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
      </span>
      <span className="text-muted-foreground">
        Join thousands of creators sharing their work
      </span>
    </Badge>
  );
};

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-background via-background to-muted/10">
      <div className="wrapper">
        <div className="flex flex-col items-center justify-center text-center py-12 lg:py-24">
          <LiveBadge />
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-5xl">
            Share What You&apos;ve Built, Discover What&apos;s Launching
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl">
            A community platform for creators to showcase their apps, AI tools,
            SaaS products, and creative projects. Authentic launches, real
            builders, genuine feedback.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button asChild size="lg" className="text-base px-8 shadow-lg">
              <Link href="/share">
                <SparklesIcon className="size-5" />
                Share Your Project
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="text-base px-8 shadow-lg"
            >
              <Link href="/explore">
                Explore Projects
                <ArrowRightIcon className="size-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
